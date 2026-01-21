import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SosyalEvin - Sosyal Medya Hizmetleri',
  description: 'Instagram, Facebook, YouTube, TikTok ve X için sosyal medya hizmetleri',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
