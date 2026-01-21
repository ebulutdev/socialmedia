// Global variables
let services = [];
let categories = new Set();
let selectedService = null;
let currentPlatform = 'all';

// Featured Instagram Packages (with 50% profit margin)
const featuredPackages = [
    {
        id: '9406',
        name: 'Instagram Takipçi - Ekonomik',
        description: 'Maksimum 50K | Günlük 10-20K',
        category: 'Instagram Takipçi',
        platform: 'instagram',
        baseRate: 20.8699, // API rate
        rate: 31.30, // with 50% profit
        min: 100,
        max: 50000,
        speed: '12 saat 54 dakika',
        badge: 'Popüler',
        badgeColor: 'fire',
        icon: 'fa-users',
        features: ['Hızlı Başlangıç', 'Garantisiz', 'En İyi Fiyat'],
        packages: [
            { amount: 100, price: 3.13 },
            { amount: 200, price: 6.26 },
            { amount: 350, price: 10.96 },
            { amount: 500, price: 15.65 },
            { amount: 1000, price: 31.30 },
            { amount: 2000, price: 62.60 },
            { amount: 5000, price: 156.50 }
        ]
    },
    {
        id: '9403',
        name: 'Instagram Takipçi - Garantili',
        description: 'Maksimum 500K | 30 Gün Garantili ♻️',
        category: 'Instagram Takipçi',
        platform: 'instagram',
        baseRate: 53.2781,
        rate: 79.92,
        min: 100,
        max: 1000000,
        speed: '56 dakika',
        badge: 'Garantili',
        badgeColor: 'success',
        icon: 'fa-shield-alt',
        features: ['Telafi Butonu Aktif', '30 Gün Garanti', 'Premium'],
        packages: [
            { amount: 100, price: 7.99 },
            { amount: 200, price: 15.98 },
            { amount: 350, price: 27.97 },
            { amount: 500, price: 39.96 },
            { amount: 1000, price: 79.92 },
            { amount: 2000, price: 159.84 },
            { amount: 5000, price: 399.60 }
        ]
    },
    {
        id: '9400',
        name: 'Instagram Beğeni - Hızlı',
        description: 'Maksimum 100K | Günlük 20K',
        category: 'Instagram Beğeni',
        platform: 'instagram',
        baseRate: 6.8348,
        rate: 10.25,
        min: 10,
        max: 100000,
        speed: '7 dakika',
        badge: 'Hızlı',
        badgeColor: 'lightning',
        icon: 'fa-heart',
        features: ['7 Dakika Başlangıç', 'Eski Hesaplar', 'Ekonomik'],
        packages: [
            { amount: 100, price: 1.03 },
            { amount: 200, price: 2.05 },
            { amount: 350, price: 3.59 },
            { amount: 500, price: 5.13 },
            { amount: 1000, price: 10.25 },
            { amount: 2000, price: 20.50 },
            { amount: 5000, price: 51.25 }
        ]
    },
    {
        id: '9383',
        name: 'Instagram Takipçi - Yüksek Limit',
        description: 'Maksimum 1M | Günlük 100K',
        category: 'Instagram Takipçi',
        platform: 'instagram',
        baseRate: 32.4514,
        rate: 48.68,
        min: 10,
        max: 100000,
        speed: '28 dakika',
        badge: 'Hızlı Başlangıç',
        badgeColor: 'info',
        icon: 'fa-rocket',
        features: ['Gönderili Hesap', 'Günlük 100K', 'Hızlı'],
        packages: [
            { amount: 100, price: 4.87 },
            { amount: 200, price: 9.74 },
            { amount: 350, price: 17.04 },
            { amount: 500, price: 24.34 },
            { amount: 1000, price: 48.68 },
            { amount: 2000, price: 97.36 },
            { amount: 5000, price: 243.40 }
        ]
    },
    {
        id: '9356',
        name: 'Instagram Takipçi - Ultra Premium',
        description: 'Maksimum 100K | 365 Gün Garantili ♻️',
        category: 'Instagram Takipçi',
        platform: 'instagram',
        baseRate: 180.0902,
        rate: 270.14,
        min: 10,
        max: 1000000,
        speed: '5 dakika',
        badge: 'Premium',
        badgeColor: 'premium',
        icon: 'fa-crown',
        features: ['1 Yıl Garanti', 'Eski Hesaplar', 'En İyi Kalite'],
        packages: [
            { amount: 100, price: 27.01 },
            { amount: 200, price: 54.03 },
            { amount: 350, price: 94.55 },
            { amount: 500, price: 135.07 },
            { amount: 1000, price: 270.14 },
            { amount: 2000, price: 540.28 },
            { amount: 5000, price: 1350.70 }
        ]
    },
    {
        id: '9397',
        name: 'Instagram Beğeni - Garantili',
        description: 'Maksimum 100K | 30 Gün Garantili ♻️',
        category: 'Instagram Beğeni',
        platform: 'instagram',
        baseRate: 7.1236,
        rate: 10.69,
        min: 50,
        max: 1000000,
        speed: '11 saat 31 dakika',
        badge: 'Garantili',
        badgeColor: 'success',
        icon: 'fa-heart',
        features: ['30 Gün Garanti', 'Eski Hesaplar', 'Kaliteli'],
        packages: [
            { amount: 100, price: 1.07 },
            { amount: 200, price: 2.14 },
            { amount: 350, price: 3.74 },
            { amount: 500, price: 5.35 },
            { amount: 1000, price: 10.69 },
            { amount: 2000, price: 21.38 },
            { amount: 5000, price: 53.45 }
        ]
    }
];

