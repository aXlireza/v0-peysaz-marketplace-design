"use client"
import Link from "next/link"
import Image from "next/image"
import {
  MapPin,
  BadgeCheck,
  Star,
  TrendingUp,
  Phone,
  Mail,
  Globe,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useI18n } from "@/lib/i18n/context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductCard } from "@/components/home/product-card"
import { use } from "react"

export default function SupplierProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { locale, dir } = useI18n()

  // Mock supplier data
  const supplier = {
    id,
    name: "Tehran Cement Factory",
    nameFA: "کارخانه سیمان تهران",
    logo: "/placeholder.svg?height=120&width=120",
    cover: "/placeholder.svg?height=300&width=1200",
    verified: true,
    rating: 4.8,
    reviews: 1250,
    location: "Tehran, Iran",
    locationFA: "تهران، ایران",
    categories: ["Cement", "Building Materials", "Aggregates"],
    productsCount: 85,
    yearsActive: 15,
    responseTime: "2h",
    description:
      "Leading cement manufacturer with ISO 9001:2015 certification. Producing high-quality cement and building materials since 2008.",
    descriptionFA:
      "تولیدکننده پیشرو سیمان با گواهینامه ISO 9001:2015. تولید سیمان و مصالح ساختمانی با کیفیت بالا از سال 1387.",
    phone: "+98 21 1234 5678",
    email: "info@tehrancement.com",
    website: "www.tehrancement.com",
    address: "Tehran Province, Tehran, Industrial Zone 5",
    addressFA: "استان تهران، تهران، شهرک صنعتی ۵",
    certifications: ["ISO 9001:2015", "ISO 14001", "CE Certificate", "National Standard 389"],
    monthlyCapacity: "500,000 tons",
    employeeCount: "450+",
    totalOrders: "12,500+",
    repeatCustomerRate: 87,
  }

  const products = [
    {
      id: "1",
      name: "Portland Type 2 Cement",
      nameFA: "سیمان پرتلند نوع ۲",
      price: 850000,
      originalPrice: 950000,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 245,
      inStock: true,
      bulkPrice: true,
      supplier: "Tehran Cement",
      verified: true,
    },
    {
      id: "2",
      name: "Type 5 Sulfate Resistant Cement",
      nameFA: "سیمان سولفات مقاوم نوع ۵",
      price: 920000,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 180,
      inStock: true,
      bulkPrice: true,
      supplier: "Tehran Cement",
      verified: true,
    },
    {
      id: "3",
      name: "Quick Setting Cement",
      nameFA: "سیمان سریع‌گیر",
      price: 1050000,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 156,
      inStock: true,
      bulkPrice: true,
      supplier: "Tehran Cement",
      verified: true,
    },
  ]

  const reviews = [
    {
      id: "1",
      author: "Ali Rezaei",
      authorFA: "علی رضایی",
      rating: 5,
      date: "2024-01-15",
      comment: "Excellent quality cement, timely delivery. Very satisfied with their professional service.",
      commentFA: "سیمان با کیفیت عالی، تحویل به موقع. از خدمات حرفه‌ای آنها بسیار راضی هستم.",
    },
    {
      id: "2",
      author: "Mohammad Karimi",
      authorFA: "محمد کریمی",
      rating: 4,
      date: "2024-01-10",
      comment: "Good products and reasonable prices. Delivery was slightly delayed but product quality compensates.",
      commentFA: "محصولات خوب و قیمت‌های مناسب. تحویل کمی تاخیر داشت اما کیفیت محصول جبران می‌کند.",
    },
  ]

  const ratingDistribution = [
    { stars: 5, count: 750, percentage: 60 },
    { stars: 4, count: 312, percentage: 25 },
    { stars: 3, count: 125, percentage: 10 },
    { stars: 2, count: 38, percentage: 3 },
    { stars: 1, count: 25, percentage: 2 },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background" dir={dir}>
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/suppliers" className="hover:text-foreground">
                {locale === "fa" ? "تامین‌کنندگان" : locale === "zh" ? "供应商" : "Suppliers"}
              </Link>
              {dir === "rtl" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <span className="text-foreground font-medium truncate">
                {locale === "fa" ? supplier.nameFA : supplier.name}
              </span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-48 sm:h-64 bg-gradient-to-r from-primary/20 to-accent/20">
          <Image src={supplier.cover || "/placeholder.svg"} alt="Cover" fill className="object-cover" />
        </div>

        {/* Supplier Header */}
        <div className="border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-6 py-6">
              <div className="relative -mt-16 sm:-mt-20">
                <div className="relative">
                  <Image
                    src={supplier.logo || "/placeholder.svg"}
                    alt={supplier.name}
                    width={120}
                    height={120}
                    className="rounded-lg border-4 border-background bg-background shadow-lg"
                  />
                  {supplier.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-accent rounded-full p-1.5">
                      <BadgeCheck className="h-5 w-5 text-accent-foreground" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                      {locale === "fa" ? supplier.nameFA : supplier.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {locale === "fa" ? supplier.locationFA : supplier.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {supplier.yearsActive}{" "}
                        {locale === "fa" ? "سال فعالیت" : locale === "zh" ? "年经营" : "years active"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {locale === "fa" ? "پاسخ در" : locale === "zh" ? "响应时间" : "Responds in"}{" "}
                        {supplier.responseTime}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                        <span className="font-semibold">{supplier.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({supplier.reviews.toLocaleString()}{" "}
                        {locale === "fa" ? "نظر" : locale === "zh" ? "评论" : "reviews"})
                      </span>
                      <div className="h-4 w-px bg-border mx-2" />
                      <span className="text-sm text-muted-foreground">
                        {supplier.productsCount} {locale === "fa" ? "محصول" : locale === "zh" ? "产品" : "products"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      {locale === "fa" ? "تماس" : locale === "zh" ? "联系" : "Contact"}
                    </Button>
                    <Button size="sm">
                      {locale === "fa" ? "مشاهده محصولات" : locale === "zh" ? "查看产品" : "View Products"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {locale === "fa" ? "درباره" : locale === "zh" ? "关于" : "About"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <p className="text-muted-foreground leading-relaxed">
                    {locale === "fa" ? supplier.descriptionFA : supplier.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{supplier.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{supplier.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a href={`https://${supplier.website}`} className="text-primary hover:underline">
                        {supplier.website}
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{locale === "fa" ? supplier.addressFA : supplier.address}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {locale === "fa" ? "آمار عملکرد" : locale === "zh" ? "业绩统计" : "Performance Stats"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">
                        {locale === "fa" ? "ظرفیت ماهانه" : locale === "zh" ? "月产能" : "Monthly Capacity"}
                      </span>
                      <span className="font-medium">{supplier.monthlyCapacity}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">
                        {locale === "fa" ? "تعداد کارکنان" : locale === "zh" ? "员工人数" : "Employees"}
                      </span>
                      <span className="font-medium">{supplier.employeeCount}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">
                        {locale === "fa" ? "کل سفارشات" : locale === "zh" ? "总订单" : "Total Orders"}
                      </span>
                      <span className="font-medium">{supplier.totalOrders}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">
                        {locale === "fa" ? "مشتریان دائمی" : locale === "zh" ? "回头客率" : "Repeat Customers"}
                      </span>
                      <span className="font-medium">{supplier.repeatCustomerRate}%</span>
                    </div>
                    <Progress value={supplier.repeatCustomerRate} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    {locale === "fa" ? "گواهینامه‌ها" : locale === "zh" ? "认证" : "Certifications"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {supplier.certifications.map((cert) => (
                      <Badge key={cert} variant="secondary">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="products">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="products">
                    {locale === "fa" ? "محصولات" : locale === "zh" ? "产品" : "Products"}
                  </TabsTrigger>
                  <TabsTrigger value="reviews">
                    {locale === "fa" ? "نظرات" : locale === "zh" ? "评论" : "Reviews"}
                  </TabsTrigger>
                  <TabsTrigger value="about">
                    {locale === "fa" ? "درباره" : locale === "zh" ? "信息" : "Info"}
                  </TabsTrigger>
                </TabsList>

                {/* Products Tab */}
                <TabsContent value="products" className="mt-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  <div className="text-center mt-8">
                    <Button variant="outline">
                      {locale === "fa" ? "مشاهده بیشتر" : locale === "zh" ? "查看更多" : "Load More"}
                    </Button>
                  </div>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-6 space-y-6">
                  {/* Rating Summary */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="text-center">
                          <div className="text-5xl font-bold mb-2">{supplier.rating}</div>
                          <div className="flex items-center justify-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${i < Math.floor(supplier.rating) ? "fill-amber-500 text-amber-500" : "text-muted"}`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {locale === "fa" ? "بر اساس" : locale === "zh" ? "基于" : "Based on"}{" "}
                            {supplier.reviews.toLocaleString()}{" "}
                            {locale === "fa" ? "نظر" : locale === "zh" ? "评论" : "reviews"}
                          </p>
                        </div>
                        <div className="space-y-2">
                          {ratingDistribution.map((item) => (
                            <div key={item.stars} className="flex items-center gap-2 text-sm">
                              <span className="w-12">{item.stars} ★</span>
                              <Progress value={item.percentage} className="flex-1 h-2" />
                              <span className="w-12 text-right text-muted-foreground">{item.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reviews List */}
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-medium">{locale === "fa" ? review.authorFA : review.author}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3.5 w-3.5 ${i < review.rating ? "fill-amber-500 text-amber-500" : "text-muted"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString(
                              locale === "fa" ? "fa-IR" : locale === "zh" ? "zh-CN" : "en-US",
                            )}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {locale === "fa" ? review.commentFA : review.comment}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                {/* About Tab */}
                <TabsContent value="about" className="mt-6">
                  <Card>
                    <CardContent className="pt-6 space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">
                          {locale === "fa" ? "درباره شرکت" : locale === "zh" ? "关于公司" : "About Company"}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {locale === "fa" ? supplier.descriptionFA : supplier.description}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-3">
                          {locale === "fa" ? "دسته‌بندی محصولات" : locale === "zh" ? "产品类别" : "Product Categories"}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {supplier.categories.map((cat) => (
                            <Badge key={cat} variant="outline" className="text-sm">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-3">
                          {locale === "fa"
                            ? "گواهینامه‌ها و مجوزها"
                            : locale === "zh"
                              ? "证书和许可"
                              : "Certificates & Licenses"}
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {supplier.certifications.map((cert) => (
                            <div key={cert} className="flex items-center gap-2 p-3 border rounded-lg">
                              <Award className="h-5 w-5 text-primary" />
                              <span className="text-sm">{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
