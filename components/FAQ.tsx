'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "Sosyal Evin'e Neden Güvenmeliyim?",
    answer: 'Sosyal Evin olarak yıllardır binlerce müşteriye hizmet vermekteyiz. Güvenli ödeme sistemleri, 7/24 destek ve kaliteli hizmet garantisi sunuyoruz.',
  },
  {
    question: 'Ne Kadar Takipçi Satın Almalıyım?',
    answer: 'Takipçi miktarı hesabınızın mevcut durumuna ve hedeflerinize bağlıdır. Küçük hesaplar için 100-500 arası, orta hesaplar için 1000-5000 arası önerilir.',
  },
  {
    question: 'Aldığım Instagram Takipçileri Kaliteli mi?',
    answer: 'Evet, tüm takipçilerimiz gerçek ve aktif kullanıcılardır. Organik büyüme sağlamak için kaliteli takipçi paketleri sunuyoruz.',
  },
  {
    question: 'Takipçi Sayım Azalıyor Ne Yapmalıyım?',
    answer: 'Takipçi düşüşleri normaldir. Düşmeyen takipçi paketlerimizi tercih edebilir veya destek ekibimizle iletişime geçebilirsiniz.',
  },
  {
    question: 'Aldığım Hizmetlerde Düşme Olur mu?',
    answer: 'Düşmeyen paketlerimizde garantili düşme yoktur. Standart paketlerde küçük düşüşler olabilir ancak bu normaldir ve destek ekibimiz size yardımcı olacaktır.',
  },
  {
    question: 'Ödeme İşlemleri Güvenli mi?',
    answer: 'Evet, 3D Secure ödeme sistemi kullanıyoruz. Tüm ödemeleriniz SSL sertifikası ile korunmaktadır.',
  },
  {
    question: 'Takipçiler Gerçek Kullanıcılar mı?',
    answer: 'Evet, tüm takipçilerimiz gerçek ve aktif Instagram kullanıcılarıdır. Bot veya sahte hesap kullanmıyoruz.',
  },
  {
    question: 'Aldığım Takipçiler Bana Ne Zaman Ulaşır?',
    answer: 'Siparişleriniz genellikle 0-30 dakika içinde başlar ve paket boyutuna göre 24-72 saat içinde tamamlanır.',
  },
  {
    question: 'Ucuz Takipçi Nedir?',
    answer: 'Ucuz takipçi paketlerimiz, daha uygun fiyatlı ancak yine de kaliteli takipçi hizmeti sunmaktadır. Hızlı teslimat ve güvenilir hizmet garantisi ile.',
  },
  {
    question: 'Siparişlerimin Teslim Süresi Ne Kadar?',
    answer: 'Teslimat süresi paket boyutuna göre değişir. Küçük paketler (100-1000) 0-24 saat, orta paketler (1000-10000) 24-48 saat, büyük paketler 48-72 saat içinde tamamlanır.',
  },
  {
    question: 'Şifre Vermem Gerekiyor mu?',
    answer: 'Hayır, kesinlikle şifre istemiyoruz. Sadece kullanıcı adınız yeterlidir. Şifre isteyen sitelere güvenmeyin.',
  },
  {
    question: 'Satış Sonrası Destek Oluyor musunuz?',
    answer: 'Evet, 7/24 canlı destek hizmetimiz mevcuttur. Sipariş sonrası herhangi bir sorunuz veya sorununuz için destek ekibimizle iletişime geçebilirsiniz.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-dark-bg py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-dark-card rounded-full flex items-center justify-center">
            <span className="text-2xl">❓</span>
          </div>
          <h2 className="text-4xl font-bold">Sıkça Sorulan Sorular</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-dark-card rounded-xl p-6 cursor-pointer hover:bg-dark-card-light transition"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-primary-green text-xl">✨</span>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                    {openIndex === index && (
                      <p className="text-gray-300 text-sm mt-2">{faq.answer}</p>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
