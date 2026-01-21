'use client'

import Link from 'next/link'
import { Instagram, Facebook, Youtube, Music, Twitter } from 'lucide-react'

const services = [
  { id: 'instagram', name: 'INSTAGRAM', icon: Instagram, color: 'from-pink-500 to-purple-500' },
  { id: 'tiktok', name: 'TİKTOK', icon: Music, color: 'from-purple-500 to-pink-500' },
  { id: 'twitter', name: 'TWITTER (X)', icon: Twitter, color: 'from-blue-400 to-blue-600' },
  { id: 'youtube', name: 'YOUTUBE', icon: Youtube, color: 'from-red-500 to-red-700' },
  { id: 'facebook', name: 'FACEBOOK', icon: Facebook, color: 'from-blue-600 to-blue-800' },
]

export default function Services() {
  return (
    <section className="bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-2xl">🔔</span>
          <h2 className="text-3xl font-bold">Popüler Platformlar</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="bg-gradient-to-br bg-dark-card rounded-xl p-6 hover:scale-105 transition-transform border-2 border-dark-card-light hover:border-primary-green group cursor-pointer block"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-white font-bold text-sm group-hover:text-primary-green transition text-center">
                  {service.name}
                </p>
              </Link>
            )
          })}
        </div>
        <div className="text-center">
          <button className="bg-dark-card text-white px-8 py-3 rounded-lg hover:bg-dark-card-light transition border-2 border-dark-card-light hover:border-primary-green">
            TÜM HİZMETLERİ GÖSTER
          </button>
        </div>
      </div>
    </section>
  )
}
