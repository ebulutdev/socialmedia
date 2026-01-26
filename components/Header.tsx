'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Search, ShoppingBag, Bell, LogIn, Crown, Menu, X, Package as PackageIcon, LogOut, User, Wallet, Gift } from 'lucide-react'
import CartButton from './Cart'
import { servicesData, Service, Package as PackageType } from '@/lib/servicesData'
import { useAuth } from '@/lib/context/AuthContext'
import { getUserBalance } from '@/lib/api/balance'

interface SearchResult {
  type: 'service' | 'package'
  service: Service
  package?: PackageType
  matchText: string
}

export default function Header() {
  const router = useRouter()
  const { user, signOut, loading: authLoading } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [userBalance, setUserBalance] = useState<number | null>(null)
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Load user balance
  useEffect(() => {
    const loadBalance = async () => {
      if (!user) {
        setUserBalance(null)
        return
      }

      setIsLoadingBalance(true)
      try {
        const balance = await getUserBalance()
        setUserBalance(balance)
      } catch (error) {
        console.error('Error loading balance:', error)
        setUserBalance(null)
      } finally {
        setIsLoadingBalance(false)
      }
    }

    loadBalance()
    
    // Refresh balance when user menu opens
    if (userMenuOpen) {
      loadBalance()
    }
  }, [user, userMenuOpen])

  // Arama sonuçlarını hesapla
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return []

    const query = searchQuery.toLowerCase().trim()
    const results: SearchResult[] = []

    servicesData.forEach((service) => {
      // Platform ismine göre ara
      if (service.name.toLowerCase().includes(query)) {
        results.push({
          type: 'service',
          service,
          matchText: service.name,
        })
      }

      // Hizmet paketlerinde ara
      service.packages.forEach((pkg) => {
        const packageName = pkg.name.toLowerCase()
        const categoryMatch: Record<string, string[]> = {
          follower: ['takipçi', 'follower', 'abone', 'subscriber'],
          like: ['beğeni', 'like'],
          view: ['izlenme', 'view', 'görüntülenme'],
          engagement: ['etkileşim', 'engagement', 'yorum', 'comment', 'repost', 'retweet'],
          other: [],
        }

        const categoryKeywords = categoryMatch[pkg.category] || []
        const matchesCategory = categoryKeywords.some((keyword) => query.includes(keyword) || keyword.includes(query))

        if (
          packageName.includes(query) ||
          matchesCategory ||
          pkg.category.toLowerCase().includes(query)
        ) {
          results.push({
            type: 'package',
            service,
            package: pkg,
            matchText: `${service.name} - ${pkg.name}`,
          })
        }
      })
    })

    // En uygun sonuçları önce göster (tam eşleşme > kısmi eşleşme)
    return results
      .sort((a, b) => {
        const aExact = a.matchText.toLowerCase() === searchQuery.toLowerCase()
        const bExact = b.matchText.toLowerCase() === searchQuery.toLowerCase()
        if (aExact && !bExact) return -1
        if (!aExact && bExact) return 1
        return 0
      })
      .slice(0, 8) // Maksimum 8 sonuç göster
  }, [searchQuery])

  // Bildirim mesajları
  const notifications = [
    {
      id: 1,
      title: 'Yeni Kampanya Başladı!',
      message: 'Instagram takipçi paketlerinde %30 indirim fırsatı. Hemen keşfedin ve avantajlı paketleri inceleyin!',
      time: '2 saat önce',
      type: 'campaign'
    },
    {
      id: 2,
      title: 'Yeni Siparişlerinizi Bekliyoruz',
      message: 'Sosyal medya hesaplarınızı büyütmek için hazırız! Hemen sipariş verin ve hızlı teslimatın keyfini çıkarın.',
      time: '5 saat önce',
      type: 'success'
    },
    {
      id: 3,
      title: 'Özel Hoş Geldin İndirimi',
      message: 'Yeni müşterilerimize özel %20 hoş geldin indirimi. İlk siparişinizde bu özel fırsattan yararlanın!',
      time: '1 gün önce',
      type: 'offer'
    }
  ]

  // Dışarı tıklandığında sonuçları ve bildirimleri kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (result: SearchResult) => {
    if (result.type === 'service') {
      router.push(`/services/${result.service.id}`)
    } else if (result.package) {
      router.push(`/services/${result.service.id}`)
    }
    setSearchQuery('')
    setShowResults(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      handleSearch(searchResults[0])
    } else if (e.key === 'Escape') {
      setShowResults(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      {/* Top Banner - Mobile Hidden */}
      <div className="hidden sm:block bg-gradient-to-r from-primary-green to-primary-green-dark text-white py-2.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs sm:text-sm">
          <span className="font-semibold tracking-wide truncate">Etkileşim Ürünlerinde İndirim</span>
          <a href="/#popular-products" className="hover:underline flex items-center gap-1.5 font-medium transition-all hover:gap-2 whitespace-nowrap">
            Popüler Hizmetler <span>→</span>
          </a>
        </div>
      </div>

      {/* Second Top Bar - Mobile Optimized */}
      <div className="bg-dark-card text-gray-300 py-2 px-3 sm:px-4 text-xs sm:text-sm border-b border-dark-card-light">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <span className="text-gray-400 flex-shrink-0">📧</span>
            <span className="text-gray-300 hover:text-primary-green transition-colors truncate text-[10px] sm:text-sm">scmmediasocial@gmail.com</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 sm:gap-5">
            <a href="/#discovery-packages" className="hover:text-primary-green transition-colors font-medium whitespace-nowrap">Keşfet Paketleri</a>
            <a href="/#popular-products" className="text-primary-green hover:text-primary-green-light transition-colors font-semibold whitespace-nowrap">Popüler Hizmetler</a>
            <button className="flex items-center gap-2 hover:text-primary-green transition-colors min-w-[44px] min-h-[44px] justify-center">
              <span className="text-lg">🌙</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header - Mobile Optimized */}
      <header className="bg-dark-bg border-b border-dark-card sticky top-0 z-50 backdrop-blur-sm bg-dark-bg/95">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            {/* Logo - Mobile Optimized */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 hover:opacity-80 transition-opacity cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 relative">
                <Image
                  src="/images/image.png"
                  alt="subjective logo"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 40px, 48px"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-tight truncate">
                  <span className="text-primary-green">subjective</span>
                </span>
                <span className="text-[8px] sm:text-[10px] text-gray-400 font-medium tracking-wider uppercase hidden sm:block">Sosyal Medya Hizmetleri</span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8 relative" ref={searchRef}>
              <input
                type="text"
                placeholder="Hizmet Ara (örn: Instagram Takipçi)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowResults(true)
                }}
                onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                onKeyDown={handleKeyDown}
                className="w-full bg-dark-card text-white px-4 py-2.5 rounded-l-lg border border-dark-card-light focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 transition-all placeholder:text-gray-500 text-sm"
              />
              <button 
                onClick={() => searchResults.length > 0 && handleSearch(searchResults[0])}
                className="bg-gradient-to-r from-primary-green to-primary-green-dark px-4 lg:px-5 py-2.5 rounded-r-lg hover:from-primary-green-dark hover:to-primary-green transition-all shadow-lg shadow-primary-green/20 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <Search className="w-5 h-5 text-white" />
              </button>

              {/* Search Results Dropdown */}
              {showResults && searchQuery.length >= 2 && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-dark-card border border-dark-card-light rounded-xl shadow-2xl z-50 max-h-[400px] overflow-y-auto scrollbar-hide">
                  <div className="p-2">
                    {searchResults.map((result, index) => (
                      <button
                        key={`${result.service.id}-${result.package?.id || 'service'}-${index}`}
                        onClick={() => handleSearch(result)}
                        className="w-full text-left p-3 rounded-lg hover:bg-dark-card-light transition-colors mb-1 last:mb-0 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary-green/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-green/30 transition-colors">
                            {result.type === 'service' ? (
                              <span className="text-lg">{result.service.icon}</span>
                            ) : (
                              <PackageIcon className="w-5 h-5 text-primary-green" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-semibold text-sm mb-1 line-clamp-1">
                              {result.type === 'service' ? result.service.name : result.package?.name}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {result.type === 'service' ? (
                                <span>{result.service.packages.length} hizmet paketi</span>
                              ) : (
                                <span>{result.service.name}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {showResults && searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-dark-card border border-dark-card-light rounded-xl shadow-2xl z-50 p-4">
                  <div className="text-gray-400 text-sm text-center">
                    "{searchQuery}" için sonuç bulunamadı
                  </div>
                </div>
              )}
            </div>

            {/* Right Icons - Mobile Optimized */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Mobilde Kullanıcı Adı - Küçültülmüş */}
              {user && (
                <div className="md:hidden flex items-center gap-1 px-1.5 py-1 bg-dark-card rounded-md border border-dark-card-light">
                  <div className="w-4.5 h-4.5 rounded-full bg-primary-green/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 text-primary-green" />
                  </div>
                  <span className="text-white font-medium text-[10px] truncate max-w-[70px]">
                    {user.email?.split('@')[0] || 'Kullanıcı'}
                  </span>
                </div>
              )}
              <div className="min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center">
                <CartButton />
              </div>
              <div className="relative" ref={notificationsRef}>
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative group min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center"
                >
                  <Bell className="w-4.5 sm:w-6 h-4.5 sm:h-6 text-gray-300 group-hover:text-primary-green transition-colors" />
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-2 sm:-right-2 bg-primary-green text-white text-[9px] sm:text-xs font-semibold rounded-full w-3.5 h-3.5 sm:w-5 sm:h-5 flex items-center justify-center shadow-lg shadow-primary-green/30">
                    3
                  </span>
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-dark-card border border-dark-card-light rounded-xl shadow-2xl z-50 max-h-[500px] overflow-y-auto scrollbar-hide">
                    <div className="p-4 border-b border-dark-card-light">
                      <h3 className="text-white font-bold text-base sm:text-lg">Bildirimler</h3>
                    </div>
                    <div className="p-2">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-3 rounded-lg hover:bg-dark-card-light transition-colors mb-2 last:mb-0 cursor-pointer group"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              notification.type === 'campaign' ? 'bg-primary-green/20' :
                              notification.type === 'success' ? 'bg-blue-500/20' :
                              'bg-yellow-500/20'
                            }`}>
                              {notification.type === 'campaign' ? (
                                <span className="text-primary-green text-lg">🎉</span>
                              ) : notification.type === 'success' ? (
                                <span className="text-blue-400 text-lg">✓</span>
                              ) : (
                                <span className="text-yellow-400 text-lg">⭐</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-white font-semibold text-sm mb-1">
                                {notification.title}
                              </div>
                              <div className="text-gray-400 text-xs mb-2 leading-relaxed">
                                {notification.message}
                              </div>
                              <div className="text-gray-500 text-[10px]">
                                {notification.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Auth Buttons */}
              {!authLoading && (
                <>
                  {user ? (
                    <div className="hidden md:block relative" ref={userMenuRef}>
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="flex items-center gap-2 bg-dark-card hover:bg-dark-card-light text-white px-4 lg:px-5 py-2 sm:py-2.5 rounded-lg transition-all border border-dark-card-light hover:border-primary-green/30 font-semibold text-xs sm:text-sm min-h-[44px]"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary-green/20 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary-green" />
                        </div>
                        <span className="hidden lg:inline truncate max-w-[120px]">
                          {user.email?.split('@')[0] || 'Kullanıcı'}
                        </span>
                      </button>

                      {/* User Menu Dropdown */}
                      {userMenuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-dark-card border border-dark-card-light rounded-xl shadow-2xl z-50">
                          <div className="p-4 border-b border-dark-card-light">
                            <p className="text-white font-semibold text-sm truncate">{user.email}</p>
                            <p className="text-gray-400 text-xs mt-1">Gmail ile giriş yapıldı</p>
                          </div>
                          
                          {/* Balance Display */}
                          <div className="p-4 border-b border-dark-card-light bg-dark-bg/50">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Wallet className="w-4 h-4 text-primary-green" />
                                <span className="text-gray-300 text-sm font-medium">Bakiye</span>
                              </div>
                              {isLoadingBalance ? (
                                <span className="text-gray-400 text-xs">Yükleniyor...</span>
                              ) : (
                                <span className="text-primary-green font-bold text-lg">
                                  {userBalance !== null ? `${userBalance.toFixed(2)}₺` : '0.00₺'}
                                </span>
                              )}
                            </div>
                            <Link
                              href="/coupons"
                              onClick={() => setUserMenuOpen(false)}
                              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-green/10 hover:bg-primary-green/20 text-primary-green transition-colors text-sm font-medium border border-primary-green/20"
                            >
                              <Gift className="w-4 h-4" />
                              <span>Kupon Satın Al</span>
                            </Link>
                          </div>

                          <div className="p-2 space-y-1">
                            <Link
                              href="/orders"
                              onClick={() => setUserMenuOpen(false)}
                              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-dark-card-light text-white transition-colors text-sm"
                            >
                              <PackageIcon className="w-4 h-4" />
                              <span>Siparişlerim</span>
                            </Link>
                            <button
                              onClick={async () => {
                                await signOut()
                                setUserMenuOpen(false)
                                router.push('/')
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-dark-card-light text-red-400 hover:text-red-300 transition-colors text-sm"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Çıkış Yap</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <Link
                        href="/auth/login"
                        className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary-green to-primary-green-dark text-white px-4 lg:px-5 py-2 sm:py-2.5 rounded-lg hover:from-primary-green-dark hover:to-primary-green transition-all shadow-lg shadow-primary-green/20 hover:shadow-xl hover:shadow-primary-green/30 font-semibold text-xs sm:text-sm min-h-[44px]"
                      >
                        <LogIn className="w-4 h-4" />
                        <span className="hidden lg:inline">Giriş Yap</span>
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="hidden md:block group min-w-[44px] min-h-[44px] flex items-center justify-center"
                      >
                        <Crown className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 group-hover:text-primary-green transition-colors" />
                      </Link>
                    </>
                  )}
                </>
              )}
              <button
                className="md:hidden min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg hover:bg-dark-card transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-300" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-3 relative" ref={searchRef}>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Hizmet Ara (örn: Instagram Takipçi)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowResults(true)
                }}
                onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-dark-card text-white px-4 py-3 rounded-lg border border-dark-card-light focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 transition-all placeholder:text-gray-500 text-sm min-h-[44px]"
              />
              <button 
                onClick={() => searchResults.length > 0 && handleSearch(searchResults[0])}
                className="bg-gradient-to-r from-primary-green to-primary-green-dark px-4 py-3 rounded-lg hover:from-primary-green-dark hover:to-primary-green transition-all shadow-lg shadow-primary-green/20 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Mobile Search Results Dropdown */}
            {showResults && searchQuery.length >= 2 && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-dark-card border border-dark-card-light rounded-xl shadow-2xl z-50 max-h-[300px] overflow-y-auto scrollbar-hide">
                <div className="p-2">
                  {searchResults.map((result, index) => (
                    <button
                      key={`mobile-${result.service.id}-${result.package?.id || 'service'}-${index}`}
                      onClick={() => handleSearch(result)}
                      className="w-full text-left p-3 rounded-lg hover:bg-dark-card-light transition-colors mb-1 last:mb-0 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary-green/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-green/30 transition-colors">
                          {result.type === 'service' ? (
                            <span className="text-lg">{result.service.icon}</span>
                          ) : (
                            <PackageIcon className="w-5 h-5 text-primary-green" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-semibold text-sm mb-1 line-clamp-1">
                            {result.type === 'service' ? result.service.name : result.package?.name}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {result.type === 'service' ? (
                              <span>{result.service.packages.length} hizmet paketi</span>
                            ) : (
                              <span>{result.service.name}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showResults && searchQuery.length >= 2 && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-dark-card border border-dark-card-light rounded-xl shadow-2xl z-50 p-4">
                <div className="text-gray-400 text-sm text-center">
                  "{searchQuery}" için sonuç bulunamadı
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu - Kompakt ve Şık Tasarım */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2.5 pb-2.5 border-t border-dark-card-light pt-2.5 space-y-1">
              <a href="/#discovery-packages" className="block py-1.5 px-2.5 bg-dark-card rounded-lg hover:bg-dark-card-light transition text-white font-medium text-[13px] min-h-[32px] flex items-center">
                Keşfet Paketleri
              </a>
              <a href="/#popular-products" className="block py-1.5 px-2.5 bg-dark-card rounded-lg hover:bg-dark-card-light transition text-primary-green font-semibold text-[13px] min-h-[32px] flex items-center">
                Popüler Hizmetler
              </a>
              {user ? (
                <div className="space-y-1">
                  <div className="py-1.5 px-2.5 bg-dark-card rounded-lg">
                    <p className="text-white font-semibold text-[11px] break-words leading-tight">{user.email}</p>
                    <p className="text-gray-400 text-[10px] mt-0.5">Gmail ile giriş yapıldı</p>
                  </div>
                  <button
                    onClick={async () => {
                      await signOut()
                      setMobileMenuOpen(false)
                      router.push('/')
                    }}
                    className="w-full py-1.5 px-2.5 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all text-red-400 font-semibold text-[13px] min-h-[32px] flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Çıkış Yap</span>
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block w-full py-1.5 px-2.5 bg-gradient-to-r from-primary-green to-primary-green-dark rounded-lg hover:from-primary-green-dark hover:to-primary-green transition-all text-white font-semibold text-[13px] min-h-[32px] flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-3 h-3" />
                    <span>Giriş Yap</span>
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block w-full py-1.5 px-2.5 bg-dark-card rounded-lg hover:bg-dark-card-light transition text-white font-medium text-[13px] min-h-[32px] flex items-center justify-center"
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Navigation - Mobile Optimized */}
      <nav className="bg-dark-bg border-b border-dark-card">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto pb-2 scrollbar-hide -mx-3 sm:-mx-4 px-3 sm:px-4">
            <a
              href="#"
              className="flex items-center gap-2 py-3 sm:py-4 text-primary-green border-b-2 border-primary-green whitespace-nowrap font-semibold transition-all hover:text-primary-green-light min-h-[44px] text-xs sm:text-sm"
            >
              <span className="text-base sm:text-lg">📄</span>
              <span>Sosyal Medya Hizmetleri</span>
            </a>
            <a
              href="/corporate/hakkimizda"
              className="flex items-center gap-2 py-3 sm:py-4 text-gray-300 hover:text-primary-green whitespace-nowrap transition-colors font-medium min-h-[44px] text-xs sm:text-sm"
            >
              <span className="text-base sm:text-lg">✏️</span>
              <span>Kurumsal</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
