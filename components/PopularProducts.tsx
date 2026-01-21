'use client'

import { ShoppingCart } from 'lucide-react'

// SMM Turk API'den seçilen en iyi Instagram hizmetleri
const products = [
  {
    service: 'Instagram',
    name: '1.000 Takipçi [30 Gün Garantili]',
    price: '53,28₺',
    serviceId: '9403',
  },
  {
    service: 'Instagram',
    name: '1.000 Beğeni [30 Gün Garantili]',
    price: '7,12₺',
    serviceId: '9397',
  },
  {
    service: 'Instagram',
    name: '10.000 Video İzlenme',
    price: '3,64₺',
    serviceId: '9336',
  },
  {
    service: 'Instagram',
    name: '5.000 Hikaye İzlenme',
    price: '19,48₺',
    serviceId: '9337',
  },
  {
    service: 'Instagram',
    name: '100 Türk Repost',
    price: '380,84₺',
    serviceId: '9335',
  },
  {
    service: 'TikTok',
    name: '1.000 Takipçi',
    price: '209,00₺',
  },
  {
    service: 'TikTok',
    name: '2.500 Beğeni',
    price: '79,00₺',
  },
  {
    service: 'TikTok',
    name: '500 Takipçi',
    price: '120,00₺',
  },
  {
    service: 'TikTok',
    name: '50.000 İzlenme',
    price: '99,00₺',
  },
  {
    service: 'TikTok',
    name: '750 Takipçi',
    price: '175,00₺',
  },
  {
    service: 'Twitter (X)',
    name: '250 Twitter Favori',
    price: '221,07₺',
  },
  {
    service: 'Twitter (X)',
    name: '250 ReTweet',
    price: '138,51₺',
  },
  {
    service: 'Twitter (X)',
    name: '500 Global Takipçi',
    price: '373,50₺',
  },
  {
    service: 'Twitter (X)',
    name: '10.000 Video İzlenme',
    price: '121,00₺',
  },
  {
    service: 'Twitter (X)',
    name: '10.000 Etkileşim',
    price: '110,00₺',
  },
]

const services = ['Instagram', 'TikTok', 'Twitter (X)', 'Facebook', 'YouTube']

export default function PopularProducts() {
  const getProductsByService = (serviceName: string) => {
    return products.filter((p) => p.service === serviceName).slice(0, 5)
  }

  return (
    <section className="bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-primary-green">#Keşfet</span>{' '}
          <span className="text-white">BU AYIN ENLERİ</span>
        </h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((service) => {
            const serviceProducts = getProductsByService(service)
            if (serviceProducts.length === 0) return null

            return (
              <div key={service} className="bg-dark-card rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-8 bg-primary-green rounded"></div>
                  <div>
                    <p className="text-gray-400 text-xs">En Çok Satan</p>
                    <h3 className="text-white font-bold">{service} Ürünleri</h3>
                  </div>
                </div>
                <div className="space-y-3">
                  {serviceProducts.map((product, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 p-2 hover:bg-dark-card-light rounded transition"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {/* Empty Icon Placeholder */}
                        <div className="w-8 h-8 bg-primary-green/20 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-primary-green text-xs">📦</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm truncate">
                            {product.service}
                          </p>
                          <p className="text-gray-400 text-xs truncate">{product.name}</p>
                          <p className="text-white text-sm font-bold">{product.price}</p>
                        </div>
                      </div>
                      <button className="bg-primary-green p-2 rounded-lg hover:bg-primary-green-dark transition flex-shrink-0">
                        <ShoppingCart className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
