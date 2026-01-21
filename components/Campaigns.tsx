'use client'

import { ArrowUpRight } from 'lucide-react'

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
    <section className="bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">📢</span>
          <h2 className="text-2xl font-bold text-primary-green">Devam Eden Kampanyalar</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-dark-card rounded-xl p-6 relative overflow-hidden group hover:scale-105 transition-transform"
            >
              {/* Empty Avatar Section */}
              <div className="w-full h-24 bg-dark-card-light rounded-lg mb-4"></div>
              <h3 className="text-white font-semibold mb-2">{campaign.title}</h3>
              <p
                className={`text-sm font-semibold ${
                  campaign.status === 'active' ? 'text-primary-green' : 'text-red-500'
                }`}
              >
                {campaign.statusText}
              </p>
              <button className="absolute top-4 right-4 text-primary-green opacity-0 group-hover:opacity-100 transition">
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