// Featured Facebook Packages (with 50% profit margin)
const facebookPackages = [
    {
        id: '9312',
        name: 'Facebook Takipçi - Ekonomik',
        description: 'Sayfa/Profil | Günlük 20K-30K',
        category: 'Facebook Takipçi',
        platform: 'facebook',
        baseRate: 23.0392,
        rate: 34.56,
        min: 10,
        max: 200000,
        speed: '5 dakika',
        badge: 'Popüler',
        badgeColor: 'fire',
        icon: 'fa-users',
        features: ['Hızlı Başlangıç', 'Yüksek Hız', 'En Uygun Fiyat'],
        packages: [
            { amount: 100, price: 3.46 },
            { amount: 200, price: 6.91 },
            { amount: 350, price: 12.10 },
            { amount: 500, price: 17.28 },
            { amount: 1000, price: 34.56 },
            { amount: 2000, price: 69.12 },
            { amount: 5000, price: 172.80 }
        ]
    },
    {
        id: '9313',
        name: 'Facebook Takipçi - Garantili',
        description: 'Sayfa/Profil | 30 Gün Telafili ♻️',
        category: 'Facebook Takipçi',
        platform: 'facebook',
        baseRate: 29.7809,
        rate: 44.67,
        min: 10,
        max: 100000,
        speed: '5 dakika',
        badge: 'Garantili',
        badgeColor: 'success',
        icon: 'fa-shield-alt',
        features: ['30 Gün Telafi', 'Global Kullanıcı', 'Günlük 20K-30K'],
        packages: [
            { amount: 100, price: 4.47 },
            { amount: 200, price: 8.93 },
            { amount: 350, price: 15.63 },
            { amount: 500, price: 22.34 },
            { amount: 1000, price: 44.67 },
            { amount: 2000, price: 89.34 },
            { amount: 5000, price: 223.35 }
        ]
    },
    {
        id: '8971',
        name: 'Facebook Sayfa Beğeni + Takipçi',
        description: 'Global | 30 Gün Garantili ♻️',
        category: 'Facebook Beğeni',
        platform: 'facebook',
        baseRate: 27.1041,
        rate: 40.66,
        min: 10,
        max: 1000000,
        speed: '17 dakika',
        badge: 'Popüler',
        badgeColor: 'fire',
        icon: 'fa-heart',
        features: ['Beğeni + Takipçi', '30 Gün Garanti', 'Doğal Artış'],
        packages: [
            { amount: 100, price: 4.07 },
            { amount: 200, price: 8.13 },
            { amount: 350, price: 14.23 },
            { amount: 500, price: 20.33 },
            { amount: 1000, price: 40.66 },
            { amount: 2000, price: 81.31 },
            { amount: 5000, price: 203.28 }
        ]
    },
    {
        id: '9011',
        name: 'Facebook Profil Takipçi - Premium',
        description: 'Global | 30 Gün Garantili ♻️ | Doğal',
        category: 'Facebook Takipçi',
        platform: 'facebook',
        baseRate: 34.9575,
        rate: 52.44,
        min: 100,
        max: 5000000,
        speed: '2 saat 36 dakika',
        badge: 'Premium',
        badgeColor: 'premium',
        icon: 'fa-user-plus',
        features: ['%100 Global', 'Anlık Başlar', 'Doğal Artış'],
        packages: [
            { amount: 100, price: 5.24 },
            { amount: 200, price: 10.49 },
            { amount: 350, price: 18.35 },
            { amount: 500, price: 26.22 },
            { amount: 1000, price: 52.44 },
            { amount: 2000, price: 104.87 },
            { amount: 5000, price: 262.18 }
        ]
    },
    {
        id: '9081',
        name: 'Facebook Takipçi - Ultra Premium',
        description: 'Düşüş Yok | 500K/Gün | 30 Gün Garantili ♻️',
        category: 'Facebook Takipçi',
        platform: 'facebook',
        baseRate: 52.2184,
        rate: 78.33,
        min: 100,
        max: 10000000,
        speed: 'Yeni Hizmet',
        badge: 'Premium',
        badgeColor: 'premium',
        icon: 'fa-crown',
        features: ['Düşüş Yok', 'Günlük 500K', 'Maksimum Kalite'],
        packages: [
            { amount: 100, price: 7.83 },
            { amount: 200, price: 15.67 },
            { amount: 350, price: 27.42 },
            { amount: 500, price: 39.17 },
            { amount: 1000, price: 78.33 },
            { amount: 2000, price: 156.66 },
            { amount: 5000, price: 391.65 }
        ]
    }
];

