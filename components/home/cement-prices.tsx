"use client"

import Link from "next/link"
import { TrendingUp, TrendingDown, Minus, ArrowRight, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const cementPrices = [
  { brand: "Tehran Cement", brandFA: "سیمان تهران", type: "Type 2", price: 85000, change: 2.5, unit: "per bag" },
  { brand: "Abyek Cement", brandFA: "سیمان آبیک", type: "Type 2", price: 82000, change: -1.2, unit: "per bag" },
  { brand: "Saveh Cement", brandFA: "سیمان ساوه", type: "Type 5", price: 95000, change: 0, unit: "per bag" },
  { brand: "Sepahan Cement", brandFA: "سیمان سپاهان", type: "Type 2", price: 84000, change: 1.8, unit: "per bag" },
  { brand: "Fars Cement", brandFA: "سیمان فارس", type: "White", price: 145000, change: 3.2, unit: "per bag" },
]

export function CementPrices() {
  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3.5 w-3.5" />
    if (change < 0) return <TrendingDown className="h-3.5 w-3.5" />
    return <Minus className="h-3.5 w-3.5" />
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-destructive"
    if (change < 0) return "text-accent"
    return "text-muted-foreground"
  }

  return (
    <Card className="border-accent/20 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              This Week&apos;s Cement Prices
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">قیمت سیمان این هفته • Updated Dec 2, 2024</p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <RefreshCw className="h-3 w-3" />
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {cementPrices.map((item) => (
            <div
              key={item.brand}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div className="flex-1">
                <div className="font-medium">{item.brand}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>{item.brandFA}</span>
                  <span>•</span>
                  <span>{item.type}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  {item.price.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">تومان</span>
                </div>
                <div className={`flex items-center justify-end gap-1 text-sm ${getChangeColor(item.change)}`}>
                  {getChangeIcon(item.change)}
                  <span>{Math.abs(item.change)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button asChild variant="outline" className="w-full mt-4 bg-transparent">
          <Link href="/cement-prices">
            View All Prices & Historical Data
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
