import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/server'

/**
 * Server-side coupon purchase function
 * Used in webhook handlers where we have user email but no session.
 * Pass adminClient when called from webhook (no user session / RLS bypass).
 */
export async function purchaseCouponByEmail(
  email: string,
  couponId: string,
  quantity: number = 1,
  adminClient?: SupabaseClient
): Promise<{ success: boolean; message: string }> {
  const supabase = adminClient ?? (await createClient())
  
  // Find user by email in profiles table (case-insensitive: Shopier vs Auth farkı)
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id')
    .ilike('email', email)
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

  // Validate quantity
  if (quantity < 1) {
    quantity = 1
  }

  // Create transactions for all quantities
  const transactions = []
  const userCoupons = []
  
  for (let i = 0; i < quantity; i++) {
    transactions.push({
      user_id: profile.id,
      type: 'deposit' as const,
      amount: coupon.value,
      description: quantity > 1 
        ? `${coupon.value}₺ kupon satın alındı (Shopier) - ${quantity} adet` 
        : `${coupon.value}₺ kupon satın alındı (Shopier)`,
      coupon_id: couponId,
    })
  }

  // Insert all transactions at once
  const { data: insertedTransactions, error: transactionError } = await supabase
    .from('transactions')
    .insert(transactions)
    .select('id')

  if (transactionError) {
    console.error('Error creating transactions:', transactionError)
    return {
      success: false,
      message: 'Bakiye yüklenirken hata oluştu: ' + transactionError.message
    }
  }

  // Create user_coupon records for each transaction
  if (insertedTransactions && insertedTransactions.length > 0) {
    const userCouponRecords = insertedTransactions.map(tx => ({
      user_id: profile.id,
      coupon_id: couponId,
      transaction_id: tx.id,
    }))

    const { error: couponError2 } = await supabase
      .from('user_coupons')
      .insert(userCouponRecords)

    if (couponError2) {
      console.error('Error creating user_coupon records:', couponError2)
      // Transactions were created, so we still return success
    }
  }

  const totalAmount = coupon.value * quantity
  return {
    success: true,
    message: quantity > 1 
      ? `${quantity} adet ${coupon.value}₺ kupon satın alındı. Toplam ${totalAmount}₺ bakiye yüklendi.`
      : `${coupon.value}₺ bakiye başarıyla yüklendi.`
  }
}
