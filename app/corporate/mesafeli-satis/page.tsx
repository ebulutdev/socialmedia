'use client'

export default function MesafeliSatisPage() {
  return (
    <div className="bg-dark-card rounded-xl p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl sm:text-2xl">📄</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Mesafeli Satış Sözleşmesi</h1>
                </div>

                {/* Sections */}
                <div className="space-y-6 sm:space-y-8">
                  {/* 1. Taraflar */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">1. Taraflar</h2>
                    <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                      <p>
                        <strong className="text-white">SATICI:</strong> A Social Media
                      </p>
                      <p>
                        <strong className="text-white">Ünvanı:</strong> SosyalEvin Dijital Hizmetler LTD
                      </p>
                      <p>
                        <strong className="text-white">Vergi Dairesi:</strong> Gazimağusa
                      </p>
                      <p>
                        <strong className="text-white">Vergi Numarası:</strong> 160018143
                      </p>
                      <p>
                        <strong className="text-white">SLBT No:</strong> 1078
                      </p>
                      <p>
                        <strong className="text-white">Adres:</strong> Pertev Paşa Mah. Üç Çakırlar Cad. Borak Apt. Zemin Kat. Dük. No: 3 Aşağı Maraş Gazimağusa / KKTC
                      </p>
                      <p>
                        <strong className="text-white">Telefon:</strong> +90 850 850 13 13
                      </p>
                      <p>
                        <strong className="text-white">E-posta:</strong> scmmediasocial@gmail.com
                      </p>
                      <p className="mt-4">
                        <strong className="text-white">ALICI:</strong> Web sitesinde hizmet alan kullanıcı (bundan sonra "Müşteri" olarak anılacaktır).
                      </p>
                    </div>
                  </section>

                  {/* 2. Konu */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">2. Konu</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      İşbu sözleşmenin konusu, ALICI'nın web sitesinden elektronik ortamda sipariş verdiği, SATICI tarafından satışı yapılan dijital hizmetlerin (sosyal medya etkileşimi: takipçi, beğeni, izlenme vb.) satışı ve teslimi ile ilgili tarafların hak ve yükümlülüklerinin belirlenmesidir.
                    </p>
                  </section>

                  {/* 3. Hizmetin Özellikleri */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">3. Hizmetin Özellikleri</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Satın alınan hizmetin türü, içeriği, fiyatı ve ödeme detayları sipariş onayı aşamasında belirtilir. Dijital hizmetler fiziksel bir teslimat içermez.
                    </p>
                  </section>

                  {/* 4. Teslimat ve İfa */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">4. Teslimat ve İfa</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Hizmet, ödeme onaylandıktan sonra otomatik olarak başlatılır ve platform üzerinde belirtilen süre içerisinde tamamlanır. ALICI'nın yanlış bilgi vermesi durumunda gecikmelerden SATICI sorumlu tutulamaz.
                    </p>
                  </section>

                  {/* 5. Cayma Hakkı */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">5. Cayma Hakkı</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      ALICI, 6502 Sayılı Tüketicinin Korunması Hakkında Kanun uyarınca, hizmet henüz başlamamışsa, siparişten itibaren 14 gün içinde herhangi bir gerekçe göstermeksizin cayma hakkına sahiptir.
                    </p>
                  </section>

                  {/* 6. Cayma Hakkının Kullanılamayacağı Durumlar */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">6. Cayma Hakkının Kullanılamayacağı Durumlar</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Dijital hizmet anında ifa edilmeye başlandığında veya tüketiciye özgü olarak hazırlanan hizmetlerde cayma hakkı kullanılamaz. Bu kapsamda; takipçi, beğeni, izlenme gibi anında sunulan hizmetlerde hizmet başladıktan sonra iade mümkün değildir.
                    </p>
                  </section>

                  {/* 7. İade Şartları */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">7. İade Şartları</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Hizmetin hiç sunulmaması, teknik nedenlerle tamamlanamaması veya ALICI'nın iptal talebinin hizmet başlamadan önce yapılması halinde iade işlemi gerçekleştirilir. Ödemeler, ALICI'nın ödeme yaptığı yöntemle iade edilir.
                    </p>
                  </section>

                  {/* 8. Uyuşmazlıkların Çözümü */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">8. Uyuşmazlıkların Çözümü</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      İşbu sözleşmeden doğabilecek uyuşmazlıklarda, ALICI'nın bulunduğu yerdeki Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.
                    </p>
                  </section>

                  {/* 9. Yürürlük */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">9. Yürürlük</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      ALICI, sipariş verdiğinde işbu sözleşme hükümlerini okuduğunu, anladığını ve kabul ettiğini beyan eder. Sözleşme, ALICI'nın elektronik ortamda onay vermesi ile yürürlüğe girer.
                    </p>
                  </section>
                </div>
    </div>
  )
}
