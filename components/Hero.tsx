'use client'

import Image from 'next/image'
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Left Promotional Content */}
          <div className="md:col-span-2 bg-dark-card rounded-xl p-6 relative overflow-hidden min-h-[350px]">
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
            
            {/* Character Image - Right side */}
            <div className="absolute right-0 top-0 w-2/5 h-full pointer-events-none opacity-20 z-10">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/images/Ekran Resmi 2026-01-22 01.38.46.png"
                  alt="Character"
                  width={400}
                  height={500}
                  className="max-w-full max-h-full object-contain"
                  priority
                />
              </div>
            </div>

            <div className="relative z-10 max-w-[60%]">
              <button className="bg-primary-green text-white px-5 py-2 rounded-lg mb-4 hover:bg-primary-green-dark transition text-sm font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                Takipçi Satın Al
              </button>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Sosyal Evin Kalitesi ile{' '}
                <span className="text-primary-green drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Etkileşimin Tadını Çıkarın!</span>
              </h1>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                Tamamen otomatik sistem ile siparişleriniz 7 Gün 24 Saat hızlı ve
                sorunsuz bir şekilde tamamlanmaktadır.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary-green text-sm drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">★</span>
                  ))}
                </div>
                <span className="bg-primary-green px-2.5 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
                  <span>❤️</span>
                  <span>4.7</span>
                </span>
                <button className="flex items-center gap-1.5 text-primary-green hover:text-primary-green-light transition">
                  <div className="w-6 h-6 rounded-full border-2 border-primary-green flex items-center justify-center drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                    <Play className="w-3 h-3 fill-primary-green" />
                  </div>
                  <span className="text-xs drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">İzle</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Featured Cards - Square, Compact */}
          <div className="space-y-3">
            {/* Campaign Card 1 */}
            <div className="bg-dark-card rounded-lg relative overflow-hidden aspect-square max-w-[200px] group cursor-pointer hover:scale-[1.02] transition-transform">
              <Image
                src="/images/Ekran Resmi 2026-01-22 01.40.05.png"
                alt="Campaign"
                fill
                className="object-cover"
                sizes="200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10 p-2.5">
                <h3 className="text-xs font-bold text-white drop-shadow-2xl leading-tight mb-1.5">2026 YILINDA FIRSATLAR</h3>
                <button className="bg-white/95 backdrop-blur-sm text-dark-card px-2.5 py-1.5 rounded hover:bg-white transition-all flex items-center gap-1 w-full justify-center font-semibold text-[10px] shadow-sm">
                  Hemen İncele
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Campaign Card 2 */}
            <div className="bg-primary-green rounded-lg relative overflow-hidden aspect-square max-w-[200px] group cursor-pointer hover:scale-[1.02] transition-transform">
              <Image
                src="/images/Ekran Resmi 2026-01-22 01.40.47.png"
                alt="Campaign"
                fill
                className="object-cover"
                sizes="200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-green/85 via-primary-green/50 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10 p-2.5">
                <h3 className="text-xs font-bold text-white drop-shadow-2xl leading-tight mb-1.5">%100 ÜCRETSİZ ARAÇLAR</h3>
                <button className="bg-white/95 backdrop-blur-sm text-primary-green px-2.5 py-1.5 rounded hover:bg-white transition-all flex items-center gap-1 w-full justify-center font-bold text-[10px] shadow-sm">
                  Hemen İncele
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
