import type { Metadata } from 'next'
import './globals.css'
import CartProviderWrapper from '@/components/CartProviderWrapper'

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
        <CartProviderWrapper>{children}</CartProviderWrapper>
      </body>
    </html>
  )
}
