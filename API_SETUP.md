# SMMTurk API Kurulumu

## API Anahtarı

API anahtarınız projeye entegre edilmiştir. Cart sayfasında otomatik olarak yüklenecektir.

**API Key:** `bd835f762d9620b2d81555f8ee8c9fd4`

## Kullanım

1. Sepet sayfasına gidin (`/cart`)
2. API anahtarı otomatik olarak yüklenecektir
3. Link girin (Instagram gönderisi, profil vb.)
4. "Sipariş Oluştur" butonuna tıklayın

## API Anahtarını Değiştirme

API anahtarınızı değiştirmek isterseniz:

1. Cart sayfasındaki API anahtarı alanından değiştirebilirsiniz
2. Yeni anahtar otomatik olarak localStorage'a kaydedilecektir

## Güvenlik Notu

- API anahtarı localStorage'da saklanmaktadır
- Production ortamında API anahtarını environment variable olarak kullanmanız önerilir
- `.env.local` dosyası oluşturup `NEXT_PUBLIC_SMMTURK_API_KEY` değişkenini ekleyebilirsiniz

## API Endpoint'leri

Tüm API endpoint'leri `/app/api/smmturk/route.ts` dosyasında yönetilmektedir:

- `services` - Servis listesi
- `add` - Sipariş oluşturma
- `status` - Sipariş durumu
- `refill` - Refill oluşturma
- `refill_status` - Refill durumu
- `cancel` - Sipariş iptal
- `balance` - Bakiye sorgulama

## Test

API'yi test etmek için:

1. Cart sayfasına gidin
2. Bir ürün sepete ekleyin
3. Link girin
4. "Sipariş Oluştur" butonuna tıklayın
