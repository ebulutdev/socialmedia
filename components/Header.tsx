'use client'

import { useState } from 'react'
import { Search, ShoppingBag, Bell, LogIn, Crown, Menu, X } from 'lucide-react'
import Cart from './Cart'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Top Banner - Mobile Hidden */}
      <div className="hidden sm:block bg-gradient-to-r from-primary-green to-primary-green-dark text-white py-2.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs sm:text-sm">
          <span className="font-semibold tracking-wide truncate">Etkileşim Ürünlerinde İndirim</span>
          <button className="hover:underline flex items-center gap-1.5 font-medium transition-all hover:gap-2 whitespace-nowrap">
            Fırsatlar <span>→</span>
          </button>
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
            <a href="#" className="hover:text-primary-green transition-colors font-medium whitespace-nowrap">Kampanyalar</a>
            <a href="#" className="text-primary-green hover:text-primary-green-light transition-colors font-semibold whitespace-nowrap">Fırsat Köşesi</a>
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
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-green to-primary-green-dark rounded-xl flex items-center justify-center shadow-lg shadow-primary-green/20 border border-primary-green/30 flex-shrink-0">
                <span className="text-white font-bold text-xl sm:text-2xl tracking-tight">A</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-tight truncate">
                  <span className="text-gray-300">A Social</span>
                  <span className="text-primary-green"> Media</span>
                </span>
                <span className="text-[8px] sm:text-[10px] text-gray-400 font-medium tracking-wider uppercase hidden sm:block">Sosyal Medya Hizmetleri</span>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
              <input
                type="text"
                placeholder="Sipariş Sorgula.."
                className="w-full bg-dark-card text-white px-4 py-2.5 rounded-l-lg border border-dark-card-light focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 transition-all placeholder:text-gray-500 text-sm"
              />
              <button className="bg-gradient-to-r from-primary-green to-primary-green-dark px-4 lg:px-5 py-2.5 rounded-r-lg hover:from-primary-green-dark hover:to-primary-green transition-all shadow-lg shadow-primary-green/20 min-w-[44px] min-h-[44px] flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Right Icons - Mobile Optimized */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="min-w-[44px] min-h-[44px] flex items-center justify-center">
                <Cart />
              </div>
              <button className="hidden md:block group min-w-[44px] min-h-[44px] flex items-center justify-center">
                <Search className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 group-hover:text-primary-green transition-colors" />
              </button>
              <button className="relative group min-w-[44px] min-h-[44px] flex items-center justify-center">
                <Bell className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 group-hover:text-primary-green transition-colors" />
                <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-primary-green text-white text-[10px] sm:text-xs font-semibold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-lg shadow-primary-green/30">
                  3
                </span>
              </button>
              <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary-green to-primary-green-dark text-white px-4 lg:px-5 py-2 sm:py-2.5 rounded-lg hover:from-primary-green-dark hover:to-primary-green transition-all shadow-lg shadow-primary-green/20 hover:shadow-xl hover:shadow-primary-green/30 font-semibold text-xs sm:text-sm min-h-[44px]">
                <LogIn className="w-4 h-4" />
                <span className="hidden lg:inline">Giriş Yap</span>
              </button>
              <button className="hidden md:block group min-w-[44px] min-h-[44px] flex items-center justify-center">
                <Crown className="w-5 sm:w-6 h-5 sm:h-6 text-gray-300 group-hover:text-primary-green transition-colors" />
              </button>
              <button
                className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Sipariş Sorgula.."
                className="flex-1 bg-dark-card text-white px-4 py-3 rounded-lg border border-dark-card-light focus:outline-none focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 transition-all placeholder:text-gray-500 text-sm min-h-[44px]"
              />
              <button className="bg-gradient-to-r from-primary-green to-primary-green-dark px-4 py-3 rounded-lg hover:from-primary-green-dark hover:to-primary-green transition-all shadow-lg shadow-primary-green/20 min-w-[44px] min-h-[44px] flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-dark-card-light pt-4 space-y-2">
              <a href="#" className="block py-3 px-4 bg-dark-card rounded-lg hover:bg-dark-card-light transition text-white font-medium min-h-[44px] flex items-center">
                Kampanyalar
              </a>
              <a href="#" className="block py-3 px-4 bg-dark-card rounded-lg hover:bg-dark-card-light transition text-primary-green font-semibold min-h-[44px] flex items-center">
                Fırsat Köşesi
              </a>
              <button className="w-full py-3 px-4 bg-gradient-to-r from-primary-green to-primary-green-dark rounded-lg hover:from-primary-green-dark hover:to-primary-green transition-all text-white font-semibold min-h-[44px] flex items-center justify-center gap-2">
                <LogIn className="w-4 h-4" />
                <span>Giriş Yap</span>
              </button>
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
            <a
              href="#"
              className="flex items-center gap-2 py-3 sm:py-4 text-gray-300 hover:text-primary-green whitespace-nowrap transition-colors font-medium min-h-[44px] text-xs sm:text-sm"
            >
              <span className="text-base sm:text-lg">💬</span>
              <span>İletişim</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 py-3 sm:py-4 text-gray-300 hover:text-primary-green whitespace-nowrap transition-colors font-medium min-h-[44px] text-xs sm:text-sm"
            >
              <span className="text-base sm:text-lg">📰</span>
              <span>Blog Yazıları</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