// Featured YouTube Packages (with 50% profit margin)
const youtubePackages = [
    {
        id: '9414',
        name: 'YouTube Abone - Garantili',
        description: 'Günlük 100-300 | 30 Gün Garantili ♻️',
        category: 'YouTube Abone',
        platform: 'youtube',
        baseRate: 989.1581,
        rate: 1483.74,
        min: 50,
        max: 30000,
        speed: '54 saat 42 dakika',
        badge: 'Garantili',
        badgeColor: 'success',
        icon: 'fa-users',
        features: ['30 Gün Garanti', 'Daha Az Düşüş', 'Güvenilir'],
        packages: [
            { amount: 10, price: 14.84 },
            { amount: 25, price: 37.09 },
            { amount: 50, price: 74.19 },
            { amount: 100, price: 148.37 },
            { amount: 250, price: 370.94 },
            { amount: 500, price: 741.87 },
            { amount: 1000, price: 1483.74 }
        ]
    },
    {
        id: '9415',
        name: 'YouTube Abone - Hızlı',
        description: 'Günlük 300-500 | Hızlı Başlangıç | 30 Gün Garantili ♻️',
        category: 'YouTube Abone',
        platform: 'youtube',
        baseRate: 1231.9856,
        rate: 1847.98,
        min: 50,
        max: 50000,
        speed: 'Yeni Hizmet',
        badge: 'Hızlı',
        badgeColor: 'lightning',
        icon: 'fa-rocket',
        features: ['Hızlı Başlangıç', '30 Gün Garanti', 'Yüksek Hız'],
        packages: [
            { amount: 10, price: 18.48 },
            { amount: 25, price: 46.20 },
            { amount: 50, price: 92.40 },
            { amount: 100, price: 184.80 },
            { amount: 250, price: 462.00 },
            { amount: 500, price: 923.99 },
            { amount: 1000, price: 1847.98 }
        ]
    },
    {
        id: '9032',
        name: 'YouTube İzlenme Saati - 15 Dakika',
        description: '15 Dk Video | Ömür Boyu Garantili | 100% Çalışır',
        category: 'YouTube İzlenme Saati',
        platform: 'youtube',
        baseRate: 630.2483,
        rate: 945.37,
        min: 100,
        max: 100000,
        speed: 'Yeni Hizmet',
        badge: 'Popüler',
        badgeColor: 'fire',
        icon: 'fa-clock',
        features: ['Ömür Boyu Garanti', '500/Saat Hız', 'Düşüş Yok'],
        packages: [
            { amount: 100, price: 94.54 },
            { amount: 250, price: 236.34 },
            { amount: 500, price: 472.69 },
            { amount: 1000, price: 945.37 },
            { amount: 2000, price: 1890.74 },
            { amount: 4000, price: 3781.48 }
        ]
    },
    {
        id: '9033',
        name: 'YouTube İzlenme Saati - 30 Dakika',
        description: '30 Dk Video | Ömür Boyu Garantili | 100% Çalışır',
        category: 'YouTube İzlenme Saati',
        platform: 'youtube',
        baseRate: 700.2758,
        rate: 1050.41,
        min: 100,
        max: 100000,
        speed: '26 saat 55 dakika',
        badge: 'Garantili',
        badgeColor: 'success',
        icon: 'fa-clock',
        features: ['Ömür Boyu Garanti', '500/Saat Hız', 'Düşüş Yok'],
        packages: [
            { amount: 100, price: 105.04 },
            { amount: 250, price: 262.60 },
            { amount: 500, price: 525.21 },
            { amount: 1000, price: 1050.41 },
            { amount: 2000, price: 2100.83 },
            { amount: 4000, price: 4201.65 }
        ]
    },
    {
        id: '9034',
        name: 'YouTube İzlenme Saati - 60 Dakika',
        description: '60 Dk Video | Ömür Boyu Garantili | 100% Çalışır',
        category: 'YouTube İzlenme Saati',
        platform: 'youtube',
        baseRate: 1296.807,
        rate: 1945.21,
        min: 100,
        max: 100000,
        speed: 'Yeni Hizmet',
        badge: 'Premium',
        badgeColor: 'premium',
        icon: 'fa-crown',
        features: ['Ömür Boyu Garanti', '500/Saat Hız', 'En İyi Kalite'],
        packages: [
            { amount: 100, price: 194.52 },
            { amount: 250, price: 486.30 },
            { amount: 500, price: 972.61 },
            { amount: 1000, price: 1945.21 },
            { amount: 2000, price: 3890.43 },
            { amount: 4000, price: 7780.85 }
        ]
    }
];

// Featured TikTok Packages (with 50% profit margin)
const tiktokPackages = [
    {
        id: '2766',
        name: 'TikTok İzlenme - Süper Ekonomik',
        description: 'Sınırsız Kapasite | Anlık Başlar | 1M/Günlük',
        category: 'TikTok İzlenme',
        platform: 'tiktok',
        baseRate: 0.10,
        rate: 0.15,
        min: 50,
        max: 2147483647,
        speed: '30 dakika',
        badge: 'Popüler',
        badgeColor: 'fire',
        icon: 'fa-eye',
        features: ['En Ekonomik', 'Anlık Başlangıç', 'Sınırsız'],
        packages: [
            { amount: 1000, price: 0.15 },
            { amount: 2000, price: 0.30 },
            { amount: 5000, price: 0.75 },
            { amount: 10000, price: 1.50 },
            { amount: 25000, price: 3.75 },
            { amount: 50000, price: 7.50 },
            { amount: 100000, price: 15.00 }
        ]
    },
    {
        id: '9392',
        name: 'TikTok Takipçi - Ekonomik',
        description: 'Maksimum 30K | Günlük 1K | Yavaş Güvenli',
        category: 'TikTok Takipçi',
        platform: 'tiktok',
        baseRate: 38.9433,
        rate: 58.41,
        min: 50,
        max: 100000,
        speed: '4 saat 26 dakika',
        badge: 'Ekonomik',
        badgeColor: 'info',
        icon: 'fa-users',
        features: ['Güvenli Hız', 'Doğal Artış', 'En Uygun Fiyat'],
        packages: [
            { amount: 100, price: 5.84 },
            { amount: 200, price: 11.68 },
            { amount: 350, price: 20.44 },
            { amount: 500, price: 29.21 },
            { amount: 1000, price: 58.41 },
            { amount: 2000, price: 116.83 },
            { amount: 5000, price: 292.07 }
        ]
    },
    {
        id: '9388',
        name: 'TikTok Takipçi - Hızlı',
        description: 'Maksimum 1M | Yüksek Kalite | Günlük 50K',
        category: 'TikTok Takipçi',
        platform: 'tiktok',
        baseRate: 55.1861,
        rate: 82.78,
        min: 10,
        max: 1000000,
        speed: '2 saat 56 dakika',
        badge: 'Hızlı',
        badgeColor: 'lightning',
        icon: 'fa-rocket',
        features: ['Yüksek Kalite', 'Hızlı Başlangıç', 'Günlük 50K'],
        packages: [
            { amount: 100, price: 8.28 },
            { amount: 200, price: 16.56 },
            { amount: 350, price: 28.97 },
            { amount: 500, price: 41.39 },
            { amount: 1000, price: 82.78 },
            { amount: 2000, price: 165.56 },
            { amount: 5000, price: 413.90 }
        ]
    },
    {
        id: '9391',
        name: 'TikTok Takipçi - Garantili',
        description: 'Maksimum 1M | 30 Gün Garantili ♻️ | Günlük 100K',
        category: 'TikTok Takipçi',
        platform: 'tiktok',
        baseRate: 77.8862,
        rate: 116.83,
        min: 10,
        max: 1000000,
        speed: '7 dakika',
        badge: 'Garantili',
        badgeColor: 'success',
        icon: 'fa-shield-alt',
        features: ['30 Gün Garanti', 'Gerçek Hesaplar', 'Premium'],
        packages: [
            { amount: 100, price: 11.68 },
            { amount: 200, price: 23.37 },
            { amount: 350, price: 40.89 },
            { amount: 500, price: 58.42 },
            { amount: 1000, price: 116.83 },
            { amount: 2000, price: 233.66 },
            { amount: 5000, price: 584.15 }
        ]
    },
    {
        id: '9394',
        name: 'TikTok Beğeni - Hızlı',
        description: 'Maksimum 10M | Günlük 100K',
        category: 'TikTok Beğeni',
        platform: 'tiktok',
        baseRate: 7.3857,
        rate: 11.08,
        min: 10,
        max: 10000000,
        speed: '1 saat 25 dakika',
        badge: 'Hızlı',
        badgeColor: 'lightning',
        icon: 'fa-heart',
        features: ['Günlük 100K', 'Yüksek Limit', 'Hızlı'],
        packages: [
            { amount: 100, price: 1.11 },
            { amount: 200, price: 2.22 },
            { amount: 350, price: 3.88 },
            { amount: 500, price: 5.54 },
            { amount: 1000, price: 11.08 },
            { amount: 2000, price: 22.16 },
            { amount: 5000, price: 55.39 }
        ]
    },
    {
        id: '9395',
        name: 'TikTok Beğeni - Garantili',
        description: 'Maksimum 10M | 30 Gün Garantili ♻️',
        category: 'TikTok Beğeni',
        platform: 'tiktok',
        baseRate: 10.2713,
        rate: 15.41,
        min: 10,
        max: 10000000,
        speed: '31 dakika',
        badge: 'Garantili',
        badgeColor: 'success',
        icon: 'fa-heart',
        features: ['30 Gün Garanti', 'Gerçek Profiller', 'Kaliteli'],
        packages: [
            { amount: 100, price: 1.54 },
            { amount: 200, price: 3.08 },
            { amount: 350, price: 5.39 },
            { amount: 500, price: 7.71 },
            { amount: 1000, price: 15.41 },
            { amount: 2000, price: 30.82 },
            { amount: 5000, price: 77.05 }
        ]
    }
];

