import Link from "next/link"
import { ProductCard } from "./product-card"
import { ChevronRight } from "lucide-react"

const featuredProducts = [
  {
    id: "1",
    name: "Tehran Cement Type 2 - 50kg Bag",
    nameFA: "سیمان تهران تیپ ۲",
    category: "Cement",
    image: "/placeholder.svg?height=400&width=400",
    price: 85000,
    bulkPrice: 80000,
    bulkMinQty: 100,
    rating: 4.8,
    reviews: 234,
    supplier: "Tehran Cement Factory",
    verified: true,
    inStock: true,
  },
  {
    id: "2",
    name: "DeWalt Hammer Drill 20V MAX",
    nameFA: "دریل چکشی دیوالت",
    category: "Power Tools",
    image: "/placeholder.svg?height=400&width=400",
    price: 4500000,
    rating: 4.9,
    reviews: 89,
    supplier: "ToolMart Iran",
    verified: true,
    inStock: true,
  },
  {
    id: "3",
    name: "Professional Safety Helmet - White",
    nameFA: "کلاه ایمنی حرفه‌ای",
    category: "Safety Gear",
    image: "/placeholder.svg?height=400&width=400",
    price: 350000,
    bulkPrice: 320000,
    bulkMinQty: 20,
    rating: 4.6,
    reviews: 156,
    supplier: "SafetyPro",
    verified: true,
    inStock: true,
  },
  {
    id: "4",
    name: "Fire Extinguisher CO2 5kg",
    nameFA: "کپسول آتش‌نشانی CO2",
    category: "Firefighting",
    image: "/placeholder.svg?height=400&width=400",
    price: 1200000,
    rating: 4.7,
    reviews: 67,
    supplier: "FireSafe Iran",
    verified: true,
    inStock: true,
  },
  {
    id: "5",
    name: "Construction Brick Grade A - 1000pcs",
    nameFA: "آجر ساختمانی درجه یک",
    category: "Building Materials",
    image: "/placeholder.svg?height=400&width=400",
    price: 2500000,
    bulkPrice: 2200000,
    bulkMinQty: 5,
    rating: 4.5,
    reviews: 198,
    supplier: "Brick Factory Tehran",
    verified: false,
    inStock: true,
  },
  {
    id: "6",
    name: "Heavy Duty Work Gloves - Pair",
    nameFA: "دستکش کار سنگین",
    category: "Safety Gear",
    image: "/placeholder.svg?height=400&width=400",
    price: 180000,
    bulkPrice: 150000,
    bulkMinQty: 50,
    rating: 4.4,
    reviews: 312,
    supplier: "WorkWear Plus",
    verified: true,
    inStock: false,
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-8 sm:py-10 lg:py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-5 sm:mb-8">
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Best Sellers</h2>
            <p className="text-muted-foreground mt-0.5 sm:mt-1 text-xs sm:text-sm">پرفروش‌ترین محصولات</p>
          </div>
          <Link
            href="/products?sort=bestselling"
            className="text-primary hover:underline text-xs sm:text-sm font-medium flex items-center gap-1"
          >
            View All
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>
        </div>
        <div className="flex lg:grid lg:grid-cols-6 gap-3 sm:gap-4 overflow-x-auto pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory lg:snap-none">
          {featuredProducts.map((product) => (
            <div key={product.id} className="min-w-[140px] sm:min-w-[160px] lg:min-w-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
