# Environment Variables Kurulum Rehberi

## Hata Çözümü

Eğer şu hatayı alıyorsanız:
```
Error: Your project's URL and Key are required to create a Supabase client!
```

Bu, Supabase environment variable'larının eksik olduğu anlamına gelir.

## Kurulum Adımları

### 1. Supabase Projesi Oluşturma

1. [Supabase Dashboard](https://supabase.com/dashboard) adresine gidin
2. Yeni bir proje oluşturun veya mevcut projeyi seçin
3. **Settings > API** bölümüne gidin
4. Şu değerleri kopyalayın:
   - **Project URL** (örn: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (anon key)

### 2. .env.local Dosyasını Güncelleme

Proje kök dizinindeki `.env.local` dosyasını açın ve şu değerleri ekleyin:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# SMMTurk API Configuration (zaten var)
NEXT_PUBLIC_SMMTURK_API_KEY=daa573901673c824ee8ba916d201bbb2
```

**Örnek:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.example
NEXT_PUBLIC_SMMTURK_API_KEY=daa573901673c824ee8ba916d201bbb2
```

### 3. Development Sunucusunu Yeniden Başlatma

Environment variable'ları değiştirdikten sonra:

```bash
# Sunucuyu durdurun (Ctrl+C)
# Sonra tekrar başlatın
npm run dev
```

### 4. Vercel Deployment

Vercel'e deploy ederken:

1. Vercel Dashboard > Project Settings > Environment Variables
2. Şu değişkenleri ekleyin:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SMMTURK_API_KEY`

## Doğrulama

Environment variable'lar doğru ayarlandıktan sonra:

1. Development sunucusunu başlatın
2. Tarayıcıda `http://localhost:3002` adresine gidin
3. Hata almamalısınız
4. Giriş yap sayfasına gidip "Gmail ile Giriş Yap" butonunu test edin

## Notlar

- `.env.local` dosyası git'e commit edilmez (`.gitignore`'da)
- Production'da Vercel dashboard'dan environment variable'ları ayarlayın
- Environment variable'ları değiştirdikten sonra mutlaka sunucuyu yeniden başlatın
