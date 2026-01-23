'use client'

import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-dark-card-light mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo ve Açıklama */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-green to-primary-green-dark rounded-xl flex items-center justify-center shadow-lg shadow-primary-green/20 border border-primary-green/30">
                <span className="text-white font-bold text-xl sm:text-2xl tracking-tight">s</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-tight">
                  <span className="text-primary-green">subjective</span>
                </span>
                <span className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wider uppercase">
                  Sosyal Medya Hizmetleri
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
              Sosyal medya platformlarında güçlü bir varlık oluşturun. Güvenilir, hızlı ve etkili hizmetlerle hedef kitlenize ulaşın.
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
              <span>📧</span>
              <a href="mailto:asocialmedianiz@gmail.com" className="hover:text-primary-green transition-colors">
                asocialmedianiz@gmail.com
              </a>
            </div>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-5">Hizmetler</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link 
                  href="/services/instagram" 
                  className="text-gray-400 hover:text-primary-green transition-colors text-sm sm:text-base flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Instagram Hizmetleri</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/facebook" 
                  className="text-gray-400 hover:text-primary-green transition-colors text-sm sm:text-base flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Facebook Hizmetleri</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/youtube" 
                  className="text-gray-400 hover:text-primary-green transition-colors text-sm sm:text-base flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>YouTube Hizmetleri</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/tiktok" 
                  className="text-gray-400 hover:text-primary-green transition-colors text-sm sm:text-base flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>TikTok Hizmetleri</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/services/twitter" 
                  className="text-gray-400 hover:text-primary-green transition-colors text-sm sm:text-base flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Twitter (X) Hizmetleri</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-5">Kurumsal</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link 
                  href="/corporate/hakkimizda" 
                  className="text-gray-400 hover:text-primary-green transition-colors text-sm sm:text-base flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Hakkımızda</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/corporate/hizmet-sartlari" 
                  className="text-gray-400 hover:text-primary-green transition-colors text-sm sm:text-base flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Hizmet Şartları</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/corporate/mesafeli-satis" 
                  className="text-gray-400 hover:text-primary-green transition-colors text-sm sm:text-base flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>Mesafeli Satış Sözleşmesi</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/corporate/kvkk" 
                  className="text-gray-400 hover:text-primary-green transition-colors text-sm sm:text-base flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>KVKK Aydınlatma Metni</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/corporate/iade-kosullari" 
                  className="text-gray-400 hover:text-primary-green transition-colors text-sm sm:text-base flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>İade Koşulları</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/corporate/iletisim" 
                  className="text-gray-400 hover:text-primary-green transition-colors text-sm sm:text-base flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-primary-green rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span>İletişim</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg mb-4 sm:mb-5">İletişim</h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-green/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary-green" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm mb-1">E-posta</p>
                  <a href="mailto:asocialmedianiz@gmail.com" className="text-primary-green hover:text-primary-green-light transition-colors text-sm sm:text-base">
                    asocialmedianiz@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-green/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary-green" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm mb-1">Telefon</p>
                  <a href="https://wa.me/905339651925" className="text-primary-green hover:text-primary-green-light transition-colors text-sm sm:text-base">
                    0533 965 19 25
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Kısım - Copyright ve Ödeme Yöntemleri */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-dark-card-light">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Copyright */}
            <div className="text-center sm:text-left">
              <p className="text-gray-400 text-xs sm:text-sm">
                © Copyright 2017 - {new Date().getFullYear()} subjective. Tüm Hakları Saklıdır.
              </p>
            </div>

            {/* Ödeme Yöntemleri */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
              <div className="text-gray-400 text-xs sm:text-sm font-semibold">Güvenli Ödeme:</div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-white/10 rounded px-2 py-1 text-[10px] sm:text-xs text-gray-300 font-semibold">
                  VISA
                </div>
                <div className="bg-white/10 rounded px-2 py-1 text-[10px] sm:text-xs text-gray-300 font-semibold">
                  MasterCard
                </div>
                <div className="bg-white/10 rounded px-2 py-1 text-[10px] sm:text-xs text-gray-300 font-semibold">
                  AMEX
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
