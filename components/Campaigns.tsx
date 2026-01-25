'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
import { ServiceLogo } from './ServiceLogos'

const discoveryPackages = [
  {
    id: 'youtube-izlenme-begeni',
    serviceId: 'youtube',
    packageId: '3432',
    title: 'YouTube İzlenme + Beğeni',
    subtitle: 'Kombine Paket',
    description: 'Videolarınızı hem izlensin hem beğenilsin. 60 gün garantili premium paket.',
    price: '250₺ / 1K',
    minPrice: '25₺',
    features: ['60 Gün Garantili ♻️', 'Günlük Hız 20K/60K', '2\'li Paket'],
    gradient: 'from-red-500/20 via-red-600/20 to-red-700/20',
    borderGradient: 'from-red-500 to-red-700',
    image: '/images/Ekran Resmi 2026-01-22 01.40.05.png',
    badge: 'En Popüler',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  {
    id: 'facebook-etkilesim',
    serviceId: 'facebook',
    packageId: '6857',
    title: 'Facebook Etkileşim Paketi',
    subtitle: 'Premium Paket',
    description: 'Beğeni, yorum ve paylaşım ile hesabınızı büyütün. Kapsamlı etkileşim çözümü.',
    price: '2500₺ / 1K',
    minPrice: '12.50₺',
    features: ['Premium Paket', 'Yüksek Kalite', 'Kapsamlı Etkileşim'],
    gradient: 'from-blue-500/20 via-blue-600/20 to-blue-700/20',
    borderGradient: 'from-blue-500 to-blue-700',
    image: '/images/Ekran Resmi 2026-01-22 01.42.13.png',
    badge: 'Premium',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  {
    id: 'tiktok-kadin',
    serviceId: 'tiktok',
    packageId: '5965',
    title: 'TikTok Kadın Etkileşim',
    subtitle: 'Hedefli Paket',
    description: 'Kadın kullanıcılardan gerçek etkileşim. İzle, beğen ve yorum kombinasyonu.',
    price: '150₺',
    minPrice: '150₺',
    features: ['Kadın Kullanıcılar', 'İzle + Beğen + Yorum', '5 Adet'],
    gradient: 'from-pink-500/20 via-purple-500/20 to-pink-600/20',
    borderGradient: 'from-pink-500 to-purple-500',
    image: '/images/Ekran Resmi 2026-01-22 01.40.47.png',
    badge: 'Hedefli',
    badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  },
  {
    id: 'tiktok-erkek',
    serviceId: 'tiktok',
    packageId: '5971',
    title: 'TikTok Erkek Etkileşim',
    subtitle: 'Hedefli Paket',
    description: 'Erkek kullanıcılardan gerçek etkileşim. İzle, beğen ve yorum kombinasyonu.',
    price: '150₺',
    minPrice: '150₺',
    features: ['Erkek Kullanıcılar', 'İzle + Beğen + Yorum', '5 Adet'],
    gradient: 'from-cyan-500/20 via-blue-500/20 to-cyan-600/20',
    borderGradient: 'from-cyan-500 to-blue-500',
    image: '/images/Ekran Resmi 2026-01-22 01.41.26.png',
    badge: 'Hedefli',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  },
]

export default function Campaigns() {
  const router = useRouter()

  const handlePackageClick = (serviceId: string, packageId: string) => {
    // Hizmet sayfasına yönlendir ve paket ID'sini URL parametresi olarak gönder
    router.push(`/services/${serviceId}?package=${packageId}`)
  }

  return (
    <section id="discovery-packages" className="bg-dark-bg py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Başlık Bölümü */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-14 bg-gradient-to-br from-primary-green/20 to-primary-green/10 rounded-xl flex items-center justify-center border border-primary-green/30">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-7 text-primary-green" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              <span className="bg-gradient-to-r from-primary-green to-primary-green-light bg-clip-text text-transparent">
                Keşfet Paketleri
              </span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
            Özel olarak hazırlanmış kombinasyon paketleri ile sosyal medya hesaplarınızı hızlıca büyütün
          </p>
        </div>

        {/* Paketler Grid - 2x2 Desktop, 1 Column Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {discoveryPackages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => handlePackageClick(pkg.serviceId, pkg.packageId)}
              className="group relative bg-dark-card rounded-2xl overflow-hidden border-2 border-dark-card-light hover:border-primary-green/50 transition-all duration-300 cursor-pointer active:scale-[0.98] sm:hover:scale-[1.02] touch-manipulation"
            >
              {/* Gradient Overlay Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Top Border Gradient */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pkg.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

              {/* Background Image */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="relative z-10 p-4 sm:p-6 lg:p-8">
                {/* Header: Badge + Logo */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${pkg.borderGradient} flex items-center justify-center shadow-lg`}>
                      <ServiceLogo serviceId={pkg.serviceId} className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-lg" />
                    </div>
                    <div>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${pkg.badgeColor} mb-2`}>
                        <Star className="w-3 h-3" />
                        <span className="text-[10px] sm:text-xs font-semibold">{pkg.badge}</span>
                      </div>
                      <p className="text-gray-400 text-[10px] sm:text-xs font-medium">{pkg.subtitle}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl mb-2 group-hover:text-primary-green transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
                    {pkg.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] sm:text-xs bg-primary-green/10 text-primary-green px-2.5 py-1.5 rounded-lg border border-primary-green/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: Price + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-dark-card-light">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Başlangıç Fiyatı</p>
                    <p className="text-white font-bold text-lg sm:text-xl">
                      {pkg.minPrice}
                      {pkg.price.includes('/') && (
                        <span className="text-gray-400 text-sm ml-1">/ {pkg.price.split('/')[1]}</span>
                      )}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 bg-primary-green hover:bg-primary-green-dark text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-colors min-h-[44px] group-hover:gap-3 duration-300">
                    <span>Keşfet</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${pkg.borderGradient} opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
