'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ShoppingCart, Check, ArrowLeft } from 'lucide-react'
import { ServiceLogo } from './ServiceLogos'

const packageImages = [
  '/images/Ekran Resmi 2026-01-22 01.40.05.png',
  '/images/Ekran Resmi 2026-01-22 01.40.47.png',
  '/images/Ekran Resmi 2026-01-22 01.41.26.png',
  '/images/Ekran Resmi 2026-01-22 01.42.13.png',
  '/images/Ekran Resmi 2026-01-22 01.43.46.png',
  '/images/Ekran Resmi 2026-01-22 01.44.34.png',
  '/images/Ekran Resmi 2026-01-22 01.46.02.png',
]

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
        price: '53,28₺ / 1K',
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
        price: '7,12₺ / 1K',
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
        price: '0,36₺ / 1K',
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
        price: '3,90₺ / 1K',
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
        price: '3.808,35₺ / 1K',
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
        price: '50,37₺ / 1K',
        serviceId: '9209',
        min: 100,
        max: 1000000,
        avgTime: '48 saat',
        features: ['99 Gün Telafili ♻️', 'Eski Hesaplar', 'Günlük Hız: 100K'],
      },
      {
        id: '9320',
        name: 'Instagram Premium Türk Takipçi [ 365 Gün Garantili ]',
        amount: '50 - 1.000.000 Takipçi',
        price: '2.416,78₺ / 1K',
        serviceId: '9320',
        min: 50,
        max: 1000000,
        avgTime: '2 saat 5 dakika',
        features: ['365 Gün Telafili ♻️', '%100 Türk', 'Saatte 10K', 'Max 100K'],
      },
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    packages: [
      { id: '1', name: 'Sayfa Beğeni', amount: '100 Beğeni', price: '35,00₺' },
      { id: '2', name: 'Gönderi Beğeni', amount: '250 Beğeni', price: '79,00₺' },
      { id: '3', name: 'Yorum', amount: '50 Yorum', price: '149,00₺' },
      { id: '4', name: 'Paylaşım', amount: '100 Paylaşım', price: '199,00₺' },
      { id: '5', name: 'Video İzlenme', amount: '5.000 İzlenme', price: '89,00₺' },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    packages: [
      { id: '1', name: 'Abone', amount: '100 Abone', price: '199,00₺' },
      { id: '2', name: 'Video İzlenme', amount: '1.000 İzlenme', price: '29,00₺' },
      { id: '3', name: 'Beğeni', amount: '100 Beğeni', price: '39,00₺' },
      { id: '4', name: 'Yorum', amount: '10 Yorum', price: '59,00₺' },
      { id: '5', name: 'Watch Time', amount: '100 Saat', price: '149,00₺' },
    ],
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    packages: [
      { id: '1', name: 'Takipçi', amount: '100 Takipçi', price: '89,00₺' },
      { id: '2', name: 'Beğeni', amount: '500 Beğeni', price: '49,00₺' },
      { id: '3', name: 'İzlenme', amount: '1.000 İzlenme', price: '19,00₺' },
      { id: '4', name: 'Yorum', amount: '50 Yorum', price: '79,00₺' },
      { id: '5', name: 'Paylaşım', amount: '100 Paylaşım', price: '129,00₺' },
    ],
  },
  {
    id: 'twitter',
    name: 'Twitter (X)',
    packages: [
      { id: '1', name: 'Takipçi', amount: '100 Takipçi', price: '149,00₺' },
      { id: '2', name: 'Beğeni', amount: '250 Beğeni', price: '99,00₺' },
      { id: '3', name: 'Retweet', amount: '100 Retweet', price: '79,00₺' },
      { id: '4', name: 'Yorum', amount: '50 Yorum', price: '119,00₺' },
      { id: '5', name: 'İzlenme', amount: '1.000 İzlenme', price: '39,00₺' },
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
}: {
  pkg: Package
  onBack: () => void
  generatePackageOptions: (pkg: Package) => Array<{ amount: number; price: string }>
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const packageOptions = generatePackageOptions(pkg)
  const defaultSelected = packageOptions[0]?.amount.toString() || null
  const currentSelected = selectedOption || defaultSelected

  return (
    <div className="bg-dark-card rounded-xl p-3">
      {/* Geri Butonu */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-primary-green mb-3 transition text-xs"
      >
        <ArrowLeft className="w-3 h-3" />
        <span>Geri Dön</span>
      </button>

      {/* Paket Başlığı */}
      <h3 className="text-white font-semibold mb-1.5 text-sm">{pkg.name}</h3>
      {pkg.avgTime && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-gray-400 text-xs">⏱️ {pkg.avgTime}</span>
        </div>
      )}

      {/* Özellikler */}
      {pkg.features && pkg.features.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {pkg.features.map((feature, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-primary-green/20 text-primary-green px-1.5 py-0.5 rounded"
            >
              {feature}
            </span>
          ))}
        </div>
      )}

      {/* Paket Seçimi Başlığı */}
      <div className="mb-2">
        <span className="text-primary-green font-semibold text-xs">Paket Seç</span>
        <span className="text-gray-400 text-[10px] ml-2">
          Satın almak istediğiniz miktarı seçiniz.
        </span>
      </div>

      {/* Miktar Seçenekleri Grid - 3 sütun, kompakt */}
      <div className="grid grid-cols-3 gap-1.5">
        {packageOptions.slice(0, 15).map((option) => {
          const isSelected = currentSelected === option.amount.toString()
          return (
            <button
              key={option.amount}
              onClick={() => setSelectedOption(option.amount.toString())}
              className={`p-2 rounded-lg border-2 transition text-center ${
                isSelected
                  ? 'border-primary-green bg-primary-green/10'
                  : 'border-dark-card-light bg-dark-bg hover:border-primary-green/50'
              }`}
            >
              <p className="text-white font-semibold text-xs mb-0.5">
                {option.amount.toLocaleString('tr-TR')}
              </p>
              <div
                className={`rounded p-1 mb-0.5 ${
                  isSelected ? 'bg-primary-green' : 'bg-dark-card-light'
                }`}
              >
                <p className="text-white font-bold text-[10px] leading-tight">{option.price}</p>
              </div>
              {isSelected && (
                <div className="flex justify-center mt-0.5">
                  <Check className="w-3 h-3 text-primary-green" />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function PackageSystem({ selectedService, onServiceChange }: PackageSystemProps) {
  const [internalSelectedService, setInternalSelectedService] = useState<string>('instagram')
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>('follower')

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
        follower: ['9403', '9320'], // 30 Gün Garantili ve Premium Türk
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
    const pricePer1K = pkg.price.split('/')[0].trim()
    
    const amounts: number[] = []
    if (min <= 50) amounts.push(50)
    if (min <= 100) amounts.push(100)
    if (min <= 250) amounts.push(250)
    if (min <= 500) amounts.push(500)
    if (min <= 750) amounts.push(750)
    if (min <= 1000) amounts.push(1000)
    if (min <= 2500 && max >= 2500) amounts.push(2500)
    if (min <= 5000 && max >= 5000) amounts.push(5000)
    if (min <= 7500 && max >= 7500) amounts.push(7500)
    if (min <= 10000 && max >= 10000) amounts.push(10000)
    if (min <= 25000 && max >= 25000) amounts.push(25000)
    if (min <= 50000 && max >= 50000) amounts.push(50000)
    if (min <= 75000 && max >= 75000) amounts.push(75000)
    if (min <= 100000 && max >= 100000) amounts.push(100000)
    if (min <= 250000 && max >= 250000) amounts.push(250000)
    if (min <= 500000 && max >= 500000) amounts.push(500000)
    if (min <= 1000000 && max >= 1000000) amounts.push(1000000)

    return amounts
      .filter((a) => a >= min && a <= max)
      .map((amount) => {
        const numericPrice = parseFloat(pricePer1K.replace(/[^\d,]/g, '').replace(',', '.'))
        const totalPrice = (numericPrice * amount) / 1000
        return {
          amount,
          price: totalPrice.toFixed(2).replace('.', ',') + '₺',
        }
      })
  }

  return (
    <section className="bg-dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Left Sidebar - Service Details */}
          <div className="md:col-span-1">
            <div className="bg-primary-green rounded-xl p-4 mb-3 relative overflow-hidden min-h-[180px]">
              <Image
                src={packageImages[0] || packageImages[0]}
                alt={currentService.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-green/80 via-primary-green/60 to-primary-green/80"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <ServiceLogo serviceId={currentSelectedService} className="w-10 h-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                  {currentService.name.toUpperCase()}
                </h3>
              </div>
            </div>
            <div className="bg-dark-card rounded-xl p-4">
              <h4 className="text-primary-green text-lg font-bold mb-3">
                {currentService.name} Hizmetleri
              </h4>
              <p className="text-gray-300 text-xs mb-4 leading-relaxed">
                {currentService.name}'da ihtiyaçlarınıza uygun paketlerle etkileşimi artırmaya ve
                hesabınızı geliştirmeye hazır mısınız?
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <span>⭐</span>
                  <span className="text-xs">Ort. Değerlendirme 5 Puan</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span>📚</span>
                  <span className="text-xs">Kategori Sayısı {currentService.packages.length} Kategori</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Package List */}
          <div className="md:col-span-3">
            {/* Eğer paket seçilmediyse kategori seçimini ve paket listesini göster */}
            {!selectedPackage && (
              <>
                {/* Category Tabs */}
                <div className="flex gap-1.5 mb-4 overflow-x-auto pb-2">
                  {['follower', 'like', 'view', 'engagement'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab)
                        setSelectedPackage(null) // Kategori değişince paket seçimini sıfırla
                      }}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition text-xs ${
                        activeTab === tab
                          ? 'bg-primary-green text-white'
                          : 'bg-dark-card text-gray-300 hover:bg-dark-card-light'
                      }`}
                    >
                      {tab === 'follower' && 'Takipçi'}
                      {tab === 'like' && 'Beğeni'}
                      {tab === 'view' && 'İzlenme'}
                      {tab === 'engagement' && 'Etkileşim'}
                    </button>
                  ))}
                </div>

                {/* Package Grid */}
                <div className="grid md:grid-cols-2 gap-3">
                  {filteredPackages.map((pkg, index) => (
                    <div
                      key={pkg.id}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setSelectedPackage(pkg.id)
                      }}
                      className="bg-dark-card rounded-xl p-3 cursor-pointer transition border-2 border-dark-card-light hover:border-primary-green/50 active:scale-[0.98] relative overflow-hidden min-h-[140px]"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelectedPackage(pkg.id)
                        }
                      }}
                    >
                      <Image
                        src={packageImages[index % packageImages.length]}
                        alt={pkg.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/75"></div>
                      
                      <div className="relative z-10 flex items-start gap-3">
                        {/* Service Icon */}
                        <div className="w-10 h-10 bg-primary-green/30 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                          <ServiceLogo serviceId={currentSelectedService} className="w-5 h-5 text-primary-green drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-white font-semibold mb-1 text-sm line-clamp-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{pkg.name}</h5>
                          <p className="text-gray-300 text-xs mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">Satın Al</p>
                          {pkg.avgTime && (
                            <p className="text-gray-300 text-[10px] mb-1.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">⏱️ {pkg.avgTime}</p>
                          )}
                          {pkg.features && pkg.features.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {pkg.features.slice(0, 2).map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] bg-primary-green/30 text-primary-green px-1.5 py-0.5 rounded backdrop-blur-sm"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedPackage(pkg.id)
                            }}
                            className="bg-dark-card-light/90 hover:bg-primary-green p-1.5 rounded-lg transition backdrop-blur-sm"
                          >
                            <ShoppingCart className="w-3.5 h-3.5 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Eğer paket seçildiyse paket detaylarını göster */}
            {selectedPackage && selectedPackageData && (
              <PackageDetailView
                pkg={selectedPackageData}
                onBack={() => setSelectedPackage(null)}
                generatePackageOptions={generatePackageOptions}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
