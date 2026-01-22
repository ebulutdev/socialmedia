'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'

const testimonialImages = [
  '/images/Ekran Resmi 2026-01-22 01.41.26.png',
  '/images/Ekran Resmi 2026-01-22 01.42.13.png',
  '/images/Ekran Resmi 2026-01-22 01.44.34.png',
  '/images/Ekran Resmi 2026-01-22 01.41.26.png',
]

const testimonials = [
  {
    name: 'Zeynep Kaya',
    role: 'İçerik Üreticisi',
    text: "A Social Media ile tanıştığım günden beri hesabımın büyümesi inanılmaz! Organik görünümlü takipçiler ve gerçek etkileşimler sayesinde markaların dikkatini çekmeye başladım. Kesinlikle tavsiye ederim!",
  },
  {
    name: 'Can Yılmaz',
    role: 'Dijital Pazarlama Uzmanı',
    text: 'Müşterilerim için sosyal medya büyümesi sağlamam gerekiyordu ve A Social Media tam aradığım çözümdü. Hızlı teslimat, kaliteli hizmet ve mükemmel müşteri desteği. Artık tüm projelerimde tercih ediyorum!',
  },
  {
    name: 'Elif Demir',
    role: 'Girişimci',
    text: "Yeni açtığım online mağazamın Instagram hesabını büyütmek için A Social Media'yı kullandım. Sonuçlar harika! Satışlarım arttı ve marka bilinirliğim yükseldi. Çok memnun kaldım, teşekkürler!",
  },
  {
    name: 'Burak Özdemir',
    role: 'Youtuber',
    text: "YouTube kanalımın yanı sıra diğer platformlarda da varlık göstermem gerekiyordu. A Social Media'nın Instagram ve TikTok paketleri sayesinde tüm hesaplarımda tutarlı bir büyüme yakaladım. Harika bir deneyim!",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-dark-bg py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {/* Left Featured Card - Google İşletme (2 satır kaplar) */}
          <div className="md:row-span-2">
            <div className="bg-primary-green rounded-lg relative overflow-hidden h-[250px] sm:h-[300px] md:h-full min-h-[250px] md:min-h-[400px]">
              <Image
                src="/images/Ekran Resmi 2026-01-22 01.43.46.png"
                alt="Featured"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-green/90 via-primary-green/60 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10 p-3 sm:p-4">
                <div className="bg-dark-card/95 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-primary-green/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
                      <span className="text-primary-green font-bold text-base sm:text-lg">G</span>
                    </div>
                    <span className="text-white font-semibold text-xs sm:text-sm">Google İşletme</span>
                  </div>
                  <p className="text-gray-300 text-[10px] sm:text-xs">4.079 Yorum, 4.7 Puan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Testimonials Grid - 2x2 kompakt grid - Mobile Single Column */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-dark-card rounded-lg p-3 sm:p-4 active:scale-[0.98] sm:hover:scale-[1.02] transition-all duration-300 relative overflow-hidden border border-dark-card-light active:border-primary-green/50 sm:hover:border-primary-green/50 min-h-[180px] sm:min-h-[200px] touch-manipulation"
              >
                <Image
                  src={testimonialImages[index] || testimonialImages[0]}
                  alt={testimonial.name}
                  fill
                  className="object-cover opacity-20"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-dark-card via-dark-card to-dark-card/95"></div>
                
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden relative flex-shrink-0 border-2 border-primary-green/40 ring-2 ring-primary-green/20">
                        <Image
                          src={testimonialImages[index] || testimonialImages[0]}
                          alt={testimonial.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-white font-semibold text-xs sm:text-sm mb-0.5 truncate">{testimonial.name}</h4>
                        <p className="text-primary-green text-[10px] sm:text-xs truncate">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 flex-shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-primary-green text-primary-green"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-4 flex-1">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Daha Fazla Göster Butonu */}
          <div className="md:col-span-3 mt-2 sm:mt-4 text-center">
            <button className="bg-primary-green text-white px-6 sm:px-8 py-3 rounded-lg active:bg-primary-green-dark sm:hover:bg-primary-green-dark transition font-semibold text-sm sm:text-base shadow-lg shadow-primary-green/20 active:shadow-xl active:shadow-primary-green/30 min-h-[44px] w-full sm:w-auto touch-manipulation">
              DAHA FAZLA GÖSTER
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
