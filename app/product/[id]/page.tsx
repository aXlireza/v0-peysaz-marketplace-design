"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CategoryBreadcrumb } from "@/components/category/breadcrumb"
import { ImageGallery } from "@/components/product/image-gallery"
import { PricingTiers } from "@/components/product/pricing-tiers"
import { SupplierCard } from "@/components/product/supplier-card"
import { Specifications } from "@/components/product/specifications"
import { ReviewsSection } from "@/components/product/reviews-section"
import { RelatedProducts } from "@/components/product/related-products"
import { PriceHistoryChart } from "@/components/product/price-history-chart"
import { CompareButton } from "@/components/product/compare-button"
import { AddToCartDrawer } from "@/components/cart/add-to-cart-drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useI18n } from "@/lib/i18n/context"
import { useCart } from "@/lib/cart-context"
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  BadgeCheck,
  Minus,
  Plus,
  Package,
} from "lucide-react"

const productData = {
  id: "1",
  name: "Tehran Cement Type 2 - 50kg Bag",
  nameFA: "سیمان تهران تیپ ۲ - کیسه ۵۰ کیلویی",
  category: "Cement",
  categorySlug: "cement",
  description:
    "High-quality Type 2 Portland cement from Tehran Cement Factory. Ideal for general construction, concrete work, and masonry applications. Meets all Iranian national standards and international quality certifications.",
  descriptionFA:
    "سیمان پرتلند تیپ ۲ با کیفیت بالا از کارخانه سیمان تهران. مناسب برای ساختمان‌سازی عمومی، کارهای بتنی و بنایی.",
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  price: 85000,
  rating: 4.8,
  reviews: 234,
  inStock: true,
  stockQty: 5000,
  sku: "TC-T2-50KG",
  unit: "bags",
  supplier: "Tehran Cement Factory",
  verified: true,
}

const priceHistoryData = [
  { date: "Aug 1", price: 78000, marketAvg: 79000 },
  { date: "Aug 15", price: 79500, marketAvg: 80000 },
  { date: "Sep 1", price: 80000, marketAvg: 81000 },
  { date: "Sep 15", price: 81500, marketAvg: 82000 },
  { date: "Oct 1", price: 82000, marketAvg: 82500 },
  { date: "Oct 15", price: 83000, marketAvg: 83500 },
  { date: "Nov 1", price: 84000, marketAvg: 84000 },
  { date: "Nov 15", price: 84500, marketAvg: 84500 },
  { date: "Dec 1", price: 85000, marketAvg: 85000 },
]

const pricingTiers = [
  { minQty: 1, maxQty: 49, price: 85000 },
  { minQty: 50, maxQty: 99, price: 82000, savings: 4 },
  { minQty: 100, maxQty: 499, price: 80000, savings: 6 },
  { minQty: 500, price: 77000, savings: 9 },
]

const supplier = {
  id: "1",
  name: "Tehran Cement Factory",
  nameFA: "کارخانه سیمان تهران",
  logo: "/placeholder.svg?height=80&width=80",
  location: "Tehran",
  products: 45,
  rating: 4.9,
  reviews: 892,
  verified: true,
  badge: "Gold",
  responseTime: "< 2 hours",
  memberSince: "2019",
}

const specifications = [
  { label: "Cement Type", labelFA: "نوع سیمان", value: "Type 2 (Modified Portland)" },
  { label: "Weight", labelFA: "وزن", value: "50 kg per bag" },
  { label: "Packaging", labelFA: "بسته‌بندی", value: "Paper bag with plastic liner" },
  { label: "Color", labelFA: "رنگ", value: "Gray" },
  { label: "Setting Time", labelFA: "زمان گیرش", value: "Initial: 45 min, Final: 6 hours" },
  { label: "Compressive Strength", labelFA: "مقاومت فشاری", value: "32.5 MPa (28 days)" },
  { label: "Standard", labelFA: "استاندارد", value: "ISIRI 389, EN 197-1" },
  { label: "Shelf Life", labelFA: "تاریخ انقضا", value: "3 months (proper storage)" },
  { label: "Application", labelFA: "کاربرد", value: "General construction, foundations, masonry" },
]

const reviewDistribution = [
  { stars: 5, count: 156, percentage: 67 },
  { stars: 4, count: 52, percentage: 22 },
  { stars: 3, count: 18, percentage: 8 },
  { stars: 2, count: 5, percentage: 2 },
  { stars: 1, count: 3, percentage: 1 },
]