// Featured Twitter Packages (with 50% profit margin)
const twitterPackages = [
    {
        id: '9293',
        name: 'Twitter Görüntülenme - Türk',
        description: 'Maksimum 50M | %100 Türk | Anlık Başlar',
        category: 'Twitter Görüntülenme',
        platform: 'twitter',
        baseRate: 9.8739,
        rate: 14.81,
        min: 100,
        max: 50000000,
        speed: '2 dakika',
        badge: 'Popüler',
        badgeColor: 'fire',
        icon: 'fa-eye',
        features: ['%100 Türk', 'Anlık Başlangıç', 'En Ekonomik'],
        packages: [
            { amount: 100, price: 1.48 },
            { amount: 200, price: 2.96 },
            { amount: 350, price: 5.18 },
            { amount: 500, price: 7.41 },
            { amount: 1000, price: 14.81 },
            { amount: 2000, price: 29.62 },
            { amount: 5000, price: 74.05 }
        ]
    },
    {
        id: '9256',
        name: 'Twitter Takipçi - Organik',
        description: 'Maksimum 2K | %100 Organik',
        category: 'Twitter Takipçi',
        platform: 'twitter',
        baseRate: 129.1125,
        rate: 193.67,
        min: 5,
        max: 2000,
        speed: '13 saat 16 dakika',
        badge: 'Organik',
        badgeColor: 'success',
        icon: 'fa-users',
        features: ['%100 Organik', 'Gerçek Hesaplar', 'Kalıcı'],
        packages: [
            { amount: 100, price: 19.37 },
            { amount: 200, price: 38.73 },
            { amount: 350, price: 67.78 },
            { amount: 500, price: 96.84 },
            { amount: 1000, price: 193.67 },
            { amount: 2000, price: 387.34 }
        ]
    },
    {
        id: '9341',
        name: 'Twitter Takipçi - Premium',
        description: 'Maksimum 50K | Yüksek Kaliteli | Günlük 10K',
        category: 'Twitter Takipçi',
        platform: 'twitter',
        baseRate: 210.7633,
        rate: 316.14,
        min: 100,
        max: 50000,
        speed: '1 saat',
        badge: 'Hızlı',
        badgeColor: 'lightning',
        icon: 'fa-bolt',
        features: ['Yüksek Kalite', 'Hızlı Başlangıç', 'Günlük 10K'],
        packages: [
            { amount: 100, price: 31.61 },
            { amount: 200, price: 63.23 },
            { amount: 350, price: 110.65 },
            { amount: 500, price: 158.07 },
            { amount: 1000, price: 316.14 },
            { amount: 2000, price: 632.29 },
            { amount: 5000, price: 1580.72 }
        ]
    },
    {
        id: '6961',
        name: 'Twitter Takipçi - Garantili',
        description: 'Maksimum 500K | 30 Gün Garantili ♻️',
        category: 'Twitter Takipçi',
        platform: 'twitter',
        baseRate: 262.0409,
        rate: 393.06,
        min: 100,
        max: 500000,
        speed: 'Yeni Hizmet',
        badge: 'Garantili',
        badgeColor: 'success',
        icon: 'fa-shield-alt',
        features: ['30 Gün Garanti', 'Günlük 50K', 'Yüksek Limit'],
        packages: [
            { amount: 100, price: 39.31 },
            { amount: 200, price: 78.61 },
            { amount: 350, price: 137.57 },
            { amount: 500, price: 196.53 },
            { amount: 1000, price: 393.06 },
            { amount: 2000, price: 786.12 },
            { amount: 5000, price: 1965.30 }
        ]
    },
    {
        id: '9257',
        name: 'Twitter Retweet - Organik',
        description: 'Maksimum 2K | %100 Organik',
        category: 'Twitter Retweet',
        platform: 'twitter',
        baseRate: 145.2516,
        rate: 217.88,
        min: 1,
        max: 2000,
        speed: '1 saat 14 dakika',
        badge: 'Organik',
        badgeColor: 'success',
        icon: 'fa-retweet',
        features: ['%100 Organik', 'Gerçek Paylaşım', 'Hızlı'],
        packages: [
            { amount: 100, price: 21.79 },
            { amount: 200, price: 43.58 },
            { amount: 350, price: 76.26 },
            { amount: 500, price: 108.94 },
            { amount: 1000, price: 217.88 },
            { amount: 2000, price: 435.76 }
        ]
    }
];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadBalance();
    loadServices();
    displayFeaturedPackages();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Category change
    document.getElementById('category').addEventListener('change', filterServicesByCategory);
    
    // Service selection
    document.getElementById('service').addEventListener('change', handleServiceSelection);
    
    // Quantity input
    document.getElementById('quantity').addEventListener('input', calculatePrice);
    
    // Order form submit
    document.getElementById('orderForm').addEventListener('submit', handleOrderSubmit);
    
    // Search services
    document.getElementById('searchServices').addEventListener('input', filterServicesGrid);
    
    // Filter category
    document.getElementById('filterCategory').addEventListener('change', filterServicesGrid);
}

