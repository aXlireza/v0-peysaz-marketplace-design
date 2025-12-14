"use client"

import type React from "react"
import { useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CategoryBreadcrumb } from "@/components/category/breadcrumb"
import { ProductFilters } from "@/components/category/product-filters"
import { ProductGrid } from "@/components/category/product-grid"
import { Building2, Wrench, HardHat, FlameKindling, Layers } from "lucide-react"

// Category metadata
const categoryData: Record<
  string,
  {
    name: string
    nameFA: string
    description: string
    icon: React.ElementType
  }
> = {
  cement: {
    name: "Cement",
    nameFA: "سیمان",
    description: "Browse all types of cement from verified Iranian factories",
    icon: Building2,
  },
  tools: {
    name: "Tools",
    nameFA: "ابزارآلات",
    description: "Professional power tools and hand tools for construction",
    icon: Wrench,
  },
  safety: {
    name: "Safety Gear",
    nameFA: "تجهیزات ایمنی",
    description: "Protective equipment and safety gear for work sites",
    icon: HardHat,
  },
  firefighting: {
    name: "Firefighting",
    nameFA: "آتش‌نشانی",
    description: "Fire extinguishers and firefighting equipment",
    icon: FlameKindling,
  },
  materials: {
    name: "Building Materials",
    nameFA: "مصالح ساختمانی",
    description: "Bricks, steel, aggregates, and construction materials",
    icon: Layers,
  },
}

// Mock products data
const mockProducts = [
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
    name: "Abyek Cement Type 2 - 50kg Bag",
    nameFA: "سیمان آبیک تیپ ۲",
    category: "Cement",
    image: "/placeholder.svg?height=400&width=400",
    price: 82000,
    bulkPrice: 77000,
    bulkMinQty: 100,
    rating: 4.7,
    reviews: 189,
    supplier: "Abyek Cement Co.",
    supplierVerified: true,
    inStock: true,
    deliveryTime: "3-5 days",
  },
  {
    id: "3",
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
  {
    id: "4",
    name: "Fars White Cement - 25kg Bag",
    nameFA: "سیمان سفید فارس",
    category: "Cement",
    image: "/placeholder.svg?height=400&width=400",
    price: 145000,
    rating: 4.6,
    reviews: 98,
    supplier: "Fars Cement",
    supplierVerified: true,
    inStock: true,
    deliveryTime: "4-6 days",
  },
  {
    id: "5",
    name: "Sepahan Cement Type 2 - 50kg Bag",
    nameFA: "سیمان سپاهان تیپ ۲",
    category: "Cement",
    image: "/placeholder.svg?height=400&width=400",
    price: 84000,
    bulkPrice: 79000,
    bulkMinQty: 100,
    rating: 4.7,
    reviews: 167,
    supplier: "Sepahan Cement",
    supplierVerified: true,
    inStock: false,
    deliveryTime: "3-5 days",
  },
  {
    id: "6",
    name: "Tehran Cement Type 1 - 50kg Bag",
    nameFA: "سیمان تهران تیپ ۱",
    category: "Cement",
    image: "/placeholder.svg?height=400&width=400",
    price: 82000,
    bulkPrice: 77000,
    bulkMinQty: 100,
    rating: 4.5,
    reviews: 145,
    supplier: "Tehran Cement Factory",
    supplierVerified: true,
    inStock: true,
    deliveryTime: "2-3 days",
  },
  {
    id: "7",
    name: "Hormozgan Cement Type 2 - 50kg",
    nameFA: "سیمان هرمزگان تیپ ۲",
    category: "Cement",
    image: "/placeholder.svg?height=400&width=400",
    price: 79000,
    bulkPrice: 74000,
    bulkMinQty: 150,
    rating: 4.4,
    reviews: 89,
    supplier: "Hormozgan Cement",
    supplierVerified: false,
    inStock: true,
    deliveryTime: "5-7 days",
  },
  {
    id: "8",
    name: "Khuzestan Cement Type 5 - 50kg",
    nameFA: "سیمان خوزستان تیپ ۵",
    category: "Cement",
    image: "/placeholder.svg?height=400&width=400",
    price: 92000,
    rating: 4.6,
    reviews: 112,
    supplier: "Khuzestan Cement",
    supplierVerified: true,
    inStock: true,
    deliveryTime: "4-6 days",
  },
]

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const category = categoryData[slug] || categoryData.cement

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

  const CategoryIcon = category.icon

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4">
          <CategoryBreadcrumb items={[{ label: "Categories", href: "/categories" }, { label: category.name }]} />

          {/* Category Header - Better mobile layout */}
          <div className="py-4 sm:py-6 border-b border-border mb-4 sm:mb-8">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
              <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <CategoryIcon className="h-5 w-5 sm:h-7 sm:w-7 text-primary" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">{category.name}</h1>
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base truncate sm:whitespace-normal">
                  {category.nameFA} • {category.description}
                </p>
              </div>
            </div>
          </div>

          {/* Filters + Products - Mobile-first flex layout */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 pb-8 sm:pb-12">
            <ProductFilters
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
            />
            <ProductGrid products={mockProducts} totalCount={152} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
