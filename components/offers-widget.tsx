"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Tag, Clock, ChevronRight, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useI18n } from "@/lib/i18n/context"

export function OffersWidget() {
  const { locale, dir } = useI18n()
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 34, seconds: 56 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        }
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const offers = [
    {
      id: "1",
      name: "Portland Cement Type 2",
      nameFA: "سیمان پرتلند نوع ۲",
      price: 750000,
      originalPrice: 950000,
      discount: 21,
      image: "/placeholder.svg?height=200&width=200",
      stock: 45,
      totalStock: 100,
    },
    {
      id: "2",
      name: "Electric Drill Professional",
      nameFA: "دریل برقی حرفه‌ای",
      price: 3200000,
      originalPrice: 4500000,
      discount: 29,
      image: "/placeholder.svg?height=200&width=200",
      stock: 12,
      totalStock: 50,
    },
  ]

  const formatTime = (value: number) => value.toString().padStart(2, "0")

  return (
    <Card dir={dir}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            {locale === "fa" ? "پیشنهادات ویژه" : locale === "zh" ? "特别优惠" : "Special Offers"}
          </CardTitle>
          <Link href="/offers">
            <Button variant="ghost" size="sm">
              {locale === "fa" ? "همه" : locale === "zh" ? "全部" : "All"}
              <ChevronRight className={`h-4 w-4 ${dir === "rtl" ? "mr-1 rotate-180" : "ml-1"}`} />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Timer */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
          <div className="flex items-center justify-center gap-2 text-center">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              {locale === "fa" ? "پایان فروش:" : locale === "zh" ? "结束时间：" : "Ends in:"}
            </span>
            <div className="flex items-center gap-1 font-mono font-bold">
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm">
                {formatTime(timeLeft.hours)}
              </span>
              <span>:</span>
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm">
                {formatTime(timeLeft.minutes)}
              </span>
              <span>:</span>
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm">
                {formatTime(timeLeft.seconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Offers */}
        <div className="space-y-3">
          {offers.map((offer) => (
            <Link key={offer.id} href={`/product/${offer.id}`}>
              <div className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={offer.image || "/placeholder.svg"}
                    alt={offer.name}
                    fill
                    className="object-cover rounded-md"
                  />
                  <Badge className="absolute -top-1 -right-1 bg-destructive text-xs px-1.5">
                    <TrendingDown className="h-2.5 w-2.5 mr-0.5" />
                    {offer.discount}%
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2 mb-1">
                    {locale === "fa" ? offer.nameFA : offer.name}
                  </h4>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-primary">
                      {offer.price.toLocaleString()} {locale === "fa" ? "تومان" : locale === "zh" ? "托曼" : "T"}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      {offer.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <Progress value={(offer.stock / offer.totalStock) * 100} className="h-1.5" />
                    <p className="text-xs text-muted-foreground">
                      {locale === "fa" ? "فقط" : locale === "zh" ? "仅剩" : "Only"} {offer.stock}{" "}
                      {locale === "fa" ? "عدد باقی‌مانده" : locale === "zh" ? "件" : "left"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Button className="w-full" asChild>
          <Link href="/offers">
            {locale === "fa" ? "مشاهده همه پیشنهادات" : locale === "zh" ? "查看所有优惠" : "View All Offers"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
