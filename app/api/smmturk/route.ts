import { NextRequest, NextResponse } from 'next/server'
import * as smmturk from '@/lib/api/smmturk'

// Handle all SMMTurk API actions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, apiKey, ...params } = body

    // Validate API key
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      )
    }

    // Validate action
    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      )
    }

    let result

    switch (action) {
      case 'services':
        result = await smmturk.getServices(apiKey)
        break

      case 'add':
        if (!params.service || !params.link || !params.quantity) {
          return NextResponse.json(
            { error: 'service, link, and quantity are required for add action' },
            { status: 400 }
          )
        }
        result = await smmturk.addOrder(
          apiKey,
          params.service,
          params.link,
          params.quantity,
          params.runs,
          params.interval
        )
        break

      case 'status':
        if (params.orders) {
          // Multiple orders
          const orderIds = params.orders.split(',').map((id: string) => parseInt(id.trim()))
          result = await smmturk.getMultipleOrderStatus(apiKey, orderIds)
        } else if (params.order) {
          // Single order
          result = await smmturk.getOrderStatus(apiKey, params.order)
        } else {
          return NextResponse.json(
            { error: 'order or orders parameter is required for status action' },
            { status: 400 }
          )
        }
        break

      case 'refill':
        if (params.orders) {
          // Multiple refills
          const orderIds = params.orders.split(',').map((id: string) => parseInt(id.trim()))
          result = await smmturk.createMultipleRefill(apiKey, orderIds)
        } else if (params.order) {
          // Single refill
          result = await smmturk.createRefill(apiKey, params.order)
        } else {
          return NextResponse.json(
            { error: 'order or orders parameter is required for refill action' },
            { status: 400 }
          )
        }
        break

      case 'refill_status':
        if (params.refills) {
          // Multiple refill status
          const refillIds = params.refills.split(',').map((id: string) => parseInt(id.trim()))
          result = await smmturk.getMultipleRefillStatus(apiKey, refillIds)
        } else if (params.refill) {
          // Single refill status
          result = await smmturk.getRefillStatus(apiKey, params.refill)
        } else {
          return NextResponse.json(
            { error: 'refill or refills parameter is required for refill_status action' },
            { status: 400 }
          )
        }
        break

      case 'cancel':
        if (!params.orders) {
          return NextResponse.json(
            { error: 'orders parameter is required for cancel action' },
            { status: 400 }
          )
        }
        const orderIds = params.orders.split(',').map((id: string) => parseInt(id.trim()))
        result = await smmturk.cancelOrders(apiKey, orderIds)
        break

      case 'balance':
        result = await smmturk.getBalance(apiKey)
        break

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('SMMTurk API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
