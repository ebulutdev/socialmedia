# subjective - Sosyal Medya Hizmetleri Platformu

Modern, responsive sosyal medya hizmetleri platformu. Instagram, Facebook, YouTube, TikTok ve X (Twitter) için paket sistemi ile hizmet sunar.

## 🎨 Tasarım

- **Renkler**: Yeşil (#10B981), Gri (#2A2A2A), Siyah (#1A1A1A)
- **Tema**: Koyu tema (Dark Theme)
- **Responsive**: Mobil, tablet ve masaüstü uyumlu

## 🚀 Teknolojiler

- **Next.js 14** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Styling
- **Lucide React** - İkonlar

## 📦 Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın

## 🏗️ Proje Yapısı

```
socialmedia/
├── app/
│   ├── globals.css      # Global stiller
│   ├── layout.tsx       # Ana layout
│   └── page.tsx         # Ana sayfa
├── components/
│   ├── Header.tsx       # Header ve navigasyon
│   ├── Hero.tsx         # Hero section
│   ├── Services.tsx     # Hizmet seçimi
│   ├── PackageSystem.tsx # Paket sistemi
│   ├── Campaigns.tsx    # Kampanyalar
│   ├── PopularProducts.tsx # Popüler ürünler
│   ├── FAQ.tsx          # Sıkça sorulan sorular
│   └── LiveSupport.tsx  # Canlı destek widget
└── package.json
```

## ✨ Özellikler

- ✅ 5 Hizmet: Instagram, Facebook, YouTube, TikTok, X (Twitter)
- ✅ Paket Sistemi: Her hizmet için detaylı paket seçenekleri
- ✅ Responsive Tasarım: Tüm cihazlarda mükemmel görünüm
- ✅ Koyu Tema: Modern ve göz yormayan arayüz
- ✅ Canlı Destek: Sağ tarafta sabit destek butonu
- ✅ FAQ Bölümü: Accordion yapısında soru-cevap
- ✅ Kampanya Sistemi: Devam eden kampanyalar

## 🔄 API Entegrasyonu

SMM Turk API entegrasyonu daha sonra eklenecektir. Şu anda tüm veriler statik olarak tanımlanmıştır.

## 📝 Notlar

- Avatar resim kısımları boş bırakılmıştır (placeholder olarak)
- Tüm renkler yeşil, gri ve siyah tonlarında
- Paket fiyatları örnek amaçlıdır

## 🛠️ Build

Production build için:
```bash
npm run build
npm start
```

## 🚀 Vercel Deployment

### Otomatik Deployment (GitHub ile)

1. Projeyi GitHub'a push edin:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. [Vercel](https://vercel.com) hesabınıza giriş yapın

3. "New Project" butonuna tıklayın

4. GitHub repository'nizi seçin

5. Vercel otomatik olarak Next.js projesini algılayacak:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

6. "Deploy" butonuna tıklayın

### Manuel Deployment (Vercel CLI)

1. Vercel CLI'yi yükleyin:
```bash
npm i -g vercel
```

2. Projeyi deploy edin:
```bash
vercel
```

3. Production'a deploy etmek için:
```bash
vercel --prod
```

### Environment Variables

Eğer ileride API key'ler eklemeniz gerekirse, Vercel dashboard'dan:
1. Project Settings > Environment Variables
2. Gerekli değişkenleri ekleyin

### Build Ayarları

Vercel otomatik olarak şunları algılar:
- ✅ Next.js framework
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Build komutları

**Not**: `vercel.json` dosyası projeye eklenmiştir ve Vercel'in projeyi doğru şekilde build etmesini sağlar.
