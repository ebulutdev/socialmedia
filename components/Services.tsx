'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Youtube, Radio } from 'lucide-react'
import { ServiceLogo } from './ServiceLogos'

const serviceImages = [
  '/images/Ekran Resmi 2026-01-22 01.40.05.png',
  '/images/Ekran Resmi 2026-01-22 01.40.47.png',
  '/images/Ekran Resmi 2026-01-22 01.41.26.png',
  '/images/Ekran Resmi 2026-01-22 01.42.13.png',
  '/images/Ekran Resmi 2026-01-22 01.43.46.png',
  '/images/Ekran Resmi 2026-01-22 01.40.05.png', // Twitch için placeholder
]

const services = [
  { id: 'instagram', name: 'INSTAGRAM', icon: Instagram, useServiceLogo: false, color: 'from-pink-500 to-purple-500' },
  { id: 'tiktok', name: 'TİKTOK', icon: null, useServiceLogo: true, color: 'from-purple-500 to-pink-500' },
  { id: 'twitter', name: 'TWITTER (X)', icon: null, useServiceLogo: true, color: 'from-blue-400 to-blue-600' },
  { id: 'youtube', name: 'YOUTUBE', icon: Youtube, useServiceLogo: false, color: 'from-red-500 to-red-700' },
  { id: 'facebook', name: 'FACEBOOK', icon: Facebook, useServiceLogo: false, color: 'from-blue-600 to-blue-800' },
  { id: 'twitch', name: 'TWITCH', icon: Radio, useServiceLogo: false, color: 'from-purple-600 to-purple-800' },
]

export default function Services() {
  return (
    <section id="services" className="bg-dark-bg py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <span className="text-xl sm:text-2xl">🔔</span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Popüler Platformlar</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="bg-gradient-to-br bg-dark-card rounded-xl p-4 sm:p-6 hover:scale-105 active:scale-[0.98] transition-transform border-2 border-dark-card-light hover:border-primary-green group cursor-pointer block relative overflow-hidden min-h-[140px] sm:min-h-[160px] md:min-h-[180px] touch-manipulation"
              >
                <Image
                  src={serviceImages[index] || serviceImages[0]}
                  alt={service.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-3 sm:mb-4 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center backdrop-blur-sm bg-opacity-90`}>
                    {service.useServiceLogo ? (
                      <ServiceLogo serviceId={service.id} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                    ) : (
                      Icon && <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                    )}
                  </div>
                  <p className="text-white font-bold text-xs sm:text-sm group-hover:text-primary-green transition text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] line-clamp-2">
                    {service.name}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="text-center">
          <button className="bg-dark-card text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-dark-card-light transition border-2 border-dark-card-light hover:border-primary-green min-h-[44px] text-sm sm:text-base font-medium w-full sm:w-auto">
            TÜM HİZMETLERİ GÖSTER
          </button>
        </div>
      </div>
    </section>
  )
}
