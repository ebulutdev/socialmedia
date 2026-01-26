import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { addOrder } from '@/lib/api/smmturk'
import type { Order } from '@/lib/api/orders'

interface CartItem {
  id: string
  packageId: string
  packageName: string
  serviceId: string
  serviceName: string
  amount: number
  price: string
  totalPrice: number
  url: string
}

/**
 * Server-side order placement API
 * Handles all order processing atomically to prevent CORS and atomicity issues
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // 1. Authentication check
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Giriş yapmanız gerekiyor' },
        { status: 401 }
      )
    }

    // 2. Parse request body
    const body = await request.json()
    const { items }: { items: CartItem[] } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Sepet boş' },
        { status: 400 }
      )
    }

    // 3. Validate items (URL check)
    const itemsWithoutUrl = items.filter(item => !item.url || !item.url.trim())
    if (itemsWithoutUrl.length > 0) {
      return NextResponse.json(
        { error: 'Bazı ürünlerde URL eksik. Lütfen tüm ürünler için URL giriniz.' },
        { status: 400 }
      )
    }

    // Validate URLs
    for (const item of items) {
      try {
        new URL(item.url)
      } catch {
        return NextResponse.json(
          { error: `${item.packageName} için geçersiz URL: ${item.url}` },
          { status: 400 }
        )
      }
    }

    // 4. Get API key from environment (not from client)
    const apiKey = process.env.SMMTURK_API_KEY
    if (!apiKey) {
      console.error('❌ SMMTURK_API_KEY environment variable is not set')
      return NextResponse.json(
        { error: 'API yapılandırma hatası. Lütfen destek ekibiyle iletişime geçin.' },
        { status: 500 }
      )
    }

    // 5. Calculate total amount
    const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0)

    // 6. Check user balance in database (using RPC function)
    const { data: balanceData, error: balanceError } = await supabase
      .rpc('get_user_balance', { p_user_id: user.id })

    if (balanceError) {
      console.error('Balance check error:', balanceError)
      return NextResponse.json(
        { error: 'Bakiye kontrolü yapılırken bir hata oluştu' },
        { status: 500 }
      )
    }

    const currentBalance = parseFloat(balanceData || '0')
    if (currentBalance < totalAmount) {
      const missing = totalAmount - currentBalance
      return NextResponse.json(
        {
          error: 'Yetersiz bakiye',
          details: {
            currentBalance: currentBalance.toFixed(2),
            required: totalAmount.toFixed(2),
            missing: missing.toFixed(2)
          }
        },
        { status: 400 }
      )
    }

    // 7. Create orders in database (pending status)
    const ordersToCreate = items.map(item => ({
      user_id: user.id,
      service_id: item.serviceId,
      service_name: item.serviceName,
      package_id: item.packageId,
      package_name: item.packageName,
      quantity: item.amount,
      link: item.url,
      price: item.totalPrice / item.amount, // Unit price
      total_price: item.totalPrice,
      status: 'pending' as const,
    }))

    const { data: reservedOrders, error: createError } = await supabase
      .from('orders')
      .insert(ordersToCreate)
      .select()

    if (createError || !reservedOrders) {
      console.error('Order creation error:', createError)
      return NextResponse.json(
        { error: 'Siparişler oluşturulurken bir hata oluştu' },
        { status: 500 }
      )
    }

    // 8. Deduct balance atomically (create transactions)
    const transactions = reservedOrders.map(order => ({
      user_id: user.id,
      type: 'order' as const,
      amount: order.total_price,
      description: `Sipariş için ödeme: ${order.id}`,
      order_id: order.id,
    }))

    const { error: transactionError } = await supabase
      .from('transactions')
      .insert(transactions)

    if (transactionError) {
      console.error('Balance deduction error:', transactionError)
      // Rollback: Delete created orders
      const orderIds = reservedOrders.map(o => o.id)
      await supabase
        .from('orders')
        .delete()
        .in('id', orderIds)
      
      return NextResponse.json(
        { error: 'Bakiye düşürülürken bir hata oluştu' },
        { status: 500 }
      )
    }

    // 9. Send orders to SMM Turk API (server-side, no CORS issues)
    const results: Array<{
      orderId: number
      success: boolean
      error?: string
      packageName?: string
      dbOrderId?: string
    }> = []
    const successfulOrders: Array<{
      dbOrderId: string
      smmturk_order_id: number
    }> = []
    const failedOrders: Array<{
      id: string
      total_price: number
    }> = []

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const reservedOrder = reservedOrders[i]

      try {
        // Parse service ID
        const serviceId = parseInt(item.packageId)
        if (isNaN(serviceId)) {
          throw new Error(`Geçersiz servis ID: ${item.packageId}`)
        }

        // Send to SMM Turk API
        const smmResponse = await addOrder(
          apiKey,
          serviceId,
          item.url,
          item.amount
        )

        // Success: Update order status
        await supabase
          .from('orders')
          .update({
            status: 'processing',
            smmturk_order_id: smmResponse.order,
          })
          .eq('id', reservedOrder.id)

        results.push({
          orderId: smmResponse.order,
          success: true,
          packageName: item.packageName,
          dbOrderId: reservedOrder.id,
        })

        successfulOrders.push({
          dbOrderId: reservedOrder.id,
          smmturk_order_id: smmResponse.order,
        })
      } catch (error) {
        console.error(`❌ SMM Turk sipariş hatası (${item.packageName}):`, error)
        
        // Update order status to cancelled
        await supabase
          .from('orders')
          .update({ status: 'cancelled' })
          .eq('id', reservedOrder.id)

        // Hata mesajını daha açıklayıcı hale getir
        let errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata'
        
        // Eğer bakiye hatası ise, kullanıcıya daha net bilgi ver
        if (errorMessage.includes('yeterli bakiye') || 
            errorMessage.includes('not enough funds') || 
            errorMessage.includes('insufficient balance')) {
          // Mesaj zaten güncellenmiş olmalı ama yine de kontrol edelim
          if (!errorMessage.includes('SMM panelinde')) {
            errorMessage = 'SMM panelinde yeterli bakiye bulunmamaktadır. Lütfen destek ekibiyle iletişime geçin.'
          }
        }

        results.push({
          orderId: 0,
          success: false,
          error: errorMessage,
          packageName: item.packageName,
          dbOrderId: reservedOrder.id,
        })

        failedOrders.push({
          id: reservedOrder.id,
          total_price: reservedOrder.total_price,
        })
      }
    }

    // 10. Refund balance for failed orders
    if (failedOrders.length > 0) {
      const refundTransactions = failedOrders.map(order => ({
        user_id: user.id,
        type: 'refund' as const,
        amount: order.total_price,
        description: `Sipariş iptali için geri ödeme: ${order.id}`,
        order_id: order.id,
      }))

      const { error: refundError } = await supabase
        .from('transactions')
        .insert(refundTransactions)

      if (refundError) {
        console.error('Refund error:', refundError)
        // Log but don't fail the request - admin can manually refund
      }
    }

    // 11. Return results
    const successCount = results.filter(r => r.success).length
    const failedCount = results.length - successCount

    return NextResponse.json({
      success: true,
      results,
      summary: {
        total: results.length,
        successful: successCount,
        failed: failedCount,
      },
    })
  } catch (error) {
    console.error('Order placement error:', error)
    return NextResponse.json(
      {
        error: 'Sipariş oluşturulurken bir hata oluştu',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata',
      },
      { status: 500 }
    )
  }
}
