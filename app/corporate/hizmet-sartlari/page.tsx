'use client'

export default function HizmetSartlariPage() {
  return (
    <div className="bg-dark-card rounded-xl p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl sm:text-2xl">📋</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Hizmet Şartları</h1>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                  Bu sözleşme, bir tarafta subjective ("Firma") ile diğer tarafta web sitesine kayıt olan ve/veya hizmetlerinden faydalanan Kullanıcı arasında geçerlidir.
                </p>

                {/* Sections */}
                <div className="space-y-6 sm:space-y-8">
                  {/* 1. Taraflar ve Tanımlar */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">1. Taraflar ve Tanımlar</h2>
                    <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                      <p>
                        <strong className="text-white">SATICI:</strong> subjective
                      </p>
                      <p>
                        <strong className="text-white">E-posta:</strong> asocialmedianiz@gmail.com
                      </p>
                      <p className="mt-4">
                        <strong className="text-white">Hizmet:</strong> Firma tarafından sunulan sosyal medya etkileşimi artırmaya yönelik dijital hizmetlerdir.
                      </p>
                      <p>
                        <strong className="text-white">Platform:</strong> subjective'ın hizmet sunduğu web sitesidir.
                      </p>
                    </div>
                  </section>

                  {/* 2. Sözleşmenin Konusu */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">2. Sözleşmenin Konusu</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Bu sözleşme, subjective tarafından sunulan dijital hizmetlerin kullanım koşullarını ve tarafların hak ve yükümlülüklerini belirler. Platformu kullanan her kullanıcı bu şartları kabul etmiş sayılır.
                    </p>
                  </section>

                  {/* 3. Kullanıcı Yükümlülükleri */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">3. Kullanıcı Yükümlülükleri</h2>
                    <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                      <p>
                        <strong className="text-white">3.1 Gerçek Bilgi Sağlama:</strong> Kullanıcı, verdiği tüm bilgilerin doğru olduğunu beyan eder.
                      </p>
                      <p>
                        <strong className="text-white">3.2 Hizmeti Amacına Uygun Kullanım:</strong> Kullanıcı, hizmetleri sadece yasal sınırlar içinde kullanmayı taahhüt eder.
                      </p>
                      <p>
                        <strong className="text-white">3.3 Hizmet Sonuçlarını Kabullenme:</strong> Algoritmalardan doğan değişken sonuçları kabul eder.
                      </p>
                      <p>
                        <strong className="text-white">3.4 Üçüncü Taraf Hakları:</strong> Başka kişilerin haklarını ihlal etmeyeceğini kabul eder.
                      </p>
                    </div>
                  </section>

                  {/* 4. Yasaklı Hizmetler */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">4. Yasaklı Hizmetler</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                      subjective platformu aşağıdaki içerik veya hizmetleri hiçbir koşulda desteklemez ve bu tür taleplere yönelik hiçbir işlem yapılmaz:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base ml-4">
                      <li>Kumar, bahis, şans oyunları</li>
                      <li>+18 içerikler (erotik/nesnel cinsel içerik)</li>
                      <li>Her türlü yasa dışı faaliyet veya içerik</li>
                    </ul>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-4">
                      Bu kapsamdaki hiçbir talep kabul edilmez, işleme alınmaz, destek sağlanmaz ve ücret iadesine konu edilmez.
                    </p>
                  </section>

                  {/* 5. Hizmet Şartları */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">5. Hizmet Şartları</h2>
                    <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                      <p>
                        <strong className="text-white">5.1 Teslimat Süresi:</strong> Hizmetler ödeme onayı sonrası belirtilen sürelerde sağlanır.
                      </p>
                      <p>
                        <strong className="text-white">5.2 Platform Güncellemeleri:</strong> Sosyal medya platformlarındaki değişikliklerden kaynaklı gecikmeler yaşanabilir.
                      </p>
                      <p>
                        <strong className="text-white">5.3 Kalıcı Olmayan Hizmetler:</strong> Takipçi gibi hizmetlerde düşüş olabilir, kalıcılık garantisi verilmez.
                      </p>
                    </div>
                  </section>

                  {/* 6. Ödeme ve Faturalandırma */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">6. Ödeme ve Faturalandırma</h2>
                    <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                      <p>
                        <strong className="text-white">6.1. Güvenli Ödeme:</strong> Kullanıcı tarafından yapılan tüm ödemeler, subjective'ın anlaşmalı olduğu yerli ve/veya uluslararası ödeme hizmeti sağlayıcıları üzerinden, SSL ve benzeri güvenlik protokolleri kullanılarak gerçekleştirilir. Kullanıcı, ödeme altyapısının üçüncü taraf hizmet sağlayıcılar tarafından yürütüldüğünü ve bu sağlayıcıların kendi kullanım koşullarına tabi olduğunu kabul eder.
                      </p>
                      <p>
                        <strong className="text-white">6.2. Faturalandırma:</strong> Kullanıcı tarafından satın alınan hizmetler için, Kullanıcı'nın sipariş sırasında beyan ettiği fatura bilgileri esas alınarak dijital fatura düzenlenir ve Kullanıcı'ya elektronik ortamda (e-posta veya kullanıcı paneli üzerinden) iletilir. Kullanıcı, fatura bilgilerinin doğruluğundan münhasıran sorumludur; hatalı bilgi nedeniyle doğabilecek her türlü hukuki ve mali sorumluluk Kullanıcı'ya aittir.
                      </p>
                      <p>
                        <strong className="text-white">6.3. Hizmet İhracatı ve KDV Uygulaması:</strong> subjective, Kuzey Kıbrıs Türk Cumhuriyeti Serbest Liman Bölgesi'nde mukim Sosyal Evin Dijital Hizmetler LTD unvanlı şirket üzerinden sosyal medya etkileşimi artırmaya yönelik dijital hizmet sunmaktadır. Bu kapsamda sağlanan hizmetler, niteliği gereği "hizmet ihracatı" mahiyetinde olup, yürürlükteki KKTC ve Türkiye mevzuatına göre KDV'ye tabi değildir.
                      </p>
                      <p>
                        Bu nedenle düzenlenen faturalarda, işlemin hizmet ihracatı kapsamında olduğu ve KDV oranının %0 (sıfır) olduğu açıkça belirtilir; faturada "%0 KDV / VAT – Hizmet İhracatı – Reverse Charge" veya benzeri açıklamalara yer verilebilir.
                      </p>
                      <p>
                        <strong className="text-white">6.4. Alıcının Vergi Sorumluluğu (Reverse Charge):</strong> Kullanıcı, subjective'dan satın aldığı hizmetlerin kendi ülkesindeki vergi mevzuatına göre "hizmet ithalatı" veya benzeri bir vergisel kategoriye tabi olabileceğini kabul eder. Bu kapsamda;
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Kullanıcı, kendi ülkesindeki KDV, VAT, GST, Sales Tax ve benzeri tüm dolaylı vergilere ilişkin doğabilecek beyan, ödeme ve bildirim yükümlülüklerini Reverse Charge (Tersine Vergi Yükümlülüğü) esasına göre bizzat yerine getirmekle yükümlüdür.</li>
                        <li>subjective, Kullanıcı'nın bulunduğu ülkedeki vergi idaresine karşı herhangi bir KDV/VAT sorumluluğu üstlenmez ve Kullanıcı'nın yerel vergi mevzuatından kaynaklanan yükümlülüklerinden dolayı hiçbir şekilde sorumlu tutulamaz.</li>
                        <li>Kullanıcı, Platform'u kullanmakla, bu vergisel durumu bildiğini, anladığını ve kabul ettiğini peşinen beyan eder.</li>
                      </ul>
                    </div>
                  </section>

                  {/* 7. İptal ve İade Koşulları */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">7. İptal ve İade Koşulları</h2>
                    <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                      <p>
                        <strong className="text-white">7.1 Hizmet Başlamadan Önce:</strong> Sipariş iptal edilebilir ve ücret iadesi yapılır.
                      </p>
                      <p>
                        <strong className="text-white">7.2 Hizmet Başladıktan Sonra:</strong> İade yapılmaz, ancak sistemsel sorun durumunda ücret iadesi mümkündür.
                      </p>
                    </div>
                  </section>

                  {/* 8. Gizlilik ve Veri Koruma */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">8. Gizlilik ve Veri Koruma</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Firma, kişisel verileri KVKK ve ilgili mevzuata uygun şekilde işler, saklar ve üçüncü kişilerle paylaşmaz.
                    </p>
                  </section>

                  {/* 9. Sorumluluk Reddi */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">9. Sorumluluk Reddi</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Firma, algoritma değişiklikleri, teknik aksaklıklar veya kullanıcı hatalarından kaynaklanan sorunlardan sorumlu değildir.
                    </p>
                  </section>

                  {/* 10. Yapay Zekâ ve Otomatik Sistemler */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">10. Yapay Zekâ ve Otomatik Sistemler İçin İçerik Kullanım Politikası</h2>
                    <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                      <p>
                        Bu web sitesinde yer alan tüm metin, görsel, video, veri ve diğer içerikler 5846 Sayılı Fikir ve Sanat Eserleri Kanunu ve ilgili uluslararası fikri mülkiyet yasaları kapsamında korunmaktadır.
                      </p>
                      <p>
                        İzinsiz şekilde yapay zekâ modellerinin eğitimi, geliştirilmesi veya veri seti oluşturulması amacıyla kullanılması yasaktır.
                      </p>
                      <p>
                        Arama motorları tarafından içeriklerin dizinlenmesi ve kullanıcı arama sonuçlarında gösterilmesi serbesttir.
                      </p>
                      <p>
                        Ancak ticari amaçlı yapay zekâ hizmetleri, veri toplama botları, web tarayıcıları veya otomatik sistemler içeriklerimizi kullanmadan önce yazılı izin almak zorundadır.
                      </p>
                      <p>
                        Bu hükme aykırı hareket eden kişi veya kurumlar hakkında yasal işlem hakkımız saklıdır.
                      </p>
                    </div>
                  </section>

                  {/* 11. Tebligat */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">11. Tebligat</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Tarafların üyelik sırasında belirttiği e-posta adresleri resmi tebligat adresi olarak kabul edilir.
                    </p>
                  </section>

                  {/* 12. Uyuşmazlıkların Çözümü */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">12. Uyuşmazlıkların Çözümü</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Uyuşmazlıklarda Kuzey Kıbrıs Türk Cumhuriyeti ve Türkiye Cumhuriyeti yasaları geçerlidir. KKTC ve İstanbul Mahkemeleri yetkilidir.
                    </p>
                  </section>
                </div>
    </div>
  )
}
