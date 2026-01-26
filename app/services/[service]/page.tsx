'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Check, Gift, Zap, Users, Lock, CreditCard, Headphones, ArrowLeft, ShoppingCart, BadgePercent, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Header from '@/components/Header'
import FloatingCartButton from '@/components/FloatingCartButton'
import { servicesData, calculatePackagePrice, Package } from '@/lib/servicesData'
import { ServiceLogo } from '@/components/ServiceLogos'
import { useCart } from '@/lib/context/CartContext'
import { useToast } from '@/lib/context/ToastContext'
import UrlInputModal from '@/components/UrlInputModal'

// Paket Detay Bileşeni - Seçilen paketin miktar ve fiyat seçeneklerini gösterir
function PackageDetail({
  pkg,
  onBack,
  serviceId,
  serviceName,
}: {
  pkg: Package
  onBack: () => void
  serviceId: string
  serviceName: string
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showUrlModal, setShowUrlModal] = useState(false)
  const [pendingCartItem, setPendingCartItem] = useState<{
    selectedAmount: number
    selectedPrice: string
    totalPrice: number
  } | null>(null)
  const { addToCart } = useCart()
  const { showToast } = useToast()

  // Paket miktarlarını oluştur
  const generatePackageOptions = (pkg: Package) => {
    const { min = 100, max = 1000000 } = pkg
    const priceStr = pkg.price.split('/')[0].trim()
    const numericPrice = parseFloat(priceStr.replace(/[^\d,]/g, '').replace(',', '.'))
    const isFixedPrice = min === max && !pkg.price.includes('/')
    const maxAmount = Math.min(max, max > 10000 ? 50000 : 10000)

    // Sabit miktarlı paketler (etkileşim, canlı yayın vb.): tek seçenek, fiyat aynen
    if (isFixedPrice) {
      return [{ amount: min, price: numericPrice.toString() + '₺' }]
    }

    const amounts: number[] = []
    if (min <= 20) amounts.push(20)
    if (min <= 50) amounts.push(50)
    if (min <= 100) amounts.push(100)
    if (min <= 250) amounts.push(250)
    if (min <= 500) amounts.push(500)
    if (min <= 750) amounts.push(750)
    if (min <= 1000) amounts.push(1000)
    if (min <= 2500 && maxAmount >= 2500) amounts.push(2500)
    if (min <= 5000 && maxAmount >= 5000) amounts.push(5000)
    if (min <= 7500 && maxAmount >= 7500) amounts.push(7500)
    if (min <= 10000 && maxAmount >= 10000) amounts.push(10000)
    if (min <= 25000 && maxAmount >= 25000) amounts.push(25000)
    if (min <= 50000 && maxAmount >= 50000) amounts.push(50000)

    return amounts
      .filter((a) => a >= min && a <= maxAmount)
      .map((amount) => {
        const totalPrice = (numericPrice * amount) / 1000
        return {
          amount,
          price: Math.round(totalPrice).toString() + '₺',
        }
      })
  }

  const packageOptions = generatePackageOptions(pkg)
  const defaultSelected = packageOptions[0]?.amount.toString() || null
  const currentSelected = selectedOption || defaultSelected

  return (
    <div className="bg-dark-card rounded-xl p-3 sm:p-4 w-full overflow-hidden">
      {/* Geri Butonu */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-primary-green mb-3 sm:mb-4 transition text-xs sm:text-sm min-h-[44px] touch-manipulation"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Geri Dön</span>
      </button>

      {/* Paket Başlığı */}
      <h3 className="text-white font-semibold mb-2 sm:mb-3 text-base sm:text-lg leading-tight break-words">{pkg.name}</h3>
      {pkg.avgTime && (
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <span className="text-gray-400 text-xs sm:text-sm">⏱️ {pkg.avgTime}</span>
        </div>
      )}

      {/* Özellikler */}
      {pkg.features && pkg.features.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
          {pkg.features.map((feature, idx) => (
            <span
              key={idx}
              className="text-xs sm:text-sm bg-primary-green/20 text-primary-green px-2 sm:px-2.5 py-1 sm:py-1.5 rounded"
            >
              {feature}
            </span>
          ))}
        </div>
      )}

      {/* Paket Seçimi Başlığı */}
      <div className="mb-2 sm:mb-3">
        <span className="text-primary-green font-semibold text-xs sm:text-sm">Paket Seç</span>
        <span className="text-gray-400 text-[10px] sm:text-xs ml-2 block sm:inline mt-1 sm:mt-0">
          Satın almak istediğiniz miktarı seçiniz.
        </span>
      </div>

      {/* Miktar Seçenekleri Grid - 3 sütun - Mobile Optimized */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5 w-full max-w-full">
        {(() => {
          // En yüksek fiyatlı seçeneği bul (kampanya için)
          const campaignOption = packageOptions.reduce((max, opt) => {
            const maxPrice = parseFloat(max.price.replace(/[^\d,]/g, '').replace(',', '.'))
            const optPrice = parseFloat(opt.price.replace(/[^\d,]/g, '').replace(',', '.'))
            return optPrice > maxPrice ? opt : max
          }, packageOptions[0])
          
          return packageOptions.slice(0, 15).map((option) => {
            const isSelected = currentSelected === option.amount.toString()
            const currentPrice = parseFloat(option.price.replace(/[^\d,]/g, '').replace(',', '.'))
            // 200₺ ve altındaki ürünlerde kampanya gösterilmez
            const isCampaign = option.amount === campaignOption.amount && currentPrice > 200
            const oldPrice = isCampaign ? Math.round(currentPrice / 0.65) : 0
            
            const savings = isCampaign ? oldPrice - currentPrice : 0
            
            return (
              <button
                key={option.amount}
                onClick={() => setSelectedOption(option.amount.toString())}
                className={`p-2.5 sm:p-3 rounded-lg border-2 transition-all duration-300 text-center touch-manipulation min-h-[70px] sm:min-h-[80px] w-full relative overflow-hidden ${
                  isSelected
                    ? 'border-primary-green bg-primary-green/10 shadow-lg shadow-primary-green/20'
                    : isCampaign
                    ? 'border-red-500/60 bg-gradient-to-br from-red-500/15 via-orange-500/10 to-dark-bg shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(239,68,68,0.6)] ring-2 ring-red-500/30 ring-offset-0'
                    : 'border-dark-card-light bg-dark-bg active:border-primary-green/50'
                }`}
              >
                {/* Üst kampanya şeridi */}
                {isCampaign && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white py-1 px-2 flex items-center justify-center gap-1.5 z-20">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span className="text-[9px] sm:text-[10px] font-black tracking-wide">KAMPANYA · %35 İNDİRİM</span>
                    <Sparkles className="w-3 h-3 animate-pulse" />
                  </div>
                )}
                
                {/* Köşe rozeti (ribbon) */}
                {isCampaign && (
                  <div className="absolute -top-1 -right-1 z-30 w-16 h-16 overflow-hidden">
                    <div className="absolute top-3 right-3 w-20 bg-gradient-to-br from-red-500 to-orange-500 text-white text-[9px] font-black py-0.5 px-2 shadow-lg transform rotate-45 translate-x-6 -translate-y-2">
                      %35
                    </div>
                  </div>
                )}
                
                <div className={`${isCampaign ? 'mt-6' : ''}`}>
                  <p className="text-white font-semibold text-xs sm:text-sm mb-1 break-words">
                    {option.amount.toLocaleString('tr-TR')}
                  </p>
                  <div
                    className={`rounded-lg p-1.5 sm:p-2 mb-1 ${
                      isSelected ? 'bg-primary-green' : isCampaign ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20' : 'bg-dark-card-light'
                    }`}
                  >
                    {isCampaign ? (
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <span className="text-white text-[11px] sm:text-xs font-bold">{option.amount.toLocaleString('tr-TR')} Kişi</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-gray-400 text-[10px] sm:text-xs line-through font-semibold">{oldPrice.toLocaleString('tr-TR')}₺</span>
                          <span className="text-gray-500 text-[8px]">Eski Fiyat</span>
                        </div>
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-400 font-black text-sm sm:text-base animate-pulse leading-tight">
                          {option.price}
                        </p>
                        <div className="flex items-center justify-center gap-1 mt-0.5">
                          <span className="text-primary-green text-[9px] sm:text-[10px] font-bold">💚 {savings.toLocaleString('tr-TR')}₺ TASARRUF</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-white font-bold text-[10px] sm:text-xs break-words">{option.price}</p>
                    )}
                  </div>
                </div>
                {isSelected && (
                  <div className="flex justify-center mt-1">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary-green" />
                  </div>
                )}
              </button>
            )
          })
        })()}
      </div>

      {/* Sepete Ekle Butonu */}
      {currentSelected && (
        <button
          onClick={() => {
            const selectedAmount = parseInt(currentSelected)
            const selectedPrice = packageOptions.find(
              (opt) => opt.amount.toString() === currentSelected
            )
            if (selectedPrice) {
              const priceStr = pkg.price.split('/')[0].trim()
              const numericPrice = parseFloat(
                priceStr.replace(/[^\d,]/g, '').replace(',', '.')
              )
              const isFixedPrice = pkg.min === pkg.max && !pkg.price.includes('/')
              const totalPrice = isFixedPrice
                ? numericPrice
                : (numericPrice * selectedAmount) / 1000

              // URL modal'ını aç
              setPendingCartItem({
                selectedAmount,
                selectedPrice: selectedPrice.price,
                totalPrice,
              })
              setShowUrlModal(true)
            }
          }}
          className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-primary-green to-primary-green-dark text-white py-3 sm:py-3.5 px-4 rounded-lg hover:from-primary-green-dark hover:to-primary-green transition-all shadow-lg shadow-primary-green/20 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 min-h-[44px] touch-manipulation max-w-full"
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="truncate">Sepete Ekle</span>
        </button>
      )}

      {/* URL Input Modal */}
      <UrlInputModal
        isOpen={showUrlModal}
        onClose={() => {
          setShowUrlModal(false)
          setPendingCartItem(null)
        }}
        onConfirm={(url) => {
          if (pendingCartItem) {
            addToCart({
              id: `${pkg.id}-${pendingCartItem.selectedAmount}-${Date.now()}`,
              packageId: pkg.id,
              packageName: pkg.name,
              serviceId: serviceId,
              serviceName: serviceName,
              amount: pendingCartItem.selectedAmount,
              price: pendingCartItem.selectedPrice,
              totalPrice: pendingCartItem.totalPrice,
              url: url,
            })
            
            showToast(
              `${pkg.name} - ${pendingCartItem.selectedAmount.toLocaleString('tr-TR')} adet sepete eklendi!`,
              'success'
            )
          }
          setShowUrlModal(false)
          setPendingCartItem(null)
        }}
        packageName={pkg.name}
        serviceName={serviceName}
      />
    </div>
  )
}

