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
  category?: 'follower' | 'like' | 'view' | 'engagement' | 'other'
}

export interface Service {
  id: string
  name: string
  packages: Package[]
}

// SMM Turk API'den seçilen en iyi hizmetler
export const servicesData: Service[] = [
  {
    id: 'instagram',
    name: 'Instagram',
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
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    packages: [
      { id: '1', name: 'Sayfa Beğeni', amount: '100 Beğeni', price: '35,00₺', category: 'like' },
      { id: '2', name: 'Gönderi Beğeni', amount: '250 Beğeni', price: '79,00₺', category: 'like' },
      { id: '3', name: 'Yorum', amount: '50 Yorum', price: '149,00₺', category: 'engagement' },
      { id: '4', name: 'Paylaşım', amount: '100 Paylaşım', price: '199,00₺', category: 'engagement' },
      { id: '5', name: 'Video İzlenme', amount: '5.000 İzlenme', price: '89,00₺', category: 'view' },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    packages: [
      { id: '1', name: 'Abone', amount: '100 Abone', price: '199,00₺', category: 'follower' },
      { id: '2', name: 'Video İzlenme', amount: '1.000 İzlenme', price: '29,00₺', category: 'view' },
      { id: '3', name: 'Beğeni', amount: '100 Beğeni', price: '39,00₺', category: 'like' },
      { id: '4', name: 'Yorum', amount: '10 Yorum', price: '59,00₺', category: 'engagement' },
      { id: '5', name: 'Watch Time', amount: '100 Saat', price: '149,00₺', category: 'view' },
    ],
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    packages: [
      { id: '1', name: 'Takipçi', amount: '100 Takipçi', price: '89,00₺', category: 'follower' },
      { id: '2', name: 'Beğeni', amount: '500 Beğeni', price: '49,00₺', category: 'like' },
      { id: '3', name: 'İzlenme', amount: '1.000 İzlenme', price: '19,00₺', category: 'view' },
      { id: '4', name: 'Yorum', amount: '50 Yorum', price: '79,00₺', category: 'engagement' },
      { id: '5', name: 'Paylaşım', amount: '100 Paylaşım', price: '129,00₺', category: 'engagement' },
    ],
  },
  {
    id: 'twitter',
    name: 'Twitter (X)',
    packages: [
      { id: '1', name: 'Takipçi', amount: '100 Takipçi', price: '149,00₺', category: 'follower' },
      { id: '2', name: 'Beğeni', amount: '250 Beğeni', price: '99,00₺', category: 'like' },
      { id: '3', name: 'Retweet', amount: '100 Retweet', price: '79,00₺', category: 'engagement' },
      { id: '4', name: 'Yorum', amount: '50 Yorum', price: '119,00₺', category: 'engagement' },
      { id: '5', name: 'İzlenme', amount: '1.000 İzlenme', price: '39,00₺', category: 'view' },
    ],
  },
]

export const getServiceById = (id: string): Service | undefined => {
  return servicesData.find((s) => s.id === id)
}
