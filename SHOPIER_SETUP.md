# Shopier Entegrasyonu Kurulum Rehberi

## Kupon Linkleri Eklendi ✅

Tüm kupon linkleri veritabanına eklendi:
- 250₺: https://www.shopier.com/subjectivemedia/43528547
- 350₺: https://www.shopier.com/subjectivemedia/43528996
- 500₺: https://www.shopier.com/subjectivemedia/43529041
- 750₺: https://www.shopier.com/subjectivemedia/43529075
- 1000₺: https://www.shopier.com/subjectivemedia/43529113

## Kurulum Adımları

### 1. Database Schema Kurulumu

Supabase SQL Editor'de sırayla çalıştırın:

```sql
-- 1. Önce schema'yı oluşturun
-- supabase/COUPON_SCHEMA.sql dosyasını çalıştırın

-- 2. Sonra kuponları ekleyin
-- supabase/INSERT_COUPONS.sql dosyasını çalıştırın
```

### 2. Kuponları Kontrol Edin

```sql
SELECT id, value, sophier_link, is_active 
FROM public.coupons 
ORDER BY value ASC;
```

5 kupon görünmeli (250, 350, 500, 750, 1000).

### 3. Shopier Webhook Kurulumu (Opsiyonel)

**ÖNEMLİ:** Şu an için kupon satın alma işlemi manuel olarak aktif edilmelidir. Otomatik webhook için:

1. Shopier Dashboard'a giriş yapın
2. Webhook ayarlarına gidin
3. Webhook URL'i ekleyin: `https://yourdomain.com/api/shopier/callback`
4. `app/api/shopier/callback/route.ts` dosyasını Shopier'in webhook formatına göre düzenleyin

**Webhook Formatı:**
Shopier'in webhook formatını Shopier dokümantasyonundan öğrenin ve `route.ts` dosyasını buna göre güncelleyin.

### 4. Manuel Kupon Aktivasyonu (Geçici Çözüm)

Kullanıcı ödeme yaptıktan sonra, admin panelinden veya direkt veritabanından kuponu aktif edebilirsiniz:

```typescript
// API route veya admin panel'den çağrılabilir
import { purchaseCoupon } from '@/lib/api/coupons'

// Kullanıcı ID'si ve kupon ID'si ile
await purchaseCoupon(couponId) // Kullanıcı context'inden alınır
```

## Kullanım Akışı

### Kullanıcı Tarafı:

1. Kullanıcı `/coupons` sayfasına gider
2. İstediği kuponu seçer (örn: 500₺)
3. "Satın Al" butonuna tıklar
4. Shopier sayfası yeni sekmede açılır
5. Ödeme yapar
6. **Ödeme sonrası:** Admin veya webhook kuponu aktif eder
7. Bakiye otomatik yüklenir

### Admin/Manuel Aktivasyon:

Ödeme tamamlandıktan sonra:

1. Kullanıcının email'ini veya ID'sini alın
2. Hangi kuponu satın aldığını belirleyin (miktara göre)
3. `purchaseCoupon(couponId)` fonksiyonunu kullanıcı adına çağırın

## Test Etme

### 1. Kuponları Görüntüleme

```bash
# Tarayıcıda
http://localhost:3000/coupons
```

5 kupon kartı görünmeli.

### 2. Bakiye Kontrolü

1. Giriş yapın
2. Header'daki kullanıcı menüsüne tıklayın
3. Bakiye görünmeli (başlangıçta 0₺)

### 3. Sipariş Verme

1. Sepete ürün ekleyin
2. `/cart` sayfasına gidin
3. Yetersiz bakiye durumunda uyarı görünmeli
4. "Kupon Satın Al" butonu görünmeli

## Sorun Giderme

### Kuponlar görünmüyor

```sql
-- Kuponların aktif olduğunu kontrol edin
SELECT * FROM public.coupons WHERE is_active = true;
```

### Bakiye hesaplanmıyor

```sql
-- Transactions tablosunu kontrol edin
SELECT * FROM public.transactions 
WHERE user_id = 'USER_ID_BURAYA'
ORDER BY created_at DESC;
```

### Webhook çalışmıyor

1. Shopier dashboard'da webhook URL'inin doğru olduğundan emin olun
2. `app/api/shopier/callback/route.ts` dosyasındaki logları kontrol edin
3. Shopier'in webhook formatını dokümantasyondan kontrol edin

## Önemli Notlar

1. **Webhook Güvenliği:** Shopier'den gelen webhook'ları doğrulamak için signature kontrolü ekleyin
2. **Kullanıcı Eşleştirme:** Webhook'ta kullanıcı bilgisi yoksa, email veya order_id ile eşleştirme yapın
3. **Duplicate Önleme:** Aynı ödeme için birden fazla kupon aktivasyonunu önleyin
4. **Error Handling:** Webhook hatalarını loglayın ve admin'e bildirin

## Sonraki Adımlar

1. ✅ Database schema kurulumu
2. ✅ Kupon linklerini ekleme
3. ⏳ Shopier webhook formatını öğrenme
4. ⏳ Webhook handler'ı Shopier formatına göre düzenleme
5. ⏳ Webhook signature doğrulama ekleme
6. ⏳ Test ödemeleri yapma
