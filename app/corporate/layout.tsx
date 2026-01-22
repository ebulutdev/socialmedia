'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Check } from 'lucide-react'
import Header from '@/components/Header'
import LiveSupport from '@/components/LiveSupport'
import FloatingCartButton from '@/components/FloatingCartButton'

const menuItems = [
  { id: 'hakkimizda', label: 'Hakkımızda', path: '/corporate/hakkimizda' },
  { id: 'hizmet-sartlari', label: 'Hizmet Şartları', path: '/corporate/hizmet-sartlari' },
  { id: 'mesafeli-satis', label: 'Mesafeli Satış Sözleşmesi', path: '/corporate/mesafeli-satis' },
  { id: 'kvkk', label: 'KVKK Aydınlatma Metni', path: '/corporate/kvkk' },
  { id: 'iade-kosullari', label: 'İade Koşulları', path: '/corporate/iade-kosullari' },
  { id: 'iletisim', label: 'İletişim', path: '/corporate/iletisim' },
]

export default function CorporateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <>
      <Header />
      <LiveSupport />
      <FloatingCartButton />
      <div className="min-h-screen bg-dark-bg">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {children}
            </div>

            {/* Sidebar - Corporate Menu */}
            <div className="lg:col-span-1">
              <div className="bg-dark-card rounded-xl p-4 sm:p-5 sticky top-4">
                <h3 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-5">Kurumsal Menü</h3>
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.path
                    return (
                      <Link
                        key={item.id}
                        href={item.path}
                        className={`flex items-center justify-between p-3 sm:p-3.5 rounded-lg transition-all min-h-[44px] touch-manipulation ${
                          isActive
                            ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                            : 'bg-dark-card-light text-gray-300 hover:bg-dark-card-light/80 hover:text-white active:scale-[0.98]'
                        }`}
                      >
                        <span className="font-medium text-sm sm:text-base">{item.label}</span>
                        {isActive ? (
                          <Check className="w-5 h-5 flex-shrink-0" />
                        ) : (
                          <span className="text-gray-400">→</span>
                        )}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
