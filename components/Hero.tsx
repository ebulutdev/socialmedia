'use client'

import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Promotional Content */}
          <div className="md:col-span-2 bg-dark-card rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-green/10 to-transparent"></div>
            <div className="relative z-10">
              <button className="bg-primary-green text-white px-6 py-2 rounded-lg mb-6 hover:bg-primary-green-dark transition">
                Takipçi Satın Al
              </button>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Sosyal Evin Kalitesi ile{' '}
                <span className="text-primary-green">Etkileşimin Tadını Çıkarın!</span>
              </h1>
              <p className="text-gray-300 mb-6 text-lg">
                Tamamen otomatik sistem ile siparişleriniz 7 Gün 24 Saat hızlı ve
                sorunsuz bir şekilde tamamlanmaktadır.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gray-400">★</span>
                  ))}
                </div>
                <span className="bg-primary-green px-3 py-1 rounded-full text-sm font-bold">
                  4.7
                </span>
                <button className="flex items-center gap-2 text-primary-green hover:text-primary-green-light">
                  <Play className="w-5 h-5" />
                  <span>İzle</span>
                </button>
              </div>
            </div>
            {/* Empty Avatar Section */}
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
              <div className="w-full h-full bg-dark-card-light rounded-2xl"></div>
            </div>
          </div>

          {/* Right Featured Cards */}
          <div className="space-y-4">
            {/* Campaign Card 1 */}
            <div className="bg-dark-card rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-green/5 to-transparent"></div>
              <div className="relative z-10">
                {/* Empty Avatar Section */}
                <div className="w-full h-32 bg-dark-card-light rounded-lg mb-4"></div>
                <h3 className="text-xl font-bold mb-4">2026 YILINDA FIRSATLAR</h3>
                <button className="bg-dark-card-light text-white px-4 py-2 rounded-lg hover:bg-dark-card-light/80 transition flex items-center gap-2">
                  Hemen İncele
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Campaign Card 2 */}
            <div className="bg-primary-green rounded-2xl p-6 relative overflow-hidden">
              <div className="relative z-10">
                {/* Empty Avatar Section */}
                <div className="w-full h-32 bg-primary-green-dark rounded-lg mb-4"></div>
                <h3 className="text-xl font-bold mb-4">%100 ÜCRETSİZ ARAÇLAR</h3>
                <button className="bg-white text-primary-green px-4 py-2 rounded-lg hover:bg-gray-100 transition flex items-center gap-2">
                  Hemen İncele
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
