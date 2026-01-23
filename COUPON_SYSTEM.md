# Kupon ve Ödeme Sistemi Kurulum Rehberi

## Özellikler

✅ Kupon sistemi (250₺, 350₺, 500₺, 750₺, 1000₺)  
✅ Bakiye yönetimi (otomatik hesaplama)  
✅ Ödeme kontrolü (yetersiz bakiye uyarısı)  
✅ Otomatik bakiye düşme (sipariş başarılı olduğunda)  
✅ Kupon satın alma sayfası  
✅ Header'da bakiye gösterimi  

## Database Kurulumu

### 1. Schema Güncellemesi

Supabase SQL Editor'de `supabase/COUPON_SCHEMA.sql` dosyasını çalıştırın:

```sql
-- Bu dosya şunları ekler:
-- - coupons tablosu
-- - user_coupons tablosu
-- - transactions tablosuna coupon_id alanı
-- - get_user_balance() fonksiyonu
-- - user_balance view
```

## Kupon Ekleme

### Sophier Linklerini Ekleme

Kuponları veritabanına eklemek için Supabase SQL Editor'de şu komutu çalıştırın:

```sql
-- 250₺ Kupon
INSERT INTO public.coupons (value, sophier_link, is_active)
VALUES (250, 'SOPHIER_LINK_BURAYA', true);

-- 350₺ Kupon
INSERT INTO public.coupons (value, sophier_link, is_active)
VALUES (350, 'SOPHIER_LINK_BURAYA', true);

-- 500₺ Kupon
INSERT INTO public.coupons (value, sophier_link, is_active)
VALUES (500, 'SOPHIER_LINK_BURAYA', true);

-- 750₺ Kupon
INSERT INTO public.coupons (value, sophier_link, is_active)
VALUES (750, 'SOPHIER_LINK_BURAYA', true);

-- 1000₺ Kupon
INSERT INTO public.coupons (value, sophier_link, is_active)
VALUES (1000, 'SOPHIER_LINK_BURAYA', true);
```

**Not:** `SOPHIER_LINK_BURAYA` yerine gerçek Sophier satın alma linklerini koyun.

### Kupon Güncelleme

Bir kuponun linkini güncellemek için:

```sql
UPDATE public.coupons
SET sophier_link = 'YENİ_LINK_BURAYA'
WHERE value = 250;
```

### Kupon Pasifleştirme

Bir kuponu geçici olarak devre dışı bırakmak için:

```sql
UPDATE public.coupons
SET is_active = false
WHERE value = 250;
```

## Kullanım Akışı

### 1. Kullanıcı Kupon Satın Alır

1. Kullanıcı `/coupons` sayfasına gider
2. İstediği kuponu seçer
3. "Satın Al" butonuna tıklar
4. Sophier linki yeni sekmede açılır
5. Ödeme tamamlandıktan sonra **manuel olarak** `purchaseCoupon()` fonksiyonu çağrılmalı

### 2. Kupon Satın Alma Sonrası

**ÖNEMLİ:** Sophier ödeme tamamlandıktan sonra, kuponu aktif etmek için bir callback/webhook mekanizması kurmanız gerekiyor. Şu an için manuel olarak şu şekilde yapılabilir:

```typescript
import { purchaseCoupon } from '@/lib/api/coupons'

// Ödeme başarılı olduğunda
await purchaseCoupon(couponId)
```

### 3. Sipariş Verme

1. Kullanıcı sepete ürün ekler
2. `/cart` sayfasına gider
3. Sistem otomatik olarak bakiyeyi kontrol eder
4. Yetersiz bakiye varsa:
   - Uyarı gösterilir
   - "Kupon Satın Al" butonu gösterilir
   - `/coupons` sayfasına yönlendirilir
5. Yeterli bakiye varsa:
   - Sipariş oluşturulur
   - Bakiyeden otomatik olarak düşülür
   - Transaction kaydı oluşturulur

## API Fonksiyonları

### Balance API

```typescript
import { getUserBalance, deductBalance, addBalance } from '@/lib/api/balance'

// Kullanıcı bakiyesini al
const balance = await getUserBalance()

// Sipariş için bakiye düş
await deductBalance(amount, orderId)

// Bakiye ekle (kupon satın alma için)
await addBalance(amount, description, couponId)
```

### Coupon API

```typescript
import { getCoupons, purchaseCoupon, getUserCoupons } from '@/lib/api/coupons'

// Tüm aktif kuponları al
const coupons = await getCoupons()

// Kupon satın al (ödeme sonrası çağrılmalı)
const userCoupon = await purchaseCoupon(couponId)

// Kullanıcının satın aldığı kuponları al
const userCoupons = await getUserCoupons()
```

## Sophier Entegrasyonu

### Webhook/Callback Kurulumu

Sophier ödeme tamamlandığında bir webhook/callback almak için:

1. Sophier dashboard'unda webhook URL'i ayarlayın
2. API route oluşturun: `/app/api/sophier/callback/route.ts`
3. Webhook'tan gelen veriyi doğrulayın
4. `purchaseCoupon()` fonksiyonunu çağırın

**Örnek Webhook Handler:**

```typescript
// app/api/sophier/callback/route.ts
import { purchaseCoupon } from '@/lib/api/coupons'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Sophier'den gelen veriyi doğrula
    // TODO: Sophier'in webhook formatına göre düzenleyin
    const { couponId, userId, paymentStatus } = body
    
    if (paymentStatus === 'completed') {
      await purchaseCoupon(couponId)
      return NextResponse.json({ success: true })
    }
    
    return NextResponse.json({ success: false, error: 'Payment not completed' })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

## Sayfalar

- `/coupons` - Kupon satın alma sayfası
- `/cart` - Sepet sayfası (bakiye kontrolü ile)
- Header'da bakiye gösterimi (kullanıcı menüsünde)

## Transaction Tipleri

- `deposit` - Bakiye yükleme (kupon satın alma)
- `withdrawal` - Bakiye çekme
- `order` - Sipariş için ödeme
- `refund` - İade

## Önemli Notlar

1. **Sophier Linkleri:** Kupon linklerini veritabanına eklemeyi unutmayın
2. **Webhook:** Ödeme sonrası otomatik bakiye yükleme için webhook kurulumu gerekli
3. **Balance Hesaplama:** Bakiye `transactions` tablosundan otomatik hesaplanır
4. **RLS Policies:** Tüm tablolar Row Level Security ile korunur
5. **Error Handling:** Yetersiz bakiye durumunda kullanıcıya net uyarı gösterilir

## Sorun Giderme

### Bakiye görünmüyor
- Kullanıcının giriş yaptığından emin olun
- `get_user_balance()` fonksiyonunun çalıştığını kontrol edin
- Transactions tablosunda kayıt olup olmadığını kontrol edin

### Kuponlar görünmüyor
- `is_active = true` olduğundan emin olun
- RLS policies'in doğru ayarlandığını kontrol edin

### Ödeme yapılamıyor
- Bakiye yeterli mi kontrol edin
- Transaction kaydı oluşturuluyor mu kontrol edin
- Console'da hata mesajlarını kontrol edin
