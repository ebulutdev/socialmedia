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
    
    // Kupon ID'sini bul (tutara göre)
    const supabase = await createClient()
    const { data: coupons, error: couponsError } = await supabase
      .from('coupons')
      .select('*')
      .eq('is_active', true)
      .eq('value', paymentAmount)
      .single()
    
    if (couponsError || !coupons) {
      console.error('❌ Coupon not found for amount:', paymentAmount)
      // Tüm kuponları logla
      const { data: allCoupons } = await supabase
        .from('coupons')
        .select('value')
        .eq('is_active', true)
      console.log('Available coupon values:', allCoupons?.map(c => c.value))
      
      return NextResponse.json({ 
        success: false, 
        message: `Bu tutar için kupon bulunamadı: ${paymentAmount}₺`,
        amount: paymentAmount,
        received: body 
      }, { status: 400 })
    }
    
    // Kuponu aktif et
    console.log(`✅ Processing coupon purchase: ${coupons.value}₺ for ${userEmail}`)
    const result = await purchaseCouponByEmail(userEmail, coupons.id)
    
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
      coupon_value: coupons.value,
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
    note: 'This endpoint processes Shopier payment webhooks',
    available_coupons: coupons?.map(c => ({ value: c.value, id: c.id })) || [],
    webhook_format: {
      expected_fields: [
        'email or customer_email or user_email',
        'amount or total_amount',
        'status (success/completed/paid)',
        'order_id or order_no'
      ],
      note: 'Actual format may vary - check Shopier documentation'
    }
  })
}
