'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Gift } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-dark-bg py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Left Promotional Content - Mobile Full Width */}
          <div className="md:col-span-2 bg-dark-card rounded-xl p-4 sm:p-6 relative overflow-hidden min-h-[280px] sm:min-h-[350px]">
            {/* Full-size background image */}
            <Image
              src="/images/Ekran Resmi 2026-01-22 02.21.38.png"
              alt="Background"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-green/10 to-transparent"></div>
            
            <div className="relative z-10 max-w-[90%] sm:max-w-[70%] md:max-w-[60%] mt-8 sm:mt-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                subjective Kalitesi ile{' '}
                <span className="text-primary-green drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Etkileşimin Tadını Çıkarın!</span>
              </h1>
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4 flex-wrap">
                <Link href="/#popular-products" className="inline-block bg-primary-green text-white px-3 sm:px-5 py-2 sm:py-3 rounded-lg hover:bg-primary-green-dark transition text-[11px] sm:text-sm font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] min-h-[36px] sm:min-h-[44px] w-auto text-center">
                  Popüler Hizmetler
                </Link>
                <Link href="/coupons" className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 sm:px-5 py-2 sm:py-3 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition text-[11px] sm:text-sm font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] min-h-[36px] sm:min-h-[44px]">
                  <Gift className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Kupon Satın Al</span>
                </Link>
              </div>
              <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] [text-shadow:_0_2px_8px_rgba(0,0,0,0.9)]">
                Tamamen otomatik sistem ile siparişleriniz 7 Gün 24 Saat hızlı ve
                sorunsuz bir şekilde tamamlanmaktadır.
              </p>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary-green text-xs sm:text-sm drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">★</span>
                  ))}
                </div>
                <span className="bg-primary-green px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white flex items-center gap-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] min-h-[28px]">
                  <span>❤️</span>
                  <span>4.7</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Featured Cards - 2x2 Grid - Mobile Optimized */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {/* Campaign Card 1 */}
            <Link href="/#popular-products" className="bg-dark-card rounded-lg relative overflow-hidden aspect-square group cursor-pointer active:scale-[0.98] sm:hover:scale-[1.02] transition-transform touch-manipulation block">
              <Image
                src="/images/Ekran Resmi 2026-01-22 01.40.05.png"
                alt="Popüler Hizmetler"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 100px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10 p-2 sm:p-2.5">
                <h3 className="text-[10px] sm:text-xs font-bold text-white drop-shadow-2xl leading-tight mb-1 sm:mb-1.5 line-clamp-2">POPÜLER HİZMETLER</h3>
                <div className="bg-white/95 backdrop-blur-sm text-dark-card px-2 sm:px-2.5 py-1.5 rounded hover:bg-white transition-all flex items-center gap-1 w-full justify-center font-semibold text-[9px] sm:text-[10px] shadow-sm min-h-[36px] sm:min-h-[40px]">
                  Hemen İncele
                  <ArrowRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Campaign Card 2 */}
            <Link href="/#services" className="bg-primary-green rounded-lg relative overflow-hidden aspect-square group cursor-pointer active:scale-[0.98] sm:hover:scale-[1.02] transition-transform touch-manipulation block">
              <Image
                src="/images/Ekran Resmi 2026-01-22 01.40.47.png"
                alt="Popüler Platformlar"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 100px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-green/85 via-primary-green/50 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10 p-2 sm:p-2.5">
                <h3 className="text-[10px] sm:text-xs font-bold text-white drop-shadow-2xl leading-tight mb-1 sm:mb-1.5 line-clamp-2">POPÜLER PLATFORMLAR</h3>
                <div className="bg-white/95 backdrop-blur-sm text-primary-green px-2 sm:px-2.5 py-1.5 rounded hover:bg-white transition-all flex items-center gap-1 w-full justify-center font-bold text-[9px] sm:text-[10px] shadow-sm min-h-[36px] sm:min-h-[40px]">
                  Hemen İncele
                  <ArrowRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Campaign Card 3 */}
            <Link href="/#campaigns" className="bg-dark-card rounded-lg relative overflow-hidden aspect-square group cursor-pointer active:scale-[0.98] sm:hover:scale-[1.02] transition-transform touch-manipulation block">
              <Image
                src="/images/Ekran Resmi 2026-01-22 01.41.26.png"
                alt="Özel Kampanyalar"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 100px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10 p-2 sm:p-2.5">
                <h3 className="text-[10px] sm:text-xs font-bold text-white drop-shadow-2xl leading-tight mb-1 sm:mb-1.5 line-clamp-2">ÖZEL KAMPANYALAR</h3>
                <div className="bg-white/95 backdrop-blur-sm text-dark-card px-2 sm:px-2.5 py-1.5 rounded hover:bg-white transition-all flex items-center gap-1 w-full justify-center font-semibold text-[9px] sm:text-[10px] shadow-sm min-h-[36px] sm:min-h-[40px]">
                  Hemen İncele
                  <ArrowRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Coupon Card */}
            <Link href="/coupons" className="bg-gradient-to-br from-yellow-500/90 to-orange-500/90 rounded-lg relative overflow-hidden aspect-square group cursor-pointer active:scale-[0.98] sm:hover:scale-[1.02] transition-transform touch-manipulation block">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Gift className="w-12 h-12 sm:w-16 sm:h-16 text-white/90 drop-shadow-2xl" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10 p-2 sm:p-2.5">
                <h3 className="text-[10px] sm:text-xs font-bold text-white drop-shadow-2xl leading-tight mb-1 sm:mb-1.5 line-clamp-2">KUPON SATIN AL</h3>
                <div className="bg-white/95 backdrop-blur-sm text-orange-600 px-2 sm:px-2.5 py-1.5 rounded hover:bg-white transition-all flex items-center gap-1 w-full justify-center font-bold text-[9px] sm:text-[10px] shadow-sm min-h-[36px] sm:min-h-[40px]">
                  Hemen Al
                  <ArrowRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
