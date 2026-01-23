import { NextRequest, NextResponse } from 'next/server'
import { getCoupons } from '@/lib/api/coupons'
import { purchaseCouponByEmail } from '@/lib/api/coupons-server'
import { createClient } from '@/lib/supabase/server'

/**
 * Shopier Payment Callback/Webhook Handler
 * 
 * Configured URL: https://xn--subjectve-1pb.com/api/shopier/callback
 * 
 * IMPORTANT: This endpoint processes Shopier payment webhooks
 * Make sure to verify webhook signature if Shopier provides it
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('🔔 Shopier webhook received:', JSON.stringify(body, null, 2))
    
    // Shopier webhook formatı (örnek - gerçek formatı Shopier dokümantasyonundan kontrol edin)
    // Genellikle şu alanlar gelir:
    const {
      order_id,
      order_no,
      status, // 'success', 'completed', 'failed', etc.
      amount,
      total_amount,
      email,
      customer_email,
      user_email,
      quantity,
      qty,
      adet,
      unit_price,
      price,
      // Shopier'den gelen diğer alanlar
    } = body
    
    // Email'i bul (farklı alan isimleri olabilir)
    const userEmail = email || customer_email || user_email
    
    if (!userEmail) {
      console.error('❌ Email not found in webhook data')
      return NextResponse.json({ 
        success: false, 
        message: 'Email bilgisi bulunamadı',
        received: body 
      }, { status: 400 })
    }
    
    // Ödeme tutarını bul
    const paymentAmount = parseFloat(amount || total_amount || '0')
    
    if (!paymentAmount || paymentAmount <= 0) {
      console.error('❌ Invalid amount:', paymentAmount)
      return NextResponse.json({ 
        success: false, 
        message: 'Geçersiz ödeme tutarı',
        received: body 
      }, { status: 400 })
    }
    
    // Ödeme durumunu kontrol et
    const paymentStatus = (status || '').toLowerCase()
    const isSuccess = paymentStatus === 'success' || 
                      paymentStatus === 'completed' || 
                      paymentStatus === 'paid' ||
                      paymentStatus === '1'
    
    if (!isSuccess) {
      console.log('ℹ️ Payment not completed, status:', status)
      return NextResponse.json({ 
        success: false, 
        message: 'Ödeme tamamlanmadı',
        status: status,
        received: body 
      })
    }
    
    // Miktar bilgisini bul
    let itemQuantity = parseInt(quantity || qty || adet || '1', 10)
    if (isNaN(itemQuantity) || itemQuantity < 1) {
      itemQuantity = 1
    }
    
    // Birim fiyatı bul
    let unitPrice = parseFloat(unit_price || price || '0')
    
    // Eğer birim fiyat yoksa, toplam tutardan hesapla
    if (!unitPrice || unitPrice <= 0) {
      unitPrice = paymentAmount / itemQuantity
    }
    
    console.log(`📦 Payment details: Total=${paymentAmount}₺, Quantity=${itemQuantity}, Unit Price=${unitPrice}₺`)
    
    // Kupon ID'sini bul (birim fiyata göre)
    const supabase = await createClient()
    
    // Önce tam eşleşen birim fiyatı ara
    let { data: coupon, error: couponError } = await supabase
      .from('coupons')
      .select('*')
      .eq('is_active', true)
      .eq('value', unitPrice)
      .single()
    
    // Eğer bulunamazsa, tüm kuponları al ve en yakın değeri bul
    if (couponError || !coupon) {
      console.log(`⚠️ Exact match not found for unit price ${unitPrice}₺, searching for closest match...`)
      
      const { data: allCoupons, error: allCouponsError } = await supabase
        .from('coupons')
        .select('*')
        .eq('is_active', true)
        .order('value', { ascending: true })
      
      if (allCouponsError || !allCoupons || allCoupons.length === 0) {
        console.error('❌ No active coupons found')
        return NextResponse.json({ 
          success: false, 
          message: 'Aktif kupon bulunamadı',
          received: body 
        }, { status: 400 })
      }
      
      // En yakın kupon değerini bul
      let closestCoupon = allCoupons[0]
      let minDiff = Math.abs(closestCoupon.value - unitPrice)
      
      for (const c of allCoupons) {
        const diff = Math.abs(c.value - unitPrice)
        if (diff < minDiff) {
          minDiff = diff
          closestCoupon = c
        }
      }
      
      // Eğer fark çok büyükse (örn. %10'dan fazla), hata ver
      const diffPercent = (minDiff / unitPrice) * 100
      if (diffPercent > 10) {
        console.error(`❌ Coupon value mismatch: Expected ~${unitPrice}₺, closest is ${closestCoupon.value}₺ (${diffPercent.toFixed(1)}% difference)`)
        return NextResponse.json({ 
          success: false, 
          message: `Kupon değeri uyuşmuyor. Beklenen: ~${unitPrice}₺, En yakın: ${closestCoupon.value}₺`,
          received: body 
        }, { status: 400 })
      }
      
      coupon = closestCoupon
      console.log(`✅ Using closest coupon match: ${coupon.value}₺ (difference: ${minDiff.toFixed(2)}₺)`)
    }
    
    // Kuponu aktif et (miktar ile)
    console.log(`✅ Processing coupon purchase: ${itemQuantity} adet ${coupon.value}₺ kupon for ${userEmail}`)
    const result = await purchaseCouponByEmail(userEmail, coupon.id, itemQuantity)
    
    if (!result.success) {
      console.error('❌ Coupon purchase failed:', result.message)
      return NextResponse.json({ 
        success: false, 
        message: result.message,
        received: body 
      }, { status: 500 })
    }
    
    console.log('✅ Coupon activated successfully:', result.message)
    
    return NextResponse.json({ 
      success: true, 
      message: result.message,
      coupon_value: coupon.value,
      quantity: itemQuantity,
      total_amount: paymentAmount,
      user_email: userEmail,
      order_id: order_id || order_no
    })
    
  } catch (error) {
    console.error('❌ Shopier webhook error:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

/**
 * GET endpoint for testing webhook (optional)
 */
export async function GET(request: NextRequest) {
  const supabase = await createClient()
  
  // Get available coupons for reference
  const { data: coupons } = await supabase
    .from('coupons')
    .select('value, id')
    .eq('is_active', true)
    .order('value', { ascending: true })
  
  return NextResponse.json({ 
    message: 'Shopier webhook endpoint is active',
    url: 'https://xn--subjectve-1pb.com/api/shopier/callback',
    note: 'This endpoint processes Shopier payment webhooks with quantity support',
    available_coupons: coupons?.map(c => ({ value: c.value, id: c.id })) || [],
    webhook_format: {
      expected_fields: [
        'email or customer_email or user_email',
        'amount or total_amount',
        'quantity or qty or adet (optional, defaults to 1)',
        'unit_price or price (optional, calculated from total/quantity)',
        'status (success/completed/paid)',
        'order_id or order_no'
      ],
      note: 'If quantity is not provided, system will try to calculate it from total amount and coupon values',
      example: {
        single_item: {
          total_amount: 250,
          quantity: 1,
          unit_price: 250
        },
        multiple_items: {
          total_amount: 500,
          quantity: 2,
          unit_price: 250
        }
      }
    }
  })
}
