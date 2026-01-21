'use client'

import React, { useState, useEffect } from 'react'
import { ShoppingCart, Check } from 'lucide-react'

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

export default function PackageSystem({ selectedService, onServiceChange }: PackageSystemProps) {
  const [internalSelectedService, setInternalSelectedService] = useState<string>('instagram')
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>('all')

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

  const filteredPackages =
    activeTab === 'all'
      ? currentService.packages
      : currentService.packages.filter((pkg) => {
          if (activeTab === 'follower') return pkg.name.toLowerCase().includes('takipçi') || pkg.name.toLowerCase().includes('abone')
          if (activeTab === 'like') return pkg.name.toLowerCase().includes('beğeni')
          if (activeTab === 'view') return pkg.name.toLowerCase().includes('izlenme')
          if (activeTab === 'engagement') return pkg.name.toLowerCase().includes('yorum') || pkg.name.toLowerCase().includes('paylaşım')
          return true
        })

  return (
    <section className="bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Left Sidebar - Service Details */}
          <div className="md:col-span-1">
            <div className="bg-primary-green rounded-2xl p-6 mb-4">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-4xl">📱</span>
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-2">
                {currentService.name.toUpperCase()}
              </h3>
            </div>
            <div className="bg-dark-card rounded-2xl p-6">
              <h4 className="text-primary-green text-xl font-bold mb-4">
                {currentService.name} Hizmetleri
              </h4>
              <p className="text-gray-300 text-sm mb-6">
                {currentService.name}'da ihtiyaçlarınıza uygun paketlerle etkileşimi artırmaya ve
                hesabınızı geliştirmeye hazır mısınız?
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <span>⭐</span>
                  <span className="text-sm">Ort. Değerlendirme 5 Puan</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <span>📚</span>
                  <span className="text-sm">Kategori Sayısı {currentService.packages.length} Kategori</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Package List */}
          <div className="md:col-span-3">
            {/* Category Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {['all', 'follower', 'like', 'view', 'engagement'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                    activeTab === tab
                      ? 'bg-primary-green text-white'
                      : 'bg-dark-card text-gray-300 hover:bg-dark-card-light'
                  }`}
                >
                  {tab === 'all' && 'Tümü'}
                  {tab === 'follower' && 'Takipçi'}
                  {tab === 'like' && 'Beğeni'}
                  {tab === 'view' && 'İzlenme'}
                  {tab === 'engagement' && 'Etkileşim'}
                </button>
              ))}
            </div>

            {/* Package Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`bg-dark-card rounded-xl p-4 cursor-pointer transition border-2 ${
                    selectedPackage === pkg.id
                      ? 'border-primary-green bg-dark-card-light'
                      : 'border-dark-card-light hover:border-primary-green/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Empty Icon Placeholder */}
                    <div className="w-12 h-12 bg-primary-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-green">📦</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-white font-semibold mb-1">{pkg.name}</h5>
                      <p className="text-gray-400 text-sm mb-1">Satın Al</p>
                      <p className="text-gray-300 text-sm mb-2">{pkg.amount}</p>
                      <p className="text-primary-green font-semibold text-sm mb-2">{pkg.price}</p>
                      {pkg.avgTime && (
                        <p className="text-gray-400 text-xs mb-2">⏱️ Ortalama: {pkg.avgTime}</p>
                      )}
                      {pkg.features && pkg.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {pkg.features.slice(0, 2).map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-primary-green/20 text-primary-green px-2 py-1 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {selectedPackage === pkg.id && (
                        <div className="w-6 h-6 bg-primary-green rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <button className="bg-dark-card-light hover:bg-primary-green p-2 rounded-lg transition">
                        <ShoppingCart className="w-4 h-4 text-gray-300" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
