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
        price: '533₺ / 1K',
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
        price: '71₺ / 1K',
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
        price: '4₺ / 1K',
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
        price: '39₺ / 1K',
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
        price: '38.084₺ / 1K',
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
        price: '504₺ / 1K',
        serviceId: '9209',
        min: 100,
        max: 1000000,
        avgTime: '48 saat',
        features: ['99 Gün Telafili ♻️', 'Eski Hesaplar', 'Günlük Hız: 100K'],
        category: 'follower',
      },
    ],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    packages: [
      { id: '1', name: 'Sayfa Beğeni', amount: '100 Beğeni', price: '350₺', category: 'like' },
      { id: '2', name: 'Gönderi Beğeni', amount: '250 Beğeni', price: '790₺', category: 'like' },
      { id: '3', name: 'Yorum', amount: '50 Yorum', price: '1.490₺', category: 'engagement' },
      { id: '4', name: 'Paylaşım', amount: '100 Paylaşım', price: '1.990₺', category: 'engagement' },
      { id: '5', name: 'Video İzlenme', amount: '5.000 İzlenme', price: '890₺', category: 'view' },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    packages: [
      { id: '1', name: 'Abone', amount: '100 Abone', price: '1.990₺', category: 'follower' },
      { id: '2', name: 'Video İzlenme', amount: '1.000 İzlenme', price: '290₺', category: 'view' },
      { id: '3', name: 'Beğeni', amount: '100 Beğeni', price: '390₺', category: 'like' },
      { id: '4', name: 'Yorum', amount: '10 Yorum', price: '590₺', category: 'engagement' },
      { id: '5', name: 'Watch Time', amount: '100 Saat', price: '1.490₺', category: 'view' },
    ],
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    packages: [
      { id: '1', name: 'Takipçi', amount: '100 Takipçi', price: '890₺', category: 'follower' },
      { id: '2', name: 'Beğeni', amount: '500 Beğeni', price: '490₺', category: 'like' },
      { id: '3', name: 'İzlenme', amount: '1.000 İzlenme', price: '190₺', category: 'view' },
      { id: '4', name: 'Yorum', amount: '50 Yorum', price: '790₺', category: 'engagement' },
      { id: '5', name: 'Paylaşım', amount: '100 Paylaşım', price: '1.290₺', category: 'engagement' },
    ],
  },
  {
    id: 'twitter',
    name: 'Twitter (X)',
    packages: [
      { id: '1', name: 'Takipçi', amount: '100 Takipçi', price: '1.490₺', category: 'follower' },
      { id: '2', name: 'Beğeni', amount: '250 Beğeni', price: '990₺', category: 'like' },
      { id: '3', name: 'Retweet', amount: '100 Retweet', price: '790₺', category: 'engagement' },
      { id: '4', name: 'Yorum', amount: '50 Yorum', price: '1.190₺', category: 'engagement' },
      { id: '5', name: 'İzlenme', amount: '1.000 İzlenme', price: '390₺', category: 'view' },
    ],
  },
]

export const getServiceById = (id: string): Service | undefined => {
  return servicesData.find((s) => s.id === id)
}
