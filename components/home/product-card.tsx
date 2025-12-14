"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, ShoppingCart, BadgeCheck, GitCompareArrows, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n/context"
import { useCompare } from "@/lib/compare-context"
import { useCart } from "@/lib/cart-context"
import { AddToCartDrawer } from "@/components/cart/add-to-cart-drawer"

interface ProductCardProps {
  product: {
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
    verified: boolean
    inStock: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useI18n()
  const {
    addItem: addToCompare,
    removeItem: removeFromCompare,
    isInCompare,
    items: compareItems,
    maxItems,
  } = useCompare()
  const { addItem: addToCart } = useCart()
  const [showCartDrawer, setShowCartDrawer] = useState(false)

  const inCompare = isInCompare(product.id)
  const compareFull = compareItems.length >= maxItems

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inCompare) {
      removeFromCompare(product.id)
    } else if (!compareFull) {
      addToCompare({
        ...product,
        specs: {},
      })
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      nameFA: product.nameFA,
      image: product.image,
      price: product.price,
      supplier: product.supplier,
      inStock: product.inStock,
      maxQty: 1000,
    })
    setShowCartDrawer(true)
  }

  return (
    <>
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow h-full">
        <Link href={`/product/${product.id}`}>
          <div className="relative aspect-square bg-muted overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.bulkPrice && (
              <Badge className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-accent text-accent-foreground text-[10px] sm:text-xs px-1.5 py-0.5">
                Bulk
              </Badge>
            )}
            {!product.inStock && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <span className="text-muted-foreground font-medium text-xs sm:text-sm">
                  {t("product.out_of_stock")}
                </span>
              </div>
            )}
            <Button
              variant={inCompare ? "default" : "secondary"}
              size="icon"
              className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 h-7 w-7 sm:h-8 sm:w-8 opacity-0 group-hover:opacity-100 transition-opacity ${
                inCompare ? "opacity-100" : ""
              }`}
              onClick={handleCompareClick}
              disabled={!inCompare && compareFull}
            >
              {inCompare ? (
                <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              ) : (
                <GitCompareArrows className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              )}
            </Button>
          </div>
        </Link>
        <CardContent className="p-2.5 sm:p-4">
          <div className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">{product.category}</div>
          <Link href={`/product/${product.id}`}>
            <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors text-xs sm:text-sm leading-tight">
              {product.name}
            </h3>
          </Link>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 line-clamp-1">{product.nameFA}</p>

          <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
            <div className="flex items-center text-amber-500">
              <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current" />
              <span className="text-[11px] sm:text-sm ml-0.5 sm:ml-1 text-foreground">{product.rating}</span>
            </div>
            <span className="text-[10px] sm:text-xs text-muted-foreground">({product.reviews})</span>
            {product.verified && <BadgeCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent ml-auto" />}
          </div>

          <div className="hidden sm:flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <span className="truncate">by {product.supplier}</span>
          </div>

          <div className="mt-2 sm:mt-3 space-y-0.5 sm:space-y-1">
            <div className="font-semibold text-sm sm:text-lg">
              {product.price.toLocaleString()}{" "}
              <span className="text-[10px] sm:text-sm font-normal text-muted-foreground">{t("general.toman")}</span>
            </div>
            {product.bulkPrice && (
              <div className="text-[10px] sm:text-xs text-accent truncate">
                {t("product.bulk_price")}: {product.bulkPrice.toLocaleString()} ({product.bulkMinQty}+)
              </div>
            )}
          </div>

          <Button
            className="w-full mt-2 sm:mt-3 gap-1.5 sm:gap-2 h-8 sm:h-9 text-xs sm:text-sm"
            size="sm"
            disabled={!product.inStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline sm:inline">{t("cart.add_to_cart")}</span>
            <span className="xs:hidden sm:hidden">Cart</span>
          </Button>
        </CardContent>
      </Card>

      <AddToCartDrawer
        open={showCartDrawer}
        onOpenChange={setShowCartDrawer}
        product={{
          id: product.id,
          name: product.name,
          nameFA: product.nameFA,
          image: product.image,
          price: product.price,
          supplier: product.supplier,
          inStock: product.inStock,
          maxQty: 1000,
        }}
      />
    </>
  )
}
