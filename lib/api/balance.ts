import { createClient } from '@/lib/supabase/client'

export interface UserBalance {
  balance: number
}

/**
 * Get user's current balance from transactions
 */
export async function getUserBalance(): Promise<number> {
  const supabase = createClient()
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('Kullanıcı oturumu bulunamadı. Lütfen giriş yapın.')
  }

  // Call the database function to calculate balance
  const { data, error } = await supabase
    .rpc('get_user_balance', { p_user_id: user.id })

  if (error) {
    console.error('Balance calculation error:', error)
    // Fallback: calculate manually
    return await calculateBalanceManually(user.id)
  }

  return parseFloat(data || '0')
}

/**
 * Fallback: Calculate balance manually from transactions
 */
async function calculateBalanceManually(userId: string): Promise<number> {
  const supabase = createClient()
  
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('type, amount')
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching transactions:', error)
    return 0
  }

  if (!transactions || transactions.length === 0) {
    return 0
  }

  let balance = 0
  for (const transaction of transactions) {
    if (transaction.type === 'deposit' || transaction.type === 'refund') {
      balance += parseFloat(transaction.amount.toString())
    } else if (transaction.type === 'withdrawal' || transaction.type === 'order') {
      balance -= parseFloat(transaction.amount.toString())
    }
  }

  return balance
}

/**
 * Deduct balance for an order
 */
export async function deductBalance(amount: number, orderId: string): Promise<void> {
  const supabase = createClient()
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('Kullanıcı oturumu bulunamadı. Lütfen giriş yapın.')
  }

  // Check if user has enough balance
  const currentBalance = await getUserBalance()
  if (currentBalance < amount) {
    throw new Error('Yetersiz bakiye. Mevcut bakiyeniz: ' + currentBalance.toFixed(2) + '₺')
  }

  // Create withdrawal transaction
  const { error } = await supabase
    .from('transactions')
    .insert({
      user_id: user.id,
      type: 'order',
      amount: amount,
      description: `Sipariş için ödeme: ${orderId}`,
      order_id: orderId,
    })

  if (error) {
    throw new Error('Bakiye düşürülürken hata oluştu: ' + error.message)
  }
}

/**
 * Add balance (for coupon purchases)
 */
export async function addBalance(amount: number, description: string, couponId?: string): Promise<void> {
  const supabase = createClient()
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('Kullanıcı oturumu bulunamadı. Lütfen giriş yapın.')
  }

  // Create deposit transaction
  const { error } = await supabase
    .from('transactions')
    .insert({
      user_id: user.id,
      type: 'deposit',
      amount: amount,
      description: description,
      coupon_id: couponId || null,
    })

  if (error) {
    throw new Error('Bakiye yüklenirken hata oluştu: ' + error.message)
  }
}
