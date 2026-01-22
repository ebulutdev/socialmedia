import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Campaigns from '@/components/Campaigns'
import PackageSystem from '@/components/PackageSystem'
import PopularProducts from '@/components/PopularProducts'
import Testimonials from '@/components/Testimonials'
import BusinessPartners from '@/components/BusinessPartners'
import FAQ from '@/components/FAQ'
import LiveSupport from '@/components/LiveSupport'
import FloatingCartButton from '@/components/FloatingCartButton'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Campaigns />
      <PackageSystem />
      <PopularProducts />
      <Testimonials />
      <BusinessPartners />
      <FAQ />
      <LiveSupport />
      <FloatingCartButton />
      <Footer />
    </main>
  )
}
