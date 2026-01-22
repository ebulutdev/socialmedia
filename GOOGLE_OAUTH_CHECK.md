# Google OAuth Yapılandırma Kontrol Listesi

## ✅ Doğru Olanlar

1. **Client ID**: `1010303407588-r830qnt20ue59uhpk9kefgnrcqtp2dgh.apps.googleusercontent.com` ✓
2. **Client Secret**: `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` ✓
3. **Supabase Site URL**: `http://localhost:3001` ✓
4. **Supabase Redirect URLs**: Doğru ayarlanmış ✓

## ⚠️ Düzeltilmesi Gerekenler

### Google Cloud Console'da Redirect URI'ler

**Şu anki durum (YANLIŞ):**
```
https://socialmedia-sand-three.vercel.app/auth/v1/callback
http://localhost:3002/auth/v1/callback
http://localhost:3001/auth/v1/callback
```

**Olması gereken (DOĞRU):**
```
https://socialmedia-sand-three.vercel.app/auth/callback
http://localhost:3001/auth/callback
```

### Neden?

- Kodunuzda callback route'u `/auth/callback` olarak tanımlı
- Supabase'de de `/auth/callback` olarak ayarlanmış
- Google Cloud Console'da `/auth/v1/callback` görünüyor (bu yanlış!)

## 🔧 Düzeltme Adımları

### 1. Google Cloud Console'da

1. [Google Cloud Console](https://console.cloud.google.com/) → Projenizi seçin
2. **APIs & Services > Credentials** bölümüne gidin
3. Client ID'nizi bulun ve tıklayın
4. **Authorized redirect URIs** bölümünde:
   - Mevcut `/auth/v1/callback` URL'lerini **SİLİN**
   - Şu URL'leri **EKLEYİN**:
     ```
     http://localhost:3001/auth/callback
     https://socialmedia-sand-three.vercel.app/auth/callback
     ```
5. **Save** butonuna tıklayın

### 2. JavaScript Origins (İsteğe Bağlı)

JavaScript origins zaten doğru görünüyor:
- `http://localhost:3001` ✓
- `http://localhost:3002` (kullanmıyorsanız silebilirsiniz)
- `https://socialmedia-sand-three.vercel.app` ✓

### 3. Supabase'de

Supabase ayarları zaten doğru:
- Site URL: `http://localhost:3001` ✓
- Redirect URLs:
  - `http://localhost:3001/auth/callback` ✓
  - `https://socialmedia-sand-three.vercel.app/auth/callback` ✓

## 📝 Özet

**Google Cloud Console'da değiştirilmesi gerekenler:**

❌ **SİL:**
- `http://localhost:3001/auth/v1/callback`
- `http://localhost:3002/auth/v1/callback`
- `https://socialmedia-sand-three.vercel.app/auth/v1/callback`

✅ **EKLE:**
- `http://localhost:3001/auth/callback`
- `https://socialmedia-sand-three.vercel.app/auth/callback`

## 🧪 Test

Düzeltmelerden sonra:
1. Development sunucusunu yeniden başlatın
2. `http://localhost:3001/auth/login` adresine gidin
3. "Gmail ile Giriş Yap" butonuna tıklayın
4. Google OAuth akışı çalışmalı ve callback'e yönlendirmeli

## ⚠️ Önemli Not

`/auth/v1/callback` Supabase'in kendi callback URL'i. Bizim uygulamamızda `/auth/callback` kullanıyoruz. Bu yüzden Google Cloud Console'da da `/auth/callback` olmalı.
