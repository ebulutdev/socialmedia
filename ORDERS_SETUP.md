# Sepet ve Sipariş Yönetimi Kurulum Rehberi

## Özellikler

✅ Sepet kaydı (Supabase'de saklanır)  
✅ Sipariş oluşturma ve veritabanına kaydetme  
✅ Siparişler sayfası (tüm siparişleri görüntüleme)  
✅ Sipariş durumu takibi  
✅ SMMTurk API entegrasyonu ile otomatik durum güncelleme  
✅ Kullanıcı bazlı sipariş yönetimi  

## Database Kurulumu

### Yeni Kurulum
Eğer database'i ilk kez kuruyorsanız, `supabase/schema.sql` dosyasını Supabase SQL Editor'de çalıştırın.

### Mevcut Schema'yı Güncelleme
Eğer zaten schema'nız varsa, sadece `supabase/UPDATE_SCHEMA.sql` dosyasını çalıştırın.

## Kullanım

### 1. Sepete Ürün Ekleme
- Ana sayfadan veya hizmet sayfalarından ürünleri sepete ekleyin
- Sepet otomatik olarak localStorage'da saklanır

### 2. Sipariş Oluşturma
1. `/cart` sayfasına gidin
2. Giriş yapın (gerekli)
3. API anahtarınızı girin
4. Link girin
5. "Sipariş Oluştur" butonuna tıklayın
6. Siparişler otomatik olarak:
   - SMMTurk API'ye gönderilir
   - Supabase veritabanına kaydedilir
   - Siparişler sayfasına yönlendirilirsiniz

### 3. Siparişleri Görüntüleme
- Header'dan "Siparişlerim" linkine tıklayın
- Veya `/orders` sayfasına gidin
- Tüm siparişlerinizi durumlarıyla birlikte görüntüleyin
- "Yenile" butonu ile SMMTurk'tan güncel durumu çekin

## Sipariş Durumları

- **pending** - Beklemede (sarı)
- **processing** - İşleniyor (mavi, animasyonlu)
- **completed** - Tamamlandı (yeşil)
- **cancelled** - İptal Edildi (kırmızı)
- **failed** - Başarısız (kırmızı)

## API Entegrasyonu

Siparişler oluşturulduğunda:
1. SMMTurk API'ye gönderilir
2. Başarılı olanlar Supabase'e kaydedilir
3. `smmturk_order_id` ile ilişkilendirilir
4. Durum güncellemeleri manuel olarak yenilenebilir

## Database Tabloları

### orders
- Tüm sipariş bilgileri
- Kullanıcı bazlı RLS ile korunur

### saved_carts
- Kullanıcı sepetlerini saklar
- JSONB formatında items saklanır

### order_status_history
- Sipariş durum geçmişi
- Gelecekte otomatik güncelleme için kullanılabilir

## Güvenlik

- Row Level Security (RLS) aktif
- Kullanıcılar sadece kendi siparişlerini görebilir
- Tüm işlemler authenticated kullanıcılar için

## Sorun Giderme

### Siparişler görünmüyor
- Giriş yaptığınızdan emin olun
- Supabase RLS policy'lerinin doğru olduğunu kontrol edin
- Browser console'da hata var mı kontrol edin

### Sipariş oluşturulamıyor
- API anahtarının doğru olduğundan emin olun
- Link formatının geçerli olduğunu kontrol edin
- Network tab'da API isteklerini kontrol edin
