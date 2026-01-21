'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const campaignImages = [
  '/images/Ekran Resmi 2026-01-22 01.46.02.png',
  '/images/Ekran Resmi 2026-01-22 01.40.05.png',
  '/images/Ekran Resmi 2026-01-22 01.42.13.png',
]

const campaigns = [
  {
    id: 1,
    title: '2026 Yılında Bol Etkileşim Kampanyası!',
    status: 'active',
    statusText: 'Devam Ediyor',
  },
  {
    id: 2,
    title: "Yıl Sonuna Kadar %50'ye Varan İndirimli...",
    status: 'expired',
    statusText: 'Süresi Doldu',
  },
  {
    id: 3,
    title: "Instagram'da İzlenmelerinizi...",
    status: 'expired',
    statusText: 'Süresi Doldu',
  },
]

export default function Campaigns() {
  return (
    <section className="bg-dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xl">📢</span>
          <h2 className="text-xl font-bold text-primary-green">Devam Eden Kampanyalar</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-dark-card rounded-lg relative overflow-hidden aspect-square max-w-[260px] mx-auto group cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <Image
                src={campaignImages[campaign.id - 1] || campaignImages[0]}
                alt={campaign.title}
                fill
                className="object-cover"
                sizes="260px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10 p-3">
                <h3 className="text-sm font-semibold text-white drop-shadow-2xl leading-tight mb-1.5 line-clamp-2">{campaign.title}</h3>
                <div className="flex items-center justify-between">
                  <p
                    className={`text-xs font-semibold ${
                      campaign.status === 'active' ? 'text-primary-green' : 'text-red-400'
                    }`}
                  >
                    {campaign.statusText}
                  </p>
                  <button className="text-primary-green hover:text-primary-green-light transition opacity-0 group-hover:opacity-100">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
