# Supabase Redirect URL'leri

## ⚠️ ÖNEMLİ: Vercel Production URL'i

Production domain: **`socialmedia-sand-three.vercel.app`**

## Supabase Dashboard'da Eklenecek Redirect URL'leri

Supabase Dashboard > **Authentication > URL Configuration** bölümüne gidin ve şu URL'leri ekleyin:

### Site URL (Ana URL)
**Production için:**
```
https://socialmedia-sand-three.vercel.app
```

**Development için (opsiyonel):**
```
http://localhost:3000
```

### Redirect URLs (Callback URL'leri)
Aşağıdaki URL'leri tek tek ekleyin (her birini ayrı satırda):

```
http://localhost:3000/auth/callback
https://socialmedia-sand-three.vercel.app/auth/callback
```

## Adım Adım Kurulum

1. [Supabase Dashboard](https://supabase.com/dashboard) adresine gidin
2. Projenizi seçin
3. Sol menüden **Authentication** seçin
4. **URL Configuration** sekmesine gidin
5. **Site URL** alanına: `https://socialmedia-sand-three.vercel.app` yazın
6. **Redirect URLs** bölümüne şu URL'leri ekleyin (her birini ayrı satırda):
   - `http://localhost:3000/auth/callback`
   - `https://socialmedia-sand-three.vercel.app/auth/callback`
7. **Save** butonuna tıklayın

## Google Cloud Console'da da Eklemeniz Gerekenler

Google Cloud Console'da da aynı URL'leri eklemeniz gerekiyor:

1. [Google Cloud Console](https://console.cloud.google.com/) adresine gidin
2. Projenizi seçin
3. **APIs & Services** > **Credentials** seçin
4. OAuth 2.0 Client ID'nizi seçin
5. **Authorized JavaScript origins** bölümüne ekleyin:
   ```
   http://localhost:3000
   https://socialmedia-sand-three.vercel.app
   ```
6. **Authorized redirect URIs** bölümüne ekleyin:
   ```
   http://localhost:3000/auth/callback
   https://socialmedia-sand-three.vercel.app/auth/callback
   ```
7. **Save** butonuna tıklayın

## Test

URL'leri ekledikten sonra:

### Production Test:
1. `https://socialmedia-sand-three.vercel.app/auth/login` adresine gidin
2. "Gmail ile Giriş Yap" butonuna tıklayın
3. Google OAuth akışı tamamlandıktan sonra production URL'inize geri dönmelisiniz (localhost'a değil!)

### Development Test:
1. Development sunucusunu başlatın: `npm run dev`
2. `http://localhost:3000/auth/login` adresine gidin
3. "Gmail ile Giriş Yap" butonuna tıklayın
4. Google OAuth akışı çalışmalı ve callback'e yönlendirmeli

## Sorun Giderme

Eğer hala localhost'a yönlendiriliyorsa:

1. ✅ Supabase Dashboard'da **Site URL**'in `https://socialmedia-sand-three.vercel.app` olduğundan emin olun
2. ✅ **Redirect URLs** listesinde production URL'inin olduğundan emin olun
3. ✅ Google Cloud Console'da da aynı URL'lerin eklendiğinden emin olun
4. ✅ Değişikliklerin etkili olması için 1-2 dakika bekleyin
5. ✅ Browser'da cookies'leri temizleyin ve tekrar deneyin
