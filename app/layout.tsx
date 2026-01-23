import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import CartProviderWrapper from '@/components/CartProviderWrapper'
import { AuthProvider } from '@/lib/context/AuthContext'

export const metadata: Metadata = {
  title: 'subjective - Sosyal Medya Hizmetleri',
  description: 'Instagram, Facebook, YouTube, TikTok ve X için sosyal medya hizmetleri',
  verification: {
    google: 'v8F1cayCIu003KYLcKwWNbLtx_cBJ_c4PKyeUdMnTlo',
  },
  other: {
    'google-site-verification': 'v8F1cayCIu003KYLcKwWNbLtx_cBJ_c4PKyeUdMnTlo',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        <AuthProvider>
          <CartProviderWrapper>{children}</CartProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