// Load user balance
async function loadBalance() {
    try {
        const response = await fetch('/api/balance');
        const data = await response.json();
        
        if (data.balance !== undefined) {
            document.getElementById('balance').textContent = `$${parseFloat(data.balance).toFixed(2)} ${data.currency || 'USD'}`;
        }
    } catch (error) {
        console.error('Balance load error:', error);
        document.getElementById('balance').textContent = 'Hata';
    }
}

// Load services
async function loadServices() {
    try {
        const response = await fetch('/api/services');
        services = await response.json();
        
        if (Array.isArray(services)) {
            // Extract unique categories
            services.forEach(service => {
                if (service.category) {
                    categories.add(service.category);
                }
            });
            
            populateCategoryDropdowns();
            displayServicesGrid();
            showToast('Hizmetler yüklendi', 'success');
        } else {
            throw new Error('Invalid services data');
        }
    } catch (error) {
        console.error('Services load error:', error);
        showToast('Hizmetler yüklenirken hata oluştu', 'error');
        document.getElementById('servicesGrid').innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-circle"></i>
                <p>Hizmetler yüklenemedi</p>
            </div>
        `;
    }
}

// Populate category dropdowns
function populateCategoryDropdowns() {
    const categorySelect = document.getElementById('category');
    const filterCategorySelect = document.getElementById('filterCategory');
    
    // Clear existing options (except first)
    categorySelect.innerHTML = '<option value="">Kategori seçin...</option>';
    filterCategorySelect.innerHTML = '<option value="">Tüm Kategoriler</option>';
    
    // Add categories
    Array.from(categories).sort().forEach(category => {
        categorySelect.innerHTML += `<option value="${category}">${category}</option>`;
        filterCategorySelect.innerHTML += `<option value="${category}">${category}</option>`;
    });
}

// Filter services by category in form
function filterServicesByCategory(e) {
    const selectedCategory = e.target.value;
    const serviceSelect = document.getElementById('service');
    
    serviceSelect.innerHTML = '<option value="">Hizmet seçin...</option>';
    
    if (!selectedCategory) {
        serviceSelect.disabled = true;
        return;
    }
    
    const filteredServices = services.filter(s => s.category === selectedCategory);
    
    filteredServices.forEach(service => {
        serviceSelect.innerHTML += `
            <option value="${service.service}" 
                    data-rate="${service.rate}"
                    data-min="${service.min}"
                    data-max="${service.max}"
                    data-type="${service.type}"
                    data-refill="${service.refill}"
                    data-cancel="${service.cancel}">
                ${service.name} - $${service.rate}/1000
            </option>
        `;
    });
    
    serviceSelect.disabled = false;
}

// Handle service selection
function handleServiceSelection(e) {
    const selectedOption = e.target.selectedOptions[0];
    
    if (!selectedOption || !selectedOption.value) {
        document.getElementById('serviceInfo').classList.remove('active');
        return;
    }
    
    const rate = selectedOption.dataset.rate;
    const min = selectedOption.dataset.min;
    const max = selectedOption.dataset.max;
    const type = selectedOption.dataset.type;
    const refill = selectedOption.dataset.refill === 'true';
    const cancel = selectedOption.dataset.cancel === 'true';
    
    selectedService = {
        id: selectedOption.value,
        rate: parseFloat(rate),
        min: parseInt(min),
        max: parseInt(max),
        type,
        refill,
        cancel
    };
    
    // Update quantity hint
    document.getElementById('quantityHint').textContent = `Min: ${min} | Max: ${max}`;
    
    // Update service info
    const serviceInfo = document.getElementById('serviceInfo');
    serviceInfo.innerHTML = `
        <div class="service-info-item">
            <span>Tip:</span>
            <span>${type}</span>
        </div>
        <div class="service-info-item">
            <span>Minimum:</span>
            <span>${min}</span>
        </div>
        <div class="service-info-item">
            <span>Maximum:</span>
            <span>${max}</span>
        </div>
        <div class="service-info-item">
            <span>Fiyat:</span>
            <span>$${rate}/1000</span>
        </div>
        <div class="service-info-item">
            <span>Yenileme:</span>
            <span>${refill ? '✓ Var' : '✗ Yok'}</span>
        </div>
        <div class="service-info-item">
            <span>İptal:</span>
            <span>${cancel ? '✓ Edilebilir' : '✗ Edilemez'}</span>
        </div>
    `;
    serviceInfo.classList.add('active');
    
    calculatePrice();
}

// Calculate order price
function calculatePrice() {
    if (!selectedService) return;
    
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    const price = (quantity / 1000) * selectedService.rate;
    
    document.getElementById('orderPrice').textContent = `$${price.toFixed(4)}`;
}

// Handle order submit
async function handleOrderSubmit(e) {
    e.preventDefault();
    
    if (!selectedService) {
        showToast('Lütfen bir hizmet seçin', 'warning');
        return;
    }
    
    const link = document.getElementById('link').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const runs = document.getElementById('runs').value;
    const interval = document.getElementById('interval').value;
    
    // Validate quantity
    if (quantity < selectedService.min || quantity > selectedService.max) {
        showToast(`Miktar ${selectedService.min} ile ${selectedService.max} arasında olmalıdır`, 'warning');
        return;
    }
    
    const orderData = {
        service: selectedService.id,
        link,
        quantity
    };
    
    if (runs) orderData.runs = runs;
    if (interval) orderData.interval = interval;
    
    try {
        const response = await fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        const result = await response.json();
        
        if (response.ok && result.order) {
            showToast(`Sipariş oluşturuldu! Sipariş ID: ${result.order}`, 'success');
            document.getElementById('orderForm').reset();
            document.getElementById('serviceInfo').classList.remove('active');
            document.getElementById('service').disabled = true;
            selectedService = null;
            loadBalance(); // Reload balance
        } else {
            showToast(result.error || 'Sipariş oluşturulamadı', 'error');
        }
    } catch (error) {
        console.error('Order error:', error);
        showToast('Sipariş oluşturulurken hata oluştu', 'error');
    }
}

// Detect platform from service name or category
function detectPlatform(service) {
    const text = (service.name + ' ' + service.category).toLowerCase();
    
    if (text.includes('instagram') || text.includes('insta') || text.includes('ig')) {
        return 'instagram';
    } else if (text.includes('twitter') || text.includes('tweet')) {
        return 'twitter';
    } else if (text.includes('facebook') || text.includes('fb')) {
        return 'facebook';
    } else if (text.includes('youtube') || text.includes('yt')) {
        return 'youtube';
    } else if (text.includes('tiktok') || text.includes('tik tok')) {
        return 'tiktok';
    }
    
    return 'other';
}

// Get platform icon
function getPlatformIcon(platform) {
    const icons = {
        instagram: 'fab fa-instagram',
        twitter: 'fab fa-twitter',
        facebook: 'fab fa-facebook',
        youtube: 'fab fa-youtube',
        tiktok: 'fab fa-tiktok',
        other: 'fas fa-chart-line'
    };
    return icons[platform] || icons.other;
}

// Filter by platform
function filterByPlatform(platform) {
    currentPlatform = platform;
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-platform="${platform}"]`).classList.add('active');
    
    // Filter services
    filterServicesGrid();
}

