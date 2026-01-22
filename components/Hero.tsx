'use client'

import Image from 'next/image'
import { ArrowRight, Play } from 'lucide-react'

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
            
            <div className="relative z-10 max-w-[90%] sm:max-w-[70%] md:max-w-[60%]">
              <button className="bg-primary-green text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg mb-3 sm:mb-4 hover:bg-primary-green-dark transition text-xs sm:text-sm font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] min-h-[44px] w-full sm:w-auto">
                Takipçi Satın Al
              </button>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                A Social Media Kalitesi ile{' '}
                <span className="text-primary-green drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Etkileşimin Tadını Çıkarın!</span>
              </h1>
              <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
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
                <button className="flex items-center gap-1.5 text-primary-green hover:text-primary-green-light transition min-h-[44px] px-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-primary-green flex items-center justify-center drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                    <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-primary-green" />
                  </div>
                  <span className="text-[10px] sm:text-xs drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">İzle</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Featured Cards - 2x2 Grid - Mobile Optimized */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {/* Campaign Card 1 */}
            <div className="bg-dark-card rounded-lg relative overflow-hidden aspect-square group cursor-pointer active:scale-[0.98] sm:hover:scale-[1.02] transition-transform touch-manipulation">
              <Image
                src="/images/Ekran Resmi 2026-01-22 01.40.05.png"
                alt="Campaign"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 100px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10 p-2 sm:p-2.5">
                <h3 className="text-[10px] sm:text-xs font-bold text-white drop-shadow-2xl leading-tight mb-1 sm:mb-1.5 line-clamp-2">2026 YILINDA FIRSATLAR</h3>
                <button className="bg-white/95 backdrop-blur-sm text-dark-card px-2 sm:px-2.5 py-1.5 rounded hover:bg-white transition-all flex items-center gap-1 w-full justify-center font-semibold text-[9px] sm:text-[10px] shadow-sm min-h-[36px] sm:min-h-[40px]">
                  Hemen İncele
                  <ArrowRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Campaign Card 2 */}
            <div className="bg-primary-green rounded-lg relative overflow-hidden aspect-square group cursor-pointer active:scale-[0.98] sm:hover:scale-[1.02] transition-transform touch-manipulation">
              <Image
                src="/images/Ekran Resmi 2026-01-22 01.40.47.png"
                alt="Campaign"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 100px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-green/85 via-primary-green/50 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10 p-2 sm:p-2.5">
                <h3 className="text-[10px] sm:text-xs font-bold text-white drop-shadow-2xl leading-tight mb-1 sm:mb-1.5 line-clamp-2">%100 ÜCRETSİZ ARAÇLAR</h3>
                <button className="bg-white/95 backdrop-blur-sm text-primary-green px-2 sm:px-2.5 py-1.5 rounded hover:bg-white transition-all flex items-center gap-1 w-full justify-center font-bold text-[9px] sm:text-[10px] shadow-sm min-h-[36px] sm:min-h-[40px]">
                  Hemen İncele
                  <ArrowRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Campaign Card 3 */}
            <div className="bg-dark-card rounded-lg relative overflow-hidden aspect-square group cursor-pointer active:scale-[0.98] sm:hover:scale-[1.02] transition-transform touch-manipulation">
              <Image
                src="/images/Ekran Resmi 2026-01-22 01.41.26.png"
                alt="Campaign"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 100px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10 p-2 sm:p-2.5">
                <h3 className="text-[10px] sm:text-xs font-bold text-white drop-shadow-2xl leading-tight mb-1 sm:mb-1.5 line-clamp-2">ÖZEL KAMPANYALAR</h3>
                <button className="bg-white/95 backdrop-blur-sm text-dark-card px-2 sm:px-2.5 py-1.5 rounded hover:bg-white transition-all flex items-center gap-1 w-full justify-center font-semibold text-[9px] sm:text-[10px] shadow-sm min-h-[36px] sm:min-h-[40px]">
                  Hemen İncele
                  <ArrowRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Campaign Card 4 */}
            <div className="bg-primary-green rounded-lg relative overflow-hidden aspect-square group cursor-pointer active:scale-[0.98] sm:hover:scale-[1.02] transition-transform touch-manipulation">
              <Image
                src="/images/Ekran Resmi 2026-01-22 01.42.13.png"
                alt="Campaign"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 100px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-green/85 via-primary-green/50 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10 p-2 sm:p-2.5">
                <h3 className="text-[10px] sm:text-xs font-bold text-white drop-shadow-2xl leading-tight mb-1 sm:mb-1.5 line-clamp-2">YENİ ÜRÜNLER</h3>
                <button className="bg-white/95 backdrop-blur-sm text-primary-green px-2 sm:px-2.5 py-1.5 rounded hover:bg-white transition-all flex items-center gap-1 w-full justify-center font-bold text-[9px] sm:text-[10px] shadow-sm min-h-[36px] sm:min-h-[40px]">
                  Hemen İncele
                  <ArrowRight className="w-2 h-2 sm:w-2.5 sm:h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
