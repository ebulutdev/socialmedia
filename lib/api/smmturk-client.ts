// Client-side API wrapper for SMMTurk API
// This makes requests to our Next.js API routes which handle the actual API calls

const API_BASE = '/api/smmturk'

interface ApiResponse<T> {
  data?: T
  error?: string
}

async function apiCall<T>(body: Record<string, any>): Promise<T> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const result = await response.json()

  if (!response.ok || result.error) {
    throw new Error(result.error || `API request failed: ${response.statusText}`)
  }

  return result as T
}

/**
 * Client-side functions to interact with SMMTurk API
 * API key is handled server-side for security
 */
export const smmturkClient = {
  /**
   * Get list of all services
   */
  async getServices(): Promise<any[]> {
    return apiCall<any[]>({
      action: 'services',
    })
  },

  /**
   * Add a new order
   */
  async addOrder(
    serviceId: number,
    link: string,
    quantity: number,
    runs?: number,
    interval?: number
  ): Promise<{ order: number }> {
    return apiCall<{ order: number }>({
      action: 'add',
      service: serviceId,
      link,
      quantity,
      ...(runs !== undefined && { runs }),
      ...(interval !== undefined && { interval }),
    })
  },

  /**
   * Get order status
   */
  async getOrderStatus(orderId: number): Promise<any> {
    return apiCall<any>({
      action: 'status',
      order: orderId,
    })
  },

  /**
   * Get multiple orders status
   */
  async getMultipleOrderStatus(orderIds: number[]): Promise<any> {
    return apiCall<any>({
      action: 'status',
      orders: orderIds.join(','),
    })
  },

  /**
   * Create refill for an order
   */
  async createRefill(orderId: number): Promise<any> {
    return apiCall<any>({
      action: 'refill',
      order: orderId,
    })
  },

  /**
   * Create refill for multiple orders
   */
  async createMultipleRefill(orderIds: number[]): Promise<any[]> {
    return apiCall<any[]>({
      action: 'refill',
      orders: orderIds.join(','),
    })
  },

  /**
   * Get refill status
   */
  async getRefillStatus(refillId: number): Promise<any> {
    return apiCall<any>({
      action: 'refill_status',
      refill: refillId,
    })
  },

  /**
   * Get multiple refills status
   */
  async getMultipleRefillStatus(refillIds: number[]): Promise<any[]> {
    return apiCall<any[]>({
      action: 'refill_status',
      refills: refillIds.join(','),
    })
  },

  /**
   * Cancel orders
   */
  async cancelOrders(orderIds: number[]): Promise<any[]> {
    return apiCall<any[]>({
      action: 'cancel',
      orders: orderIds.join(','),
    })
  },

  /**
   * Get user balance
   */
  async getBalance(): Promise<{ balance: string; currency: string }> {
    return apiCall<{ balance: string; currency: string }>({
      action: 'balance',
    })
  },
}
