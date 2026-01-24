'use client'

export default function KVKKPage() {
  return (
    <div className="bg-dark-card rounded-xl p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl sm:text-2xl">🔒</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Gizlilik Politikası</h1>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                  6698 sayılı Kişisel Verilerin Korunması Kanunu, 07.04.2016 tarih ve 29677 sayılı Resmi Gazete'de yayınlanarak yürürlüğe girmiştir. Uluslararası belgeler, mukayeseli hukuk uygulamaları ve ülkemiz ihtiyaçları göz önüne alınmak suretiyle hazırlanan Kanun ile kişisel verilerin çağdaş standartlarda işlenmesi ve koruma altına alınması amaçlanmaktadır. Bu kapsamda Kanunun amacı; kişisel verilerin işlenme şartlarını, kişisel verilerin işlenmesinde kişilerin temel hak ve özgürlüklerinin korunmasını ve kişisel verileri işleyen gerçek ve tüzel kişilerin yükümlülükleri ile uyacakları usul ve esasları düzenlemektir.
                </p>

                <p className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                  Şirketimiz, 6698 sayılı Kişisel Verilerin Korunması Kanunu'na uymakla yükümlüdür ve faaliyet süreçlerinde işlenen tüm kişisel veriler bu kanun kapsamındadır.
                </p>

                <p className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                  subjective, veri sorumlusu sıfatıyla hareket etmekte ve kişisel verilerin korunması hakkında gerekli önlemleri almaktayız.
                </p>

                {/* Sections */}
                <div className="space-y-6 sm:space-y-8">
                  {/* Kişisel Verilerin İşlenmesinde Genel İlkeler */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Kişisel Verilerin İşlenmesinde Genel İlkeler</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                      Şirketimiz, kişisel verilerin işlenmesinde 6698 sayılı Kanun'un ortaya koymuş olduğu genel ilkelere uygun davranmaktadır. Kişisel verilerin işlenmesinde genel ilkelerimiz şu şekildedir:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base ml-4">
                      <li>Hukuka ve dürüstlük kurallarına uygun olma,</li>
                      <li>Doğru ve gerektiğinde güncel olma,</li>
                      <li>Belirli, açık ve meşru amaçlar için işlenme,</li>
                      <li>İşlendikleri amaçla bağlantılı, sınırlı ve ölçülü olma,</li>
                      <li>İlgili mevzuatta öngörülen veya işlendikleri amaç için gerekli olan süre kadar muhafaza etme.</li>
                    </ul>
                  </section>

                  {/* Kişisel Veri Toplama */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Kişisel Veri Toplama</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                      Kişisel verileriniz, Şirketimiz tarafından verilen hizmet, ürün ya da ticari faaliyete bağlı olarak değişkenlik gösterebilmekle birlikte otomatik ya da otomatik olmayan yöntemlerle, Şirketimizin ve üye iş yerlerimizin ofisler, şubeler, bayiler, çağrı merkezi, internet sitesi, sosyal medya mecraları, mobil uygulamalar ve benzeri vasıtalarla sözlü, yazılı ya da elektronik olarak toplanabilecektir.
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Ayrıca Şirketimiz hizmetlerini kullanmak niyetiyle çağrı merkezimizi aradığınızda, internet sitemizi ziyaret ettiğinizde, şirketimizin düzenlediği eğitim, seminer, organizasyon ve toplantılara katıldığınızda kişisel verileriniz işlenebilecektir.
                    </p>
                  </section>

                  {/* Kişisel Veri Toplamanın Hukuki Sebebi */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Kişisel Veri Toplamanın Hukuki Sebebi</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                      Kişisel verileriniz, her türlü sözlü, yazılı ya da elektronik ortamda, yukarıda yer verilen amaçlar doğrultusunda Şirketçe sunduğumuz ürün ve hizmetlerin belirlenen yasal çerçevede sunulabilmesi ve bu kapsamda Şirketimizin sözleşme ve yasadan doğan mesuliyetlerini eksiksiz ve doğru bir şekilde yerine getirebilmesi gayesi ile edinilir. Bu hukuki sebeple toplanan kişisel verileriniz KVK Kanunu'nun 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları kapsamında bu metinde belirtilen amaçlarla da işlenebilmekte ve aktarılabilmektedir.
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                      Kişisel veriler, şirketimiz tarafından:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base ml-4">
                      <li>Sunulan hizmetlerin iyileştirilmesi, yeni hizmetlerin geliştirilmesi ve bununla ilgili bilgilendirme yapılması,</li>
                      <li>Ticari elektronik ileti onayı mevcut müşteriler ve aday müşteriler açısından; kampanya ve hizmetlerin tanıtımı ile pazarlamasının yapılması,</li>
                      <li>Müşteri sorun ve şikâyetlerinin çözümlenmesi,</li>
                      <li>İstatistiksel değerlendirmeler ve pazar araştırmaları yapılması,</li>
                      <li>Şirketin ticari ve iş stratejilerinin belirlenmesi ve uygulanması,</li>
                      <li>Üye iş yerleri ve iş ortakları ile ilişkilerin yönetilmesi,</li>
                      <li>Muhasebe ve ödeme işlemlerinin takibi,</li>
                      <li>Hukuki süreçler ve mevzuata uyum,</li>
                      <li>İdari ve adli makamlardan gelen bilgi taleplerinin cevaplandırılması,</li>
                      <li>Şirket içi raporlama ve iş geliştirme faaliyetlerinin planlanması,</li>
                      <li>Finansal kontrol ve raporlamaların yapılarak yasal bildirimlerin gerçekleştirilmesi,</li>
                      <li>İç kontrol ve denetim faaliyetlerinin yönetilmesi,</li>
                      <li>Bilgi ve işlem güvenliği sağlanması ve kötü amaçlı kullanımın önlenmesi,</li>
                      <li>İşlenen verilerin güncel ve doğru olmasının sağlanması amacıyla gerekli düzenlemelerin yapılması</li>
                    </ul>
                  </section>

                  {/* İşlenen Kişisel Verilerin Aktarımı */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">İşlenen Kişisel Verilerin Aktarımı</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Şirketimiz, kişisel verilerinizi yurt içi ve yurt dışındaki iş ortaklarımız, üye iş yerlerimiz, bankalar, finansal kuruluşlar, bağımsız denetim kuruluşları vb. Ödeme ve Menkul Kıymet Mutabakat Sistemleri, Ödeme Hizmetleri ve Elektronik Para Kuruluşları Hakkında Kanun ve diğer mevzuat hükümlerinin izin verdiği kişi ve kuruşlar ile paylaşabilir. Saklanan veriler, KVK Kanunu'nun 8. ve 9. Maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-4">
                      Şirketimizin müşterileri ile gerçekleştirdiği işlemlere ilişkin kayıt ve belgelerin yasal düzenlemeler kapsamında belirli bir süre saklanması söz konusu olup kişisel verilerinizin silinmesini istemeniz halinde bu talebiniz, yasal düzenlemeler ile belirlenen süre sonuna kadar yerine getirilebilecek, bu süreç içerisinde kişisel verileriniz yasal düzenlemelerden kaynaklı zorunluluklar haricinde işlenmeyecek ve üçüncü kişiler ile paylaşılmayacaktır.
                    </p>
                  </section>

                  {/* E-posta Aboneliği */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">E-posta Aboneliği Hakkında Bilgilendirme</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca, tarafımıza vermiş olduğunuz iletişim bilgileri üzerinden size e-posta yoluyla bilgilendirme ve kampanya içerikleri gönderilebilir. Dilediğiniz zaman bu aboneliği sonlandırma hakkına sahipsiniz. Aboneliğinizi iptal etmek için size gelen mailde bulunan Abonelikten Çık butonuna tıklamanız ve formu doldurmanız yeterlidir.
                    </p>
                  </section>

                  {/* Kişisel Veri Sahibinin Hakları */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Kişisel Veri Sahibinin Hakları</h2>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                      Kişisel veri sahipleri olarak, haklarınıza ilişkin taleplerinizi, işbu Aydınlatma Metni'nde aşağıda düzenlenen yöntemlerle Şirketimize iletmeniz durumunda Şirketimiz talebin niteliğine göre talebi en geç otuz gün içinde herhangi bir ücret olmaksızın sonuçlandıracaktır. Ancak, Kişisel Verileri Koruma Kurulunca bir ücret öngörülmesi halinde, Şirketimiz tarafından belirlenen tarifedeki ücret alınacaktır.
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                      Bu kapsamda kişisel veri sahipleri:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base ml-4">
                      <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
                      <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
                      <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                      <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
                      <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
                      <li>KVK Kanunu'nun ve ilgili diğer kanun hükümlerine uygun olarak işlenmiş olmasına rağmen, işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerin silinmesini veya yok edilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
                      <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,</li>
                      <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme haklarına sahiptir.</li>
                    </ul>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-4">
                      KVK Kanunu'nun 13. maddesinin 1. fıkrası gereğince, yukarıda belirtilen haklarınızı kullanmak ile ilgili talebinizi, yazılı veya Kişisel Verileri Koruma Kurulu'nun belirlediği diğer yöntemlerle Şirketimize iletebilirsiniz. Kişisel Verileri Koruma Kurulu, şu aşamada herhangi bir yöntem belirlemediği için başvurunuzu KVK Kanunu gereğince, yazılı olarak Şirketimize iletmeniz gerekmektedir. Bu çerçevede Şirketimize KVK Kanunu'nun 11. maddesi kapsamında yapacağınız başvurularda yazılı olarak başvurunuzu ileteceğiniz kanallar ve usuller aşağıda açıklanmaktadır.
                    </p>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-4">
                      Yukarıda belirtilen haklarınızı kullanmak için kimliğinizi tespit edici gerekli bilgiler ve talep olunan diğer bilgiler ile KVK Kanunu'nun 11. maddesinde belirtilen haklardan kullanmayı talep ettiğiniz hakkınıza yönelik açıklamalarınızı içeren talebinizi <strong className="text-primary-green">asocialmedianiz@gmail.com</strong> adresine iletebilirsiniz.
                    </p>
                  </section>
                </div>
    </div>
  )
}
