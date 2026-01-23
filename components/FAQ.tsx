'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "subjective'a Neden Güvenmeliyim?",
    answer: 'subjective olarak yıllardır binlerce müşteriye hizmet vermekteyiz. Güvenli ödeme sistemleri, 7/24 destek ve kaliteli hizmet garantisi sunuyoruz.',
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
    <section className="bg-dark-bg py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-dark-card rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xl sm:text-2xl">❓</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Sıkça Sorulan Sorular</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-dark-card rounded-xl p-4 sm:p-6 cursor-pointer active:bg-dark-card-light sm:hover:bg-dark-card-light transition touch-manipulation min-h-[60px]"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                  <span className="text-primary-green text-lg sm:text-xl flex-shrink-0">✨</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold mb-2 text-sm sm:text-base leading-tight">{faq.question}</h3>
                    {openIndex === index && (
                      <p className="text-gray-300 text-xs sm:text-sm mt-2 leading-relaxed">{faq.answer}</p>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0 transition-transform min-w-[24px] ${
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
