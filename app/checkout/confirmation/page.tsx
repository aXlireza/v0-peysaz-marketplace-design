"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { useI18n } from "@/lib/i18n/context"
import {
  CheckCircle2,
  Package,
  Truck,
  MessageCircle,
  FileText,
  Home,
  Copy,
  Clock,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Share2,
} from "lucide-react"

export default function OrderConfirmationPage() {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const orderId = "PYZ-2024-00123456"
  const estimatedDelivery = "Dec 7-9, 2024"

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Order tracking steps
  const trackingSteps = [
    { id: 1, label: t("order.pending"), status: "complete", time: "Dec 4, 10:30 AM" },
    { id: 2, label: t("order.processing"), status: "current", time: "In progress" },
    { id: 3, label: t("order.shipped"), status: "pending", time: "Estimated Dec 6" },
    { id: 4, label: t("order.delivered"), status: "pending", time: "Estimated Dec 7-9" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
          <div className="max-w-2xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-accent/10 flex items-center justify-center animate-in zoom-in duration-500">
                  <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 text-accent" />
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t("order.success")}</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Thank you for your order. We have sent a confirmation to your email.
              </p>
            </div>

            {/* Order ID Card */}
            <Card className="mb-4 sm:mb-6">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-muted rounded-xl">
                  <div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{t("order.number")}</div>
                    <div className="font-mono font-semibold text-base sm:text-lg">{orderId}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 bg-transparent flex-1 sm:flex-none"
                      onClick={handleCopy}
                    >
                      <Copy className="h-4 w-4" />
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Tracking */}
            <Card className="mb-4 sm:mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {t("order.track")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {trackingSteps.map((step, index) => (
                    <div key={step.id} className="flex gap-3 sm:gap-4 pb-6 last:pb-0">
                      {/* Timeline */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center shrink-0 ${
                            step.status === "complete"
                              ? "bg-accent text-accent-foreground"
                              : step.status === "current"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {step.status === "complete" ? (
                            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
                          ) : (
                            <span className="text-xs sm:text-sm font-semibold">{step.id}</span>
                          )}
                        </div>
                        {index < trackingSteps.length - 1 && (
                          <div
                            className={`w-0.5 flex-1 mt-2 ${step.status === "complete" ? "bg-accent" : "bg-muted"}`}
                          />
                        )}
                      </div>
                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <div
                          className={`font-medium text-sm sm:text-base ${step.status === "pending" ? "text-muted-foreground" : ""}`}
                        >
                          {step.label}
                        </div>
                        <div className="text-xs sm:text-sm text-muted-foreground">{step.time}</div>
                        {step.status === "current" && (
                          <div className="mt-2">
                            <Progress value={45} className="h-1.5" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Details */}
            <Card className="mb-4 sm:mb-6">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base sm:text-lg">Order Details</CardTitle>
                  <Badge className="bg-accent text-accent-foreground text-xs">Confirmed</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Truck className="h-4 w-4" />
                      {t("order.estimated_delivery")}
                    </div>
                    <div className="font-medium">{estimatedDelivery}</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <CreditCard className="h-4 w-4" />
                      Payment Status
                    </div>
                    <div className="font-medium flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-amber-500" />
                      Pending Verification
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Delivery Address
                  </div>
                  <div className="text-sm p-3 bg-muted/50 rounded-lg">
                    <div className="font-medium">Mohammad Ahmadi</div>
                    <div className="text-muted-foreground">Tehran, Valiasr St., Building 123, Floor 5</div>
                    <div className="text-muted-foreground">Postal Code: 1234567890</div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-base sm:text-lg">
                  <span>{t("cart.total")}</span>
                  <span>23,400,000 {t("general.toman")}</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Button variant="outline" className="gap-2 bg-transparent h-11 text-sm" asChild>
                <Link href="/">
                  <Package className="h-4 w-4" />
                  {t("order.track")}
                </Link>
              </Button>
              <Button variant="outline" className="gap-2 bg-transparent h-11 text-sm">
                <FileText className="h-4 w-4" />
                Invoice
              </Button>
            </div>

            {/* Support Card */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-sm sm:text-base">{t("order.support")}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Our support team is available 24/7</div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button className="gap-2 bg-accent hover:bg-accent/90 flex-1 sm:flex-none h-10" size="sm">
                      <MessageCircle className="h-4 w-4" />
                      {t("order.whatsapp_support")}
                    </Button>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground">
                  <a
                    href="tel:+982100000000"
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    021-00000000
                  </a>
                  <a
                    href="mailto:support@peysaz.com"
                    className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    support@peysaz.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-6 sm:mt-8">
              <Button variant="link" asChild className="text-muted-foreground">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  {t("cart.continue_shopping")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
