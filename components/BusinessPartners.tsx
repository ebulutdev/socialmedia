'use client'

import Image from 'next/image'
import { Star, Instagram } from 'lucide-react'

const partners = [
  {
    id: 1,
    name: 'Doa Çakır',
    instagram: '@doacakrx',
    image: '/images/EC8E3B01-BDDA-440D-B598-2FC83671400E_1_201_a.jpeg',
    comment: 'A Social Media ile çalışmaya başladığımdan beri hesabımın büyümesi inanılmaz! Organik görünümlü takipçiler ve gerçek etkileşimler sayesinde markaların dikkatini çekmeye başladım. Profesyonel ekibi ve hızlı teslimatları ile her zaman tercih ediyorum. Kesinlikle tavsiye ederim!',
    rating: 5
  }
]

export default function BusinessPartners() {
  return (
    <section id="business-partners" className="bg-dark-bg py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            <span className="text-gray-300">İş</span>{' '}
            <span className="text-primary-green">Ortaklarımız</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Bizimle çalışan değerli ortaklarımızın görüşleri
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-dark-card rounded-xl overflow-hidden border border-dark-card-light hover:border-primary-green/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-green/10"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image Section - Left Side, Fills Container */}
                <div className="relative w-full md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 flex-shrink-0">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-cover brightness-[0.6]"
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 384px"
                    priority
                    unoptimized={false}
                  />
                  {/* Dark Overlay for Darkening Effect */}
                  <div className="absolute inset-0 bg-black/30"></div>
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                  
                  {/* Name Overlay on Image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      {partner.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Instagram className="w-3 h-3 sm:w-4 sm:h-4 text-primary-green drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" />
                      <span className="text-primary-green text-xs sm:text-sm font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        {partner.instagram}
                      </span>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(partner.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 sm:w-4 sm:h-4 fill-primary-green text-primary-green drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Comment Section - Right Side */}
                <div className="flex-1 p-4 sm:p-6 flex items-center bg-dark-card-light">
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    "{partner.comment}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
