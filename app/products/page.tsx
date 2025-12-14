"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CategoryBreadcrumb } from "@/components/category/breadcrumb"
import { ProductFilters } from "@/components/category/product-filters"
import { ProductGrid } from "@/components/category/product-grid"
import { Package } from "lucide-react"

// All products mock data
const allProducts = [
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
    supplierVerified: true,
    inStock: true,
    deliveryTime: "2-3 days",
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
    supplierVerified: true,
    inStock: true,
    deliveryTime: "1-2 days",
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
    supplierVerified: true,
    inStock: true,
    deliveryTime: "2-3 days",
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
    supplierVerified: true,
    inStock: true,
    deliveryTime: "3-5 days",
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
    supplierVerified: false,
    inStock: true,
    deliveryTime: "5-7 days",
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
    supplierVerified: true,
    inStock: false,
    deliveryTime: "2-3 days",
  },
  {
    id: "7",
    name: "Makita Circular Saw 7-1/4",
    nameFA: "اره دایره‌ای ماکیتا",
    category: "Power Tools",
    image: "/placeholder.svg?height=400&width=400",
    price: 3800000,
    rating: 4.8,
    reviews: 124,
    supplier: "ToolMart Iran",
    supplierVerified: true,
    inStock: true,
    deliveryTime: "1-2 days",
  },
  {
    id: "8",
    name: "Saveh Cement Type 5 - 50kg Bag",
    nameFA: "سیمان ساوه تیپ ۵",
    category: "Cement",
    image: "/placeholder.svg?height=400&width=400",
    price: 95000,
    bulkPrice: 90000,
    bulkMinQty: 50,
    rating: 4.9,
    reviews: 156,
    supplier: "Saveh Cement Factory",
    supplierVerified: true,
    inStock: true,
    deliveryTime: "2-4 days",
  },
]

export default function AllProductsPage() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000])

  const handleFilterChange = (groupId: string, optionId: string, checked: boolean) => {
    setActiveFilters((prev) => {
      const current = prev[groupId] || []
      if (checked) {
        return { ...prev, [groupId]: [...current, optionId] }
      } else {
        return { ...prev, [groupId]: current.filter((id) => id !== optionId) }
      }
    })
  }

  const handleClearFilters = () => {
    setActiveFilters({})
    setPriceRange([0, 500000])
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4">
          <CategoryBreadcrumb items={[{ label: "All Products" }]} />

          {/* Page Header */}
          <div className="py-6 border-b border-border mb-8">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <Package className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">All Products</h1>
                <p className="text-muted-foreground">
                  همه محصولات • Browse our complete catalog of construction supplies
                </p>
              </div>
            </div>
          </div>

          {/* Filters + Products */}
          <div className="flex gap-8 pb-12">
            <ProductFilters
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
            />
            <ProductGrid products={allProducts} totalCount={2156} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
