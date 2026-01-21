export interface Package {
  id: string
  name: string
  amount: string
  price: string
  serviceId?: string
  min?: number
  max?: number
  avgTime?: string
  features?: string[]
  category: 'follower' | 'like' | 'view' | 'engagement' | 'other'
}

export interface Service {
  id: string
  name: string
  description: string
  icon: string
  packages: Package[]
}

// SMM Turk API'den seçilen en iyi hizmetler
export const servicesData: Service[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Yabancı takipçi satın al hizmetiyle Instagram hesabınızı büyütün, etkileşiminizi artırın. Güvenilir ve hızlı çözümler için sosyalevin.com\'u tercih edin.',
    icon: '📷',
    packages: [
      {
        id: '9403',
        name: 'Instagram Takipçi [ 30 Gün Garantili ]',
        amount: '100 - 1.000.000 Takipçi',
        price: '53,28₺ / 1K',
        serviceId: '9403',
        min: 100,
        max: 1000000,
        avgTime: '55 dakika',
        features: ['30 Gün Garantili ♻️', 'Hızlı Başlangıç', 'Telafi Butonu Aktif', '%100 Eski Hesaplar'],
        category: 'follower',
      },
      {
        id: '9320',
        name: 'Instagram Premium Türk Takipçi [ 365 Gün Garantili ]',
        amount: '50 - 1.000.000 Takipçi',
        price: '2.416,78₺ / 1K',
        serviceId: '9320',
        min: 50,
        max: 1000000,
        avgTime: '2 saat 5 dakika',
        features: ['365 Gün Telafili ♻️', '%100 Türk', 'Saatte 10K', 'Max 100K'],
        category: 'follower',
      },
      {
        id: '9209',
        name: 'Instagram Premium Takipçi [ 99 Gün Garantili ]',
        amount: '100 - 1.000.000 Takipçi',
        price: '50,37₺ / 1K',
        serviceId: '9209',
        min: 100,
        max: 1000000,
        avgTime: '48 saat',
        features: ['99 Gün Telafili ♻️', 'Eski Hesaplar', 'Günlük Hız: 100K'],
        category: 'follower',
      },
      {
        id: '9397',
        name: 'Instagram Beğeni [ 30 Gün Garantili ]',
        amount: '50 - 1.000.000 Beğeni',
        price: '7,12₺ / 1K',
        serviceId: '9397',
        min: 50,
        max: 1000000,
        avgTime: '6 saat 7 dakika',
        features: ['30 Gün Garantili ♻️', '%100 Eski Hesaplar', 'Maksimum 100K'],
        category: 'like',
      },
      {
        id: '9336',
        name: 'Instagram Video İzlenme',
        amount: '100 - 2.000.000 İzlenme',
        price: '0,36₺ / 1K',
        serviceId: '9336',
        min: 100,
        max: 2000000,
        avgTime: '1 saat 46 dakika',
        features: ['Anlık Başlar', 'Erişim + Gösterim', 'Günlük 500K'],
        category: 'view',
      },
      {
        id: '9337',
        name: 'Instagram Hikaye İzlenme',
        amount: '50 - 30.000 İzlenme',
        price: '3,90₺ / 1K',
        serviceId: '9337',
        min: 50,
        max: 30000,
        avgTime: '6 saat 56 dakika',
        features: ['%100 Eski Hesaplar', 'Hızlı', 'Maksimum 30K'],
        category: 'view',
      },
      {
        id: '9335',
        name: 'Instagram Türk Repost',
        amount: '10 - 500 Repost',
        price: '3.808,35₺ / 1K',
        serviceId: '9335',
        min: 10,
        max: 500,
        avgTime: '12 saat 22 dakika',
        features: ['%100 Gerçek Türk 🇹🇷', 'Hızlı Başlar', 'Maksimum 500'],
        category: 'engagement',
      },
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Facebook hesabınızı büyütün ve etkileşiminizi artırın. Güvenilir ve hızlı çözümler için sosyalevin.com\'u tercih edin.',
    icon: '👥',
    packages: [
      {
        id: 'fb1',
        name: 'Facebook Sayfa Beğeni',
        amount: '100 - 10.000 Beğeni',
        price: '35,00₺ / 1K',
        serviceId: 'fb1',
        min: 100,
        max: 10000,
        avgTime: '2 saat',
        features: ['Gerçek Hesaplar', 'Hızlı Başlangıç'],
        category: 'like',
      },
      {
        id: 'fb2',
        name: 'Facebook Gönderi Beğeni',
        amount: '250 - 50.000 Beğeni',
        price: '79,00₺ / 1K',
        serviceId: 'fb2',
        min: 250,
        max: 50000,
        avgTime: '3 saat',
        features: ['Gerçek Hesaplar', 'Hızlı Başlangıç'],
        category: 'like',
      },
      {
        id: 'fb3',
        name: 'Facebook Yorum',
        amount: '50 - 5.000 Yorum',
        price: '149,00₺ / 1K',
        serviceId: 'fb3',
        min: 50,
        max: 5000,
        avgTime: '4 saat',
        features: ['Gerçek Hesaplar', 'Kaliteli Yorumlar'],
        category: 'engagement',
      },
      {
        id: 'fb4',
        name: 'Facebook Paylaşım',
        amount: '100 - 10.000 Paylaşım',
        price: '199,00₺ / 1K',
        serviceId: 'fb4',
        min: 100,
        max: 10000,
        avgTime: '5 saat',
        features: ['Gerçek Hesaplar', 'Organik Paylaşım'],
        category: 'engagement',
      },
      {
        id: 'fb5',
        name: 'Facebook Video İzlenme',
        amount: '5.000 - 1.000.000 İzlenme',
        price: '89,00₺ / 1K',
        serviceId: 'fb5',
        min: 5000,
        max: 1000000,
        avgTime: '1 saat',
        features: ['Anlık Başlar', 'Yüksek Hız'],
        category: 'view',
      },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    description: 'YouTube kanalınızı büyütün ve videolarınızın izlenme sayısını artırın. Güvenilir ve hızlı çözümler için sosyalevin.com\'u tercih edin.',
    icon: '▶️',
    packages: [
      {
        id: 'yt1',
        name: 'YouTube Abone',
        amount: '100 - 100.000 Abone',
        price: '199,00₺ / 1K',
        serviceId: 'yt1',
        min: 100,
        max: 100000,
        avgTime: '24 saat',
        features: ['Gerçek Hesaplar', 'Yavaş Artış'],
        category: 'follower',
      },
      {
        id: 'yt2',
        name: 'YouTube Video İzlenme',
        amount: '1.000 - 10.000.000 İzlenme',
        price: '29,00₺ / 1K',
        serviceId: 'yt2',
        min: 1000,
        max: 10000000,
        avgTime: '30 dakika',
        features: ['Anlık Başlar', 'Yüksek Hız'],
        category: 'view',
      },
      {
        id: 'yt3',
        name: 'YouTube Beğeni',
        amount: '100 - 50.000 Beğeni',
        price: '39,00₺ / 1K',
        serviceId: 'yt3',
        min: 100,
        max: 50000,
        avgTime: '2 saat',
        features: ['Gerçek Hesaplar', 'Hızlı Başlangıç'],
        category: 'like',
      },
      {
        id: 'yt4',
        name: 'YouTube Yorum',
        amount: '10 - 1.000 Yorum',
        price: '59,00₺ / 1K',
        serviceId: 'yt4',
        min: 10,
        max: 1000,
        avgTime: '3 saat',
        features: ['Gerçek Hesaplar', 'Kaliteli Yorumlar'],
        category: 'engagement',
      },
      {
        id: 'yt5',
        name: 'YouTube Watch Time',
        amount: '100 - 10.000 Saat',
        price: '149,00₺ / 1K',
        serviceId: 'yt5',
        min: 100,
        max: 10000,
        avgTime: '48 saat',
        features: ['Gerçek İzlenme', 'Yavaş Artış'],
        category: 'view',
      },
    ],
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    description: 'TikTok hesabınızı büyütün ve videolarınızın etkileşimini artırın. Güvenilir ve hızlı çözümler için sosyalevin.com\'u tercih edin.',
    icon: '🎵',
    packages: [
      {
        id: 'tt1',
        name: 'TikTok Takipçi',
        amount: '100 - 500.000 Takipçi',
        price: '89,00₺ / 1K',
        serviceId: 'tt1',
        min: 100,
        max: 500000,
        avgTime: '12 saat',
        features: ['Gerçek Hesaplar', 'Hızlı Başlangıç'],
        category: 'follower',
      },
      {
        id: 'tt2',
        name: 'TikTok Beğeni',
        amount: '500 - 1.000.000 Beğeni',
        price: '49,00₺ / 1K',
        serviceId: 'tt2',
        min: 500,
        max: 1000000,
        avgTime: '1 saat',
        features: ['Anlık Başlar', 'Yüksek Hız'],
        category: 'like',
      },
      {
        id: 'tt3',
        name: 'TikTok İzlenme',
        amount: '1.000 - 50.000.000 İzlenme',
        price: '19,00₺ / 1K',
        serviceId: 'tt3',
        min: 1000,
        max: 50000000,
        avgTime: '30 dakika',
        features: ['Anlık Başlar', 'Yüksek Hız'],
        category: 'view',
      },
      {
        id: 'tt4',
        name: 'TikTok Yorum',
        amount: '50 - 10.000 Yorum',
        price: '79,00₺ / 1K',
        serviceId: 'tt4',
        min: 50,
        max: 10000,
        avgTime: '2 saat',
        features: ['Gerçek Hesaplar', 'Kaliteli Yorumlar'],
        category: 'engagement',
      },
      {
        id: 'tt5',
        name: 'TikTok Paylaşım',
        amount: '100 - 50.000 Paylaşım',
        price: '129,00₺ / 1K',
        serviceId: 'tt5',
        min: 100,
        max: 50000,
        avgTime: '3 saat',
        features: ['Gerçek Hesaplar', 'Organik Paylaşım'],
        category: 'engagement',
      },
    ],
  },
  {
    id: 'twitter',
    name: 'Twitter (X)',
    description: 'Twitter hesabınızı büyütün ve tweetlerinizin etkileşimini artırın. Güvenilir ve hızlı çözümler için sosyalevin.com\'u tercih edin.',
    icon: '🐦',
    packages: [
      {
        id: 'tw1',
        name: 'Twitter Takipçi',
        amount: '100 - 1.000.000 Takipçi',
        price: '149,00₺ / 1K',
        serviceId: 'tw1',
        min: 100,
        max: 1000000,
        avgTime: '6 saat',
        features: ['Gerçek Hesaplar', 'Hızlı Başlangıç'],
        category: 'follower',
      },
      {
        id: 'tw2',
        name: 'Twitter Beğeni',
        amount: '250 - 500.000 Beğeni',
        price: '99,00₺ / 1K',
        serviceId: 'tw2',
        min: 250,
        max: 500000,
        avgTime: '1 saat',
        features: ['Anlık Başlar', 'Yüksek Hız'],
        category: 'like',
      },
      {
        id: 'tw3',
        name: 'Twitter Retweet',
        amount: '100 - 100.000 Retweet',
        price: '79,00₺ / 1K',
        serviceId: 'tw3',
        min: 100,
        max: 100000,
        avgTime: '2 saat',
        features: ['Gerçek Hesaplar', 'Hızlı Başlangıç'],
        category: 'engagement',
      },
      {
        id: 'tw4',
        name: 'Twitter Yorum',
        amount: '50 - 10.000 Yorum',
        price: '119,00₺ / 1K',
        serviceId: 'tw4',
        min: 50,
        max: 10000,
        avgTime: '3 saat',
        features: ['Gerçek Hesaplar', 'Kaliteli Yorumlar'],
        category: 'engagement',
      },
      {
        id: 'tw5',
        name: 'Twitter İzlenme',
        amount: '1.000 - 10.000.000 İzlenme',
        price: '39,00₺ / 1K',
        serviceId: 'tw5',
        min: 1000,
        max: 10000000,
        avgTime: '30 dakika',
        features: ['Anlık Başlar', 'Yüksek Hız'],
        category: 'view',
      },
    ],
  },
]

// Paket fiyatlarını hesapla (1K fiyatından)
export function calculatePackagePrice(pricePer1K: string, amount: number): string {
  const numericPrice = parseFloat(pricePer1K.replace(/[^\d,]/g, '').replace(',', '.'))
  const totalPrice = (numericPrice * amount) / 1000
  return totalPrice.toFixed(2).replace('.', ',') + '₺'
}

// Paket miktarlarını oluştur (min-max arası)
export function generatePackageAmounts(min: number, max: number): Array<{ amount: number; price: string }> {
  const amounts: number[] = []
  
  // Küçük paketler
  if (min <= 50) amounts.push(50)
  if (min <= 100) amounts.push(100)
  if (min <= 250) amounts.push(250)
  if (min <= 500) amounts.push(500)
  if (min <= 750) amounts.push(750)
  if (min <= 1000) amounts.push(1000)
  
  // Orta paketler
  if (min <= 2500 && max >= 2500) amounts.push(2500)
  if (min <= 5000 && max >= 5000) amounts.push(5000)
  if (min <= 7500 && max >= 7500) amounts.push(7500)
  if (min <= 10000 && max >= 10000) amounts.push(10000)
  
  // Büyük paketler
  if (min <= 25000 && max >= 25000) amounts.push(25000)
  if (min <= 50000 && max >= 50000) amounts.push(50000)
  if (min <= 75000 && max >= 75000) amounts.push(75000)
  if (min <= 100000 && max >= 100000) amounts.push(100000)
  if (min <= 250000 && max >= 250000) amounts.push(250000)
  if (min <= 500000 && max >= 500000) amounts.push(500000)
  if (min <= 1000000 && max >= 1000000) amounts.push(1000000)
  
  return amounts.filter(a => a >= min && a <= max).map(amount => ({
    amount,
    price: calculatePackagePrice('53,28₺ / 1K', amount), // Bu dinamik olmalı
  }))
}
