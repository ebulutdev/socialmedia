// SMMTurk API Client
import type {
  SMMTurkService,
  AddOrderResponse,
  OrderStatus,
  MultipleOrderStatus,
  RefillResponse,
  MultipleRefillResponse,
  RefillStatus,
  MultipleRefillStatus,
  CancelResponse,
  BalanceResponse,
  SMMTurkError,
} from './smmturk-types'

const API_BASE_URL = 'https://smmturk.net/api/v2'

/**
 * Make a POST request to SMMTurk API
 */
async function apiRequest<T>(
  params: Record<string, string | number>
): Promise<T> {
  const formData = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, String(value))
  })

  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  
  // Check if response contains an error
  if (data.error) {
    throw new Error(data.error)
  }

  return data as T
}

/**
 * Get list of all services
 */
export async function getServices(apiKey: string): Promise<SMMTurkService[]> {
  return apiRequest<SMMTurkService[]>({
    key: apiKey,
    action: 'services',
  })
}

/**
 * Add a new order
 */
export async function addOrder(
  apiKey: string,
  serviceId: number,
  link: string,
  quantity: number,
  runs?: number,
  interval?: number
): Promise<AddOrderResponse> {
  const params: Record<string, string | number> = {
    key: apiKey,
    action: 'add',
    service: serviceId,
    link,
    quantity,
  }

  if (runs !== undefined) {
    params.runs = runs
  }

  if (interval !== undefined) {
    params.interval = interval
  }

  return apiRequest<AddOrderResponse>(params)
}

/**
 * Get order status
 */
export async function getOrderStatus(
  apiKey: string,
  orderId: number
): Promise<OrderStatus> {
  return apiRequest<OrderStatus>({
    key: apiKey,
    action: 'status',
    order: orderId,
  })
}

/**
 * Get multiple orders status
 */
export async function getMultipleOrderStatus(
  apiKey: string,
  orderIds: number[]
): Promise<MultipleOrderStatus> {
  return apiRequest<MultipleOrderStatus>({
    key: apiKey,
    action: 'status',
    orders: orderIds.join(','),
  })
}

/**
 * Create refill for an order
 */
export async function createRefill(
  apiKey: string,
  orderId: number
): Promise<RefillResponse> {
  return apiRequest<RefillResponse>({
    key: apiKey,
    action: 'refill',
    order: orderId,
  })
}

/**
 * Create refill for multiple orders
 */
export async function createMultipleRefill(
  apiKey: string,
  orderIds: number[]
): Promise<MultipleRefillResponse[]> {
  return apiRequest<MultipleRefillResponse[]>({
    key: apiKey,
    action: 'refill',
    orders: orderIds.join(','),
  })
}

/**
 * Get refill status
 */
export async function getRefillStatus(
  apiKey: string,
  refillId: number
): Promise<RefillStatus> {
  return apiRequest<RefillStatus>({
    key: apiKey,
    action: 'refill_status',
    refill: refillId,
  })
}

/**
 * Get multiple refills status
 */
export async function getMultipleRefillStatus(
  apiKey: string,
  refillIds: number[]
): Promise<MultipleRefillStatus[]> {
  return apiRequest<MultipleRefillStatus[]>({
    key: apiKey,
    action: 'refill_status',
    refills: refillIds.join(','),
  })
}

/**
 * Cancel orders
 */
export async function cancelOrders(
  apiKey: string,
  orderIds: number[]
): Promise<CancelResponse[]> {
  return apiRequest<CancelResponse[]>({
    key: apiKey,
    action: 'cancel',
    orders: orderIds.join(','),
  })
}

/**
 * Get user balance
 */
export async function getBalance(apiKey: string): Promise<BalanceResponse> {
  return apiRequest<BalanceResponse>({
    key: apiKey,
    action: 'balance',
  })
}
