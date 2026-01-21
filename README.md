# SMM Service - Sosyal Medya Hizmetleri Platformu

Modern ve kullanıcı dostu sosyal medya pazarlama hizmetleri platformu. Node.js ve Express ile geliştirilmiştir.

## 🚀 Özellikler

### Sosyal Medya Platformları
- 📸 **Instagram** - Takipçi, Beğeni, Görüntüleme, Yorum
- 🐦 **Twitter** - Takipçi, Retweet, Beğeni
- 📘 **Facebook** - Sayfa Beğeni, Post Beğeni, Paylaşım
- ▶️ **YouTube** - Abone, İzlenme, Beğeni, Yorum
- 🎵 **TikTok** - Takipçi, Beğeni, Görüntüleme

### Platform Özellikleri
- ⚡ Hızlı ve güvenilir API entegrasyonu
- 💳 Anlık bakiye görüntüleme
- 📦 Platforma göre filtrelenebilir hizmet paketleri
- 🛒 Kolay sipariş oluşturma
- 🔍 Sipariş durumu sorgulama
- 🎨 Modern ve responsive tasarım (Street Relax teması)
- 🔄 Otomatik fiyat hesaplama
- 📱 Mobil uyumlu arayüz
- 🔎 Gelişmiş arama ve filtreleme

## 📥 Kurulum

### 1. Bağımlılıkları yükleyin

```bash
npm install
```

### 2. Ortam değişkenlerini yapılandırın

`.env` dosyası oluşturun:

```env
API_KEY=04927cd8b2265954c3d0c2f1af528159
API_URL=https://smmturk.net/api/v2
PORT=3000
```

### 3. Sunucuyu başlatın

```bash
npm start
```

Geliştirme modunda (otomatik yeniden başlatma):

```bash
npm run dev
```

### 4. Tarayıcıda açın

```
http://localhost:3000
```

## 🛠 API Endpoints

### Frontend Endpoints

- `GET /` - Ana sayfa
- `GET /api/services` - Tüm hizmetleri listele
- `GET /api/balance` - Kullanıcı bakiyesi
- `POST /api/order` - Yeni sipariş oluştur
- `GET /api/order/:orderId` - Sipariş durumu sorgula
- `POST /api/orders/status` - Birden fazla sipariş durumu
- `POST /api/refill` - Yenileme talebi
- `POST /api/refill/status` - Yenileme durumu
- `POST /api/cancel` - Sipariş iptali

## 📖 Kullanım

### Sipariş Oluşturma

1. Platform seçin (Instagram, Twitter, Facebook, YouTube, TikTok)
2. Kategori seçin
3. Hizmet seçin
4. Link girin (profil veya gönderi linki)
5. Miktar belirleyin
6. "Sipariş Oluştur" butonuna tıklayın

### Sipariş Takibi

1. "Sipariş Durumu Sorgula" bölümüne gidin
2. Sipariş ID'nizi girin
3. "Sorgula" butonuna tıklayın

### Platform Filtreleme

- Ana sayfadaki platform butonlarını kullanarak hizmetleri filtreleyebilirsiniz
- Her platform için özel renkler ve ikonlar kullanılmıştır

## 💻 Teknolojiler

- **Backend:** Node.js, Express.js
- **API İletişimi:** Axios
- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Tema:** Street Relax (Modern, temiz ve kullanıcı dostu)
- **İkonlar:** Font Awesome 6

## 📁 Proje Yapısı

```
socialmedia/
├── public/
│   ├── index.html      # Ana sayfa
│   ├── style.css       # Stil dosyası (Street Relax tema)
│   └── app.js          # Frontend JavaScript
├── server.js           # Express sunucu ve API
├── .env                # Ortam değişkenleri
├── .gitignore          # Git ignore dosyası
├── package.json        # Proje bağımlılıkları
└── README.md          # Dokümantasyon
```

## 🔌 API Dokümantasyonu

### SMM Turk API v2

**API URL:** `https://smmturk.net/api/v2`

**Desteklenen İşlemler:**
- ✅ Hizmet listesi (`action=services`)
- ✅ Sipariş oluşturma (`action=add`)
- ✅ Sipariş durumu (`action=status`)
- ✅ Bakiye sorgulama (`action=balance`)
- ✅ Yenileme talepleri (`action=refill`)
- ✅ Sipariş iptali (`action=cancel`)

## 🎨 Özelleştirme

### Renk Teması

CSS değişkenleri `style.css` dosyasında tanımlıdır:

```css
:root {
    --primary-color: #667eea;
    --instagram: #E4405F;
    --twitter: #1DA1F2;
    --facebook: #4267B2;
    --youtube: #FF0000;
    --tiktok: #000000;
}
```

## 🔒 Güvenlik

- API anahtarı `.env` dosyasında saklanır
- `.env` dosyası `.gitignore` ile versiyon kontrolü dışında tutulur
- CORS koruması aktif
- Form validasyonu
- Input sanitization

## 📱 Responsive Tasarım

- Mobil cihazlar için optimize edilmiş
- Tablet ve desktop desteği
- Touch-friendly arayüz
- Responsive grid sistemi

## 🐛 Hata Ayıklama

Konsolu kontrol edin:
```javascript
// Tarayıcı konsolunu açın (F12)
// API hatalarını görebilirsiniz
```

Sunucu loglarını kontrol edin:
```bash
# Terminal'de sunucu çıktısını izleyin
npm start
```

## 📝 Lisans

ISC

## 🤝 Destek

Herhangi bir sorun veya öneriniz için issue açabilirsiniz.

---

**Not:** Bu platform SMM Turk API v2 kullanmaktadır. API anahtarınızı güvenli tutun ve asla paylaşmayın.
