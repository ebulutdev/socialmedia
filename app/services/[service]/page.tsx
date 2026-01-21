'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Check, Gift, Zap, Users, Lock, CreditCard, Headphones, ArrowLeft } from 'lucide-react'
import Header from '@/components/Header'
import LiveSupport from '@/components/LiveSupport'
import { servicesData, calculatePackagePrice, Package } from '@/lib/servicesData'

// Package Card Component
function PackageCard({
  pkg,
  packageOptions,
}: {
  pkg: Package
  packageOptions: Array<{ amount: number; price: string }>
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    packageOptions[0]?.amount.toString() || null
  )

  // Paket türünü belirle (Takipçi, Beğeni, İzlenme, vb.)
  const getPackageType = () => {
    if (pkg.name.toLowerCase().includes('takipçi') || pkg.name.toLowerCase().includes('abone')) {
      return 'Takipçi'
    }
    if (pkg.name.toLowerCase().includes('beğeni') || pkg.name.toLowerCase().includes('favori')) {
      return 'Beğeni'
    }
    if (pkg.name.toLowerCase().includes('izlenme') || pkg.name.toLowerCase().includes('view')) {
      return 'İzlenme'
    }
    if (
      pkg.name.toLowerCase().includes('yorum') ||
      pkg.name.toLowerCase().includes('repost') ||
      pkg.name.toLowerCase().includes('paylaşım')
    ) {
      return 'Etkileşim'
    }
    return 'Diğer'
  }

  return (
    <div className="bg-dark-card rounded-xl p-3 mb-3">
      <h3 className="text-white font-semibold mb-1.5 text-sm">{pkg.name}</h3>
      <p className="text-gray-400 text-xs mb-1.5">{pkg.amount}</p>
      <div className="flex items-center gap-2 mb-2">
        <p className="text-primary-green font-semibold text-sm">{pkg.price}</p>
        {pkg.avgTime && (
          <span className="text-gray-400 text-xs">⏱️ {pkg.avgTime}</span>
        )}
      </div>

      {/* Package Amount Grid - 3 columns, more compact */}
      <div className="grid grid-cols-3 gap-1.5 mb-2">
        {packageOptions.slice(0, 15).map((option) => {
          const isSelected = selectedOption === option.amount.toString()
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

      {pkg.features && pkg.features.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {pkg.features.slice(0, 3).map((feature, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-primary-green/20 text-primary-green px-1.5 py-0.5 rounded"
            >
              {feature}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ServicePage() {
  const params = useParams()
  const router = useRouter()
  const serviceId = params.service as string
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const service = servicesData.find((s) => s.id === serviceId)

  if (!service) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Hizmet Bulunamadı</h1>
          <Link href="/" className="text-primary-green hover:underline">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    )
  }

  // Kategorilere göre paketleri filtrele
  const filteredPackages =
    selectedCategory === 'all'
      ? service.packages
      : service.packages.filter((pkg) => pkg.category === selectedCategory)

  // Paket miktarlarını oluştur (örnek: 9403 için)
  const generatePackageOptions = (pkg: typeof service.packages[0]) => {
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
      <LiveSupport />
      
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-4">
          <Link href="/" className="text-gray-400 hover:text-primary-green text-sm">
            Ana Sayfa
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-white text-sm">{service.name}</span>
        </div>

        <div className="grid md:grid-cols-12 gap-4">
          {/* Left Column - Service Details (3 columns) */}
          <div className="md:col-span-3 space-y-3">
            {/* Service Hero Card */}
            <div className="bg-primary-green rounded-xl p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-green/20 to-transparent"></div>
              <div className="relative z-10">
                {/* Empty Avatar Section */}
                <div className="w-full h-32 bg-white/10 rounded-lg mb-3"></div>
                <div className="text-center">
                  <div className="text-4xl mb-1">{service.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{service.name}</h3>
                  <p className="text-white/90 text-xs">Ucuz Yabancı Takipçi</p>
                </div>
              </div>
            </div>

            {/* Service Description */}
            <div className="bg-dark-card rounded-xl p-3">
              <p className="text-gray-300 text-xs mb-3 leading-relaxed">{service.description}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-primary-green text-lg">⭐</span>
                <span className="text-gray-300 text-xs">37 Değerlendirme</span>
                <span className="text-primary-green font-bold text-xs">5 Puan</span>
              </div>
              <button className="w-full bg-dark-card-light text-white py-1.5 rounded-lg hover:bg-dark-card-light/80 transition flex items-center justify-center gap-2 text-xs">
                <span>🤖</span>
                <span>ChatGPT ile Özetle</span>
              </button>
            </div>
          </div>

          {/* Center Column - Package Selection (6 columns) */}
          <div className="md:col-span-6">
            <h2 className="text-xl font-bold text-primary-green mb-2">
              {service.name} Hizmetleri
            </h2>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-primary-green font-semibold text-sm">Paket Seç</span>
              <span className="text-gray-400 text-xs">
                Satın almak istediğiniz miktarı seçiniz.
              </span>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-1.5 mb-4 overflow-x-auto pb-2">
              {[
                { id: 'all', label: 'Tümü' },
                { id: 'follower', label: 'Takipçi' },
                { id: 'like', label: 'Beğeni' },
                { id: 'view', label: 'İzlenme' },
                { id: 'engagement', label: 'Etkileşim' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition text-xs ${
                    selectedCategory === tab.id
                      ? 'bg-primary-green text-white'
                      : 'bg-dark-card text-gray-300 hover:bg-dark-card-light'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Package Cards */}
            <div className="space-y-3">
              {filteredPackages.map((pkg) => {
                const packageOptions = generatePackageOptions(pkg)
                return (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    packageOptions={packageOptions}
                  />
                )
              })}
            </div>
          </div>

          {/* Right Column - Cart & Features (3 columns) */}
          <div className="md:col-span-3 space-y-3">
            {/* Shopping Cart Indicator */}
            <div className="bg-primary-green rounded-xl p-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛒</span>
                <span className="text-white font-semibold text-sm">150 Kişinin Sepetinde</span>
              </div>
            </div>

            {/* Example Users */}
            <div className="bg-dark-card rounded-xl p-3">
              <h4 className="text-white font-semibold mb-2 text-xs">ÖRNEK KULLANICILAR</h4>
              <div className="flex gap-1.5 flex-wrap">
                {/* Empty Avatar Sections */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-dark-card-light rounded-full"
                  ></div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-1.5">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="bg-dark-card rounded-lg p-2.5 flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 bg-primary-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary-green" />
                    </div>
                    <span className="text-white text-xs">{feature.text}</span>
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
