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
 * Deduct balance for multiple orders at once
 * This prevents race conditions when processing multiple orders
 */
export async function deductBalanceForOrders(
  orders: Array<{ id: string; total_price: number }>
): Promise<{ success: boolean; failedOrders: Array<{ orderId: string; error: string }> }> {
  const supabase = createClient()
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('Kullanıcı oturumu bulunamadı. Lütfen giriş yapın.')
  }

  // Calculate total amount
  const totalAmount = orders.reduce((sum, order) => sum + order.total_price, 0)
  
  if (totalAmount <= 0) {
    return { success: true, failedOrders: [] }
  }

  // Check if user has enough balance
  const currentBalance = await getUserBalance()
  if (currentBalance < totalAmount) {
    throw new Error(
      `Yetersiz bakiye! Mevcut bakiyeniz: ${currentBalance.toFixed(2)}₺, Gerekli: ${totalAmount.toFixed(2)}₺`
    )
  }

  // Create transactions for all orders
  const transactions = orders.map(order => ({
    user_id: user.id,
    type: 'order' as const,
    amount: order.total_price,
    description: `Sipariş için ödeme: ${order.id}`,
    order_id: order.id,
  }))

  const { error, data } = await supabase
    .from('transactions')
    .insert(transactions)
    .select('id, order_id')

  if (error) {
    // If bulk insert fails, try individual inserts
    const failedOrders: Array<{ orderId: string; error: string }> = []
    
    for (const order of orders) {
      try {
        await deductBalance(order.total_price, order.id)
      } catch (err) {
        failedOrders.push({
          orderId: order.id,
          error: err instanceof Error ? err.message : 'Bilinmeyen hata'
        })
      }
    }

    return {
      success: failedOrders.length === 0,
      failedOrders
    }
  }

  return { success: true, failedOrders: [] }
}

/**
 * Deduct balance for multiple orders at once (optimized)
 * This prevents race conditions when processing multiple orders
 */
export async function deductBalanceForOrders(
  orders: Array<{ id: string; total_price: number }>
): Promise<{ success: boolean; failedOrders: Array<{ id: string; error: string }> }> {
  const supabase = createClient()
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('Kullanıcı oturumu bulunamadı. Lütfen giriş yapın.')
  }

  if (orders.length === 0) {
    return { success: true, failedOrders: [] }
  }

  // Calculate total amount
  const totalAmount = orders.reduce((sum, order) => sum + order.total_price, 0)

  // Check if user has enough balance for all orders
  const currentBalance = await getUserBalance()
  if (currentBalance < totalAmount) {
    throw new Error(
      `Yetersiz bakiye! Mevcut bakiyeniz: ${currentBalance.toFixed(2)}₺, Gerekli: ${totalAmount.toFixed(2)}₺`
    )
  }

  // Create transactions for all orders
  const transactions = orders.map(order => ({
    user_id: user.id,
    type: 'order' as const,
    amount: order.total_price,
    description: `Sipariş için ödeme: ${order.id}`,
    order_id: order.id,
  }))

  const { error, data } = await supabase
    .from('transactions')
    .insert(transactions)
    .select('id, order_id')

  if (error) {
    // If bulk insert fails, try individual inserts
    console.warn('Bulk transaction insert failed, trying individual inserts:', error)
    const failedOrders: Array<{ id: string; error: string }> = []
    
    for (const order of orders) {
      try {
        await deductBalance(order.total_price, order.id)
      } catch (individualError) {
        failedOrders.push({
          id: order.id,
          error: individualError instanceof Error ? individualError.message : 'Bilinmeyen hata'
        })
      }
    }
    
    return {
      success: failedOrders.length === 0,
      failedOrders
    }
  }

  return { success: true, failedOrders: [] }
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
