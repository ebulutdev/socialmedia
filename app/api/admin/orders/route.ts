import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/utils/admin'

export interface AdminOrder {
  id: string
  user_id: string
  user_email: string | null
  user_name: string | null
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

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Giriş yapmanız gerekiyor' },
        { status: 401 }
      )
    }

    const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || []
    const userEmail = user.email?.toLowerCase()
    const isAdmin = isAdminEmail(user.email)

    if (!isAdmin) {
      console.log('Admin check failed:', {
        userEmail,
        adminEmails,
        envVar: process.env.ADMIN_EMAILS
      })
      return NextResponse.json(
        { 
          error: 'Yetkisiz erişim',
          debug: process.env.NODE_ENV === 'development' ? {
            userEmail,
            adminEmails,
            envVar: process.env.ADMIN_EMAILS
          } : undefined
        },
        { status: 403 }
      )
    }

    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select(`
        id,
        user_id,
        service_id,
        service_name,
        package_id,
        package_name,
        quantity,
        link,
        price,
        total_price,
        smmturk_order_id,
        status,
        created_at,
        updated_at,
        profiles:user_id (
          email,
          full_name
        )
      `)
      .order('created_at', { ascending: false })

    if (ordersError) {
      throw ordersError
    }

    const adminOrders: AdminOrder[] = (orders || []).map((order: any) => ({
      id: order.id,
      user_id: order.user_id,
      user_email: order.profiles?.email || null,
      user_name: order.profiles?.full_name || null,
      service_id: order.service_id,
      service_name: order.service_name,
      package_id: order.package_id,
      package_name: order.package_name,
      quantity: order.quantity,
      link: order.link,
      price: order.price,
      total_price: order.total_price,
      smmturk_order_id: order.smmturk_order_id,
      status: order.status,
      created_at: order.created_at,
      updated_at: order.updated_at,
    }))

    return NextResponse.json({ orders: adminOrders })
  } catch (error) {
    console.error('Admin orders error:', error)
    return NextResponse.json(
      { error: 'Siparişler yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
