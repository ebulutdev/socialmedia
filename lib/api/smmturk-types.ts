// SMMTurk API Types

export interface SMMTurkService {
  service: number
  name: string
  type: string
  category: string
  rate: string
  min: string
  max: string
  refill: boolean
  cancel: boolean
}

export interface AddOrderResponse {
  order: number
}

export interface OrderStatus {
  charge: string
  start_count: string
  status: 'Pending' | 'In progress' | 'Partial' | 'Completed' | 'Processing' | 'Canceled'
  remains: string
  currency: string
}

export interface MultipleOrderStatus {
  [orderId: string]: OrderStatus | { error: string }
}

export interface RefillResponse {
  refill: number | { error: string }
}

export interface MultipleRefillResponse {
  order: number
  refill: number | { error: string }
}

export interface RefillStatus {
  status: 'Completed' | 'Rejected' | 'Pending' | 'In progress'
}

export interface MultipleRefillStatus {
  refill: number
  status: RefillStatus['status'] | { error: string }
}

export interface CancelResponse {
  order: number
  cancel: number | { error: string }
}

export interface BalanceResponse {
  balance: string
  currency: string
}

export interface SMMTurkError {
  error: string
}

// API Request Types
export interface GetServicesParams {
  key: string
  action: 'services'
}

export interface AddOrderParams {
  key: string
  action: 'add'
  service: number
  link: string
  quantity: number
  runs?: number
  interval?: number
}

export interface GetOrderStatusParams {
  key: string
  action: 'status'
  order: number
}

export interface GetMultipleOrderStatusParams {
  key: string
  action: 'status'
  orders: string // comma-separated order IDs
}

export interface CreateRefillParams {
  key: string
  action: 'refill'
  order: number
}

export interface CreateMultipleRefillParams {
  key: string
  action: 'refill'
  orders: string // comma-separated order IDs
}

export interface GetRefillStatusParams {
  key: string
  action: 'refill_status'
  refill: number
}

export interface GetMultipleRefillStatusParams {
  key: string
  action: 'refill_status'
  refills: string // comma-separated refill IDs
}

export interface CancelOrderParams {
  key: string
  action: 'cancel'
  orders: string // comma-separated order IDs
}

export interface GetBalanceParams {
  key: string
  action: 'balance'
}
