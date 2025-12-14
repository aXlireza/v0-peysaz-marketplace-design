"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { X, Check, ShoppingCart, ArrowRight, Tag, Truck, Shield, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useI18n } from "@/lib/i18n/context"
import { useCart } from "@/lib/cart-context"

interface AddToCartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: {
    id: string
    name: string
    nameFA: string
    image: string
    price: number
    supplier: string
    inStock: boolean
    maxQty: number
  } | null
}

const FREE_SHIPPING_THRESHOLD = 50000000

const suggestedProducts = [
  {
    id: "s1",
    name: "Safety Helmet",
    nameFA: "کلاه ایمنی",
    image: "/placeholder.svg?height=80&width=80",
    price: 320000,
    supplier: "SafetyPro",
    inStock: true,
    maxQty: 100,
  },
  {
    id: "s2",
    name: "Work Gloves (Pack of 12)",
    nameFA: "دستکش کار",
    image: "/placeholder.svg?height=80&width=80",
    price: 180000,
    supplier: "SafetyPro",
    inStock: true,
    maxQty: 500,
  },
]

export function AddToCartDrawer({ open, onOpenChange, product }: AddToCartDrawerProps) {
  const { t } = useI18n()
  const { items, addItem, getTotal, updateQuantity } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (open && product) {
      setQuantity(1)
      setShowSuccess(true)
      const timer = setTimeout(() => setShowSuccess(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [open, product])

  const cartTotal = getTotal()
  const progressToFreeShipping = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - cartTotal

  const handleAddSuggested = (suggested: (typeof suggestedProducts)[0]) => {
    addItem(suggested, 1)
  }

  if (!product) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-4 sm:p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-base sm:text-lg">
              {showSuccess ? (
                <>
                  <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center">
                    <Check className="h-4 w-4 text-accent-foreground" />
                  </div>
                  {t("cart.added_to_cart")}
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  {t("cart.title")}
                </>
              )}
            </SheetTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Added Product */}
          <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/50 rounded-xl">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-lg bg-card overflow-hidden shrink-0">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm sm:text-base line-clamp-2">{product.name}</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">{product.nameFA}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold text-sm sm:text-base">
                  {product.price.toLocaleString()} <span className="text-xs font-normal">{t("general.toman")}</span>
                </span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-r-none"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="w-10 sm:w-12 h-7 text-center border-0 rounded-none text-xs"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-l-none"
                    onClick={() => setQuantity(Math.min(product.maxQty, quantity + 1))}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Free Shipping Progress */}
          {amountToFreeShipping > 0 ? (
            <div className="p-3 sm:p-4 bg-accent/10 rounded-xl space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-accent" />
                <span className="text-xs sm:text-sm font-medium">
                  {amountToFreeShipping.toLocaleString()} {t("general.toman")} {t("general.free_shipping_over")}
                </span>
              </div>
              <Progress value={progressToFreeShipping} className="h-2" />
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                {t("general.free_shipping_over")} {FREE_SHIPPING_THRESHOLD.toLocaleString()} {t("general.toman")}
              </p>
            </div>
          ) : (
            <div className="p-3 sm:p-4 bg-accent/10 rounded-xl flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              <span className="text-xs sm:text-sm font-medium text-accent">{t("general.free_shipping")}!</span>
            </div>
          )}

          {/* Promo Banner */}
          <div className="p-3 sm:p-4 bg-primary/10 rounded-xl flex items-center gap-3">
            <Tag className="h-5 w-5 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium">{t("checkout.promo_available")}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Use code PEYSAZ10 for 10% off</p>
            </div>
            <Button variant="outline" size="sm" className="shrink-0 h-7 sm:h-8 text-xs bg-transparent">
              {t("checkout.apply_promo")}
            </Button>
          </div>

          {/* Suggested Products */}
          <div>
            <h4 className="font-medium mb-3 text-sm">Frequently bought together</h4>
            <div className="space-y-2 sm:space-y-3">
              {suggestedProducts.map((suggested) => (
                <div
                  key={suggested.id}
                  className="flex items-center gap-3 p-2 sm:p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="relative h-12 w-12 rounded-lg bg-muted overflow-hidden shrink-0">
                    <Image
                      src={suggested.image || "/placeholder.svg"}
                      alt={suggested.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium line-clamp-1">{suggested.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {suggested.price.toLocaleString()} {t("general.toman")}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 sm:h-8 text-xs bg-transparent"
                    onClick={() => handleAddSuggested(suggested)}
                  >
                    + {t("cart.add_to_cart")}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="flex items-center gap-2 p-2 sm:p-3 bg-muted/50 rounded-lg">
              <Shield className="h-4 w-4 text-accent shrink-0" />
              <span className="text-[10px] sm:text-xs">Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2 p-2 sm:p-3 bg-muted/50 rounded-lg">
              <Truck className="h-4 w-4 text-primary shrink-0" />
              <span className="text-[10px] sm:text-xs">Fast Delivery</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-border bg-card space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {t("cart.subtotal")} ({items.length} {t("cart.items")})
            </span>
            <span className="font-semibold text-base sm:text-lg">
              {cartTotal.toLocaleString()} {t("general.toman")}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Button variant="outline" asChild className="bg-transparent h-10 sm:h-11 text-sm">
              <Link href="/cart">{t("cart.view_cart")}</Link>
            </Button>
            <Button asChild className="gap-1.5 h-10 sm:h-11 text-sm">
              <Link href="/checkout">
                {t("cart.checkout")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <Button
            variant="link"
            className="w-full text-muted-foreground text-xs sm:text-sm h-auto p-0"
            onClick={() => onOpenChange(false)}
          >
            {t("cart.continue_shopping")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
