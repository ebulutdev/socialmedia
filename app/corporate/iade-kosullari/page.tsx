'use client'

export default function IadeKosullariPage() {
  return (
    <div className="bg-dark-card rounded-xl p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl sm:text-2xl">📖</span>
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">İade ve İptal Politikası</h1>
                    <p className="text-gray-300 text-sm sm:text-base">
                      subjective dijital hizmetlerine ait iade koşullarını öğrenin. Hangi durumlarda iade yapılır, süreç nasıl işler? Tüm detaylar bu sayfada!
                    </p>
                  </div>
                </div>

                {/* Sections */}
                <div className="space-y-6 sm:space-y-8">
                  {/* 1. Genel Bilgilendirme */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">1. Genel Bilgilendirme</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      subjective olarak kullanıcı memnuniyetini ön planda tutmaktayız. Satın alınan dijital hizmetler kapsamında iade işlemleri, ilgili yasal mevzuata ve aşağıda belirtilen koşullara uygun olarak gerçekleştirilmektedir.
                    </p>
                  </section>

                  {/* 2. Hangi Durumlarda İade Yapılır? */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">2. Hangi Durumlarda İade Yapılır?</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base ml-4">
                      <li>Hizmet, teknik bir arıza nedeniyle hiç başlatılamadıysa,</li>
                      <li>Sipariş oluşturulduktan sonra hizmete başlanmadan önce kullanıcı tarafından iptal edildiyse,</li>
                      <li>Hizmetin açıklamasında belirtilen teslim süresi aşılmış ve hizmet tamamlanmamışsa,</li>
                      <li>Sistemsel hata veya hizmetin sağlanamaması nedeniyle kullanıcıya değer sunulamamışsa.</li>
                    </ul>
                  </section>

                  {/* 3. Hangi Durumlarda İade Yapılmaz? */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">3. Hangi Durumlarda İade Yapılmaz?</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base ml-4">
                      <li>Dijital hizmet belirtilen sürede başlatılmışsa,</li>
                      <li>Kullanıcı hatalı bilgi girişi yapmışsa,</li>
                      <li>Sosyal medya algoritmalarındaki değişikliklerden kaynaklı performans düşüşü yaşanmışsa,</li>
                      <li>Hizmet amacı dışında kullanılmışsa,</li>
                      <li>Beğeni veya takipçi hizmetlerinde doğal düşüş yaşanmışsa,</li>
                      <li>Kod olarak teslim edilen siparişlerde,</li>
                      <li>Hesapta kalan bonus bakiyelerde,</li>
                      <li>Kumar, bahis, şans oyunları, +18 içerikler veya yasa dışı hizmetlere yönelik siparişlerde.</li>
                    </ul>
                  </section>

                  {/* 4. Bonus Bakiye Kullanımı ve İade Şartları */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">4. Bonus Bakiye Kullanımı ve İade Şartları</h2>
                    <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                      <p>
                        subjective tarafından promosyon, kampanya ya da manuel olarak tanımlanan bonus bakiyeler yalnızca kullanım amaçlıdır; nakit değeri yoktur ve herhangi bir şekilde iade edilemez.
                      </p>
                      <p>
                        Bonus bakiyelerle yapılan işlemler sonrasında, ilgili hesabın iade talebi geçersiz sayılır. Kullanıcı, bonus bakiyesi tanımlandıktan sonra herhangi bir hizmet satın aldıysa ya da sistemi kullandıysa, bonusun etkilediği tüm işlemler iade dışı kalır.
                      </p>
                      <p>
                        Kullanıcıların parça parça yükleme yapmaları, sonradan yüklenen tutarlar için iade istemeleri ya da bonusla karışık bakiye kullanmaları durumunda, sistem tarafından ilk harcanan tutar bonus olarak sayılır. Bu nedenle bonus harcanmışsa, kalan bakiyenin iadesi mümkün değildir.
                      </p>
                      <p>
                        Kullanıcı, bakiye yüklemesi yaptığı anda bu şartları kabul etmiş sayılır.
                      </p>
                    </div>
                  </section>

                  {/* 5. İade Süreci */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">5. İade Süreci</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      İade talebi için kullanıcı, <strong className="text-primary-green">scmmediasocial@gmail.com</strong> adresine e-posta göndermelidir. Talep en geç 3 iş günü içinde değerlendirilir ve uygun görülmesi halinde, ödeme yapılan yöntemle 5 iş günü içerisinde iade gerçekleştirilir.
                    </p>
                  </section>

                  {/* 6. Yasal Dayanak */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">6. Yasal Dayanak</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      İade süreçleri, 6502 Sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği'ne uygun olarak yürütülür. Dijital içerikler, hizmete başlanması halinde cayma hakkı dışındadır.
                    </p>
                  </section>

                  {/* 7. Kullanıcının Sorumlulukları */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">7. Kullanıcının Sorumlulukları</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Kullanıcı, sipariş öncesi hizmet açıklamalarını dikkatle okumalı ve bilgilerini doğru girmelidir. Hatalı siparişlerde sorumluluk kullanıcıya aittir.
                    </p>
                  </section>
                </div>
    </div>
  )
}
