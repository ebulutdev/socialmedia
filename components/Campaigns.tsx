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
    <section id="campaigns" className="bg-dark-bg py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex items-center gap-2 mb-4 sm:mb-5">
          <span className="text-lg sm:text-xl">📢</span>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary-green">Devam Eden Kampanyalar</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-dark-card rounded-lg relative overflow-hidden aspect-square max-w-full sm:max-w-[260px] mx-auto group cursor-pointer active:scale-[0.98] sm:hover:scale-[1.02] transition-transform touch-manipulation"
            >
              <Image
                src={campaignImages[campaign.id - 1] || campaignImages[0]}
                alt={campaign.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 260px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10 p-3 sm:p-4">
                <h3 className="text-xs sm:text-sm font-semibold text-white drop-shadow-2xl leading-tight mb-2 sm:mb-1.5 line-clamp-2">{campaign.title}</h3>
                <div className="flex items-center justify-between">
                  <p
                    className={`text-[10px] sm:text-xs font-semibold ${
                      campaign.status === 'active' ? 'text-primary-green' : 'text-red-400'
                    }`}
                  >
                    {campaign.statusText}
                  </p>
                  <button className="text-primary-green hover:text-primary-green-light transition opacity-0 group-hover:opacity-100 sm:opacity-100 min-w-[44px] min-h-[44px] flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
