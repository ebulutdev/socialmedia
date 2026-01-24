import { createHmac } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { purchaseCouponByEmail } from '@/lib/api/coupons-server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

/**
 * Shopier OSB (Otomatik Sipariş Bildirimi) callback
 *
 * Body: application/x-www-form-urlencoded
 * - res: base64-encoded JSON payload
 * - hash: HMAC-SHA256(res + username, password) [hex]
 *
 * Verify hash, decode res, process coupon purchase, return "success".
 * Configured URL: https://xn--subjectve-1pb.com/api/shopier/callback
 */

function text(body: string, status = 200) {
  return new NextResponse(body, {
    status,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

export async function POST(request: NextRequest) {
  try {
    const username = process.env.SHOPIER_OSB_USERNAME
    const key = process.env.SHOPIER_OSB_PASSWORD

    if (!username || !key) {
      console.error('❌ SHOPIER_OSB_USERNAME or SHOPIER_OSB_PASSWORD not set')
      return text('missing configuration', 500)
    }

    const form = await request.formData()
    const resRaw = form.get('res')
    const hashRaw = form.get('hash')

    const res = typeof resRaw === 'string' ? resRaw : null
    const hash = typeof hashRaw === 'string' ? hashRaw : null

    if (!res || !hash) {
      console.error('❌ OSB missing parameter: res or hash')
      return text('missing parameter', 400)
    }

    const computed = createHmac('sha256', key).update(res + username).digest('hex')
    if (computed !== hash) {
      console.error('❌ OSB hash verification failed')
      return text('unauthorized', 401)
    }

    let json: string
    try {
      json = Buffer.from(res, 'base64').toString('utf8')
    } catch {
      console.error('❌ OSB base64 decode failed')
      return text('invalid payload', 400)
    }

    let data: Record<string, unknown>
    try {
      data = JSON.parse(json) as Record<string, unknown>
    } catch {
      console.error('❌ OSB JSON parse failed')
      return text('invalid payload', 400)
    }

    const email = data.email as string | undefined
    const orderid = data.orderid as string | undefined
    const price = Number(data.price ?? 0)
    const productcount = Number(data.productcount ?? 1)
    const istest = data.istest as number | undefined

    if (!email || typeof email !== 'string') {
      console.error('❌ OSB email missing')
      return text('missing email', 400)
    }

    if (!orderid || typeof orderid !== 'string') {
      console.error('❌ OSB orderid missing')
      return text('missing orderid', 400)
    }

    const itemQuantity = productcount >= 1 ? Math.floor(productcount) : 1
    const unitPrice = itemQuantity > 0 ? price / itemQuantity : price
    const unitPriceRounded = Math.round(unitPrice * 100) / 100

    if (!unitPrice || unitPrice <= 0) {
      console.error('❌ OSB invalid price', { price, productcount })
      return text('invalid price', 400)
    }

    console.log(`🔔 Shopier OSB: orderid=${orderid} email=${email} price=${price} qty=${itemQuantity} unit=${unitPriceRounded} istest=${istest}`)

    const supabase = createAdminClient()

    const { data: existing } = await supabase
      .from('shopier_processed_orders')
      .select('orderid')
      .eq('orderid', orderid)
      .single()

    if (existing) {
      console.log(`ℹ️ OSB orderid ${orderid} already processed, skipping`)
      return text('success', 200)
    }

    let { data: coupon, error: couponError } = await supabase
      .from('coupons')
      .select('*')
      .eq('is_active', true)
      .eq('value', unitPriceRounded)
      .single()

    if (couponError || !coupon) {
      const { data: allCoupons, error: allErr } = await supabase
        .from('coupons')
        .select('*')
        .eq('is_active', true)
        .order('value', { ascending: true })

      if (allErr || !allCoupons?.length) {
        console.error('❌ No active coupons')
        return text('no matching coupon', 400)
      }

      let closest = allCoupons[0]
      let minDiff = Math.abs(Number(closest.value) - unitPriceRounded)
      for (const c of allCoupons) {
        const d = Math.abs(Number(c.value) - unitPriceRounded)
        if (d < minDiff) {
          minDiff = d
          closest = c
        }
      }

      const diffPercent = (minDiff / unitPriceRounded) * 100
      if (diffPercent > 10) {
        console.error(`❌ Coupon mismatch: ~${unitPriceRounded}₺ vs closest ${closest.value}₺`)
        return text('coupon mismatch', 400)
      }
      coupon = closest
    }

    const result = await purchaseCouponByEmail(email, coupon.id, itemQuantity, supabase)

    if (!result.success) {
      console.error('❌ Coupon purchase failed:', result.message)
      return text(result.message, 500)
    }

    await supabase.from('shopier_processed_orders').insert({ orderid })

    console.log(`✅ OSB processed: ${orderid} – ${result.message}`)
    return text('success', 200)
  } catch (e) {
    console.error('❌ Shopier OSB error:', e)
    return text('internal error', 500)
  }
}

/**
 * GET: debug / health check
 */
export async function GET() {
  const supabase = await createClient()
  const { data: coupons } = await supabase
    .from('coupons')
    .select('value, id')
    .eq('is_active', true)
    .order('value', { ascending: true })

  return NextResponse.json({
    message: 'Shopier OSB callback active',
    url: 'https://xn--subjectve-1pb.com/api/shopier/callback',
    format: 'POST application/x-www-form-urlencoded: res (base64 JSON), hash (HMAC-SHA256)',
    env: {
      SHOPIER_OSB_USERNAME: process.env.SHOPIER_OSB_USERNAME ? '***' : 'missing',
      SHOPIER_OSB_PASSWORD: process.env.SHOPIER_OSB_PASSWORD ? '***' : 'missing',
    },
    available_coupons: coupons?.map((c) => ({ value: c.value, id: c.id })) ?? [],
  })
}
