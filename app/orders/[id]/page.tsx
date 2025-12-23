"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, CheckCircle, MapPin, MessageSquare, Download, RotateCcw, Clock } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

const mockOrderDetail = {
  id: "ORD-001234",
  date: "2024-12-15",
  status: "shipped",
  estimatedDelivery: "2024-12-20",
  total: 2850000,
  subtotal: 2600000,
  tax: 250000,
  shipping: 0,
  items: [
    {
      id: "1",
      name: "Portland Cement 50kg Bag",
      nameFA: "کیسه سیمان پرتلند 50 کیلوگرم",
      quantity: 100,
      unitPrice: 26000,
      total: 2600000,
      image: "/placeholder.svg?height=100&width=100",
      supplier: "Cement Factory A",
    },
  ],
  timeline: [
    { status: "pending", label: "Order Placed", date: "2024-12-15 10:30", done: true },
    { status: "processing", label: "Processing", date: "2024-12-15 14:00", done: true },
    { status: "shipped", label: "Shipped", date: "2024-12-16 08:00", done: true },
    { status: "delivered", label: "Delivery Expected", date: "2024-12-20", done: false },
  ],
  shipping: {
    method: "Express Delivery",
    address: "123 Business Street, Tehran, Iran 1234567",
    recipient: "Mohammad Ahmadi",
    phone: "+98 912 345 6789",
    email: "mohammad@example.com",
  },
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { t, locale, dir } = useI18n()

  const getStatusBadgeColor = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: "bg-gray-100 text-gray-800",
      processing: "bg-yellow-100 text-yellow-800",
      shipped: "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
    }
    return statusMap[status] || "bg-gray-100"
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-6 sm:py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{locale === "fa" ? "جزئیات سفارش" : "Order Details"}</h1>
                <p className="text-muted-foreground">
                  {locale === "fa" ? "سفارش" : "Order"} {mockOrderDetail.id}
                </p>
              </div>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                {locale === "fa" ? "دانلود صورت‌حساب" : "Download Invoice"}
              </Button>
            </div>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="space-y-6">
                {mockOrderDetail.timeline.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          step.done ? "bg-green-100" : "bg-gray-100"
                        }`}
                      >
                        {step.done ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <Clock className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      {index < mockOrderDetail.timeline.length - 1 && (
                        <div className="w-0.5 h-16 bg-gray-200 my-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold">{step.label}</p>
                      <p className="text-sm text-muted-foreground">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Items */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{locale === "fa" ? "کالاهای سفارش" : "Order Items"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockOrderDetail.items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-20 w-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.nameFA}</p>
                        <p className="text-sm text-muted-foreground">
                          {locale === "fa" ? "تامین‌کننده:" : "Supplier:"} {item.supplier}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.total.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} × {item.unitPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {locale === "fa" ? "آدرس تحویل" : "Shipping Address"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {locale === "fa" ? "روش ارسال" : "Shipping Method"}
                      </p>
                      <p className="font-medium">{mockOrderDetail.shipping.method}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{locale === "fa" ? "آدرس" : "Address"}</p>
                      <p className="font-medium">{mockOrderDetail.shipping.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{locale === "fa" ? "گیرنده" : "Recipient"}</p>
                      <p className="font-medium">{mockOrderDetail.shipping.recipient}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{locale === "fa" ? "تلفن" : "Phone"}</p>
                        <p className="font-medium">{mockOrderDetail.shipping.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{locale === "fa" ? "ایمیل" : "Email"}</p>
                        <p className="font-medium">{mockOrderDetail.shipping.email}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle>{locale === "fa" ? "خلاصه سفارش" : "Order Summary"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{locale === "fa" ? "جمع کل" : "Subtotal"}</span>
                    <span>{mockOrderDetail.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{locale === "fa" ? "مالیات" : "Tax"}</span>
                    <span>{mockOrderDetail.tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{locale === "fa" ? "ارسال" : "Shipping"}</span>
                    <span>{mockOrderDetail.shipping === 0 ? "رایگان" : mockOrderDetail.shipping}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold">
                    <span>{locale === "fa" ? "مجموع" : "Total"}</span>
                    <span>{mockOrderDetail.total.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button className="w-full gap-2">
                  <Truck className="h-4 w-4" />
                  {locale === "fa" ? "پیگیری سفارش" : "Track Order"}
                </Button>
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <MessageSquare className="h-4 w-4" />
                  {locale === "fa" ? "تماس با پشتیبانی" : "Contact Support"}
                </Button>
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <RotateCcw className="h-4 w-4" />
                  {locale === "fa" ? "سفارش دوباره" : "Reorder"}
                </Button>
              </div>

              {/* Support Card */}
              <Card className="bg-muted/50 border-0">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold mb-3">{locale === "fa" ? "نیاز به کمک؟" : "Need Help?"}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {locale === "fa" ? "تیم پشتیبانی ما 24/7 آماده است" : "Our support team is available 24/7"}
                  </p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    {locale === "fa" ? "تماس بگیرید" : "Get Help"}
                  </Button>
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
