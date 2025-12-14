"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n/context"
import { useCompare } from "@/lib/compare-context"
import {
  X,
  Plus,
  Star,
  BadgeCheck,
  ShoppingCart,
  Trash2,
  ArrowRight,
  GitCompareArrows,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

// Mock price history data for comparison
const priceHistoryData: Record<string, { date: string; price: number }[]> = {
  "1": [
    { date: "Sep", price: 78000 },
    { date: "Oct", price: 80000 },
    { date: "Nov", price: 82000 },
    { date: "Dec", price: 85000 },
  ],
  "2": [
    { date: "Sep", price: 4200000 },
    { date: "Oct", price: 4350000 },
    { date: "Nov", price: 4400000 },
    { date: "Dec", price: 4500000 },
  ],
  "3": [
    { date: "Sep", price: 300000 },
    { date: "Oct", price: 310000 },
    { date: "Nov", price: 315000 },
    { date: "Dec", price: 320000 },
  ],
  "4": [
    { date: "Sep", price: 79000 },
    { date: "Oct", price: 80000 },
    { date: "Nov", price: 81000 },
    { date: "Dec", price: 82000 },
  ],
}

// Mock specifications for comparison
const productSpecs: Record<string, Record<string, string>> = {
  "1": {
    Type: "Portland Type 2",
    Weight: "50 kg",
    Packaging: "Paper bag",
    Strength: "32.5 MPa",
    Standard: "ISIRI 389",
    "Shelf Life": "3 months",
    Origin: "Tehran",
    Delivery: "3-5 days",
  },
  "2": {
    Type: "Hammer Drill",
    Weight: "2.3 kg",
    Power: "20V MAX",
    Speed: "2000 RPM",
    Standard: "CE, UL",
    Warranty: "3 years",
    Origin: "USA",
    Delivery: "2-3 days",
  },
  "3": {
    Type: "Safety Helmet",
    Weight: "400 g",
    Material: "ABS Plastic",
    Standard: "EN 397",
    Color: "White",
    Adjustable: "Yes",
    Origin: "Iran",
    Delivery: "1-2 days",
  },
  "4": {
    Type: "Portland Type 2",
    Weight: "50 kg",
    Packaging: "Paper bag",
    Strength: "32.5 MPa",
    Standard: "ISIRI 389",
    "Shelf Life": "3 months",
    Origin: "Abyek",
    Delivery: "3-5 days",
  },
}

// Sample products to add
const sampleProducts = [
  {
    id: "1",
    name: "Tehran Cement Type 2",
    nameFA: "سیمان تهران تیپ ۲",
    image: "/placeholder.svg?height=200&width=200",
    price: 85000,
    category: "Cement",
    rating: 4.8,
    reviews: 234,
    supplier: "Tehran Cement Factory",
    verified: true,
    inStock: true,
  },
  {
    id: "2",
    name: "DeWalt Hammer Drill 20V",
    nameFA: "دریل چکشی دیوالت",
    image: "/placeholder.svg?height=200&width=200",
    price: 4500000,
    category: "Tools",
    rating: 4.9,
    reviews: 156,
    supplier: "ToolMart Iran",
    verified: true,
    inStock: true,
  },
  {
    id: "3",
    name: "Professional Safety Helmet",
    nameFA: "کلاه ایمنی حرفه‌ای",
    image: "/placeholder.svg?height=200&width=200",
    price: 320000,
    category: "Safety",
    rating: 4.7,
    reviews: 89,
    supplier: "SafetyPro",
    verified: true,
    inStock: true,
  },
  {
    id: "4",
    name: "Abyek Cement Type 2",
    nameFA: "سیمان آبیک تیپ ۲",
    image: "/placeholder.svg?height=200&width=200",
    price: 82000,
    category: "Cement",
    rating: 4.7,
    reviews: 189,
    supplier: "Abyek Cement Factory",
    verified: true,
    inStock: true,
  },
]

export default function ComparePage() {
  const { t } = useI18n()
  const { items, addItem, removeItem, clearAll, maxItems } = useCompare()
  const [showAddModal, setShowAddModal] = useState(false)

  // Get all unique spec keys
  const allSpecKeys = Array.from(new Set(items.flatMap((item) => Object.keys(productSpecs[item.id] || {}))))

  // Find lowest/highest prices
  const prices = items.map((i) => i.price)
  const lowestPrice = Math.min(...prices)
  const highestPrice = Math.max(...prices)

  // Find best rating
  const ratings = items.map((i) => i.rating)
  const bestRating = Math.max(...ratings)

  const handleAddProduct = (product: (typeof sampleProducts)[0]) => {
    addItem(product)
    setShowAddModal(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold flex items-center gap-2">
                <GitCompareArrows className="h-6 w-6 sm:h-7 sm:w-7" />
                {t("compare.title")}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {t("compare.select_products")} ({t("compare.max_products")})
              </p>
            </div>
            {items.length > 0 && (
              <Button variant="outline" className="gap-2 bg-transparent" onClick={clearAll}>
                <Trash2 className="h-4 w-4" />
                {t("product.clear_compare")}
              </Button>
            )}
          </div>

          {items.length === 0 ? (
            /* Empty State */
            <Card className="p-8 sm:p-12 text-center">
              <GitCompareArrows className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-lg sm:text-xl font-semibold mb-2">{t("compare.empty")}</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Add products from the catalog to compare their features, prices, and specifications.
              </p>
              <Button asChild>
                <Link href="/products">
                  Browse Products
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Product Cards Row */}
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-3 sm:gap-4 min-w-max">
                  {items.map((product) => (
                    <Card key={product.id} className="w-[200px] sm:w-[240px] shrink-0 relative group">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-7 w-7 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        onClick={() => removeItem(product.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <CardContent className="p-3 sm:p-4">
                        <Link href={`/product/${product.id}`}>
                          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden mb-3">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </Link>
                        <div className="space-y-2">
                          <Badge variant="secondary" className="text-[10px]">
                            {product.category}
                          </Badge>
                          <Link href={`/product/${product.id}`}>
                            <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-muted-foreground">{product.nameFA}</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-xs text-muted-foreground">({product.reviews})</span>
                            {product.rating === bestRating && items.length > 1 && (
                              <Badge className="ml-auto text-[9px] bg-amber-500/10 text-amber-600 border-0">Best</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            {product.verified && <BadgeCheck className="h-3.5 w-3.5 text-accent" />}
                            <span className="truncate">{product.supplier}</span>
                          </div>
                          <div className="pt-2 border-t border-border">
                            <div className="flex items-baseline gap-1">
                              <span className="font-bold text-base sm:text-lg">{product.price.toLocaleString()}</span>
                              <span className="text-xs text-muted-foreground">{t("general.toman")}</span>
                              {product.price === lowestPrice && items.length > 1 && (
                                <Badge className="ml-auto text-[9px] bg-accent/10 text-accent border-0">Lowest</Badge>
                              )}
                            </div>
                          </div>
                          <Button className="w-full gap-1.5 h-9 text-xs sm:text-sm" size="sm">
                            <ShoppingCart className="h-3.5 w-3.5" />
                            {t("cart.add_to_cart")}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Add More Slot */}
                  {items.length < maxItems && (
                    <Card
                      className="w-[200px] sm:w-[240px] shrink-0 border-dashed cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors"
                      onClick={() => setShowAddModal(true)}
                    >
                      <CardContent className="p-4 h-full flex flex-col items-center justify-center min-h-[300px] text-center">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                          <Plus className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm font-medium">{t("compare.add_more")}</p>
                        <p className="text-xs text-muted-foreground mt-1">{maxItems - items.length} slots remaining</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              {/* Price Comparison Chart */}
              {items.length > 1 && (
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      {t("product.price_history")} Comparison
                    </h3>
                    <div className="h-[200px] sm:h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart>
                          <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            allowDuplicatedCategory={false}
                          />
                          <YAxis hide />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                              fontSize: "12px",
                            }}
                            formatter={(value: number) => [`${value.toLocaleString()} ${t("general.toman")}`, ""]}
                          />
                          {items.map((product, index) => {
                            const colors = [
                              "hsl(var(--primary))",
                              "hsl(var(--accent))",
                              "hsl(var(--chart-3))",
                              "hsl(var(--chart-4))",
                            ]
                            return (
                              <Line
                                key={product.id}
                                data={priceHistoryData[product.id] || []}
                                type="monotone"
                                dataKey="price"
                                name={product.name}
                                stroke={colors[index % colors.length]}
                                strokeWidth={2}
                                dot={{ r: 4 }}
                              />
                            )
                          })}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4 justify-center">
                      {items.map((product, index) => {
                        const colors = ["bg-primary", "bg-accent", "bg-chart-3", "bg-chart-4"]
                        return (
                          <div key={product.id} className="flex items-center gap-2 text-xs">
                            <div className={`h-3 w-3 rounded-full ${colors[index % colors.length]}`} />
                            <span className="truncate max-w-[120px]">{product.name}</span>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Specifications Comparison Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 sm:p-4 font-semibold bg-muted/50 sticky left-0 min-w-[120px]">
                            {t("product.specifications")}
                          </th>
                          {items.map((product) => (
                            <th key={product.id} className="text-left p-3 sm:p-4 font-medium min-w-[160px]">
                              <span className="line-clamp-1">{product.name}</span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Price Row */}
                        <tr className="border-b border-border">
                          <td className="p-3 sm:p-4 font-medium bg-muted/50 sticky left-0">Price</td>
                          {items.map((product) => (
                            <td key={product.id} className="p-3 sm:p-4">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{product.price.toLocaleString()}</span>
                                <span className="text-xs text-muted-foreground">{t("general.toman")}</span>
                                {items.length > 1 &&
                                  (product.price === lowestPrice ? (
                                    <TrendingDown className="h-4 w-4 text-accent" />
                                  ) : product.price === highestPrice ? (
                                    <TrendingUp className="h-4 w-4 text-destructive" />
                                  ) : (
                                    <Minus className="h-4 w-4 text-muted-foreground" />
                                  ))}
                              </div>
                            </td>
                          ))}
                        </tr>
                        {/* Rating Row */}
                        <tr className="border-b border-border">
                          <td className="p-3 sm:p-4 font-medium bg-muted/50 sticky left-0">{t("product.rating")}</td>
                          {items.map((product) => (
                            <td key={product.id} className="p-3 sm:p-4">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                <span className="font-medium">{product.rating}</span>
                                <span className="text-xs text-muted-foreground">({product.reviews})</span>
                                {items.length > 1 && product.rating === bestRating && (
                                  <BadgeCheck className="h-4 w-4 text-accent ml-1" />
                                )}
                              </div>
                            </td>
                          ))}
                        </tr>
                        {/* Supplier Row */}
                        <tr className="border-b border-border">
                          <td className="p-3 sm:p-4 font-medium bg-muted/50 sticky left-0">Supplier</td>
                          {items.map((product) => (
                            <td key={product.id} className="p-3 sm:p-4">
                              <div className="flex items-center gap-1.5">
                                {product.verified && <BadgeCheck className="h-4 w-4 text-accent shrink-0" />}
                                <span className="truncate">{product.supplier}</span>
                              </div>
                            </td>
                          ))}
                        </tr>
                        {/* Stock Row */}
                        <tr className="border-b border-border">
                          <td className="p-3 sm:p-4 font-medium bg-muted/50 sticky left-0">Availability</td>
                          {items.map((product) => (
                            <td key={product.id} className="p-3 sm:p-4">
                              <Badge
                                variant={product.inStock ? "default" : "secondary"}
                                className={product.inStock ? "bg-accent/10 text-accent border-0" : ""}
                              >
                                {product.inStock ? t("product.in_stock") : t("product.out_of_stock")}
                              </Badge>
                            </td>
                          ))}
                        </tr>
                        {/* Dynamic Spec Rows */}
                        {allSpecKeys.map((specKey) => (
                          <tr key={specKey} className="border-b border-border last:border-0">
                            <td className="p-3 sm:p-4 font-medium bg-muted/50 sticky left-0">{specKey}</td>
                            {items.map((product) => (
                              <td key={product.id} className="p-3 sm:p-4">
                                {productSpecs[product.id]?.[specKey] || "-"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Add Product Modal */}
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
              <Card className="relative z-50 w-full max-w-lg mx-4 max-h-[80vh] overflow-hidden animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="font-semibold">{t("compare.add_more")}</h3>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowAddModal(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4 max-h-[60vh] overflow-y-auto space-y-3">
                    {sampleProducts
                      .filter((p) => !items.some((i) => i.id === p.id))
                      .map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-3 p-3 border border-border rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => handleAddProduct(product)}
                        >
                          <div className="relative h-14 w-14 rounded-lg bg-muted overflow-hidden shrink-0">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.category}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-semibold">{product.price.toLocaleString()}</span>
                              <span className="text-xs text-muted-foreground">{t("general.toman")}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="shrink-0 bg-transparent">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    {sampleProducts.filter((p) => !items.some((i) => i.id === p.id)).length === 0 && (
                      <p className="text-center text-muted-foreground py-8">No more products to add</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
