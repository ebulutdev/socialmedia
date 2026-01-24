'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ShoppingCart, Check, ArrowLeft } from 'lucide-react'
import { ServiceLogo } from './ServiceLogos'
import { useCart } from '@/lib/context/CartContext'
import { useToast } from '@/lib/context/ToastContext'
import UrlInputModal from './UrlInputModal'

interface Package {
  id: string
  name: string
  amount: string
  price: string
  serviceId?: string
  min?: number
  max?: number
  avgTime?: string
  features?: string[]
  category?: string
}

interface Service {
  id: string
  name: string
  packages: Package[]
}

// SMM Turk API'den seçilen en iyi hizmetler
const servicesData: Service[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    packages: [
      {
        id: '9403',
        name: 'Instagram Takipçi [ 30 Gün Garantili ]',
        amount: '100 - 1.000.000 Takipçi',
        price: '533₺ / 1K',
        serviceId: '9403',
        min: 100,
        max: 1000000,
        avgTime: '55 dakika',
        features: ['30 Gün Garantili ♻️', 'Hızlı Başlangıç', 'Telafi Butonu Aktif', '%100 Eski Hesaplar'],
      },
      {
        id: '9397',
        name: 'Instagram Beğeni [ 30 Gün Garantili ]',
        amount: '50 - 1.000.000 Beğeni',
        price: '71₺ / 1K',
        serviceId: '9397',
        min: 50,
        max: 1000000,
        avgTime: '6 saat 7 dakika',
        features: ['30 Gün Garantili ♻️', '%100 Eski Hesaplar', 'Maksimum 100K'],
      },
      {
        id: '9336',
        name: 'Instagram Video İzlenme',
        amount: '100 - 2.000.000 İzlenme',
        price: '4₺ / 1K',
        serviceId: '9336',
        min: 100,
        max: 2000000,
        avgTime: '1 saat 46 dakika',
        features: ['Anlık Başlar', 'Erişim + Gösterim', 'Günlük 500K'],
      },
      {
        id: '9337',
        name: 'Instagram Hikaye İzlenme',
        amount: '50 - 30.000 İzlenme',
        price: '39₺ / 1K',
        serviceId: '9337',
        min: 50,
        max: 30000,
        avgTime: '6 saat 56 dakika',
        features: ['%100 Eski Hesaplar', 'Hızlı', 'Maksimum 30K'],
      },
      {
        id: '9335',
        name: 'Instagram Türk Repost',
        amount: '10 - 500 Repost',
        price: '38.084₺ / 1K',
        serviceId: '9335',
        min: 10,
        max: 500,
        avgTime: '12 saat 22 dakika',
        features: ['%100 Gerçek Türk 🇹🇷', 'Hızlı Başlar', 'Maksimum 500'],
      },
      {
        id: '9209',
        name: 'Instagram Premium Takipçi [ 99 Gün Garantili ]',
        amount: '100 - 1.000.000 Takipçi',
        price: '504₺ / 1K',
        serviceId: '9209',
        min: 100,
        max: 1000000,
        avgTime: '48 saat',
        features: ['99 Gün Telafili ♻️', 'Eski Hesaplar', 'Günlük Hız: 100K'],
      },
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    packages: [
      { id: '1', name: 'Sayfa Beğeni', amount: '100 Beğeni', price: '350₺' },
      { id: '2', name: 'Gönderi Beğeni', amount: '250 Beğeni', price: '790₺' },
      { id: '3', name: 'Yorum', amount: '50 Yorum', price: '1.490₺' },
      { id: '4', name: 'Paylaşım', amount: '100 Paylaşım', price: '1.990₺' },
      { id: '5', name: 'Video İzlenme', amount: '5.000 İzlenme', price: '890₺' },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    packages: [
      { id: '1', name: 'Abone', amount: '100 Abone', price: '1.990₺' },
      { id: '2', name: 'Video İzlenme', amount: '1.000 İzlenme', price: '290₺' },
      { id: '3', name: 'Beğeni', amount: '100 Beğeni', price: '390₺' },
      { id: '4', name: 'Yorum', amount: '10 Yorum', price: '590₺' },
      { id: '5', name: 'Watch Time', amount: '100 Saat', price: '1.490₺' },
    ],
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    packages: [
      { id: '1', name: 'Takipçi', amount: '100 Takipçi', price: '890₺' },
      { id: '2', name: 'Beğeni', amount: '500 Beğeni', price: '490₺' },
      { id: '3', name: 'İzlenme', amount: '1.000 İzlenme', price: '190₺' },
      { id: '4', name: 'Yorum', amount: '50 Yorum', price: '790₺' },
      { id: '5', name: 'Paylaşım', amount: '100 Paylaşım', price: '1.290₺' },
    ],
  },
  {
    id: 'twitter',
    name: 'Twitter (X)',
    packages: [
      { id: '1', name: 'Takipçi', amount: '100 Takipçi', price: '1.490₺' },
      { id: '2', name: 'Beğeni', amount: '250 Beğeni', price: '990₺' },
      { id: '3', name: 'Retweet', amount: '100 Retweet', price: '790₺' },
      { id: '4', name: 'Yorum', amount: '50 Yorum', price: '1.190₺' },
      { id: '5', name: 'İzlenme', amount: '1.000 İzlenme', price: '390₺' },
    ],
  },
]

interface PackageSystemProps {
  selectedService?: string | null
  onServiceChange?: (serviceId: string) => void
}

// Paket Detay Görünümü Bileşeni
function PackageDetailView({
  pkg,
  onBack,
  generatePackageOptions,
  serviceId,
  serviceName,
}: {
  pkg: Package
  onBack: () => void
  generatePackageOptions: (pkg: Package) => Array<{ amount: number; price: string }>
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

  const packageOptions = generatePackageOptions(pkg)
  const defaultSelected = packageOptions[0]?.amount.toString() || null
  const currentSelected = selectedOption || defaultSelected

  return (
    <div className="bg-dark-card rounded-xl p-3 sm:p-4">
      {/* Geri Butonu */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-primary-green mb-3 sm:mb-4 transition text-xs sm:text-sm min-h-[44px] touch-manipulation"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Geri Dön</span>
      </button>

      {/* Paket Başlığı */}
      <h3 className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base leading-tight">{pkg.name}</h3>
      {pkg.avgTime && (
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <span className="text-gray-400 text-xs sm:text-sm">⏱️ {pkg.avgTime}</span>
        </div>
      )}

      {/* Özellikler */}
      {pkg.features && pkg.features.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {pkg.features.map((feature, idx) => (
            <span
              key={idx}
              className="text-[10px] sm:text-xs bg-primary-green/20 text-primary-green px-2 py-1 sm:px-2.5 sm:py-1.5 rounded"
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

      {/* Miktar Seçenekleri Grid - 3 sütun, kompakt - Mobile Optimized */}
      <div className="grid grid-cols-3 gap-2 sm:gap-1.5">
        {packageOptions.slice(0, 15).map((option) => {
          const isSelected = currentSelected === option.amount.toString()
          return (
            <button
              key={option.amount}
              onClick={() => setSelectedOption(option.amount.toString())}
              className={`p-2 sm:p-2.5 rounded-lg border-2 transition text-center touch-manipulation min-h-[60px] sm:min-h-[70px] ${
                isSelected
                  ? 'border-primary-green bg-primary-green/10'
                  : 'border-dark-card-light bg-dark-bg active:border-primary-green/50'
              }`}
            >
              <p className="text-white font-semibold text-xs sm:text-sm mb-1">
                {option.amount.toLocaleString('tr-TR')}
              </p>
              <div
                className={`rounded p-1.5 sm:p-1 mb-1 ${
                  isSelected ? 'bg-primary-green' : 'bg-dark-card-light'
                }`}
              >
                <p className="text-white font-bold text-[10px] sm:text-xs leading-tight">{option.price}</p>
              </div>
              {isSelected && (
                <div className="flex justify-center mt-1">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary-green" />
                </div>
              )}
            </button>
          )
        })}
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
          className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-primary-green to-primary-green-dark text-white py-3 sm:py-3.5 px-4 rounded-lg hover:from-primary-green-dark hover:to-primary-green transition-all shadow-lg shadow-primary-green/20 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 min-h-[44px] touch-manipulation"
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          Sepete Ekle
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

export default function PackageSystem({ selectedService, onServiceChange }: PackageSystemProps) {
  const [internalSelectedService, setInternalSelectedService] = useState<string>('instagram')
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>('follower')
  const [showUrlModal, setShowUrlModal] = useState(false)
  const [pendingCartItem, setPendingCartItem] = useState<{
    pkg: Package
    minAmount: number
    formattedPrice: string
    totalPrice: number
  } | null>(null)
  const { addToCart } = useCart()
  const { showToast } = useToast()

  // Dışarıdan gelen selectedService varsa onu kullan, yoksa internal state'i kullan
  const currentSelectedService = selectedService || internalSelectedService

  const handleServiceChange = (serviceId: string) => {
    setInternalSelectedService(serviceId)
    if (onServiceChange) {
      onServiceChange(serviceId)
    }
  }

  // selectedService değiştiğinde internal state'i güncelle
  useEffect(() => {
    if (selectedService) {
      setInternalSelectedService(selectedService)
    }
  }, [selectedService])

  const currentService = servicesData.find((s) => s.id === currentSelectedService) || servicesData[0]

  // Instagram için en iyi paketleri seç
  const getBestPackages = () => {
    if (currentSelectedService === 'instagram') {
      // Her kategoriden en iyi paketleri seç
      const bestPackages = {
        follower: ['9403'], // 30 Gün Garantili
        like: ['9397'], // 30 Gün Garantili Beğeni
        view: ['9336', '9337'], // Video ve Hikaye İzlenme
        engagement: ['9335'], // Türk Repost
      }
      
      if (activeTab in bestPackages) {
        return currentService.packages.filter((pkg) => 
          bestPackages[activeTab as keyof typeof bestPackages].includes(pkg.id)
        )
      }
    }
    
    // Diğer servisler için normal filtreleme
    return currentService.packages.filter((pkg) => {
      if (activeTab === 'follower') return pkg.category === 'follower'
      if (activeTab === 'like') return pkg.category === 'like'
      if (activeTab === 'view') return pkg.category === 'view'
      if (activeTab === 'engagement') return pkg.category === 'engagement'
      return false
    })
  }

  const filteredPackages = getBestPackages()

  // Seçili paketi bul
  const selectedPackageData = selectedPackage
    ? currentService.packages.find((pkg) => pkg.id === selectedPackage)
    : null

  // Paket miktarlarını oluştur
  const generatePackageOptions = (pkg: Package) => {
    const { min = 100, max = 1000000 } = pkg
    const priceStr = pkg.price.split('/')[0].trim()
    const numericPrice = parseFloat(priceStr.replace(/[^\d,]/g, '').replace(',', '.'))
    const isFixedPrice = min === max && !pkg.price.includes('/')
    const maxAmount = Math.min(max, 10000)

    // Sabit miktarlı paketler (etkileşim, canlı yayın vb.): tek seçenek, fiyat aynen
    if (isFixedPrice) {
      return [{ amount: min, price: numericPrice.toString() + '₺' }]
    }

    const amounts: number[] = []
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

  return (
    <section id="package-system" className="bg-dark-bg py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Left Sidebar - Service Details - Mobile Hidden or Full Width */}
          <div className="md:col-span-1">
            <div className="bg-primary-green rounded-xl mb-3 relative overflow-hidden h-[150px] sm:h-[180px] md:h-[200px] flex flex-col items-center justify-center p-3 sm:p-4">
              {currentSelectedService === 'instagram' && (
                <Image
                  src="/images/Ekran Resmi 2026-01-22 15.28.42.png"
                  alt={currentService.name}
                  fill
                  className="object-cover opacity-70"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              )}
              <div className="absolute inset-0 bg-primary-green/40"></div>
              <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2 sm:mb-3 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <ServiceLogo serviceId={currentSelectedService} className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
              </div>
              <h3 className="relative z-10 text-base sm:text-lg md:text-xl font-bold text-white text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                {currentService.name.toUpperCase()}
              </h3>
            </div>
            <div className="bg-dark-card rounded-xl p-3 sm:p-4">
              <h4 className="text-primary-green text-base sm:text-lg font-bold mb-2 sm:mb-3">
                {currentService.name} Hizmetleri
              </h4>
              <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                {currentService.name}'da ihtiyaçlarınıza uygun paketlerle etkileşimi artırmaya ve
                hesabınızı geliştirmeye hazır mısınız?
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-sm sm:text-base">⭐</span>
                  <span className="text-xs sm:text-sm">Ort. Değerlendirme 5 Puan</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-sm sm:text-base">📚</span>
                  <span className="text-xs sm:text-sm">Kategori Sayısı {currentService.packages.length} Kategori</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Package List */}
          <div className="md:col-span-3">
            {/* Eğer paket seçilmediyse kategori seçimini ve paket listesini göster */}
            {!selectedPackage && (
              <>
                {/* Category Tabs - Mobile Optimized */}
                <div className="flex gap-2 sm:gap-1.5 mb-3 sm:mb-4 overflow-x-auto pb-2 scrollbar-hide -mx-3 sm:-mx-0 px-3 sm:px-0">
                  {['follower', 'like', 'view', 'engagement'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab)
                        setSelectedPackage(null) // Kategori değişince paket seçimini sıfırla
                      }}
                      className={`px-4 sm:px-3 py-2.5 sm:py-1.5 rounded-lg whitespace-nowrap transition text-xs sm:text-sm min-h-[44px] touch-manipulation ${
                        activeTab === tab
                          ? 'bg-primary-green text-white'
                          : 'bg-dark-card text-gray-300 active:bg-dark-card-light'
                      }`}
                    >
                      {tab === 'follower' && 'Takipçi'}
                      {tab === 'like' && 'Beğeni'}
                      {tab === 'view' && 'İzlenme'}
                      {tab === 'engagement' && 'Etkileşim'}
                    </button>
                  ))}
                </div>

                {/* Package Grid - Mobile Single Column */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {filteredPackages.map((pkg, index) => {
                    const minAmount = pkg.min || 100
                    const priceStr = pkg.price.split('/')[0].trim()
                    const numericPrice = parseFloat(priceStr.replace(/[^\d,]/g, '').replace(',', '.'))
                    const isFixedPrice = pkg.min === pkg.max && !pkg.price.includes('/')
                    const totalPrice = isFixedPrice
                      ? numericPrice
                      : (numericPrice * minAmount) / 1000
                    const formattedPrice = (isFixedPrice ? numericPrice : Math.round(totalPrice)).toString() + '₺'
                    
                    return (
                      <div
                        key={pkg.id}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setSelectedPackage(pkg.id)
                        }}
                        className="bg-dark-card rounded-xl p-4 sm:p-5 cursor-pointer transition-all duration-300 border border-dark-card-light hover:border-primary-green/50 active:border-primary-green active:scale-[0.98] sm:hover:scale-[1.01] relative overflow-hidden touch-manipulation group"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setSelectedPackage(pkg.id)
                          }
                        }}
                      >
                        {/* Top accent bar */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-green via-primary-green-dark to-primary-green"></div>
                        
                        <div className="relative z-10 flex flex-col h-full">
                          {/* Header with icon and cart button */}
                          <div className="flex items-start justify-between mb-3 sm:mb-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-green/20 to-primary-green/10 rounded-lg flex items-center justify-center border border-primary-green/30">
                                <ServiceLogo serviceId={currentSelectedService} className="w-5 h-5 sm:w-6 sm:h-6 text-primary-green" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="text-white font-bold text-sm sm:text-base leading-tight line-clamp-2 group-hover:text-primary-green transition-colors">
                                  {pkg.name}
                                </h5>
                              </div>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                setPendingCartItem({
                                  pkg,
                                  minAmount,
                                  formattedPrice,
                                  totalPrice,
                                })
                                setShowUrlModal(true)
                              }}
                              className="bg-primary-green/10 hover:bg-primary-green active:bg-primary-green p-2 sm:p-2.5 rounded-lg transition-all flex-shrink-0 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center touch-manipulation border border-primary-green/30 group-hover:border-primary-green"
                              title="Sepete Ekle"
                            >
                              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-primary-green group-hover:text-white transition-colors" />
                            </button>
                          </div>

                          {/* Package info */}
                          <div className="space-y-2 sm:space-y-3 flex-1">
                            {/* Amount range */}
                            <div className="flex items-center gap-2">
                              <span className="text-primary-green text-xs sm:text-sm font-semibold">📦</span>
                              <span className="text-gray-300 text-xs sm:text-sm">{pkg.amount}</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-2">
                              <span className="text-primary-green font-bold text-lg sm:text-xl">{formattedPrice}</span>
                              <span className="text-gray-400 text-xs sm:text-sm">/ {pkg.price}</span>
                            </div>

                            {/* Time */}
                            {pkg.avgTime && (
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400 text-xs">⏱️</span>
                                <span className="text-gray-300 text-xs sm:text-sm">{pkg.avgTime}</span>
                              </div>
                            )}

                            {/* Features */}
                            {pkg.features && pkg.features.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 border-t border-dark-card-light">
                                {pkg.features.slice(0, 3).map((feature, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[10px] sm:text-xs bg-primary-green/15 text-primary-green px-2 py-1 rounded-md border border-primary-green/20"
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}

            {/* Eğer paket seçildiyse paket detaylarını göster */}
            {selectedPackage && selectedPackageData && (
              <PackageDetailView
                pkg={selectedPackageData}
                onBack={() => setSelectedPackage(null)}
                generatePackageOptions={generatePackageOptions}
                serviceId={currentSelectedService}
                serviceName={currentService.name}
              />
            )}
          </div>
        </div>
      </div>

      {/* URL Input Modal */}
      {pendingCartItem && (
        <UrlInputModal
          isOpen={showUrlModal}
          onClose={() => {
            setShowUrlModal(false)
            setPendingCartItem(null)
          }}
          onConfirm={(url) => {
            addToCart({
              id: `${pendingCartItem.pkg.id}-${pendingCartItem.minAmount}-${Date.now()}`,
              packageId: pendingCartItem.pkg.id,
              packageName: pendingCartItem.pkg.name,
              serviceId: currentSelectedService,
              serviceName: currentService.name,
              amount: pendingCartItem.minAmount,
              price: pendingCartItem.formattedPrice,
              totalPrice: pendingCartItem.totalPrice,
              url: url,
            })
            
            showToast(
              `${pendingCartItem.pkg.name} - ${pendingCartItem.minAmount.toLocaleString('tr-TR')} adet sepete eklendi!`,
              'success'
            )
            setShowUrlModal(false)
            setPendingCartItem(null)
          }}
          packageName={pendingCartItem.pkg.name}
          serviceName={currentService.name}
        />
      )}
    </section>
  )
}
