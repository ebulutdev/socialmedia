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
    text: "SosyalEvin ile tanıştığım günden beri hesabımın büyümesi inanılmaz! Organik görünümlü takipçiler ve gerçek etkileşimler sayesinde markaların dikkatini çekmeye başladım. Kesinlikle tavsiye ederim!",
  },
  {
    name: 'Can Yılmaz',
    role: 'Dijital Pazarlama Uzmanı',
    text: 'Müşterilerim için sosyal medya büyümesi sağlamam gerekiyordu ve SosyalEvin tam aradığım çözümdü. Hızlı teslimat, kaliteli hizmet ve mükemmel müşteri desteği. Artık tüm projelerimde tercih ediyorum!',
  },
  {
    name: 'Elif Demir',
    role: 'Girişimci',
    text: "Yeni açtığım online mağazamın Instagram hesabını büyütmek için SosyalEvin'i kullandım. Sonuçlar harika! Satışlarım arttı ve marka bilinirliğim yükseldi. Çok memnun kaldım, teşekkürler!",
  },
  {
    name: 'Burak Özdemir',
    role: 'Youtuber',
    text: "YouTube kanalımın yanı sıra diğer platformlarda da varlık göstermem gerekiyordu. SosyalEvin'in Instagram ve TikTok paketleri sayesinde tüm hesaplarımda tutarlı bir büyüme yakaladım. Harika bir deneyim!",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-0">
          {/* Left Featured Card */}
          <div className="md:col-span-1">
            <div className="bg-primary-green rounded-lg relative overflow-hidden aspect-square max-w-[240px]">
              <Image
                src="/images/Ekran Resmi 2026-01-22 01.43.46.png"
                alt="Featured"
                fill
                className="object-cover"
                sizes="240px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-green/90 via-primary-green/60 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10 p-3">
                <div className="bg-dark-card/95 backdrop-blur-sm rounded p-2.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">G</span>
                    <span className="text-white font-semibold text-sm">Google İşletme</span>
                  </div>
                  <p className="text-gray-300 text-xs">4.079 Yorum, 4.7 Puan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Testimonials Grid */}
          <div className="md:col-span-2">
            <div className="grid md:grid-cols-2 gap-0">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-dark-card rounded-lg p-3.5 hover:bg-dark-card-light transition relative overflow-hidden aspect-square max-w-[280px]"
                >
                  <Image
                    src={testimonialImages[index] || testimonialImages[0]}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-card/95 to-dark-card/85"></div>
                  
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded overflow-hidden relative flex-shrink-0 border border-primary-green/30">
                          <Image
                            src={testimonialImages[index] || testimonialImages[0]}
                            alt={testimonial.name}
                            width={36}
                            height={36}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                          <p className="text-primary-green text-xs">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-primary-green text-primary-green"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed line-clamp-3 flex-1">{testimonial.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="bg-primary-green text-white px-6 py-2 rounded-lg hover:bg-primary-green-dark transition font-semibold text-sm">
                DAHA FAZLA GÖSTER
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
