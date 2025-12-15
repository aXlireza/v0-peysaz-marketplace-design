"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, MapPin, BadgeCheck, Star, Package, TrendingUp, Filter, ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useI18n } from "@/lib/i18n/context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function SuppliersPage() {
  const { t, locale, dir } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("rating")

  const suppliers = [
    {
      id: "1",
      name: "Tehran Cement Factory",
      nameFA: "کارخانه سیمان تهران",
      logo: "/placeholder.svg?height=100&width=100",
      verified: true,
      rating: 4.8,
      reviews: 1250,
      location: "Tehran",
      locationFA: "تهران",
      categories: ["Cement", "Building Materials"],
      productsCount: 85,
      yearsActive: 15,
      responseTime: "2h",
      description: "Leading cement manufacturer with ISO certification",
      descriptionFA: "تولیدکننده پیشرو سیمان با گواهینامه ISO",
    },
    {
      id: "2",
      name: "Alborz Power Tools",
      nameFA: "ابزار برقی البرز",
      logo: "/placeholder.svg?height=100&width=100",
      verified: true,
      rating: 4.9,
      reviews: 890,
      location: "Karaj",
      locationFA: "کرج",
      categories: ["Power Tools", "Hand Tools"],
      productsCount: 320,
      yearsActive: 8,
      responseTime: "1h",
      description: "Premium quality tools and equipment",
      descriptionFA: "ابزار و تجهیزات با کیفیت برتر",
    },
    {
      id: "3",
      name: "Safety First Equipment",
      nameFA: "تجهیزات ایمنی اول",
      logo: "/placeholder.svg?height=100&width=100",
      verified: true,
      rating: 4.7,
      reviews: 645,
      location: "Isfahan",
      locationFA: "اصفهان",
      categories: ["Safety Equipment", "PPE"],
      productsCount: 180,
      yearsActive: 12,
      responseTime: "3h",
      description: "Complete safety solutions for construction",
      descriptionFA: "راهکارهای کامل ایمنی برای ساختمان",
    },
    {
      id: "4",
      name: "Zagros Building Materials",
      nameFA: "مصالح ساختمانی زاگرس",
      logo: "/placeholder.svg?height=100&width=100",
      verified: false,
      rating: 4.5,
      reviews: 423,
      location: "Shiraz",
      locationFA: "شیراز",
      categories: ["Building Materials", "Sand & Gravel"],
      productsCount: 95,
      yearsActive: 6,
      responseTime: "4h",
      description: "Wide range of construction materials",
      descriptionFA: "تنوع گسترده مصالح ساختمانی",
    },
    {
      id: "5",
      name: "Kaveh Firefighting Co.",
      nameFA: "شرکت آتش نشانی کاوه",
      logo: "/placeholder.svg?height=100&width=100",
      verified: true,
      rating: 4.9,
      reviews: 312,
      location: "Tehran",
      locationFA: "تهران",
      categories: ["Firefighting", "Safety Equipment"],
      productsCount: 125,
      yearsActive: 10,
      responseTime: "2h",
      description: "Professional firefighting equipment supplier",
      descriptionFA: "تامین‌کننده حرفه‌ای تجهیزات آتش‌نشانی",
    },
    {
      id: "6",
      name: "Aria Industrial Equipment",
      nameFA: "تجهیزات صنعتی آریا",
      logo: "/placeholder.svg?height=100&width=100",
      verified: true,
      rating: 4.6,
      reviews: 567,
      location: "Mashhad",
      locationFA: "مشهد",
      categories: ["Industrial Equipment", "Machinery"],
      productsCount: 240,
      yearsActive: 18,
      responseTime: "3h",
      description: "Heavy duty industrial equipment",
      descriptionFA: "تجهیزات سنگین صنعتی",
    },
  ]

  const categories = [
    "All Categories",
    "Cement",
    "Power Tools",
    "Hand Tools",
    "Safety Equipment",
    "Building Materials",
    "Firefighting",
    "Industrial Equipment",
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background" dir={dir}>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-sidebar via-sidebar/90 to-accent py-12 sm:py-16 text-sidebar-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">
                {locale === "fa" ? "تامین‌کنندگان معتبر" : locale === "zh" ? "可信供应商" : "Verified Suppliers"}
              </h1>
              <p className="text-sidebar-foreground/80 text-center text-base sm:text-lg mb-8">
                {locale === "fa"
                  ? "ارتباط مستقیم با بهترین تامین‌کنندگان مصالح ساختمانی کشور"
                  : locale === "zh"
                    ? "直接联系全国最好的建材供应商"
                    : "Direct connection with the best construction material suppliers nationwide"}
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search
                  className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground ${dir === "rtl" ? "right-4" : "left-4"}`}
                />
                <Input
                  type="text"
                  placeholder={
                    locale === "fa" ? "جستجوی تامین‌کننده..." : locale === "zh" ? "搜索供应商..." : "Search suppliers..."
                  }
                  className={`h-14 text-base bg-background ${dir === "rtl" ? "pr-12" : "pl-12"}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">1,200+</div>
                <div className="text-sm text-muted-foreground">
                  {locale === "fa" ? "تامین‌کننده" : locale === "zh" ? "供应商" : "Suppliers"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">850+</div>
                <div className="text-sm text-muted-foreground">
                  {locale === "fa" ? "تایید شده" : locale === "zh" ? "已验证" : "Verified"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">50K+</div>
                <div className="text-sm text-muted-foreground">
                  {locale === "fa" ? "محصول" : locale === "zh" ? "产品" : "Products"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">4.7</div>
                <div className="text-sm text-muted-foreground">
                  {locale === "fa" ? "میانگین امتیاز" : locale === "zh" ? "平均评分" : "Avg Rating"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Results */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="sm:hidden bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    {locale === "fa" ? "فیلترها" : locale === "zh" ? "筛选" : "Filters"}
                  </Button>
                </SheetTrigger>
                <SheetContent side={dir === "rtl" ? "right" : "left"}>
                  <SheetHeader>
                    <SheetTitle>
                      {locale === "fa" ? "فیلتر تامین‌کنندگان" : locale === "zh" ? "过滤供应商" : "Filter Suppliers"}
                    </SheetTitle>
                    <SheetDescription>
                      {locale === "fa"
                        ? "نتایج را محدود کنید"
                        : locale === "zh"
                          ? "缩小搜索范围"
                          : "Narrow down your search"}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {categories.map((cat) => (
                      <div key={cat} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox id={cat} />
                        <label htmlFor={cat} className="text-sm cursor-pointer">
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex-1" />

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {locale === "fa" ? "مرتب‌سازی:" : locale === "zh" ? "排序：" : "Sort by:"}
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">
                      {locale === "fa" ? "بالاترین امتیاز" : locale === "zh" ? "最高评分" : "Highest Rating"}
                    </SelectItem>
                    <SelectItem value="products">
                      {locale === "fa" ? "بیشترین محصول" : locale === "zh" ? "最多产品" : "Most Products"}
                    </SelectItem>
                    <SelectItem value="reviews">
                      {locale === "fa" ? "بیشترین نظر" : locale === "zh" ? "最多评论" : "Most Reviews"}
                    </SelectItem>
                    <SelectItem value="newest">
                      {locale === "fa" ? "جدیدترین" : locale === "zh" ? "最新" : "Newest"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Supplier Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliers.map((supplier) => (
                <Link key={supplier.id} href={`/suppliers/${supplier.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow group">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <Image
                            src={supplier.logo || "/placeholder.svg"}
                            alt={supplier.name}
                            width={60}
                            height={60}
                            className="rounded-lg border"
                          />
                          {supplier.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-accent rounded-full p-0.5">
                              <BadgeCheck className="h-4 w-4 text-accent-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-base mb-1 truncate group-hover:text-primary transition-colors">
                            {locale === "fa" ? supplier.nameFA : supplier.name}
                          </CardTitle>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                            <MapPin className="h-3 w-3" />
                            {locale === "fa" ? supplier.locationFA : supplier.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                            <span className="text-sm font-medium">{supplier.rating}</span>
                            <span className="text-xs text-muted-foreground">({supplier.reviews})</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {locale === "fa" ? supplier.descriptionFA : supplier.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {supplier.categories.slice(0, 2).map((cat) => (
                          <Badge key={cat} variant="secondary" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                        {supplier.categories.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{supplier.categories.length - 2}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                        <div className="flex items-center gap-1">
                          <Package className="h-3.5 w-3.5" />
                          {supplier.productsCount} {locale === "fa" ? "محصول" : locale === "zh" ? "产品" : "products"}
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3.5 w-3.5" />
                          {supplier.yearsActive} {locale === "fa" ? "سال" : locale === "zh" ? "年" : "years"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                {locale === "fa" ? "مشاهده بیشتر" : locale === "zh" ? "加载更多" : "Load More"}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {locale === "fa"
                  ? "می‌خواهید تامین‌کننده شوید؟"
                  : locale === "zh"
                    ? "想成为供应商吗？"
                    : "Want to Become a Supplier?"}
              </h2>
              <p className="text-muted-foreground mb-8">
                {locale === "fa"
                  ? "به جمع تامین‌کنندگان معتبر پیساز بپیوندید و فروش خود را افزایش دهید"
                  : locale === "zh"
                    ? "加入Peysaz可信供应商行列，增加您的销售额"
                    : "Join Peysaz's trusted suppliers and increase your sales"}
              </p>
              <Button size="lg" asChild>
                <Link href="/become-supplier">
                  {locale === "fa" ? "ثبت نام تامین‌کننده" : locale === "zh" ? "供应商注册" : "Supplier Registration"}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
