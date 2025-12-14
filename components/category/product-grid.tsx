"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Grid3X3, List, Star, BadgeCheck, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Product {
  id: string
  name: string
  nameFA: string
  category: string
  image: string
  price: number
  bulkPrice?: number
  bulkMinQty?: number
  rating: number
  reviews: number
  supplier: string
  supplierVerified: boolean
  inStock: boolean
  deliveryTime: string
}

interface ProductGridProps {
  products: Product[]
  totalCount: number
}

export function ProductGrid({ products, totalCount }: ProductGridProps) {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")

  return (
    <div className="flex-1">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{products.length}</span> of{" "}
          <span className="font-medium text-foreground">{totalCount}</span> products
        </div>
        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Most Relevant</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="bestselling">Best Selling</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden sm:flex items-center border border-border rounded-lg">
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-9 w-9 rounded-r-none"
              onClick={() => setView("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-9 w-9 rounded-l-none"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products */}
      {view === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCardGrid key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <ProductCardList key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

function ProductCardGrid({ product }: { product: Product }) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square bg-muted overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.bulkPrice && (
            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">Bulk Discount</Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <span className="text-muted-foreground font-medium">Out of Stock</span>
            </div>
          )}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="secondary" className="h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors text-sm">{product.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground mt-0.5">{product.nameFA}</p>

        <div className="flex items-center gap-1 mt-2">
          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
          <span className="text-sm">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
          {product.supplierVerified && <BadgeCheck className="h-4 w-4 text-accent ml-auto" />}
        </div>

        <div className="text-xs text-muted-foreground mt-1">
          {product.supplier} • {product.deliveryTime}
        </div>

        <div className="mt-3">
          <div className="font-semibold">
            {product.price.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">تومان</span>
          </div>
          {product.bulkPrice && (
            <div className="text-xs text-accent mt-0.5">
              Bulk: {product.bulkPrice.toLocaleString()} ({product.bulkMinQty}+)
            </div>
          )}
        </div>

        <Button className="w-full mt-3 gap-2" size="sm" disabled={!product.inStock}>
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}

function ProductCardList({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row">
        <Link href={`/product/${product.id}`} className="sm:w-48 shrink-0">
          <div className="relative aspect-square sm:aspect-auto sm:h-full bg-muted overflow-hidden">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            {product.bulkPrice && (
              <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">Bulk Discount</Badge>
            )}
          </div>
        </Link>
        <CardContent className="flex-1 p-4 flex flex-col">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground">{product.nameFA}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">
                  {product.price.toLocaleString()}{" "}
                  <span className="text-sm font-normal text-muted-foreground">تومان</span>
                </div>
                {product.bulkPrice && (
                  <div className="text-xs text-accent">
                    Bulk: {product.bulkPrice.toLocaleString()} ({product.bulkMinQty}+ units)
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-3 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <span>by {product.supplier}</span>
                {product.supplierVerified && <BadgeCheck className="h-4 w-4 text-accent" />}
              </div>
            </div>

            <div className="text-sm text-muted-foreground mt-2">Delivery: {product.deliveryTime}</div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <Button disabled={!product.inStock} className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/product/${product.id}`}>View Details</Link>
            </Button>
            {!product.inStock && <Badge variant="secondary">Out of Stock</Badge>}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