export default function ServicePage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const serviceId = params.service as string
  const [selectedCategory, setSelectedCategory] = useState<string>('follower')
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null)
  const { addToCart } = useCart()

  const service = servicesData.find((s) => s.id === serviceId)

  // URL parametresinden paket ID'sini al ve otomatik seç
  useEffect(() => {
    const packageParam = searchParams.get('package')
    if (packageParam && service) {
      // Paketin bu hizmette olup olmadığını kontrol et
      const packageExists = service.packages.find((pkg) => pkg.id === packageParam)
      if (packageExists) {
        setSelectedPackageId(packageParam)
        // Paketin kategorisini bul ve seç
        if (packageExists.category) {
          setSelectedCategory(packageExists.category)
        }
      }
    }
  }, [searchParams, service])

  // Her hizmet için farklı random sepet sayısı (serviceId'ye göre deterministik)
  const getCartCount = (serviceId: string): number => {
    // serviceId'den bir hash değeri oluştur
    let hash = 0
    for (let i = 0; i < serviceId.length; i++) {
      const char = serviceId.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    // 50-350 arası random sayı (her hizmet için farklı ama sabit)
    const min = 50
    const max = 350
    return min + (Math.abs(hash) % (max - min + 1))
  }

  const cartCount = getCartCount(serviceId)

  // Rastgele resimler ve kullanıcı adları
  const exampleUserImages = [
    '/images/Ekran Resmi 2026-01-22 01.38.46.png',
    '/images/Ekran Resmi 2026-01-22 01.40.05.png',
    '/images/Ekran Resmi 2026-01-22 01.40.47.png',
    '/images/Ekran Resmi 2026-01-22 01.41.26.png',
    '/images/Ekran Resmi 2026-01-22 01.42.13.png',
    '/images/Ekran Resmi 2026-01-22 01.43.46.png',
    '/images/Ekran Resmi 2026-01-22 01.44.34.png',
    '/images/Ekran Resmi 2026-01-22 01.46.02.png',
  ]

  // Her hizmet için farklı kullanıcı adları
  const getServiceUsernames = (serviceId: string) => {
    const usernameSets: Record<string, string[]> = {
      instagram: [
        'ahmet_instagram',
        'zeynep_photo',
        'mehmet_insta',
        'ayse_selfie',
        'can_gram',
        'elif_insta',
        'burak_photo',
        'seda_instagram',
        'emre_insta',
        'deniz_photo',
        'berkay_gram',
        'melis_insta',
      ],
      facebook: [
        'ahmet_facebook',
        'zeynep_fb',
        'mehmet_facebook',
        'ayse_fb',
        'can_facebook',
        'elif_fb',
        'burak_facebook',
        'seda_fb',
        'emre_facebook',
        'deniz_fb',
        'berkay_facebook',
        'melis_fb',
      ],
      youtube: [
        'ahmet_youtube',
        'zeynep_yt',
        'mehmet_youtube',
        'ayse_yt',
        'can_youtube',
        'elif_yt',
        'burak_youtube',
        'seda_yt',
        'emre_youtube',
        'deniz_yt',
        'berkay_youtube',
        'melis_yt',
      ],
      tiktok: [
        'ahmet_tiktok',
        'zeynep_tiktok',
        'mehmet_tiktok',
        'ayse_tiktok',
        'can_tiktok',
        'elif_tiktok',
        'burak_tiktok',
        'seda_tiktok',
        'emre_tiktok',
        'deniz_tiktok',
        'berkay_tiktok',
        'melis_tiktok',
      ],
      twitter: [
        'ahmet_twitter',
        'zeynep_tw',
        'mehmet_twitter',
        'ayse_tw',
        'can_twitter',
        'elif_tw',
        'burak_twitter',
        'seda_tw',
        'emre_twitter',
        'deniz_tw',
        'berkay_twitter',
        'melis_tw',
      ],
    }

    return usernameSets[serviceId] || [
      'ahmet_yilmaz',
      'zeynep_kaya',
      'mehmet_demir',
      'ayse_ozturk',
      'can_avci',
      'elif_sahin',
      'burak_koc',
      'seda_yildiz',
      'emre_arslan',
      'deniz_aksoy',
      'berkay_celik',
      'melis_karaca',
    ]
  }

  // Her render'da rastgele seçim (hizmete özel)
  const getRandomUsers = () => {
    const shuffledImages = [...exampleUserImages].sort(() => Math.random() - 0.5)
    const serviceUsernames = getServiceUsernames(serviceId)
    const shuffledUsernames = [...serviceUsernames].sort(() => Math.random() - 0.5)
    
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      image: shuffledImages[i % shuffledImages.length],
      username: shuffledUsernames[i % shuffledUsernames.length],
    }))
  }

  const [exampleUsers, setExampleUsers] = useState<Array<{ id: number; image: string; username: string }>>([])

  // Sadece istemci tarafında rastgele kullanıcıları oluştur (hydration hatasını önlemek için)
  useEffect(() => {
    setExampleUsers(getRandomUsers())
  }, [serviceId])

  if (!service) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-4">Hizmet Bulunamadı</h1>
          <Link href="/" className="text-primary-green hover:underline text-sm sm:text-base min-h-[44px] inline-flex items-center justify-center">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    )
  }

  // Kategorilere göre paketleri filtrele
  const filteredPackages = service.packages.filter((pkg) => pkg.category === selectedCategory)

  // Seçili paketi bul
  const selectedPackage = selectedPackageId
    ? service.packages.find((pkg) => pkg.id === selectedPackageId)
    : null

  const features = [
    { icon: Gift, text: 'Hediye +5 Adet' },
    { icon: Zap, text: 'Başlama Anında' },
    { icon: Users, text: 'Karışık Kullanıcılar' },
    { icon: Lock, text: 'Şifre Gerekmez' },
    { icon: CreditCard, text: '3D Güvenli Ödeme' },
    { icon: Headphones, text: '7/24 Aktif Destek' },
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <FloatingCartButton />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 w-full overflow-x-hidden">
        {/* Breadcrumbs - Mobile Optimized */}
        <div className="flex items-center gap-2 mb-3 sm:mb-4 overflow-x-auto scrollbar-hide">
          <Link href="/" className="text-gray-400 hover:text-primary-green text-xs sm:text-sm whitespace-nowrap min-h-[44px] flex items-center">
            Ana Sayfa
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-white text-xs sm:text-sm whitespace-nowrap">{service.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 w-full">
          {/* Left Column - Service Details (3 columns) - Mobile Full Width */}
          <div className="md:col-span-3 space-y-3">
            {/* Küçük kutu: tek tam boyutlu resim + hizmet logosu overlay */}
            <div className="rounded-xl overflow-hidden border border-dark-card-light bg-dark-card shrink-0 w-full max-w-[180px] sm:max-w-[200px]">
              <div className="relative aspect-square w-full">
                <Image
                  src="/images/Ekran Resmi 2026-01-22 01.38.46.png"
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 180px, 200px"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/90 flex items-center justify-center shadow-lg ring-2 ring-white/50">
                    <ServiceLogo serviceId={serviceId} className="w-8 h-8 sm:w-9 sm:h-9 text-gray-900" />
                  </div>
                </div>
              </div>
              <div className="px-2.5 py-2 text-center border-t border-dark-card-light">
                <h3 className="text-white font-bold text-sm sm:text-base truncate">{service.name}</h3>
              </div>
            </div>

            {/* Service Description - sadeleştirilmiş */}
            <div className="bg-dark-card rounded-xl p-3 sm:p-4">
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-4 sm:line-clamp-none">{service.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-primary-green text-base">⭐</span>
                <span className="text-gray-300 text-xs">37 Değerlendirme</span>
                <span className="text-primary-green font-bold text-xs">5 Puan</span>
              </div>
            </div>
          </div>

          {/* Center Column - Package Selection (6 columns) - Mobile Full Width */}
          <div className="md:col-span-6">
            <h2 className="text-lg sm:text-xl font-bold text-primary-green mb-2 sm:mb-3">
              {service.name} Hizmetleri
            </h2>

            {/* Eğer paket seçilmediyse kategori seçimini göster */}
            {!selectedPackageId && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                  <span className="text-primary-green font-semibold text-xs sm:text-sm">Kategori Seç</span>
                  <span className="text-gray-400 text-[10px] sm:text-xs">
                    Bir kategori seçin ve paketleri görüntüleyin.
                  </span>
                </div>

                {/* Category Tabs - Mobile Optimized */}
                <div className="flex gap-2 sm:gap-1.5 mb-3 sm:mb-4 overflow-x-auto pb-2 scrollbar-hide -mx-3 sm:-mx-0 px-3 sm:px-0">
                  {[
                    { id: 'follower', label: 'Takipçi' },
                    { id: 'like', label: 'Beğeni' },
                    { id: 'view', label: 'İzlenme' },
                    { id: 'engagement', label: 'Etkileşim' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setSelectedCategory(tab.id)
                        setSelectedPackageId(null) // Kategori değişince paket seçimini sıfırla
                      }}
                      className={`px-4 sm:px-3 py-2.5 sm:py-1.5 rounded-lg whitespace-nowrap transition text-xs sm:text-sm min-h-[44px] touch-manipulation ${
                        selectedCategory === tab.id
                          ? 'bg-primary-green text-white'
                          : 'bg-dark-card text-gray-300 active:bg-dark-card-light'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Paketler Grid - Mobile Single Column */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredPackages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className="bg-dark-card rounded-xl p-3 sm:p-4 active:bg-dark-card-light sm:hover:bg-dark-card-light transition border-2 border-dark-card-light active:border-primary-green sm:hover:border-primary-green group text-left min-h-[120px] sm:min-h-[140px] touch-manipulation"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-green/20 rounded-lg flex items-center justify-center mb-2 sm:mb-3 group-active:bg-primary-green/30 sm:group-hover:bg-primary-green/30 transition">
                        <ServiceLogo serviceId={serviceId} className="w-5 h-5 sm:w-6 sm:h-6 text-primary-green" />
                      </div>
                      <h3 className="text-white font-semibold text-xs sm:text-sm mb-1 line-clamp-2 group-active:text-primary-green sm:group-hover:text-primary-green transition">
                        {pkg.name}
                      </h3>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Eğer paket seçildiyse paket detaylarını göster */}
            {selectedPackageId && selectedPackage && (
              <PackageDetail
                pkg={selectedPackage}
                onBack={() => setSelectedPackageId(null)}
                serviceId={serviceId}
                serviceName={service.name}
              />
            )}
          </div>

          {/* Right Column - Cart & Features (3 columns) - Mobile Full Width */}
          <div className="md:col-span-3 space-y-3 w-full overflow-x-hidden">
            {/* Shopping Cart Indicator */}
            <div className="bg-primary-green rounded-xl p-3 sm:p-4 w-full overflow-hidden">
              <div className="flex items-center gap-2 w-full">
                <span className="text-lg sm:text-xl flex-shrink-0">🛒</span>
                <span className="text-white font-semibold text-xs sm:text-sm break-words">{cartCount} Kişinin Sepetinde</span>
              </div>
            </div>

            {/* Example Users */}
            <div className="bg-dark-card rounded-xl p-3 sm:p-4 w-full overflow-hidden">
              <h4 className="text-white font-semibold mb-2 text-xs sm:text-sm">ÖRNEK KULLANICILAR</h4>
              <div className="flex gap-2 sm:gap-3 flex-wrap overflow-x-auto scrollbar-hide -mx-3 sm:-mx-0 px-3 sm:px-0 w-full">
                {exampleUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex flex-col items-center flex-shrink-0 min-w-0"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-primary-green/30 sm:hover:border-primary-green transition-all flex-shrink-0">
                      <Image
                        src={user.image}
                        alt={user.username}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-gray-400 text-[10px] sm:text-xs mt-1 truncate max-w-[56px] sm:max-w-[64px] text-center" title={`@${user.username}`}>
                      @{user.username}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-1.5 sm:space-y-2 w-full">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="bg-dark-card rounded-lg p-2.5 sm:p-3 flex items-center gap-2.5 min-h-[60px] sm:min-h-[70px] w-full"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-green" />
                    </div>
                    <span className="text-white text-xs sm:text-sm break-words">{feature.text}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
