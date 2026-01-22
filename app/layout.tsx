import type { Metadata } from 'next'
import './globals.css'
import CartProviderWrapper from '@/components/CartProviderWrapper'
import { AuthProvider } from '@/lib/context/AuthContext'

export const metadata: Metadata = {
  title: 'A Social Media - Sosyal Medya Hizmetleri',
  description: 'Instagram, Facebook, YouTube, TikTok ve X için sosyal medya hizmetleri',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        <AuthProvider>
          <CartProviderWrapper>{children}</CartProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