// Display services grid
function displayServicesGrid() {
    const grid = document.getElementById('servicesGrid');
    
    if (!services.length) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>Henüz hizmet bulunmuyor</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = services.map(service => {
        const platform = detectPlatform(service);
        const icon = getPlatformIcon(platform);
        
        return `
        <div class="service-card ${platform}" data-platform="${platform}" onclick="selectServiceFromGrid(${service.service})">
            <div class="service-card-header">
                <div class="service-icon ${platform}">
                    <i class="${icon}"></i>
                </div>
                <div class="service-title">
                    <h3>${service.name}</h3>
                    <div class="service-category">${service.category}</div>
                </div>
            </div>
            <div class="service-details">
                <div class="detail-item">
                    <i class="fas fa-arrow-down"></i>
                    <span>Min: ${service.min}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-arrow-up"></i>
                    <span>Max: ${service.max}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-tag"></i>
                    <span>${service.type}</span>
                </div>
            </div>
            <div class="service-price">
                $${service.rate}/1000
            </div>
            <div class="service-badges">
                ${service.refill ? '<span class="badge badge-success">Yenileme</span>' : ''}
                ${service.cancel ? '<span class="badge badge-info">İptal</span>' : ''}
                <span class="badge badge-${platform}">${platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
            </div>
        </div>
    `;
    }).join('');
}

