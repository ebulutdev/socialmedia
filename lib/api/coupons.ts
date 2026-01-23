import { createClient } from '@/lib/supabase/client'
import { addBalance } from './balance'

export interface Coupon {
  id: string
  value: number
  sophier_link: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface UserCoupon {
  id: string
  user_id: string
  coupon_id: string
  purchased_at: string
  is_used: boolean
  transaction_id: string | null
  coupon?: Coupon
}

/**
 * Get all active coupons
 */
export async function getCoupons(): Promise<Coupon[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('is_active', true)
    .order('value', { ascending: true })

  if (error) throw error
  return data || []
}

/**
 * Get coupon by ID
 */
export async function getCouponById(couponId: string): Promise<Coupon | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('id', couponId)
    .eq('is_active', true)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data
}

/**
 * Purchase a coupon (creates transaction and user_coupon record)
 * This should be called after successful payment via Sophier
 */
export async function purchaseCoupon(couponId: string): Promise<UserCoupon> {
  const supabase = createClient()
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('Kullanıcı oturumu bulunamadı. Lütfen giriş yapın.')
  }

  // Get coupon details
  const coupon = await getCouponById(couponId)
  if (!coupon) {
    throw new Error('Kupon bulunamadı veya aktif değil.')
  }

  // Add balance to user account
  await addBalance(
    coupon.value,
    `${coupon.value}₺ kupon satın alındı`,
    couponId
  )

  // Get the transaction ID we just created
  const { data: transaction, error: transactionError } = await supabase
    .from('transactions')
    .select('id')
    .eq('user_id', user.id)
    .eq('coupon_id', couponId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (transactionError) {
    console.error('Error fetching transaction:', transactionError)
  }

  // Create user_coupon record
  const { data: userCoupon, error: couponError } = await supabase
    .from('user_coupons')
    .insert({
      user_id: user.id,
      coupon_id: couponId,
      transaction_id: transaction?.id || null,
    })
    .select()
    .single()

  if (couponError) {
    throw new Error('Kupon kaydı oluşturulurken hata oluştu: ' + couponError.message)
  }

  return {
    ...userCoupon,
    coupon,
  }
}

/**
 * Get user's purchased coupons
 */
export async function getUserCoupons(): Promise<UserCoupon[]> {
  const supabase = createClient()
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('Kullanıcı oturumu bulunamadı. Lütfen giriş yapın.')
  }

  const { data, error } = await supabase
    .from('user_coupons')
    .select(`
      *,
      coupon:coupons(*)
    `)
    .eq('user_id', user.id)
    .order('purchased_at', { ascending: false })

  if (error) throw error
  return data || []
}
