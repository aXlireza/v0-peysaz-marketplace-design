"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Clock, CheckCircle, Truck, ChevronRight, Search, Filter } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"

const mockOrders = [
  {
    id: "ORD-001234",
    date: "2024-12-15",
    status: "delivered",
    total: 2850000,
    items: 3,
    estimatedDelivery: "2024-12-17",
    supplier: "Cement Factory A",
  },
  {
    id: "ORD-001233",
    date: "2024-12-10",
    status: "shipped",
    total: 5200000,
    items: 2,
    estimatedDelivery: "2024-12-18",
    supplier: "Steel Supplier B",
  },
  {
    id: "ORD-001232",
    date: "2024-12-05",
    status: "processing",
    total: 1950000,
    items: 5,
    estimatedDelivery: "2024-12-15",
    supplier: "Tools Store C",
  },
  {
    id: "ORD-001231",
    date: "2024-11-28",
    status: "delivered",
    total: 7600000,
    items: 1,
    estimatedDelivery: "2024-12-05",
    supplier: "Cement Factory A",
  },
]

const statusConfig = {
  delivered: {
    label: "تحویل داده شده",
    labelEn: "Delivered",
    icon: CheckCircle,
    color: "bg-green-100 text-green-800",
  },
  shipped: {
    label: "ارسال شده",
    labelEn: "Shipped",
    icon: Truck,
    color: "bg-blue-100 text-blue-800",
  },
  processing: {
    label: "در حال پردازش",
    labelEn: "Processing",
    icon: Clock,
    color: "bg-yellow-100 text-yellow-800",
  },
  pending: {
    label: "در انتظار",
    labelEn: "Pending",
    icon: Package,
    color: "bg-gray-100 text-gray-800",
  },
}

export default function OrdersContent() {
  const { t, locale } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredOrders = mockOrders
    .filter((order) => {
      const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime()
      return 0
    })

  const getStatusLabel = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig]
    return locale === "fa" ? config.label : config.labelEn
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{locale === "fa" ? "سفارشات من" : "My Orders"}</h1>
        <p className="text-muted-foreground">
          {locale === "fa" ? "مشاهده و پیگیری تمام سفارشات خود" : "View and track all your orders"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="relative sm:col-span-2 lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={locale === "fa" ? "جستجو بر اساس شماره سفارش..." : "Search by order number..."}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder={locale === "fa" ? "وضعیت" : "Status"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{locale === "fa" ? "همه" : "All"}</SelectItem>
            <SelectItem value="pending">{locale === "fa" ? "در انتظار" : "Pending"}</SelectItem>
            <SelectItem value="processing">{locale === "fa" ? "در حال پردازش" : "Processing"}</SelectItem>
            <SelectItem value="shipped">{locale === "fa" ? "ارسال شده" : "Shipped"}</SelectItem>
            <SelectItem value="delivered">{locale === "fa" ? "تحویل داده شده" : "Delivered"}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder={locale === "fa" ? "مرتب‌سازی" : "Sort"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{locale === "fa" ? "جدیدترین" : "Newest"}</SelectItem>
            <SelectItem value="oldest">{locale === "fa" ? "قدیمی‌ترین" : "Oldest"}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredOrders.length === 0 ? (
        <Card className="text-center py-12">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
          <CardTitle className="mb-2">{locale === "fa" ? "سفارشی یافت نشد" : "No orders found"}</CardTitle>
          <p className="text-muted-foreground mb-6">
            {locale === "fa" ? "هنوز سفارشی ثبت نکرده‌اید" : "You haven't placed any orders yet"}
          </p>
          <Button asChild>
            <Link href="/products">{locale === "fa" ? "شروع خرید" : "Start Shopping"}</Link>
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
            const statusColor = statusConfig[order.status as keyof typeof statusConfig].color

            return (
              <Link key={order.id} href={`/orders/${order.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                      {/* Order ID and Date */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {locale === "fa" ? "شماره سفارش" : "Order Number"}
                        </p>
                        <p className="font-semibold text-lg">{order.id}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(order.date).toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US")}
                        </p>
                      </div>

                      {/* Status */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">{locale === "fa" ? "وضعیت" : "Status"}</p>
                        <Badge className={statusColor}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {getStatusLabel(order.status)}
                        </Badge>
                      </div>

                      {/* Items Count */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{locale === "fa" ? "تعداد کالا" : "Items"}</p>
                        <p className="font-medium">{order.items} items</p>
                      </div>

                      {/* Total */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{locale === "fa" ? "مجموع" : "Total"}</p>
                        <p className="font-semibold">
                          {order.total.toLocaleString()} <span className="text-sm text-muted-foreground">تومان</span>
                        </p>
                      </div>

                      {/* Action */}
                      <div className="flex justify-end">
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