// Select service from grid
function selectServiceFromGrid(serviceId) {
    const service = services.find(s => s.service === serviceId);
    if (!service) return;
    
    // Set category
    document.getElementById('category').value = service.category;
    
    // Trigger category change to populate services
    filterServicesByCategory({ target: { value: service.category } });
    
    // Set service
    setTimeout(() => {
        document.getElementById('service').value = serviceId;
        handleServiceSelection({ target: document.getElementById('service') });
        
        // Scroll to order form
        document.querySelector('.order-section').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Filter services grid
function filterServicesGrid() {
    const searchTerm = document.getElementById('searchServices').value.toLowerCase();
    const filterCategory = document.getElementById('filterCategory').value;
    
    let filtered = services;
    
    // Filter by platform
    if (currentPlatform !== 'all') {
        filtered = filtered.filter(s => detectPlatform(s) === currentPlatform);
    }
    
    // Filter by category
    if (filterCategory) {
        filtered = filtered.filter(s => s.category === filterCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(s => 
            s.name.toLowerCase().includes(searchTerm) ||
            s.category.toLowerCase().includes(searchTerm) ||
            s.type.toLowerCase().includes(searchTerm)
        );
    }
    
    const grid = document.getElementById('servicesGrid');
    
    if (!filtered.length) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <p>Arama kriterlerine uygun hizmet bulunamadı</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filtered.map(service => {
        const platform = detectPlatform(service);
        const icon = getPlatformIcon(platform);
        
        return `
        <div class="service-card ${platform}" data-platform="${platform}" onclick="selectServiceFromGrid(${service.service})">
            <div class="service-card-header">
                <div class="service-icon ${platform}">
                    <i class="${icon}"></i>
                </div>
                <div class="service-title">
                    <h3>${service.name}</h3>
                    <div class="service-category">${service.category}</div>
                </div>
            </div>
            <div class="service-details">
                <div class="detail-item">
                    <i class="fas fa-arrow-down"></i>
                    <span>Min: ${service.min}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-arrow-up"></i>
                    <span>Max: ${service.max}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-tag"></i>
                    <span>${service.type}</span>
                </div>
            </div>
            <div class="service-price">
                $${service.rate}/1000
            </div>
            <div class="service-badges">
                ${service.refill ? '<span class="badge badge-success">Yenileme</span>' : ''}
                ${service.cancel ? '<span class="badge badge-info">İptal</span>' : ''}
                <span class="badge badge-${platform}">${platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
            </div>
        </div>
    `;
    }).join('');
}


// Toggle advanced options
function toggleAdvanced() {
    const content = document.getElementById('advancedContent');
    const header = document.querySelector('.advanced-header');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        header.classList.add('active');
    } else {
        content.style.display = 'none';
        header.classList.remove('active');
    }
}

// Display featured packages
function displayFeaturedPackages() {
    const instagramGrid = document.getElementById('instagramGrid');
    const twitterGrid = document.getElementById('twitterGrid');
    const tiktokGrid = document.getElementById('tiktokGrid');
    const youtubeGrid = document.getElementById('youtubeGrid');
    const facebookGrid = document.getElementById('facebookGrid');
    
    if (!instagramGrid || !twitterGrid || !tiktokGrid || !youtubeGrid || !facebookGrid) return;
    
    // Display Instagram packages - Compact Layout
    instagramGrid.innerHTML = featuredPackages.map(pkg => {
        const badgeEmoji = {
            'Popüler': '🔥',
            'Hızlı': '⚡',
            'Garantili': '♻️',
            'Premium': '👑',
            'Organik': '🌱',
            'Hızlı Başlangıç': '🚀'
        };
        
        return `
        <div class="featured-card">
            <div class="package-compact">
                <div class="package-info">
                    <div class="package-name">
                        ${badgeEmoji[pkg.badge] || '✨'} ${pkg.name}
                    </div>
                    <div class="package-description">${pkg.description}</div>
                    <div class="package-features">
                        ${pkg.features.map(f => `<span class="feature-badge"><i class="fas fa-check"></i> ${f}</span>`).join('')}
                    </div>
                </div>
                <div class="package-options">
                    ${pkg.packages.map(pack => `
                        <button class="package-btn" onclick="selectPackage(event, '${pkg.id}', ${pack.amount}, ${pack.price})">
                            <span class="package-amount">${pack.amount >= 1000 ? (pack.amount / 1000).toFixed(0) + 'K' : pack.amount}</span>
                            <span class="package-price">${pack.price.toFixed(2)} ₺</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    }).join('');
    
    // Display Twitter packages
    twitterGrid.innerHTML = twitterPackages.map(pkg => {
        const badgeEmoji = {
            'Popüler': '🔥',
            'Hızlı': '⚡',
            'Garantili': '♻️',
            'Premium': '👑',
            'Organik': '🌱',
            'Hızlı Başlangıç': '🚀'
        };
        
        return `
        <div class="featured-card ${pkg.platform}">
            <div class="featured-badge ${pkg.badgeColor}">
                ${badgeEmoji[pkg.badge] || '✨'} ${pkg.badge}
            </div>
            <div class="featured-icon ${pkg.platform}">
                <i class="fas ${pkg.icon}"></i>
            </div>
            <h3>${pkg.name}</h3>
            <p class="featured-description">${pkg.description}</p>
            <div class="featured-speed">
                <i class="fas fa-clock"></i>
                <span>${pkg.speed}</span>
            </div>
            <ul class="featured-features">
                ${pkg.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
            </ul>
            
            <div class="package-options">
                <h4>Paketler Seç:</h4>
                <div class="package-buttons">
                    ${pkg.packages.map(pack => `
                        <button class="package-btn" onclick="selectPackage(event, '${pkg.id}', ${pack.amount}, ${pack.price})">
                            <span class="package-amount">${pack.amount.toLocaleString()}</span>
                            <span class="package-price">${pack.price.toFixed(2)} ₺</span>
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <div class="featured-range">
                <span><i class="fas fa-arrow-down"></i> Min: ${pkg.min}</span>
                <span><i class="fas fa-arrow-up"></i> Max: ${pkg.max.toLocaleString()}</span>
            </div>
        </div>
    `;
    }).join('');
    
    // Display TikTok packages - Compact Layout
    tiktokGrid.innerHTML = tiktokPackages.map(pkg => {
        const badgeEmoji = {
            'Popüler': '🔥',
            'Hızlı': '⚡',
            'Garantili': '♻️',
            'Premium': '👑',
            'Organik': '🌱',
            'Ekonomik': '💎',
            'Hızlı Başlangıç': '🚀'
        };
        
        return `
        <div class="featured-card ${pkg.platform}">
            <div class="featured-badge ${pkg.badgeColor}">
                ${badgeEmoji[pkg.badge] || '✨'} ${pkg.badge}
            </div>
            <div class="featured-icon ${pkg.platform}">
                <i class="fas ${pkg.icon}"></i>
            </div>
            <h3>${pkg.name}</h3>
            <p class="featured-description">${pkg.description}</p>
            <div class="featured-speed">
                <i class="fas fa-clock"></i>
                <span>${pkg.speed}</span>
            </div>
            <ul class="featured-features">
                ${pkg.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('')}
            </ul>
            
            <div class="package-options">
                <h4>📦 Paketler Seç:</h4>
                <div class="package-buttons">
                    ${pkg.packages.map(pack => `
                        <button class="package-btn" onclick="selectPackage(event, '${pkg.id}', ${pack.amount}, ${pack.price})">
                            <span class="package-amount">${pack.amount >= 1000 ? (pack.amount / 1000).toFixed(0) + 'K' : pack.amount}</span>
                            <span class="package-price">${pack.price.toFixed(2)} ₺</span>
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <div class="featured-range">
                <span><i class="fas fa-arrow-down"></i> Min: ${pkg.min}</span>
                <span><i class="fas fa-arrow-up"></i> Max: ${pkg.max >= 1000000 ? (pkg.max / 1000000).toFixed(0) + 'M' : pkg.max.toLocaleString()}</span>
            </div>
        </div>
    `;
    }).join('');
    
    // Display YouTube packages
    youtubeGrid.innerHTML = youtubePackages.map(pkg => {
        const badgeEmoji = {
            'Popüler': '🔥',
            'Hızlı': '⚡',
            'Garantili': '♻️',
            'Premium': '👑',
            'Organik': '🌱',
            'Ekonomik': '💎',
            'Hızlı Başlangıç': '🚀'
        };
        
        return `
        <div class="featured-card">
            <div class="package-compact">
                <div class="package-info">
                    <div class="package-name">
                        ${badgeEmoji[pkg.badge] || '✨'} ${pkg.name}
                    </div>
                    <div class="package-description">${pkg.description}</div>
                    <div class="package-features">
                        ${pkg.features.map(f => `<span class="feature-badge"><i class="fas fa-check"></i> ${f}</span>`).join('')}
                    </div>
                </div>
                <div class="package-options">
                    ${pkg.packages.map(pack => `
                        <button class="package-btn" onclick="selectPackage(event, '${pkg.id}', ${pack.amount}, ${pack.price})">
                            <span class="package-amount">${pack.amount >= 1000 ? (pack.amount / 1000).toFixed(0) + 'K' : pack.amount}</span>
                            <span class="package-price">${pack.price.toFixed(2)} ₺</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    }).join('');
    
    // Display Facebook packages - Compact Layout
    facebookGrid.innerHTML = facebookPackages.map(pkg => {
        const badgeEmoji = {
            'Popüler': '🔥',
            'Hızlı': '⚡',
            'Garantili': '♻️',
            'Premium': '👑',
            'Organik': '🌱',
            'Ekonomik': '💎',
            'Hızlı Başlangıç': '🚀'
        };
        
        return `
        <div class="featured-card">
            <div class="package-compact">
                <div class="package-info">
                    <div class="package-name">
                        ${badgeEmoji[pkg.badge] || '✨'} ${pkg.name}
                    </div>
                    <div class="package-description">${pkg.description}</div>
                    <div class="package-features">
                        ${pkg.features.map(f => `<span class="feature-badge"><i class="fas fa-check"></i> ${f}</span>`).join('')}
                    </div>
                </div>
                <div class="package-options">
                    ${pkg.packages.map(pack => `
                        <button class="package-btn" onclick="selectPackage(event, '${pkg.id}', ${pack.amount}, ${pack.price})">
                            <span class="package-amount">${pack.amount >= 1000 ? (pack.amount / 1000).toFixed(0) + 'K' : pack.amount}</span>
                            <span class="package-price">${pack.price.toFixed(2)} ₺</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    }).join('');
}

// Select package
function selectPackage(event, packageId, amount, price) {
    event.stopPropagation();
    
    const allPackages = [...featuredPackages, ...twitterPackages, ...tiktokPackages, ...youtubePackages, ...facebookPackages];
    const pkg = allPackages.find(p => p.id === packageId);
    
    if (!pkg) return;
    
    // Remove active class from all buttons
    document.querySelectorAll('.package-btn').forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.currentTarget.classList.add('active');
    
    // Set form values
    document.getElementById('category').value = pkg.category;
    filterServicesByCategory({ target: { value: pkg.category } });
    
    setTimeout(() => {
        const serviceSelect = document.getElementById('service');
        const option = Array.from(serviceSelect.options).find(opt => 
            opt.value === pkg.id || opt.textContent.toLowerCase().includes(pkg.name.toLowerCase().split(' - ')[1])
        );
        
        if (option) {
            serviceSelect.value = option.value;
            handleServiceSelection({ target: serviceSelect });
        }
        
        // Set quantity
        document.getElementById('quantity').value = amount;
        calculatePrice();
        
        // Scroll to order form
        document.querySelector('.order-section').scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast(`${amount.toLocaleString()} adet seçildi - ${price.toFixed(2)} ₺`, 'success');
    }, 100);
}

// Select featured package
function selectFeaturedPackage(packageId) {
    const pkg = featuredPackages.find(p => p.id === packageId);
    if (!pkg) return;
    
    // Set category
    document.getElementById('category').value = pkg.category;
    
    // Trigger category change
    filterServicesByCategory({ target: { value: pkg.category } });
    
    // Try to find and select the service
    setTimeout(() => {
        const serviceSelect = document.getElementById('service');
        const option = Array.from(serviceSelect.options).find(opt => 
            opt.value === pkg.id || opt.textContent.includes(pkg.name.split(' - ')[1])
        );
        
        if (option) {
            serviceSelect.value = option.value;
            handleServiceSelection({ target: serviceSelect });
        }
        
        // Set quantity
        document.getElementById('quantity').value = pkg.min;
        calculatePrice();
        
        // Scroll to order form
        document.querySelector('.order-section').scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast(`${pkg.name} paketi seçildi!`, 'success');
    }, 100);
}

// Show toast notification
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
