'use client'

import { useState } from 'react'
import { Search, ShoppingBag, Bell, LogIn, Crown, Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Top Banner */}
      <div className="bg-primary-green text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <span className="font-bold">Etkileşim Ürünlerinde İndirim</span>
          <button className="hover:underline flex items-center gap-1">
            Fırsatlar →
          </button>
        </div>
      </div>

      {/* Second Top Bar */}
      <div className="bg-dark-card text-gray-300 py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <span>📧 mail@sosyalevin.com</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary-green">Kampanyalar</a>
            <a href="#" className="hover:text-primary-green">Fırsat Köşesi</a>
            <button className="flex items-center gap-2">
              <span>🌙</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-dark-bg border-b border-dark-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold text-white">SosyalEvin</span>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <input
                type="text"
                placeholder="Sipariş Sorgula.."
                className="w-full bg-dark-card text-white px-4 py-2 rounded-l-lg border border-dark-card-light focus:outline-none focus:border-primary-green"
              />
              <button className="bg-primary-green px-4 py-2 rounded-r-lg hover:bg-primary-green-dark transition">
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button className="relative">
                <ShoppingBag className="w-6 h-6 text-gray-300 hover:text-primary-green" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </button>
              <button className="hidden md:block">
                <Search className="w-6 h-6 text-gray-300 hover:text-primary-green" />
              </button>
              <button className="relative">
                <Bell className="w-6 h-6 text-gray-300 hover:text-primary-green" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="hidden md:flex items-center gap-2 bg-primary-green text-white px-4 py-2 rounded-lg hover:bg-primary-green-dark transition">
                <LogIn className="w-4 h-4" />
                <span>Giriş Yap</span>
              </button>
              <button className="hidden md:block">
                <Crown className="w-6 h-6 text-gray-300 hover:text-primary-green" />
              </button>
              <button
                className="md:hidden"
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
          <div className="md:hidden mt-4">
            <div className="flex">
              <input
                type="text"
                placeholder="Sipariş Sorgula.."
                className="flex-1 bg-dark-card text-white px-4 py-2 rounded-l-lg border border-dark-card-light focus:outline-none focus:border-primary-green"
              />
              <button className="bg-primary-green px-4 py-2 rounded-r-lg">
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-dark-bg border-b border-dark-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-8 overflow-x-auto">
            <a
              href="#"
              className="flex items-center gap-2 py-4 text-primary-green border-b-2 border-primary-green whitespace-nowrap"
            >
              <span>📄</span>
              <span>Sosyal Medya Hizmetleri</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 py-4 text-gray-300 hover:text-primary-green whitespace-nowrap"
            >
              <span>👑</span>
              <span>Ücretsiz Araçlar</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 py-4 text-gray-300 hover:text-primary-green whitespace-nowrap"
            >
              <span>✏️</span>
              <span>Kurumsal</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 py-4 text-gray-300 hover:text-primary-green whitespace-nowrap"
            >
              <span>💬</span>
              <span>İletişim</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 py-4 text-gray-300 hover:text-primary-green whitespace-nowrap"
            >
              <span>📰</span>
              <span>Blog Yazıları</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
