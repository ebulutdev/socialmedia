# Supabase Gmail OAuth Kurulum Rehberi

## 1. Supabase Projesi Oluşturma

1. [Supabase Dashboard](https://supabase.com/dashboard) adresine gidin
2. Yeni bir proje oluşturun veya mevcut projeyi seçin
3. Proje URL ve API anahtarlarını not edin

## 2. Database Schema Kurulumu

1. Supabase Dashboard > SQL Editor
2. `supabase/schema.sql` dosyasının içeriğini kopyalayın
3. SQL Editor'e yapıştırın ve "Run" butonuna tıklayın
4. Tüm tablolar, policy'ler ve trigger'lar otomatik oluşturulacak

## 3. Google OAuth Yapılandırması

### Google Cloud Console'da:

1. [Google Cloud Console](https://console.cloud.google.com/) adresine gidin
2. Yeni bir proje oluşturun veya mevcut projeyi seçin
3. **APIs & Services > Credentials** bölümüne gidin
4. **Create Credentials > OAuth client ID** seçin
5. Application type: **Web application**
6. **Authorized JavaScript origins** ekleyin:
   ```
   http://localhost:3002
   https://socialmedia-sand-three.vercel.app
   ```
7. **Authorized redirect URIs** ekleyin:
   ```
   http://localhost:3002/auth/callback
   https://socialmedia-sand-three.vercel.app/auth/callback
   ```
8. Client ID ve Client Secret'ı kopyalayın

### Supabase Dashboard'da:

1. **Authentication > Providers** bölümüne gidin
2. **Google** provider'ı bulun ve aktif edin
3. Google'dan aldığınız **Client ID** ve **Client Secret**'ı girin
4. **Save** butonuna tıklayın

## 4. Environment Variables

`.env.local` dosyasına şunları ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Örnek:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 5. Vercel Deployment

Vercel'e deploy ederken:

1. Vercel Dashboard > Project Settings > Environment Variables
2. Aşağıdaki değişkenleri ekleyin:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 6. Test Etme

1. Development sunucusunu başlatın:
   ```bash
   npm run dev
   ```

2. Tarayıcıda `http://localhost:3002/auth/login` adresine gidin
3. "Gmail ile Giriş Yap" butonuna tıklayın
4. Google hesabınızla giriş yapın
5. Callback sonrası ana sayfaya yönlendirileceksiniz

## 7. Özellikler

✅ Sadece Gmail ile giriş/kayıt  
✅ Otomatik profil oluşturma  
✅ Row Level Security (RLS) ile güvenli veri erişimi  
✅ Kullanıcı sipariş takibi  
✅ İşlem geçmişi  
✅ Kullanıcı ayarları  

## Sorun Giderme

### OAuth hatası alıyorsanız:
- Redirect URI'lerin doğru olduğundan emin olun
- Google Cloud Console'da URI'lerin eşleştiğini kontrol edin
- Supabase'de Google provider'ın aktif olduğunu kontrol edin

### Database hatası alıyorsanız:
- SQL schema'nın tamamen çalıştırıldığından emin olun
- RLS policy'lerin doğru olduğunu kontrol edin
- Supabase Dashboard > Database > Tables'da tabloların oluştuğunu kontrol edin
