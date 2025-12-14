"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Trash2, Minus, Plus, ShoppingCart, Tag, Truck, ArrowRight, AlertCircle } from "lucide-react"

interface CartItem {
  id: string
  name: string
  nameFA: string
  image: string
  price: number
  quantity: number
  supplier: string
  inStock: boolean
  maxQty: number
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Tehran Cement Type 2 - 50kg Bag",
    nameFA: "سیمان تهران تیپ ۲",
    image: "/placeholder.svg?height=120&width=120",
    price: 80000,
    quantity: 100,
    supplier: "Tehran Cement Factory",
    inStock: true,
    maxQty: 5000,
  },
  {
    id: "2",
    name: "DeWalt Hammer Drill 20V MAX",
    nameFA: "دریل چکشی دیوالت",
    image: "/placeholder.svg?height=120&width=120",
    price: 4500000,
    quantity: 2,
    supplier: "ToolMart Iran",
    inStock: true,
    maxQty: 50,
  },
  {
    id: "3",
    name: "Professional Safety Helmet - White",
    nameFA: "کلاه ایمنی حرفه‌ای",
    image: "/placeholder.svg?height=120&width=120",
    price: 320000,
    quantity: 20,
    supplier: "SafetyPro",
    inStock: true,
    maxQty: 500,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [discountCode, setDiscountCode] = useState("")
  const [discountApplied, setDiscountApplied] = useState(false)

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.maxQty)) } : item,
      ),
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyDiscount = () => {
    if (discountCode.toLowerCase() === "peysaz10") {
      setDiscountApplied(true)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = discountApplied ? subtotal * 0.1 : 0
  const shipping = subtotal > 50000000 ? 0 : 2500000
  const total = subtotal - discount + shipping

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center py-12 sm:py-16">
            <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">Add some products to get started!</p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground mb-4 sm:mb-8 text-sm">سبد خرید • {cartItems.length} items</p>

          <div className="grid lg:grid-cols-3 gap-4 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex gap-3 sm:gap-4">
                      <Link href={`/product/${item.id}`} className="shrink-0">
                        <div className="relative h-16 w-16 sm:h-24 sm:w-24 rounded-lg bg-muted overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <Link
                              href={`/product/${item.id}`}
                              className="font-semibold hover:text-primary transition-colors line-clamp-1 text-sm sm:text-base"
                            >
                              {item.name}
                            </Link>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">{item.nameFA}</p>
                            <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1 hidden sm:block">
                              Seller: {item.supplier}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 text-muted-foreground hover:text-destructive h-8 w-8 sm:h-9 sm:w-9"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mt-2 sm:mt-4">
                          <div className="flex items-center border border-border rounded-lg w-fit">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 sm:h-8 sm:w-8 rounded-r-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                              className="w-12 sm:w-16 h-7 sm:h-8 text-center border-0 rounded-none text-xs sm:text-sm"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 sm:h-8 sm:w-8 rounded-l-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-left sm:text-right">
                            <div className="font-semibold text-sm sm:text-base">
                              {(item.price * item.quantity).toLocaleString()}{" "}
                              <span className="text-xs sm:text-sm font-normal text-muted-foreground">تومان</span>
                            </div>
                            <div className="text-[10px] sm:text-xs text-muted-foreground">
                              {item.price.toLocaleString()} each
                            </div>
                          </div>
                        </div>

                        {!item.inStock && (
                          <div className="flex items-center gap-2 mt-2 sm:mt-3 text-destructive text-xs sm:text-sm">
                            <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span>Out of stock</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary - Sticky on mobile bottom */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Discount code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-1 h-9 sm:h-10 text-sm"
                    />
                    <Button
                      variant="outline"
                      onClick={applyDiscount}
                      disabled={discountApplied}
                      size="sm"
                      className="h-9 sm:h-10 bg-transparent"
                    >
                      <Tag className="h-4 w-4" />
                    </Button>
                  </div>
                  {discountApplied && (
                    <Badge className="bg-accent text-accent-foreground text-xs">10% discount applied!</Badge>
                  )}

                  <Separator />

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{subtotal.toLocaleString()} تومان</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-accent">
                        <span>Discount</span>
                        <span>-{discount.toLocaleString()} تومان</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Truck className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        Shipping
                      </span>
                      <span>{shipping === 0 ? "Free" : `${shipping.toLocaleString()} تومان`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-[10px] sm:text-xs text-muted-foreground">
                        Free shipping on orders over 50,000,000 تومان
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-base sm:text-lg">
                    <span>Total</span>
                    <span>{total.toLocaleString()} تومان</span>
                  </div>

                  <Button asChild className="w-full gap-2" size="default">
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>

                  <p className="text-[10px] sm:text-xs text-center text-muted-foreground">
                    Taxes calculated at checkout
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
                    <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                    <div>
                      <div className="font-medium">Estimated Delivery</div>
                      <div className="text-muted-foreground">3-5 business days</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
