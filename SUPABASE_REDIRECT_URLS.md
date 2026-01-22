# Supabase Redirect URL'leri

## Supabase Dashboard'da Eklenecek Redirect URL'leri

Supabase Dashboard > **Authentication > URL Configuration** bölümüne gidin ve şu URL'leri ekleyin:

### Site URL (Ana URL)
```
http://localhost:3001
```

### Redirect URLs (Callback URL'leri)
Aşağıdaki URL'leri tek tek ekleyin:

```
http://localhost:3001/auth/callback
https://socialmedia-sand-three.vercel.app/auth/callback
```

## Adım Adım Kurulum

1. [Supabase Dashboard](https://supabase.com/dashboard) adresine gidin
2. Projenizi seçin
3. Sol menüden **Authentication** seçin
4. **URL Configuration** sekmesine gidin
5. **Site URL** alanına: `http://localhost:3001` yazın
6. **Redirect URLs** bölümüne şu URL'leri ekleyin:
   - `http://localhost:3001/auth/callback`
   - `https://socialmedia-sand-three.vercel.app/auth/callback`
7. **Save** butonuna tıklayın

## Notlar

- **Site URL**: Ana uygulama URL'iniz (development için localhost:3001)
- **Redirect URLs**: OAuth callback'lerinin yönlendirileceği URL'ler
- Her URL'yi ayrı satırda ekleyin
- Production URL'nizi de eklemeyi unutmayın

## Google Cloud Console'da da Eklemeniz Gerekenler

Google Cloud Console'da da aynı URL'leri eklemeniz gerekiyor:

### Authorized JavaScript origins:
```
http://localhost:3001
https://socialmedia-sand-three.vercel.app
```

### Authorized redirect URIs:
```
http://localhost:3001/auth/callback
https://socialmedia-sand-three.vercel.app/auth/callback
```

## Test

URL'leri ekledikten sonra:
1. Development sunucusunu başlatın: `npm run dev`
2. `http://localhost:3001/auth/login` adresine gidin
3. "Gmail ile Giriş Yap" butonuna tıklayın
4. Google OAuth akışı çalışmalı ve callback'e yönlendirmeli
