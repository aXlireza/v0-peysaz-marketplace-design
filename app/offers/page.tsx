"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { TrendingDown, Package, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useI18n } from "@/lib/i18n/context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function OffersPage() {
  const { locale, dir } = useI18n()
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 34, seconds: 56 })

  const flashDeals = [
    {
      id: "1",
      name: "Portland Cement Type 2 - 50kg",
      nameFA: "سیمان پرتلند نوع ۲ - ۵۰ کیلوگرم",
      price: 750000,
      originalPrice: 950000,
      discount: 21,
      image: "/placeholder.svg?height=300&width=300",
      stock: 45,
      totalStock: 100,
      sold: 55,
      endTime: "2024-02-01T18:00:00",
    },
    {
      id: "2",
      name: "Electric Drill Set Professional",
      nameFA: "ست دریل برقی حرفه‌ای",
      price: 3200000,
      originalPrice: 4500000,
      discount: 29,
      image: "/placeholder.svg?height=300&width=300",
      stock: 12,
      totalStock: 50,
      sold: 38,
      endTime: "2024-02-01T18:00:00",
    },
  ]

  const bulkDeals = [
    {
      id: "1",
      name: "Safety Helmet - Pack of 50",
      nameFA: "کلاه ایمنی - بسته ۵۰ عددی",
      price: 12500000,
      originalPrice: 15000000,
      discount: 17,
      image: "/placeholder.svg?height=300&width=300",
      minQuantity: 50,
      category: "Safety Equipment",
    },
    {
      id: "2",
      name: "Construction Gloves - Bulk Order",
      nameFA: "دستکش کار - سفارش عمده",
      price: 8500000,
      originalPrice: 10000000,
      discount: 15,
      image: "/placeholder.svg?height=300&width=300",
      minQuantity: 100,
      category: "Safety Equipment",
    },
  ]

  const categoryOffers = [
    {
      name: "Power Tools",
      nameFA: "ابزار برقی",
      discount: "تا ۴۰٪",
      image: "/placeholder.svg?height=200&width=400",
      productsCount: 45,
    },
    {
      name: "Safety Equipment",
      nameFA: "تجهیزات ایمنی",
      discount: "تا ۳۵٪",
      image: "/placeholder.svg?height=200&width=400",
      productsCount: 68,
    },
    {
      name: "Cement & Concrete",
      nameFA: "سیمان و بتن",
      discount: "تا ۲۵٪",
      image: "/placeholder.svg?height=200&width=400",
      productsCount: 32,
    },
  ]

  const formatTime = (value: number) => value.toString().padStart(2, "0")

  return (
    <div className="min-h-screen flex-col bg-background" dir={dir}>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                {locale === "fa" ? "پیشنهادات ویژه" : locale === "zh" ? "特别优惠" : "Special Offers"}
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {locale === "fa" ? "بهترین پیشنهادات روز" : locale === "zh" ? "今日最优惠" : "Today's Best Deals"}
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-6">
                {locale === "fa"
                  ? "تخفیف‌های شگفت‌انگیز روی محصولات منتخب - فقط برای مدت محدود"
                  : locale === "zh"
                    ? "精选产品惊人折扣 - 仅限限时"
                    : "Amazing discounts on selected products - Limited time only"}
              </p>
              <div className="flex items-center justify-center gap-4 text-2xl sm:text-3xl font-bold">
                <div className="bg-background/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 min-w-[70px]">
                  <div>{formatTime(timeLeft.hours)}</div>
                  <div className="text-xs font-normal text-primary-foreground/80 mt-1">
                    {locale === "fa" ? "ساعت" : locale === "zh" ? "小时" : "Hours"}
                  </div>
                </div>
                <span>:</span>
                <div className="bg-background/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 min-w-[70px]">
                  <div>{formatTime(timeLeft.minutes)}</div>
                  <div className="text-xs font-normal text-primary-foreground/80 mt-1">
                    {locale === "fa" ? "دقیقه" : locale === "zh" ? "分钟" : "Minutes"}
                  </div>
                </div>
                <span>:</span>
                <div className="bg-background/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 min-w-[70px]">
                  <div>{formatTime(timeLeft.seconds)}</div>
                  <div className="text-xs font-normal text-primary-foreground/80 mt-1">
                    {locale === "fa" ? "ثانیه" : locale === "zh" ? "秒" : "Seconds"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flash Deals */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  {locale === "fa" ? "پیشنهادات لحظه‌ای" : locale === "zh" ? "限时抢购" : "Flash Deals"}
                </h2>
                <p className="text-muted-foreground">
                  {locale === "fa"
                    ? "تخفیف‌های ویژه با موجودی محدود"
                    : locale === "zh"
                      ? "限量特价"
                      : "Special discounts with limited stock"}
                </p>
              </div>
              <Button variant="outline">
                {locale === "fa" ? "مشاهده همه" : locale === "zh" ? "查看全部" : "View All"}
                <ChevronRight className={`h-4 w-4 ${dir === "rtl" ? "mr-2 rotate-180" : "ml-2"}`} />
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashDeals.map((deal) => (
                <Card key={deal.id} className="overflow-hidden group">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={deal.image || "/placeholder.svg"}
                      alt={deal.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <Badge className="absolute top-3 left-3 bg-destructive">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      {deal.discount}%
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{locale === "fa" ? deal.nameFA : deal.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl font-bold text-primary">
                        {deal.price.toLocaleString()} {locale === "fa" ? "تومان" : locale === "zh" ? "托曼" : "T"}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {deal.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {locale === "fa" ? "فروش رفته" : locale === "zh" ? "已售" : "Sold"}: {deal.sold}
                        </span>
                        <span className="font-medium">
                          {locale === "fa" ? "باقی‌مانده" : locale === "zh" ? "剩余" : "Left"}: {deal.stock}
                        </span>
                      </div>
                      <Progress value={(deal.sold / deal.totalStock) * 100} className="h-2" />
                    </div>
                    <Button className="w-full">
                      {locale === "fa" ? "خرید فوری" : locale === "zh" ? "立即购买" : "Buy Now"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Bulk Deals */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                {locale === "fa" ? "پیشنهادات خرید عمده" : locale === "zh" ? "批量优惠" : "Bulk Purchase Deals"}
              </h2>
              <p className="text-muted-foreground">
                {locale === "fa"
                  ? "قیمت‌های ویژه برای خریدهای حجیم"
                  : locale === "zh"
                    ? "大宗采购特价"
                    : "Special prices for bulk orders"}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bulkDeals.map((deal) => (
                <Link key={deal.id} href={`/product/${deal.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <div className="relative aspect-square overflow-hidden">
                      <Image src={deal.image || "/placeholder.svg"} alt={deal.name} fill className="object-cover" />
                      <Badge className="absolute top-3 left-3 bg-accent">
                        <Package className="h-3 w-3 mr-1" />
                        {locale === "fa" ? "عمده" : locale === "zh" ? "批量" : "Bulk"}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2 text-xs">
                        {deal.category}
                      </Badge>
                      <h3 className="font-semibold mb-2 line-clamp-2 text-sm">
                        {locale === "fa" ? deal.nameFA : deal.name}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-lg font-bold text-primary">
                          {deal.price.toLocaleString()} {locale === "fa" ? "تومان" : locale === "zh" ? "托曼" : "T"}
                        </span>
                        <span className="text-xs text-muted-foreground line-through">
                          {deal.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {locale === "fa" ? "حداقل" : locale === "zh" ? "最少" : "Min"}: {deal.minQuantity}{" "}
                        {locale === "fa" ? "عدد" : locale === "zh" ? "件" : "units"}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Category Offers */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                {locale === "fa" ? "تخفیف‌های دسته‌بندی" : locale === "zh" ? "分类折扣" : "Category Discounts"}
              </h2>
              <p className="text-muted-foreground">
                {locale === "fa"
                  ? "بهترین پیشنهادات در هر دسته"
                  : locale === "zh"
                    ? "各类别最优惠"
                    : "Best offers in each category"}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryOffers.map((category) => (
                <Link key={category.name} href={`/category/${category.name.toLowerCase().replace(" ", "-")}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl font-bold mb-1">{locale === "fa" ? category.nameFA : category.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">{category.discount}</span>
                          <span className="text-sm">
                            {category.productsCount} {locale === "fa" ? "محصول" : locale === "zh" ? "产品" : "products"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
