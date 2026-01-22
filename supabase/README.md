# Supabase Database Setup

## Kurulum Adımları

1. **Supabase Dashboard'a gidin**
   - https://supabase.com/dashboard
   - Projenizi seçin veya yeni bir proje oluşturun

2. **SQL Editor'ü açın**
   - Sol menüden "SQL Editor" seçin
   - "New query" butonuna tıklayın

3. **Schema dosyasını çalıştırın**
   - `schema.sql` dosyasının içeriğini kopyalayın
   - SQL Editor'e yapıştırın
   - "Run" butonuna tıklayın

4. **Environment Variables ekleyin**
   - `.env.local` dosyasına şunları ekleyin:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Google OAuth'u yapılandırın**
   - Supabase Dashboard > Authentication > Providers
   - Google provider'ı aktif edin
   - Client ID ve Client Secret ekleyin
   - Redirect URL'leri ekleyin:
     - `http://localhost:3002/auth/callback`
     - `https://socialmedia-sand-three.vercel.app/auth/callback`

## Tablolar

### profiles
Kullanıcı profil bilgileri (auth.users'ı genişletir)

### orders
Sipariş bilgileri

### order_status_history
Sipariş durum geçmişi

### transactions
Kullanıcı işlem geçmişi

### user_settings
Kullanıcı ayarları

## Güvenlik

- Row Level Security (RLS) aktif
- Kullanıcılar sadece kendi verilerini görebilir
- Tüm tablolarda uygun policy'ler tanımlı

## Otomatik İşlemler

- Yeni kullanıcı kaydında otomatik profil oluşturulur
- `updated_at` alanları otomatik güncellenir
- Index'ler performans için optimize edilmiştir
