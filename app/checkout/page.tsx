"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useI18n } from "@/lib/i18n/context"
import {
  MapPin,
  Truck,
  CreditCard,
  Building2,
  Check,
  ChevronRight,
  ChevronDown,
  Shield,
  Phone,
  Plus,
  Clock,
  Package,
  User,
  Tag,
  MessageCircle,
  HelpCircle,
  Sparkles,
  Lock,
} from "lucide-react"

const savedAddresses = [
  {
    id: "1",
    label: "Office",
    name: "Mohammad Ahmadi",
    phone: "09123456789",
    address: "Tehran, Valiasr St., Building 123, Floor 5",
    city: "Tehran",
    postalCode: "1234567890",
    isDefault: true,
  },
  {
    id: "2",
    label: "Construction Site",
    name: "Site Manager",
    phone: "09111111111",
    address: "Karaj, Industrial Zone, Project Phase 2",
    city: "Karaj",
    postalCode: "3456789012",
    isDefault: false,
  },
]

const deliveryOptions = [
  {
    id: "standard",
    name: "Standard Delivery",
    nameFA: "ارسال معمولی",
    description: "3-5 business days",
    price: 2500000,
    icon: Truck,
  },
  {
    id: "express",
    name: "Express Delivery",
    nameFA: "ارسال سریع",
    description: "1-2 business days",
    price: 5000000,
    icon: Clock,
  },
  {
    id: "factory",
    name: "Factory Direct",
    nameFA: "دریافت از کارخانه",
    description: "Pickup from supplier",
    price: 0,
    icon: Building2,
  },
]

const orderItems = [
  {
    id: "1",
    name: "Tehran Cement Type 2 - 50kg Bag",
    nameFA: "سیمان تهران تیپ ۲",
    image: "/placeholder.svg?height=60&width=60",
    price: 80000,
    quantity: 100,
  },
  {
    id: "2",
    name: "DeWalt Hammer Drill 20V MAX",
    nameFA: "دریل چکشی دیوالت",
    image: "/placeholder.svg?height=60&width=60",
    price: 4500000,
    quantity: 2,
  },
  {
    id: "3",
    name: "Professional Safety Helmet - White",
    nameFA: "کلاه ایمنی حرفه‌ای",
    image: "/placeholder.svg?height=60&width=60",
    price: 320000,
    quantity: 20,
  },
]

