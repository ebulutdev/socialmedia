'use client'

import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import { servicesData, Package } from '@/lib/servicesData'
import { ServiceLogo } from './ServiceLogos'
import { useCart } from '@/lib/context/CartContext'
import { useToast } from '@/lib/context/ToastContext'

// Her servisten en iyi paketleri seç
const getBestPackages = (serviceId: string): Package[] => {
  const service = servicesData.find((s) => s.id === serviceId)
  if (!service) return []

  const bestPackageIds: Record<string, string[]> = {
    instagram: ['9403', '9397', '9336', '9337', '9335'], // 30 Gün Garantili Takipçi, Beğeni, Video İzlenme, Hikaye İzlenme, Türk Repost
    facebook: ['9010', '2815', '1972', '3947', '8971'], // 30 Gün Garantili Takipçi, Beğeni, Canlı Yayın, Türk Beğeni, Beğeni+Takipçi
    youtube: ['9414', '8102', '7272', '9322', '3432'], // 30 Gün Garantili Abone, Gerçek İzlenme, Beğeni, Telafili Beğeni, İzlenme+Beğeni
    tiktok: ['9391', '9395', '9393', '9309', '9394'], // 30 Gün Garantili Takipçi, Beğeni, Video İzlenme, Hızlı Takipçi, Beğeni
    twitter: ['9342', '9293', '9344', '9263'], // 30 Gün Garantili Takipçi, Türk Görüntülenme, 90 Gün Garantili Takipçi, Latin Takipçi
  }

  const bestIds = bestPackageIds[serviceId] || []
  return service.packages.filter((pkg) => bestIds.includes(pkg.id)).slice(0, 5)
}

// Fiyatı formatla (1K için minimum miktardan hesapla)
const formatPrice = (pkg: Package): string => {
  if (pkg.min) {
    const pricePer1K = pkg.price.split('/')[0].trim()
    const numericPrice = parseFloat(pricePer1K.replace(/[^\d,]/g, '').replace(',', '.'))
    const minAmount = Math.min(pkg.min, 1000)
    const totalPrice = (numericPrice * minAmount) / 1000
    return totalPrice.toFixed(2).replace('.', ',') + '₺'
  }
  return pkg.price.split('/')[0].trim()
}

// En düşük fiyatı hesapla
const getLowestPrice = (packages: Package[]): string => {
  if (packages.length === 0) return '0,00₺'
  
  const prices = packages.map((pkg) => {
    if (pkg.min) {
      const pricePer1K = pkg.price.split('/')[0].trim()
      const numericPrice = parseFloat(pricePer1K.replace(/[^\d,]/g, '').replace(',', '.'))
      const minAmount = Math.min(pkg.min, 1000)
      const totalPrice = (numericPrice * minAmount) / 1000
      return totalPrice
    }
    const numericPrice = parseFloat(pkg.price.split('/')[0].trim().replace(/[^\d,]/g, '').replace(',', '.'))
    return numericPrice || 0
  })
  
  const lowestPrice = Math.min(...prices)
  return lowestPrice.toFixed(2).replace('.', ',') + '₺'
}

const services = [
  { id: 'instagram', name: 'Instagram' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'youtube', name: 'YouTube' },
  { id: 'tiktok', name: 'TikTok' },
  { id: 'twitter', name: 'Twitter (X)' },
]

export default function PopularProducts() {
  const router = useRouter()
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const getProductsByService = (serviceId: string) => {
    return getBestPackages(serviceId)
  }

  const handleServiceClick = (serviceId: string) => {
    router.push(`/services/${serviceId}`)
  }

  const handleAddToCart = (e: React.MouseEvent, product: Package, serviceId: string, serviceName: string) => {
    e.stopPropagation()
    
    // Minimum miktarı kullan
    const minAmount = product.min || 100
    const pricePer1K = product.price.split('/')[0].trim()
    const numericPrice = parseFloat(pricePer1K.replace(/[^\d,]/g, '').replace(',', '.'))
    const totalPrice = (numericPrice * minAmount) / 1000
    const formattedPrice = totalPrice.toFixed(2).replace('.', ',') + '₺'

    addToCart({
      id: `${product.id}-${minAmount}-${Date.now()}`,
      packageId: product.id,
      packageName: product.name,
      serviceId: serviceId,
      serviceName: serviceName,
      amount: minAmount,
      price: formattedPrice,
      totalPrice: totalPrice,
    })
    
    showToast(
      `${product.name} - ${minAmount.toLocaleString('tr-TR')} adet sepete eklendi!`,
      'success'
    )
  }

  return (
    <section className="bg-dark-bg py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
          <span className="text-primary-green">#Keşfet</span>{' '}
          <span className="text-white">BU AYIN ENLERİ</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {services.map((service) => {
            const serviceProducts = getProductsByService(service.id)
            if (serviceProducts.length === 0) return null

            return (
              <div key={service.id} className="bg-dark-card rounded-xl p-3 sm:p-4">
                <div 
                  onClick={() => handleServiceClick(service.id)}
                  className="flex items-center gap-2 mb-3 cursor-pointer hover:opacity-80 transition group relative z-10 min-h-[44px] touch-manipulation"
                >
                  <div className="w-1 h-6 bg-primary-green rounded"></div>
                  <div className="flex items-center gap-1.5 flex-1">
                    <ServiceLogo serviceId={service.id} className="w-4 h-4 sm:w-5 sm:h-5 text-primary-green group-hover:scale-110 transition-transform" />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-400 text-[9px] sm:text-[10px]">En Çok Satan</p>
                      <h3 className="text-white font-bold text-xs sm:text-sm group-hover:text-primary-green transition-colors">{service.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {serviceProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/services/${service.id}`)
                      }}
                      className="flex items-center justify-between gap-2 p-2 sm:p-2.5 active:bg-dark-card-light sm:hover:bg-dark-card-light rounded-lg transition cursor-pointer border border-transparent active:border-primary-green/30 active:scale-[0.98] touch-manipulation min-h-[60px]"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          e.stopPropagation()
                          router.push(`/services/${service.id}`)
                        }
                      }}
                    >
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-green/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ServiceLogo serviceId={service.id} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-green" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-xs sm:text-sm leading-tight line-clamp-2">
                            {product.name}
                          </p>
                        </div>
                      </div>
                      <button 
                        className="bg-primary-green p-2 sm:p-1.5 rounded-lg active:bg-primary-green-dark sm:hover:bg-primary-green-dark transition flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
                        onClick={(e) => handleAddToCart(e, product, service.id, service.name)}
                        title="Sepete Ekle"
                      >
                        <ShoppingCart className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
