# 🚀 Vercel Deployment Rehberi

Bu proje Vercel'de deploy edilmeye hazırdır. Aşağıdaki adımları takip edin.

## 📋 Ön Gereksinimler

- GitHub hesabı
- Vercel hesabı (ücretsiz oluşturabilirsiniz: https://vercel.com)

## 🔧 Deployment Adımları

### Yöntem 1: GitHub ile Otomatik Deployment (Önerilen)

1. **Projeyi GitHub'a Push Edin**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - SosyalEvin platform"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADI/socialmedia.git
   git push -u origin main
   ```

2. **Vercel'e Giriş Yapın**
   - https://vercel.com adresine gidin
   - "Sign Up" ile GitHub hesabınızla giriş yapın

3. **Yeni Proje Oluşturun**
   - Dashboard'da "Add New..." > "Project" seçin
   - GitHub repository'nizi seçin
   - Vercel otomatik olarak Next.js projesini algılayacak

4. **Build Ayarlarını Kontrol Edin**
   - Framework Preset: **Next.js** (otomatik algılanır)
   - Root Directory: `./` (varsayılan)
   - Build Command: `npm run build` (otomatik)
   - Output Directory: `.next` (otomatik)
   - Install Command: `npm install` (otomatik)

5. **Deploy Edin**
   - "Deploy" butonuna tıklayın
   - Build işlemi 1-2 dakika sürecek
   - Deployment tamamlandığında URL'niz hazır olacak!

### Yöntem 2: Vercel CLI ile Manuel Deployment

1. **Vercel CLI'yi Yükleyin**
   ```bash
   npm i -g vercel
   ```

2. **Vercel'e Giriş Yapın**
   ```bash
   vercel login
   ```

3. **Projeyi Deploy Edin**
   ```bash
   cd /Users/kubra/Documents/GitHub/socialmedia
   vercel
   ```

4. **Production'a Deploy Edin**
   ```bash
   vercel --prod
   ```

## ✅ Build Kontrolü

Proje build edilmeye hazır olduğunu kontrol etmek için:

```bash
npm run build
```

Eğer build başarılı olursa, Vercel'de de sorunsuz çalışacaktır.

## 🔄 Otomatik Deployment

GitHub ile bağladığınızda:
- ✅ Her `git push` sonrası otomatik deploy
- ✅ Preview deployments (her PR için)
- ✅ Production ve Preview URL'leri
- ✅ Build logları ve hata takibi

## 🌐 Environment Variables

Eğer ileride API key'ler eklemeniz gerekirse:

1. Vercel Dashboard > Project Settings > Environment Variables
2. Key-Value çiftlerini ekleyin
3. Environment'ı seçin (Production, Preview, Development)
4. "Save" butonuna tıklayın
5. Yeni bir deployment tetikleyin

## 📊 Monitoring

Vercel Dashboard'da şunları görebilirsiniz:
- Deployment geçmişi
- Build logları
- Analytics (ücretsiz plan)
- Performance metrikleri

## 🐛 Sorun Giderme

### Build Hatası Alıyorsanız:

1. **Local'de test edin:**
   ```bash
   npm run build
   ```

2. **Dependencies kontrol edin:**
   ```bash
   npm install
   ```

3. **Vercel Build Logs'u kontrol edin:**
   - Dashboard > Deployments > Build Logs

### TypeScript Hataları:

```bash
npm run build
```
komutu TypeScript hatalarını gösterir. Önce bunları düzeltin.

## 📝 Notlar

- ✅ Proje Vercel için optimize edilmiştir
- ✅ `vercel.json` dosyası mevcuttur
- ✅ Next.js 14 App Router kullanılmaktadır
- ✅ Static ve Dynamic routes desteklenmektedir
- ✅ Build başarıyla tamamlanmıştır

## 🎉 Başarılı Deployment Sonrası

Deployment tamamlandığında:
- Production URL: `https://your-project.vercel.app`
- Her commit sonrası otomatik güncellenir
- Custom domain ekleyebilirsiniz (Settings > Domains)