export default function CheckoutPage() {
  const { t } = useI18n()
  const [step, setStep] = useState(1)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState("1")
  const [deliveryMethod, setDeliveryMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("online")
  const [showNewAddress, setShowNewAddress] = useState(false)
  const [discountCode, setDiscountCode] = useState("")
  const [discountApplied, setDiscountApplied] = useState(false)
  const [orderNotes, setOrderNotes] = useState("")
  const [itemsExpanded, setItemsExpanded] = useState(false)

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = deliveryOptions.find((d) => d.id === deliveryMethod)?.price || 0
  const discount = discountApplied ? subtotal * 0.1 : 0
  const total = subtotal - discount + delivery

  const steps = [
    { id: 1, name: t("checkout.step_login"), nameShort: "Login", icon: User },
    { id: 2, name: t("checkout.step_address"), nameShort: "Address", icon: MapPin },
    { id: 3, name: t("checkout.step_delivery"), nameShort: "Delivery", icon: Truck },
    { id: 4, name: t("checkout.step_payment"), nameShort: "Pay", icon: CreditCard },
  ]

  const handleApplyDiscount = () => {
    if (discountCode.toLowerCase() === "peysaz10") {
      setDiscountApplied(true)
    }
  }

  const handleGuestCheckout = () => {
    setStep(2)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    setStep(2)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
          {/* Progress Steps */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {steps.map((s, index) => (
                <div key={s.id} className="flex items-center flex-1">
                  <button
                    onClick={() => s.id < step && setStep(s.id)}
                    disabled={s.id > step}
                    className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2 transition-colors ${
                      s.id < step ? "cursor-pointer" : s.id > step ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-colors ${
                        step > s.id
                          ? "bg-accent text-accent-foreground"
                          : step === s.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step > s.id ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                    </div>
                    <span
                      className={`text-[10px] sm:text-sm font-medium ${
                        step >= s.id ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <span className="hidden sm:inline">{s.name}</span>
                      <span className="sm:hidden">{s.nameShort}</span>
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 sm:mx-4 ${step > s.id ? "bg-accent" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Step 1: Login */}
              {step === 1 && (
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <User className="h-5 w-5" />
                      {t("checkout.step_login")}
                    </CardTitle>
                    <CardDescription>{t("checkout.login_benefits")}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 sm:space-y-6">
                    {/* Login Form */}
                    <div className="p-4 sm:p-6 border border-border rounded-xl space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("auth.email_phone")}</Label>
                        <Input id="email" type="text" placeholder="email@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">{t("auth.password")}</Label>
                        <Input id="password" type="password" placeholder="••••••••" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox id="remember" />
                          <span>{t("auth.remember_me")}</span>
                        </label>
                        <Link href="/forgot-password" className="text-primary hover:underline">
                          {t("auth.forgot_password")}
                        </Link>
                      </div>
                      <Button className="w-full" size="lg" onClick={handleLogin}>
                        {t("auth.login")}
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                      <p className="text-center text-sm text-muted-foreground">
                        {t("auth.no_account")}{" "}
                        <Link href="/register" className="text-primary hover:underline">
                          {t("auth.register")}
                        </Link>
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or</span>
                      </div>
                    </div>

                    {/* Guest Checkout */}
                    <Button variant="outline" className="w-full bg-transparent" size="lg" onClick={handleGuestCheckout}>
                      {t("checkout.guest_checkout")}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>

                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-xs sm:text-sm">
                      <Sparkles className="h-4 w-4 text-primary shrink-0" />
                      <span>Create an account to earn rewards and track orders easily!</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Address */}
              {step === 2 && (
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MapPin className="h-5 w-5" />
                      {t("checkout.step_address")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isLoggedIn ? (
                      <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress} className="space-y-3">
                        {savedAddresses.map((addr) => (
                          <div key={addr.id} className="flex items-start gap-3">
                            <RadioGroupItem value={addr.id} id={addr.id} className="mt-4" />
                            <Label htmlFor={addr.id} className="flex-1 cursor-pointer">
                              <div
                                className={`p-3 sm:p-4 border rounded-xl transition-colors ${
                                  selectedAddress === addr.id ? "border-primary bg-primary/5" : "border-border"
                                }`}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-semibold text-sm">{addr.label}</span>
                                  {addr.isDefault && (
                                    <Badge variant="secondary" className="text-[10px]">
                                      {t("checkout.default")}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm">{addr.name}</p>
                                <p className="text-xs sm:text-sm text-muted-foreground">{addr.phone}</p>
                                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{addr.address}</p>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      /* Guest Address Form */
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>{t("auth.full_name")}</Label>
                            <Input placeholder="Enter full name" />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("auth.phone")}</Label>
                            <Input placeholder="09123456789" />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Province</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select province" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tehran">Tehran</SelectItem>
                                <SelectItem value="alborz">Alborz</SelectItem>
                                <SelectItem value="isfahan">Isfahan</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>City</Label>
                            <Input placeholder="Enter city" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>{t("checkout.address")}</Label>
                          <Textarea placeholder="Street, building, unit number..." />
                        </div>
                        <div className="space-y-2">
                          <Label>Postal Code</Label>
                          <Input placeholder="1234567890" />
                        </div>
                      </div>
                    )}

                    {isLoggedIn && (
                      <Collapsible open={showNewAddress} onOpenChange={setShowNewAddress}>
                        <CollapsibleTrigger asChild>
                          <Button variant="outline" className="w-full gap-2 bg-transparent">
                            <Plus className="h-4 w-4" />
                            {t("checkout.add_address")}
                            <ChevronDown
                              className={`h-4 w-4 ml-auto transition-transform ${showNewAddress ? "rotate-180" : ""}`}
                            />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 p-4 border border-border rounded-xl space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>{t("auth.full_name")}</Label>
                              <Input placeholder="Enter full name" />
                            </div>
                            <div className="space-y-2">
                              <Label>{t("auth.phone")}</Label>
                              <Input placeholder="09123456789" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>{t("checkout.address")}</Label>
                            <Textarea placeholder="Full address..." />
                          </div>
                          <Button className="w-full">{t("general.save")}</Button>
                        </CollapsibleContent>
                      </Collapsible>
                    )}

                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(1)}>
                        {t("checkout.back")}
                      </Button>
                      <Button className="flex-1" onClick={() => setStep(3)}>
                        {t("checkout.continue")}
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Delivery */}
              {step === 3 && (
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Truck className="h-5 w-5" />
                      {t("checkout.delivery_method")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="space-y-3">
                      {deliveryOptions.map((option) => (
                        <div key={option.id} className="flex items-start gap-3">
                          <RadioGroupItem value={option.id} id={option.id} className="mt-4" />
                          <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                            <div
                              className={`p-3 sm:p-4 border rounded-xl transition-colors ${
                                deliveryMethod === option.id ? "border-primary bg-primary/5" : "border-border"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                    <option.icon className="h-5 w-5 text-primary" />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-sm sm:text-base">{option.name}</div>
                                    <div className="text-xs text-muted-foreground">{option.nameFA}</div>
                                    <div className="text-xs sm:text-sm text-muted-foreground">{option.description}</div>
                                  </div>
                                </div>
                                <div className="font-semibold text-sm sm:text-base whitespace-nowrap">
                                  {option.price === 0
                                    ? t("cart.free")
                                    : `${option.price.toLocaleString()} ${t("general.toman")}`}
                                </div>
                              </div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    <div className="space-y-2">
                      <Label>{t("checkout.order_notes")}</Label>
                      <Textarea
                        placeholder="Special instructions for delivery..."
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(2)}>
                        {t("checkout.back")}
                      </Button>
                      <Button className="flex-1" onClick={() => setStep(4)}>
                        {t("checkout.continue")}
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Payment */}
              {step === 4 && (
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CreditCard className="h-5 w-5" />
                      {t("checkout.payment_method")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value="online" id="online" className="mt-4" />
                        <Label htmlFor="online" className="flex-1 cursor-pointer">
                          <div
                            className={`p-3 sm:p-4 border rounded-xl transition-colors ${
                              paymentMethod === "online" ? "border-primary bg-primary/5" : "border-border"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                                <CreditCard className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-semibold text-sm sm:text-base">{t("checkout.online_payment")}</div>
                                <div className="text-xs sm:text-sm text-muted-foreground">Pay instantly via card</div>
                              </div>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-start gap-3">
                        <RadioGroupItem value="bank-transfer" id="bank-transfer" className="mt-4" />
                        <Label htmlFor="bank-transfer" className="flex-1 cursor-pointer">
                          <div
                            className={`p-3 sm:p-4 border rounded-xl transition-colors ${
                              paymentMethod === "bank-transfer" ? "border-primary bg-primary/5" : "border-border"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-semibold text-sm sm:text-base">{t("checkout.bank_transfer")}</div>
                                <div className="text-xs sm:text-sm text-muted-foreground">Transfer to bank account</div>
                              </div>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-start gap-3">
                        <RadioGroupItem value="credit" id="credit" className="mt-4" />
                        <Label htmlFor="credit" className="flex-1 cursor-pointer">
                          <div
                            className={`p-3 sm:p-4 border rounded-xl transition-colors ${
                              paymentMethod === "credit" ? "border-primary bg-primary/5" : "border-border"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                                  <Lock className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <div className="font-semibold text-sm sm:text-base">{t("checkout.credit_line")}</div>
                                  <div className="text-xs sm:text-sm text-muted-foreground">
                                    Pay later (approved accounts)
                                  </div>
                                </div>
                              </div>
                              <Badge variant="secondary" className="text-[10px]">
                                Requires approval
                              </Badge>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "bank-transfer" && (
                      <div className="p-4 bg-muted rounded-xl space-y-3">
                        <div className="font-medium text-sm">Bank Details</div>
                        <div className="text-xs sm:text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Bank:</span>
                            <span>Bank Mellat</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Account:</span>
                            <span>1234-5678-9012-3456</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">IBAN:</span>
                            <span className="text-xs">IR12 3456 7890 1234 5678 9012 34</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <Separator />

                    {/* Trust & Support */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <Shield className="h-4 w-4 text-accent shrink-0" />
                        <span className="text-xs">Secure payment</span>
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <Phone className="h-4 w-4 text-accent shrink-0" />
                        <span className="text-xs">24/7 support</span>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(3)}>
                        {t("checkout.back")}
                      </Button>
                      <Button className="flex-1 bg-accent hover:bg-accent/90" asChild>
                        <Link href="/checkout/confirmation">
                          {t("checkout.place_order")}
                          <Check className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Help Card */}
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <HelpCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Need help with your order?</p>
                    <p className="text-xs text-muted-foreground">Our team is here to assist you</p>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5 bg-transparent shrink-0">
                    <MessageCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-4">
              <Card className="sticky top-24">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg flex items-center justify-between">
                    {t("cart.title")}
                    <Badge variant="secondary">
                      {orderItems.length} {t("cart.items")}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Collapsible Items */}
                  <Collapsible open={itemsExpanded} onOpenChange={setItemsExpanded}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm hover:text-primary transition-colors">
                      <span className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        View items
                      </span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${itemsExpanded ? "rotate-180" : ""}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-3 pt-2">
                      {orderItems.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="relative h-12 w-12 rounded-lg bg-muted overflow-hidden shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium line-clamp-1">{item.name}</p>
                            <p className="text-[10px] text-muted-foreground">Qty: {item.quantity}</p>
                            <p className="text-xs font-semibold">
                              {(item.price * item.quantity).toLocaleString()} {t("general.toman")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  <Separator />

                  {/* Discount Code */}
                  <div className="flex gap-2">
                    <Input
                      placeholder={t("cart.discount_code")}
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-1 h-9 text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 bg-transparent"
                      onClick={handleApplyDiscount}
                      disabled={discountApplied}
                    >
                      <Tag className="h-4 w-4" />
                    </Button>
                  </div>
                  {discountApplied && (
                    <Badge className="bg-accent text-accent-foreground text-xs">10% discount applied!</Badge>
                  )}

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                      <span>
                        {subtotal.toLocaleString()} {t("general.toman")}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-accent">
                        <span>{t("cart.discount")}</span>
                        <span>
                          -{discount.toLocaleString()} {t("general.toman")}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("cart.shipping")}</span>
                      <span>
                        {delivery === 0 ? t("cart.free") : `${delivery.toLocaleString()} ${t("general.toman")}`}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>{t("cart.total")}</span>
                    <span>
                      {total.toLocaleString()} {t("general.toman")}
                    </span>
                  </div>

                  {/* Estimated Delivery */}
                  <div className="p-3 bg-muted/50 rounded-lg flex items-center gap-3 text-xs">
                    <Truck className="h-4 w-4 text-primary shrink-0" />
                    <div>
                      <div className="font-medium">{t("order.estimated_delivery")}</div>
                      <div className="text-muted-foreground">
                        {deliveryMethod === "express" ? "1-2" : deliveryMethod === "factory" ? "Same day" : "3-5"}{" "}
                        {t("general.days")}
                      </div>
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
