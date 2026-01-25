import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Campaigns from '@/components/Campaigns'
import PopularProducts from '@/components/PopularProducts'
import Testimonials from '@/components/Testimonials'
import BusinessPartners from '@/components/BusinessPartners'
import FAQ from '@/components/FAQ'
import FloatingCartButton from '@/components/FloatingCartButton'
import LiveOrdersNotification from '@/components/LiveOrdersNotification'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Campaigns />
      <PopularProducts />
      <Testimonials />
      <BusinessPartners />
      <FAQ />
      <FloatingCartButton />
      <LiveOrdersNotification />
      <Footer />
    </main>
  )
}
