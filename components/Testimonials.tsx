'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Nil Anka',
    role: 'Influencer',
    text: "SosyalEvin ailesinde yıllardır olmaktan çok mutluyum. Sosyal medya iş ve sanat dünyasının ve özel yaşamlarımızın kartviziti oldu. Hizmetleri gerçekten kaliteli ve güvenilir.",
  },
  {
    name: 'Ecemnur Özenç',
    role: 'Mütercim Tercüman',
    text: 'İnanılmaz bir hizmet veriyorlar. Benim üçüncü sosyal medya hizmeti aldığım site. Sonunda doğruyu buldum diyebilirim. Müşteri hizmetleri çok hızlı ve çözüm odaklı.',
  },
  {
    name: 'Moana Smile',
    role: 'CEO of Niwax',
    text: "Türkiye'de olduğum vakit yeni kurduğumuz kafenin sosyal medya hesaplarını popüler hale getirmek istiyorduk. SosyalEvin sayesinde hedeflerimize ulaştık. Teşekkürler!",
  },
  {
    name: 'Aykut Eroğlu',
    role: 'Broker',
    text: "Gerçekten çok işime yaradı. Twitter'da fenomen olmak için durmadan tweet atıyor ve farklı şeyler bulmaya çalışıyorum. SosyalEvin'in hizmetleri sayesinde takipçi sayım arttı.",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Featured Card */}
          <div className="md:col-span-1">
            <div className="bg-primary-green rounded-2xl p-6 mb-4 relative overflow-hidden">
              {/* Empty Avatar Section */}
              <div className="w-full h-48 bg-white/10 rounded-xl mb-4"></div>
              <div className="bg-dark-card rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">G</span>
                  <span className="text-white font-semibold">Google İşletme</span>
                </div>
                <p className="text-gray-300 text-sm">4.079 Yorum, 4.7 Puan</p>
              </div>
            </div>
          </div>

          {/* Right Testimonials Grid */}
          <div className="md:col-span-2">
            <div className="grid md:grid-cols-2 gap-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-dark-card rounded-xl p-6 hover:bg-dark-card-light transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {/* Empty Avatar */}
                      <div className="w-12 h-12 bg-dark-card-light rounded-lg"></div>
                      <div>
                        <h4 className="text-white font-semibold">{testimonial.name}</h4>
                        <p className="text-primary-green text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-primary-green text-primary-green"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{testimonial.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="bg-primary-green text-white px-8 py-3 rounded-lg hover:bg-primary-green-dark transition font-semibold">
                DAHA FAZLA GÖSTER
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
