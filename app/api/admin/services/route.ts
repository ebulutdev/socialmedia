import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/utils/admin'
import { servicesData } from '@/lib/servicesData'

export interface ServicePrice {
  id: string
  service_id: string
  service_name: string
  package_id: string
  package_name: string
  price_per_1k: number
  category: 'follower' | 'like' | 'view' | 'engagement' | 'other'
  created_at?: string
  updated_at?: string
}

// GET: Tüm hizmet fiyatlarını kategorilere göre getir
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

    if (!isAdminEmail(user.email)) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 403 }
      )
    }

    const { data: servicePrices, error } = await supabase
      .from('service_prices')
      .select('*')
      .order('service_name', { ascending: true })
      .order('package_name', { ascending: true })

    if (error) {
      throw error
    }

    // Kategorilere göre grupla
    const groupedByCategory: Record<string, ServicePrice[]> = {
      follower: [],
      like: [],
      view: [],
      engagement: [],
      other: []
    }

    servicePrices?.forEach((price: any) => {
      const category = price.category || 'other'
      if (groupedByCategory[category]) {
        groupedByCategory[category].push(price)
      }
    })

    return NextResponse.json({ 
      services: servicePrices || [],
      groupedByCategory 
    })
  } catch (error) {
    console.error('Admin services error:', error)
    return NextResponse.json(
      { error: 'Hizmetler yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// POST: Hizmet fiyatlarını yükle (servicesData.ts'den)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Giriş yapmanız gerekiyor' },
        { status: 401 }
      )
    }

    if (!isAdminEmail(user.email)) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 403 }
      )
    }

    // servicesData.ts'den tüm hizmetleri al ve veritabanına kaydet
    const servicePricesToInsert: Omit<ServicePrice, 'id' | 'created_at' | 'updated_at'>[] = []

    servicesData.forEach(service => {
      service.packages.forEach(pkg => {
        // Fiyatı parse et (örn: "100₺ / 1K" -> 100, "1.885₺ / 1K" -> 1885)
        let pricePer1K = 0
        
        // Fiyat string'inden sayısal değeri çıkar
        const priceStr = pkg.price.replace(/[^\d,.]/g, '').replace(',', '.')
        pricePer1K = parseFloat(priceStr) || 0

        // Debug: Twitch hizmetlerini logla
        if (service.id === 'twitch') {
          console.log('Twitch service found:', {
            service_id: service.id,
            service_name: service.name,
            package_id: pkg.id,
            package_name: pkg.name,
            price: pkg.price,
            parsed_price: pricePer1K,
            category: pkg.category
          })
        }

        servicePricesToInsert.push({
          service_id: service.id,
          service_name: service.name,
          package_id: pkg.id,
          package_name: pkg.name,
          price_per_1k: pricePer1K,
          category: pkg.category || 'other'
        })
      })
    })

    console.log(`Total services to insert: ${servicePricesToInsert.length}`)
    console.log(`Twitch services count: ${servicePricesToInsert.filter(s => s.service_id === 'twitch').length}`)

    // Önce mevcut kayıtları sil (yeniden yükleme için)
    // Tüm kayıtları silmek için boş bir WHERE koşulu kullanıyoruz
    const { error: deleteError } = await supabase
      .from('service_prices')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Tüm kayıtları sil (id hiçbir zaman bu değer olmayacak)

    if (deleteError) {
      console.warn('Delete error (might be expected if table is empty):', deleteError)
      // Hata olsa bile devam et, çünkü tablo boş olabilir
    }

    // Yeni kayıtları ekle
    const { data, error: insertError } = await supabase
      .from('service_prices')
      .insert(servicePricesToInsert)
      .select()

    if (insertError) {
      throw insertError
    }

    return NextResponse.json({ 
      message: 'Hizmet fiyatları başarıyla yüklendi',
      count: data?.length || 0
    })
  } catch (error) {
    console.error('Admin services POST error:', error)
    return NextResponse.json(
      { error: 'Hizmet fiyatları yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

// PATCH: Tek bir hizmet fiyatını güncelle
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Giriş yapmanız gerekiyor' },
        { status: 401 }
      )
    }

    if (!isAdminEmail(user.email)) {
      return NextResponse.json(
        { error: 'Yetkisiz erişim' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { id, price_per_1k } = body

    if (!id || price_per_1k === undefined || price_per_1k === null) {
      return NextResponse.json(
        { error: 'id ve price_per_1k gereklidir' },
        { status: 400 }
      )
    }

    if (typeof price_per_1k !== 'number' || price_per_1k < 0) {
      return NextResponse.json(
        { error: 'price_per_1k geçerli bir pozitif sayı olmalıdır' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('service_prices')
      .update({ price_per_1k })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ 
      message: 'Fiyat başarıyla güncellendi',
      service: data
    })
  } catch (error) {
    console.error('Admin services PATCH error:', error)
    return NextResponse.json(
      { error: 'Fiyat güncellenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}
