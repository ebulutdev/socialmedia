import { createClient } from '@/lib/supabase/client'

export interface Order {
  id: string
  user_id: string
  service_id: string
  service_name: string
  package_id: string
  package_name: string
  quantity: number
  link: string
  price: number
  total_price: number
  smmturk_order_id: number | null
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'failed'
  created_at: string
  updated_at: string
}

export interface CreateOrderData {
  service_id: string
  service_name: string
  package_id: string
  package_name: string
  quantity: number
  link: string
  price: number
  total_price: number
  smmturk_order_id?: number
}

export async function createOrder(orderData: CreateOrderData): Promise<Order> {
  const supabase = createClient()
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('Kullanıcı oturumu bulunamadı. Lütfen giriş yapın.')
  }
  
  const { data, error } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      service_id: orderData.service_id,
      service_name: orderData.service_name,
      package_id: orderData.package_id,
      package_name: orderData.package_name,
      quantity: orderData.quantity,
      link: orderData.link,
      price: orderData.price,
      total_price: orderData.total_price,
      smmturk_order_id: orderData.smmturk_order_id || null,
      status: 'pending',
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createMultipleOrders(ordersData: CreateOrderData[]): Promise<Order[]> {
  const supabase = createClient()
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('Kullanıcı oturumu bulunamadı. Lütfen giriş yapın.')
  }
  
  const orders = ordersData.map(order => ({
    user_id: user.id,
    service_id: order.service_id,
    service_name: order.service_name,
    package_id: order.package_id,
    package_name: order.package_name,
    quantity: order.quantity,
    link: order.link,
    price: order.price,
    total_price: order.total_price,
    smmturk_order_id: order.smmturk_order_id || null,
    status: 'pending' as const,
  }))

  const { data, error } = await supabase
    .from('orders')
    .insert(orders)
    .select()

  if (error) throw error
  return data || []
}

export async function getUserOrders(): Promise<Order[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getOrderById(orderId: string): Promise<Order | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data
}

export async function updateOrderStatus(
  orderId: string,
  status: Order['status'],
  smmturkOrderId?: number
): Promise<Order> {
  const supabase = createClient()
  
  const updateData: any = { status }
  if (smmturkOrderId) {
    updateData.smmturk_order_id = smmturkOrderId
  }

  const { data, error } = await supabase
    .from('orders')
    .update(updateData)
    .eq('id', orderId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function saveCart(items: any[], totalPrice: number): Promise<void> {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('saved_carts')
    .upsert({
      items,
      total_price: totalPrice,
    }, {
      onConflict: 'user_id',
    })

  if (error) throw error
}

export async function getSavedCart(): Promise<{ items: any[]; total_price: number } | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('saved_carts')
    .select('items, total_price')
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }
  return data
}
