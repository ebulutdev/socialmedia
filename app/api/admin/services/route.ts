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
// Mevcut kayıtları korur, sadece yeni kayıtları ekler
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

    // servicesData.ts'den tüm hizmetleri al
    const servicePricesToInsert: Omit<ServicePrice, 'id' | 'created_at' | 'updated_at'>[] = []

    servicesData.forEach(service => {
      service.packages.forEach(pkg => {
        // Fiyatı parse et (örn: "100₺ / 1K" -> 100, "1.885₺ / 1K" -> 1885)
        let pricePer1K = 0
        
        // Fiyat string'inden sayısal değeri çıkar
        const priceStr = pkg.price.replace(/[^\d,.]/g, '').replace(',', '.')
        pricePer1K = parseFloat(priceStr) || 0

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

    console.log(`Total services from servicesData.ts: ${servicePricesToInsert.length}`)
    console.log(`Twitch services count: ${servicePricesToInsert.filter(s => s.service_id === 'twitch').length}`)

    // Mevcut kayıtları kontrol et (kullanıcının değiştirdiği fiyatları korumak için)
    const { data: existingPrices, error: fetchError } = await supabase
      .from('service_prices')
      .select('service_id, package_id')

    if (fetchError) {
      console.warn('Fetch existing prices error:', fetchError)
    }

    // Mevcut kayıtların bir set'ini oluştur (service_id + package_id kombinasyonu)
    const existingKeys = new Set<string>()
    existingPrices?.forEach((price: any) => {
      existingKeys.add(`${price.service_id}_${price.package_id}`)
    })

    // Sadece yeni kayıtları filtrele (mevcut olanları atla - kullanıcının değişikliklerini koru)
    const newServicesToInsert = servicePricesToInsert.filter(service => {
      const key = `${service.service_id}_${service.package_id}`
      return !existingKeys.has(key)
    })

    console.log(`Existing services in DB: ${existingKeys.size}`)
    console.log(`New services to insert: ${newServicesToInsert.length}`)

    let insertedCount = 0

    // Yeni kayıtları ekle (eğer varsa)
    if (newServicesToInsert.length > 0) {
      const { data, error: insertError } = await supabase
        .from('service_prices')
        .insert(newServicesToInsert)
        .select()

      if (insertError) {
        throw insertError
      }

      insertedCount = data?.length || 0
    }

    return NextResponse.json({ 
      message: newServicesToInsert.length > 0 
        ? `${insertedCount} yeni hizmet fiyatı eklendi. Mevcut ${existingKeys.size} kayıt korundu (değiştirdiğiniz fiyatlar kaybolmadı).`
        : `Tüm hizmetler zaten yüklü. Mevcut ${existingKeys.size} kayıt korundu (değiştirdiğiniz fiyatlar kaybolmadı).`,
      count: insertedCount,
      existingCount: existingKeys.size,
      totalCount: existingKeys.size + insertedCount
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
