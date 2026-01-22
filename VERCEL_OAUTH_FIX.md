# Vercel'de OAuth Redirect Sorunu - Çözüm

## Sorun
Vercel'de Gmail ile giriş yapıldığında localhost'a yönlendirme yapılıyor.

## Çözüm

### 1. Vercel Production URL'inizi Bulun
Vercel Dashboard'dan production URL'inizi bulun:
- Vercel Dashboard > Projeniz > Settings > Domains
- Veya deployment sayfasında gösterilen URL (örn: `your-project.vercel.app`)

### 2. Supabase'de Redirect URL'leri Ekleyin

1. [Supabase Dashboard](https://supabase.com/dashboard) adresine gidin
2. Projenizi seçin
3. Sol menüden **Authentication** seçin
4. **URL Configuration** sekmesine gidin
5. **Site URL** alanına production URL'inizi yazın:
   ```
   https://your-project.vercel.app
   ```
   (Veya custom domain kullanıyorsanız onu yazın)

6. **Redirect URLs** bölümüne şu URL'leri ekleyin (her birini ayrı satırda):
   ```
   http://localhost:3000/auth/callback
   https://your-project.vercel.app/auth/callback
   ```
   (Eğer custom domain kullanıyorsanız onu da ekleyin)

7. **Save** butonuna tıklayın

### 3. Google Cloud Console'da da Ekleyin

1. [Google Cloud Console](https://console.cloud.google.com/) adresine gidin
2. Projenizi seçin
3. **APIs & Services** > **Credentials** seçin
4. OAuth 2.0 Client ID'nizi seçin
5. **Authorized JavaScript origins** bölümüne ekleyin:
   ```
   https://your-project.vercel.app
   ```
   (Custom domain varsa onu da ekleyin)

6. **Authorized redirect URIs** bölümüne ekleyin:
   ```
   https://your-project.vercel.app/auth/callback
   ```
   (Custom domain varsa onu da ekleyin)

7. **Save** butonuna tıklayın

### 4. Test Edin

1. Vercel'deki production URL'inize gidin
2. Giriş sayfasına gidin
3. "Gmail ile Giriş Yap" butonuna tıklayın
4. Google OAuth akışı tamamlandıktan sonra production URL'inize geri dönmelisiniz

## Önemli Notlar

- **Site URL**: Production URL'iniz olmalı (development için localhost:3000)
- **Redirect URLs**: Hem development hem production URL'lerini ekleyin
- Değişikliklerin etkili olması birkaç dakika sürebilir
- Her yeni domain eklediğinizde bu adımları tekrarlayın

## Sorun Devam Ederse

1. Browser console'da hata mesajlarını kontrol edin
2. Supabase Dashboard > Authentication > Logs bölümünden hataları kontrol edin
3. Vercel deployment logs'larını kontrol edin
4. Browser'da cookies'leri temizleyin ve tekrar deneyin
