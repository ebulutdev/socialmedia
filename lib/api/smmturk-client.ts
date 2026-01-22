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
 * Get API key from environment or user input
 * In production, this should be stored securely
 */
function getApiKey(): string {
  // For now, we'll use an environment variable
  // In production, you might want to get this from user settings or a secure storage
  if (typeof window !== 'undefined') {
    // Client-side: could be stored in localStorage or fetched from user settings
    const stored = localStorage.getItem('smmturk_api_key')
    if (stored) return stored
  }
  
  // Fallback to environment variable (server-side only)
  return process.env.NEXT_PUBLIC_SMMTURK_API_KEY || ''
}

/**
 * Client-side functions to interact with SMMTurk API
 */
export const smmturkClient = {
  /**
   * Get list of all services
   */
  async getServices(apiKey?: string): Promise<any[]> {
    return apiCall<any[]>({
      action: 'services',
      apiKey: apiKey || getApiKey(),
    })
  },

  /**
   * Add a new order
   */
  async addOrder(
    apiKey: string,
    serviceId: number,
    link: string,
    quantity: number,
    runs?: number,
    interval?: number
  ): Promise<{ order: number }> {
    return apiCall<{ order: number }>({
      action: 'add',
      apiKey,
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
  async getOrderStatus(apiKey: string, orderId: number): Promise<any> {
    return apiCall<any>({
      action: 'status',
      apiKey,
      order: orderId,
    })
  },

  /**
   * Get multiple orders status
   */
  async getMultipleOrderStatus(apiKey: string, orderIds: number[]): Promise<any> {
    return apiCall<any>({
      action: 'status',
      apiKey,
      orders: orderIds.join(','),
    })
  },

  /**
   * Create refill for an order
   */
  async createRefill(apiKey: string, orderId: number): Promise<any> {
    return apiCall<any>({
      action: 'refill',
      apiKey,
      order: orderId,
    })
  },

  /**
   * Create refill for multiple orders
   */
  async createMultipleRefill(apiKey: string, orderIds: number[]): Promise<any[]> {
    return apiCall<any[]>({
      action: 'refill',
      apiKey,
      orders: orderIds.join(','),
    })
  },

  /**
   * Get refill status
   */
  async getRefillStatus(apiKey: string, refillId: number): Promise<any> {
    return apiCall<any>({
      action: 'refill_status',
      apiKey,
      refill: refillId,
    })
  },

  /**
   * Get multiple refills status
   */
  async getMultipleRefillStatus(apiKey: string, refillIds: number[]): Promise<any[]> {
    return apiCall<any[]>({
      action: 'refill_status',
      apiKey,
      refills: refillIds.join(','),
    })
  },

  /**
   * Cancel orders
   */
  async cancelOrders(apiKey: string, orderIds: number[]): Promise<any[]> {
    return apiCall<any[]>({
      action: 'cancel',
      apiKey,
      orders: orderIds.join(','),
    })
  },

  /**
   * Get user balance
   */
  async getBalance(apiKey: string): Promise<{ balance: string; currency: string }> {
    return apiCall<{ balance: string; currency: string }>({
      action: 'balance',
      apiKey,
    })
  },
}