const mockReviews = [
  {
    id: "1",
    author: "Mohammad R.",
    rating: 5,
    date: "Nov 28, 2024",
    title: "Excellent quality cement",
    content:
      "This is the best cement I've used for my construction projects. Consistent quality and great strength. Delivery was also very fast.",
    helpful: 24,
    verified: true,
  },
  {
    id: "2",
    author: "Ali K.",
    rating: 4,
    date: "Nov 25, 2024",
    title: "Good product, fast shipping",
    content:
      "Quality is as expected from Tehran Cement. The bulk pricing saved us a lot on our project. Would recommend for large orders.",
    helpful: 18,
    verified: true,
  },
  {
    id: "3",
    author: "Reza M.",
    rating: 5,
    date: "Nov 20, 2024",
    title: "Perfect for our building project",
    content:
      "We ordered 500 bags for our residential project. Every bag was in perfect condition. The support team was very helpful with logistics.",
    helpful: 31,
    verified: true,
  },
]

const relatedProducts = [
  {
    id: "2",
    name: "Abyek Cement Type 2",
    nameFA: "سیمان آبیک تیپ ۲",
    image: "/placeholder.svg?height=200&width=200",
    price: 82000,
    rating: 4.7,
    reviews: 189,
  },
  {
    id: "3",
    name: "Saveh Cement Type 5",
    nameFA: "سیمان ساوه تیپ ۵",
    image: "/placeholder.svg?height=200&width=200",
    price: 95000,
    rating: 4.9,
    reviews: 156,
  },
  {
    id: "4",
    name: "Fars White Cement",
    nameFA: "سیمان سفید فارس",
    image: "/placeholder.svg?height=200&width=200",
    price: 145000,
    rating: 4.6,
    reviews: 98,
  },
  {
    id: "5",
    name: "Sepahan Cement Type 2",
    nameFA: "سیمان سپاهان تیپ ۲",
    image: "/placeholder.svg?height=200&width=200",
    price: 84000,
    rating: 4.7,
    reviews: 167,
  },
  {
    id: "6",
    name: "Tehran Cement Type 1",
    nameFA: "سیمان تهران تیپ ۱",
    image: "/placeholder.svg?height=200&width=200",
    price: 82000,
    rating: 4.5,
    reviews: 145,
  },
  {
    id: "7",
    name: "Hormozgan Cement Type 2",
    nameFA: "سیمان هرمزگان تیپ ۲",
    image: "/placeholder.svg?height=200&width=200",
    price: 79000,
    rating: 4.4,
    reviews: 89,
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const { t } = useI18n()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showCartDrawer, setShowCartDrawer] = useState(false)

  // Calculate current price based on quantity
  const getCurrentPrice = () => {
    for (let i = pricingTiers.length - 1; i >= 0; i--) {
      if (quantity >= pricingTiers[i].minQty) {
        return pricingTiers[i].price
      }
    }
    return pricingTiers[0].price
  }

  const currentPrice = getCurrentPrice()
  const totalPrice = currentPrice * quantity

  const handleAddToCart = () => {
    addItem(
      {
        id: productData.id,
        name: productData.name,
        nameFA: productData.nameFA,
        image: productData.images[0],
        price: currentPrice,
        supplier: productData.supplier,
        inStock: productData.inStock,
        maxQty: productData.stockQty,
      },
      quantity,
    )
    setShowCartDrawer(true)
  }

  const compareProduct = {
    id: productData.id,
    name: productData.name,
    nameFA: productData.nameFA,
    image: productData.images[0],
    price: productData.price,
    category: productData.category,
    rating: productData.rating,
    reviews: productData.reviews,
    supplier: productData.supplier,
    verified: productData.verified,
    inStock: productData.inStock,
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4">
          <CategoryBreadcrumb
            items={[
              { label: t("nav.categories"), href: "/categories" },
              { label: productData.category, href: `/category/${productData.categorySlug}` },
              { label: productData.name },
            ]}
          />

          {/* Product Main Section */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 py-4 lg:py-6">
            {/* Image Gallery */}
            <ImageGallery images={productData.images} productName={productData.name} />

            {/* Product Info */}
            <div className="space-y-4 lg:space-y-6">
              {/* Title & Rating */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {productData.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    SKU: {productData.sku}
                  </Badge>
                </div>
                <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-balance">{productData.name}</h1>
                <p className="text-muted-foreground text-sm mt-1">{productData.nameFA}</p>

                <div className="flex flex-wrap items-center gap-3 lg:gap-4 mt-3 lg:mt-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 lg:h-5 lg:w-5 ${
                          star <= Math.round(productData.rating) ? "fill-amber-500 text-amber-500" : "text-muted"
                        }`}
                      />
                    ))}
                    <span className="font-medium ml-1 text-sm lg:text-base">{productData.rating}</span>
                  </div>
                  <span className="text-muted-foreground hidden sm:inline">|</span>
                  <span className="text-xs lg:text-sm text-muted-foreground">
                    {productData.reviews} {t("product.reviews")}
                  </span>
                  <span className="text-muted-foreground hidden sm:inline">|</span>
                  <span className="flex items-center gap-1 text-xs lg:text-sm">
                    <BadgeCheck className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-accent" />
                    {t("product.verified_supplier")}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="p-4 lg:p-6 bg-muted rounded-xl">
                <div className="flex items-baseline gap-2 lg:gap-3">
                  <span className="text-2xl lg:text-3xl font-bold">{currentPrice.toLocaleString()}</span>
                  <span className="text-muted-foreground text-sm">{t("general.toman")} / bag</span>
                </div>
                {quantity >= 50 && (
                  <div className="text-accent text-xs lg:text-sm mt-1">
                    Bulk discount applied! You save {(((85000 - currentPrice) / 85000) * 100).toFixed(0)}%
                  </div>
                )}
                <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t("cart.subtotal")} ({quantity} {productData.unit})
                    </span>
                    <span className="font-semibold text-base lg:text-lg">
                      {totalPrice.toLocaleString()} {t("general.toman")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stock & Quantity */}
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-accent" />
                  <span className={`text-sm ${productData.inStock ? "text-accent" : "text-destructive"}`}>
                    {productData.inStock
                      ? `${t("product.in_stock")} (${productData.stockQty.toLocaleString()} available)`
                      : t("product.out_of_stock")}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <span className="text-sm font-medium">{t("cart.quantity")}:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-r-none"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      className="w-20 h-10 text-center border-0 rounded-none"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-l-none"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 lg:gap-3">
                <Button
                  size="lg"
                  className="flex-1 gap-2 h-11 lg:h-12"
                  disabled={!productData.inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 lg:h-5 lg:w-5" />
                  <span className="text-sm lg:text-base">{t("cart.add_to_cart")}</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`h-11 lg:h-12 w-11 lg:w-12 p-0 ${isWishlisted ? "text-destructive" : ""}`}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={`h-4 w-4 lg:h-5 lg:w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <CompareButton
                  product={compareProduct}
                  variant="icon"
                  size="lg"
                  className="h-11 lg:h-12 w-11 lg:w-12"
                />
                <Button size="lg" variant="outline" className="h-11 lg:h-12 w-11 lg:w-12 p-0 bg-transparent">
                  <Share2 className="h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 lg:gap-4 py-3 lg:py-4 border-t border-b border-border">
                <div className="text-center">
                  <Truck className="h-5 w-5 lg:h-6 lg:w-6 mx-auto text-primary" />
                  <div className="text-xs lg:text-sm font-medium mt-1.5 lg:mt-2">Fast Delivery</div>
                  <div className="text-[10px] lg:text-xs text-muted-foreground">2-5 {t("general.days")}</div>
                </div>
                <div className="text-center">
                  <Shield className="h-5 w-5 lg:h-6 lg:w-6 mx-auto text-primary" />
                  <div className="text-xs lg:text-sm font-medium mt-1.5 lg:mt-2">Quality Guaranteed</div>
                  <div className="text-[10px] lg:text-xs text-muted-foreground">Factory certified</div>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-5 w-5 lg:h-6 lg:w-6 mx-auto text-primary" />
                  <div className="text-xs lg:text-sm font-medium mt-1.5 lg:mt-2">Easy Returns</div>
                  <div className="text-[10px] lg:text-xs text-muted-foreground">30-day policy</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2 text-sm lg:text-base">{t("product.description")}</h3>
                <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed">{productData.description}</p>
                <p className="text-muted-foreground text-xs lg:text-sm mt-2 leading-relaxed">
                  {productData.descriptionFA}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Content for Desktop */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 py-6 lg:py-8">
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <PriceHistoryChart
                productName={productData.name}
                currentPrice={productData.price}
                data={priceHistoryData}
              />
              <Specifications specs={specifications} />
              <ReviewsSection
                rating={productData.rating}
                totalReviews={productData.reviews}
                distribution={reviewDistribution}
                reviews={mockReviews}
              />
            </div>
            <div className="space-y-4 lg:space-y-6 order-first lg:order-last">
              <PricingTiers tiers={pricingTiers} unit="bags" />
              <SupplierCard supplier={supplier} />
            </div>
          </div>

          {/* Related Products */}
          <RelatedProducts title={t("product.related")} titleFA="محصولات مشابه" products={relatedProducts} />
        </div>
      </main>
      <Footer />

      {/* Add to Cart Drawer */}
      <AddToCartDrawer
        open={showCartDrawer}
        onOpenChange={setShowCartDrawer}
        product={{
          id: productData.id,
          name: productData.name,
          nameFA: productData.nameFA,
          image: productData.images[0],
          price: currentPrice,
          supplier: productData.supplier,
          inStock: productData.inStock,
          maxQty: productData.stockQty,
        }}
      />
    </div>
  )
}
