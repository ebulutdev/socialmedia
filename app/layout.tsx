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
  icons: {
    icon: '/images/image.png',
    apple: '/images/image.png',
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
        
        {/* Crisp Chatbox */}
        <Script id="crisp-chatbox" strategy="afterInteractive">
          {`
            window.$crisp=[];
            window.CRISP_WEBSITE_ID="03d400d2-6f6d-4287-af26-35bdafacf68a";
            (function(){
              d=document;
              s=d.createElement("script");
              s.src="https://beta.client.crisp.chat/l.js";
              s.async=1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
          `}
        </Script>
        <AuthProvider>
          <CartProviderWrapper>{children}</CartProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
