import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { CementPrices } from "@/components/home/cement-prices"
import { FeaturedProducts } from "@/components/home/featured-products"
import { SuppliersSpotlight } from "@/components/home/suppliers-spotlight"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />

        {/* Cement Prices + Categories Section - Better mobile layout */}
        <section className="py-6 sm:py-8 lg:py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-1 order-2 lg:order-1">
                <CementPrices />
              </div>
              <div className="lg:col-span-2 order-1 lg:order-2">
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Popular Categories</h2>
                  <p className="text-muted-foreground mt-0.5 sm:mt-1 text-xs sm:text-sm">دسته‌بندی‌های پرطرفدار</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                  <CategoryQuickCard
                    title="Cement"
                    titleFA="سیمان"
                    image="/placeholder.svg?height=200&width=300"
                    href="/category/cement"
                    count="150+"
                  />
                  <CategoryQuickCard
                    title="Power Tools"
                    titleFA="ابزار برقی"
                    image="/placeholder.svg?height=200&width=300"
                    href="/category/tools"
                    count="300+"
                  />
                  <CategoryQuickCard
                    title="Safety Equipment"
                    titleFA="تجهیزات ایمنی"
                    image="/placeholder.svg?height=200&width=300"
                    href="/category/safety"
                    count="200+"
                  />
                  <CategoryQuickCard
                    title="Hand Tools"
                    titleFA="ابزار دستی"
                    image="/placeholder.svg?height=200&width=300"
                    href="/category/hand-tools"
                    count="450+"
                  />
                  <CategoryQuickCard
                    title="Firefighting"
                    titleFA="آتش‌نشانی"
                    image="/placeholder.svg?height=200&width=300"
                    href="/category/firefighting"
                    count="80+"
                  />
                  <CategoryQuickCard
                    title="Building Materials"
                    titleFA="مصالح"
                    image="/placeholder.svg?height=200&width=300"
                    href="/category/materials"
                    count="400+"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturedProducts />
        <SuppliersSpotlight />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

function CategoryQuickCard({
  title,
  titleFA,
  image,
  href,
  count,
}: {
  title: string
  titleFA: string
  image: string
  href: string
  count: string
}) {
  return (
    <a href={href} className="group relative aspect-[4/3] sm:aspect-[3/2] rounded-lg sm:rounded-xl overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-sidebar via-sidebar/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-4 text-sidebar-foreground">
        <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
        <p className="text-[10px] sm:text-xs text-sidebar-foreground/70">
          {titleFA} • {count}
        </p>
      </div>
    </a>
  )
}
