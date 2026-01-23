import { createClient } from '@/lib/supabase/server'
import { addBalance } from './balance'

/**
 * Server-side coupon purchase function
 * Used in webhook handlers where we have user email but no session
 */
export async function purchaseCouponByEmail(
  email: string,
  couponId: string
): Promise<{ success: boolean; message: string }> {
  const supabase = await createClient()
  
  // Find user by email in profiles table
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single()

  if (profileError || !profile) {
    return {
      success: false,
      message: `Kullanıcı bulunamadı: ${email}`
    }
  }

  // Get coupon details
  const { data: coupon, error: couponError } = await supabase
    .from('coupons')
    .select('*')
    .eq('id', couponId)
    .eq('is_active', true)
    .single()

  if (couponError || !coupon) {
    return {
      success: false,
      message: 'Kupon bulunamadı veya aktif değil.'
    }
  }

  // Check if this coupon was already purchased for this transaction
  // (prevent duplicate processing)
  const { data: existingTransaction } = await supabase
    .from('transactions')
    .select('id')
    .eq('user_id', profile.id)
    .eq('coupon_id', couponId)
    .eq('type', 'deposit')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (existingTransaction) {
    // Already processed, return success
    return {
      success: true,
      message: 'Kupon zaten aktif edilmiş.'
    }
  }

  // Add balance to user account
  const { error: transactionError } = await supabase
    .from('transactions')
    .insert({
      user_id: profile.id,
      type: 'deposit',
      amount: coupon.value,
      description: `${coupon.value}₺ kupon satın alındı (Shopier)`,
      coupon_id: couponId,
    })

  if (transactionError) {
    console.error('Error creating transaction:', transactionError)
    return {
      success: false,
      message: 'Bakiye yüklenirken hata oluştu: ' + transactionError.message
    }
  }

  // Get the transaction ID we just created
  const { data: transaction } = await supabase
    .from('transactions')
    .select('id')
    .eq('user_id', profile.id)
    .eq('coupon_id', couponId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  // Create user_coupon record
  const { error: couponError2 } = await supabase
    .from('user_coupons')
    .insert({
      user_id: profile.id,
      coupon_id: couponId,
      transaction_id: transaction?.id || null,
    })

  if (couponError2) {
    console.error('Error creating user_coupon:', couponError2)
    // Transaction was created, so we still return success
    return {
      success: true,
      message: 'Bakiye yüklendi ancak kupon kaydı oluşturulamadı.'
    }
  }

  return {
    success: true,
    message: `${coupon.value}₺ bakiye başarıyla yüklendi.`
  }
}
