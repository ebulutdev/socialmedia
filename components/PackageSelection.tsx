'use client'

import { useState } from 'react'
import { Check, Gift, Zap, Users, Lock, CreditCard, Headphones, ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/context/CartContext'
import { useToast } from '@/lib/context/ToastContext'
import UrlInputModal from './UrlInputModal'

interface Package {
  id: string
  amount: string
  price: string
}

// SMM Turk API - Hizmet 9403: Instagram Takipçi [30 Gün Garantili]
// Fiyat: 53.2781 TL / 1K, Min: 100, Max: 1.000.000
const packages: Package[] = [
  { id: '1', amount: '100 Takipçi', price: '5,33₺' },
  { id: '2', amount: '250 Takipçi', price: '13,32₺' },
  { id: '3', amount: '500 Takipçi', price: '26,64₺' },
  { id: '4', amount: '1.000 Takipçi', price: '53,28₺' },
  { id: '5', amount: '2.500 Takipçi', price: '133,20₺' },
  { id: '6', amount: '5.000 Takipçi', price: '266,39₺' },
  { id: '7', amount: '10.000 Takipçi', price: '532,78₺' },
  { id: '8', amount: '25.000 Takipçi', price: '1.331,95₺' },
  { id: '9', amount: '50.000 Takipçi', price: '2.663,91₺' },
  { id: '10', amount: '100.000 Takipçi', price: '5.327,81₺' },
  { id: '11', amount: '250.000 Takipçi', price: '13.319,53₺' },
  { id: '12', amount: '500.000 Takipçi', price: '26.639,05₺' },
  { id: '13', amount: '1.000.000 Takipçi', price: '53.278,10₺' },
]

const features = [
  { icon: Gift, text: 'Hediye +5 Adet' },
  { icon: Zap, text: 'Başlama Anında' },
  { icon: Users, text: 'Karışık Kullanıcılar' },
  { icon: Lock, text: 'Şifre Gerekmez' },
  { icon: CreditCard, text: '3D Güvenli Ödeme' },
  { icon: Headphones, text: '7/24 Aktif Destek' },
]

export default function PackageSelection() {
  const [selectedPackage, setSelectedPackage] = useState<string>('1')
  const [showUrlModal, setShowUrlModal] = useState(false)
  const [pendingCartItem, setPendingCartItem] = useState<{
    packageId: string
    amount: string
    price: string
    numericAmount: number
    numericPrice: number
  } | null>(null)
  const { addToCart } = useCart()
  const { showToast } = useToast()

  return (
    <section className="bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Section - Service Overview */}
          <div className="md:col-span-1">
            <div className="bg-primary-green rounded-2xl p-6 mb-4">
              {/* Empty Avatar Section */}
              <div className="w-full h-48 bg-white/10 rounded-xl mb-4"></div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Instagram</h3>
                <p className="text-white/90">30 Gün Garantili Takipçi</p>
                <p className="text-white/70 text-sm mt-2">Hizmet No: 9403</p>
              </div>
            </div>
            <div className="bg-dark-card rounded-xl p-4">
              <p className="text-gray-300 text-sm mb-4">
                30 gün garantili Instagram takipçi hizmeti. Hızlı başlangıç, telafi butonu aktif ve
                %100 eski hesaplar. Ortalama teslimat süresi: 55 dakika.
              </p>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-primary-green text-xl">⭐</span>
                <span className="text-gray-300 text-sm">Ortalama Süre: 55 dakika</span>
              </div>
              <div>
                <p className="text-gray-300 text-sm mb-1">Min: 100 - Max: 1.000.000</p>
                <p className="text-primary-green font-semibold">53,28₺ / 1K</p>
              </div>
            </div>
          </div>

          {/* Center Section - Package Selection */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Ana Sayfa &gt; Instagram</p>
              <h2 className="text-2xl font-bold mb-2">
                Instagram Takipçi [ 30 Gün Garantili ] Satın Al
              </h2>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary-green font-semibold">Paket Seç</span>
                <span className="text-gray-400 text-sm">
                  Satın almak istediğiniz miktarı seçiniz. (100 - 1.000.000 arası)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                <span>♻️ 30 Gün Garantili</span>
                <span>•</span>
                <span>⚡ Hızlı Başlangıç</span>
                <span>•</span>
                <span>✅ Telafi Butonu Aktif</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 max-h-[600px] overflow-y-auto">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`p-4 rounded-xl border-2 transition ${
                    selectedPackage === pkg.id
                      ? 'border-primary-green bg-primary-green/10'
                      : 'border-dark-card-light bg-dark-card hover:border-primary-green/50'
                  }`}
                >
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm mb-2">{pkg.amount}</p>
                    <div
                      className={`rounded-lg p-2 mb-2 ${
                        selectedPackage === pkg.id ? 'bg-primary-green' : 'bg-dark-card-light'
                      }`}
                    >
                      <p className="text-white font-bold">{pkg.price}</p>
                    </div>
                    {selectedPackage === pkg.id && (
                      <div className="flex justify-center">
                        <Check className="w-5 h-5 text-primary-green" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Section - Cart & Features */}
          <div className="md:col-span-1">
            <div className="bg-primary-green rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">👤</span>
                <span className="text-white font-semibold">150 Kişinin Sepetinde</span>
              </div>
            </div>
            <div className="bg-dark-card rounded-xl p-4 mb-4">
              <h4 className="text-white font-semibold mb-3">ÖRNEK KULLANICILAR</h4>
              <div className="flex gap-2 flex-wrap">
                {/* Empty Avatar Sections */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-dark-card-light rounded-full"
                  ></div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="bg-dark-card rounded-lg p-3 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-primary-green/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary-green" />
                    </div>
                    <span className="text-white text-sm">{feature.text}</span>
                  </div>
                )
              })}
            </div>
            
            {/* Sepete Ekle Butonu */}
            <div className="mt-6">
              <button
                onClick={() => {
                  const selectedPkg = packages.find(p => p.id === selectedPackage)
                  if (selectedPkg) {
                    // Fiyatı parse et
                    const numericPrice = parseFloat(selectedPkg.price.replace(/[^\d,]/g, '').replace(',', '.'))
                    // Miktarı parse et (örn: "100 Takipçi" -> 100)
                    const numericAmount = parseInt(selectedPkg.amount.replace(/[^\d]/g, ''))
                    
                    setPendingCartItem({
                      packageId: selectedPkg.id,
                      amount: selectedPkg.amount,
                      price: selectedPkg.price,
                      numericAmount,
                      numericPrice,
                    })
                    setShowUrlModal(true)
                  }
                }}
                className="w-full bg-gradient-to-r from-primary-green to-primary-green-dark text-white py-3.5 px-4 rounded-lg hover:from-primary-green-dark hover:to-primary-green transition-all shadow-lg shadow-primary-green/20 font-semibold text-sm flex items-center justify-center gap-2 min-h-[44px]"
              >
                <ShoppingCart className="w-5 h-5" />
                Sepete Ekle
              </button>
            </div>
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
              id: `9403-${pendingCartItem.numericAmount}-${Date.now()}`,
              packageId: '9403',
              packageName: 'Instagram Takipçi [ 30 Gün Garantili ]',
              serviceId: 'instagram',
              serviceName: 'Instagram',
              amount: pendingCartItem.numericAmount,
              price: pendingCartItem.price,
              totalPrice: pendingCartItem.numericPrice,
              url: url,
            })
            
            showToast(
              `Instagram Takipçi - ${pendingCartItem.amount} sepete eklendi!`,
              'success'
            )
            setShowUrlModal(false)
            setPendingCartItem(null)
          }}
          packageName="Instagram Takipçi [ 30 Gün Garantili ]"
          serviceName="Instagram"
        />
      )}
    </section>
  )
}
