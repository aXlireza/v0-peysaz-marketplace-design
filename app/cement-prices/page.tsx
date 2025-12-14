"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Search,
  Download,
  Bell,
  Factory,
  MapPin,
  Phone,
  Calendar,
  Info,
  BadgeCheck,
  ChevronRight,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
  BarChart,
  Bar,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import Link from "next/link"

// Price history data for charts
const priceHistoryData = [
  { date: "1403/06/01", tehran: 78000, abyek: 76000, saveh: 88000, fars: 138000 },
  { date: "1403/06/15", tehran: 79500, abyek: 77000, saveh: 89000, fars: 139000 },
  { date: "1403/07/01", tehran: 80000, abyek: 78500, saveh: 90000, fars: 140000 },
  { date: "1403/07/15", tehran: 81500, abyek: 79000, saveh: 91500, fars: 141000 },
  { date: "1403/08/01", tehran: 82000, abyek: 79500, saveh: 92000, fars: 142000 },
  { date: "1403/08/15", tehran: 83000, abyek: 80500, saveh: 93000, fars: 143000 },
  { date: "1403/09/01", tehran: 84000, abyek: 81000, saveh: 94000, fars: 144000 },
  { date: "1403/09/15", tehran: 85000, abyek: 82000, saveh: 95000, fars: 145000 },
]

const monthlyVolumeData = [
  { month: "فروردین", tehran: 45000, abyek: 38000, saveh: 22000 },
  { month: "اردیبهشت", tehran: 48000, abyek: 41000, saveh: 24000 },
  { month: "خرداد", tehran: 52000, abyek: 43000, saveh: 26000 },
  { month: "تیر", tehran: 55000, abyek: 45000, saveh: 28000 },
  { month: "مرداد", tehran: 58000, abyek: 48000, saveh: 30000 },
  { month: "شهریور", tehran: 54000, abyek: 46000, saveh: 29000 },
]

// Comprehensive cement data
const cementBrands = [
  {
    id: "tehran",
    brand: "Tehran Cement",
    brandFA: "سیمان تهران",
    factory: "Tehran Cement Factory",
    factoryFA: "کارخانه سیمان تهران",
    location: "Tehran Province",
    locationFA: "استان تهران",
    types: [
      { type: "Type 1-325", typeFA: "تیپ ۱-۳۲۵", price: 82000, change: 2.1, packaging: "50kg bag" },
      { type: "Type 2", typeFA: "تیپ ۲", price: 85000, change: 2.5, packaging: "50kg bag" },
      { type: "Type 3", typeFA: "تیپ ۳", price: 87000, change: 1.8, packaging: "50kg bag" },
      { type: "Type 5", typeFA: "تیپ ۵", price: 92000, change: 2.0, packaging: "50kg bag" },
      { type: "Bulk Type 2", typeFA: "فله تیپ ۲", price: 2100000, change: 1.5, packaging: "per ton" },
    ],
    phone: "021-44556677",
    verified: true,
    capacity: "15,000 tons/day",
    quality: "ISO 9001, ISIRI",
    color: "hsl(217, 91%, 60%)",
  },
  {
    id: "abyek",
    brand: "Abyek Cement",
    brandFA: "سیمان آبیک",
    factory: "Abyek Cement Company",
    factoryFA: "شرکت سیمان آبیک",
    location: "Qazvin Province",
    locationFA: "استان قزوین",
    types: [
      { type: "Type 1-325", typeFA: "تیپ ۱-۳۲۵", price: 79000, change: -0.8, packaging: "50kg bag" },
      { type: "Type 2", typeFA: "تیپ ۲", price: 82000, change: -1.2, packaging: "50kg bag" },
      { type: "Type 5", typeFA: "تیپ ۵", price: 89000, change: -0.5, packaging: "50kg bag" },
      { type: "Bulk Type 2", typeFA: "فله تیپ ۲", price: 1950000, change: -1.0, packaging: "per ton" },
    ],
    phone: "028-33445566",
    verified: true,
    capacity: "12,000 tons/day",
    quality: "ISO 9001, ISIRI, CE",
    color: "hsl(142, 76%, 36%)",
  },
  {
    id: "saveh",
    brand: "Saveh Cement",
    brandFA: "سیمان ساوه",
    factory: "Saveh Cement Factory",
    factoryFA: "کارخانه سیمان ساوه",
    location: "Markazi Province",
    locationFA: "استان مرکزی",
    types: [
      { type: "Type 2", typeFA: "تیپ ۲", price: 84000, change: 0, packaging: "50kg bag" },
      { type: "Type 5", typeFA: "تیپ ۵", price: 95000, change: 0, packaging: "50kg bag" },
      { type: "Pozzolanic", typeFA: "پوزولانی", price: 88000, change: 0.5, packaging: "50kg bag" },
      { type: "Bulk Type 5", typeFA: "فله تیپ ۵", price: 2250000, change: 0, packaging: "per ton" },
    ],
    phone: "086-42334455",
    verified: true,
    capacity: "8,000 tons/day",
    quality: "ISO 9001, ISIRI",
    color: "hsl(262, 83%, 58%)",
  },
  {
    id: "sepahan",
    brand: "Sepahan Cement",
    brandFA: "سیمان سپاهان",
    factory: "Sepahan Cement Company",
    factoryFA: "شرکت سیمان سپاهان",
    location: "Isfahan Province",
    locationFA: "استان اصفهان",
    types: [
      { type: "Type 1-425", typeFA: "تیپ ۱-۴۲۵", price: 83000, change: 1.5, packaging: "50kg bag" },
      { type: "Type 2", typeFA: "تیپ ۲", price: 84000, change: 1.8, packaging: "50kg bag" },
      { type: "Type 5", typeFA: "تیپ ۵", price: 91000, change: 1.2, packaging: "50kg bag" },
      { type: "Oil Well", typeFA: "چاه نفت", price: 125000, change: 2.0, packaging: "50kg bag" },
    ],
    phone: "031-36778899",
    verified: true,
    capacity: "10,000 tons/day",
    quality: "ISO 9001, ISIRI, API",
    color: "hsl(25, 95%, 53%)",
  },
  {
    id: "fars",
    brand: "Fars Cement",
    brandFA: "سیمان فارس",
    factory: "Fars & Khuzestan Cement Co.",
    factoryFA: "شرکت سیمان فارس و خوزستان",
    location: "Fars Province",
    locationFA: "استان فارس",
    types: [
      { type: "White Type 1", typeFA: "سفید تیپ ۱", price: 145000, change: 3.2, packaging: "25kg bag" },
      { type: "White Type 2", typeFA: "سفید تیپ ۲", price: 140000, change: 2.8, packaging: "25kg bag" },
      { type: "Gray Type 2", typeFA: "خاکستری تیپ ۲", price: 83000, change: 1.5, packaging: "50kg bag" },
      { type: "Bulk White", typeFA: "فله سفید", price: 3800000, change: 3.0, packaging: "per ton" },
    ],
    phone: "071-38990011",
    verified: true,
    capacity: "6,000 tons/day",
    quality: "ISO 9001, ISIRI",
    color: "hsl(340, 82%, 52%)",
  },
  {
    id: "hormozgan",
    brand: "Hormozgan Cement",
    brandFA: "سیمان هرمزگان",
    factory: "Hormozgan Cement Company",
    factoryFA: "شرکت سیمان هرمزگان",
    location: "Hormozgan Province",
    locationFA: "استان هرمزگان",
    types: [
      { type: "Type 2", typeFA: "تیپ ۲", price: 79000, change: 0.8, packaging: "50kg bag" },
      { type: "Type 5", typeFA: "تیپ ۵", price: 86000, change: 0.5, packaging: "50kg bag" },
      { type: "Sulfate Resistant", typeFA: "ضد سولفات", price: 94000, change: 1.0, packaging: "50kg bag" },
    ],
    phone: "076-33221100",
    verified: false,
    capacity: "5,500 tons/day",
    quality: "ISIRI",
    color: "hsl(190, 95%, 39%)",
  },
]

// Market insights data
const marketInsights = {
  avgPrice: 84500,
  weeklyChange: 1.8,
  monthlyChange: 5.2,
  yearlyChange: 18.5,
  totalFactories: 72,
  dailyProduction: "220,000 tons",
  exportVolume: "15,000 tons/day",
}

export default function CementPricesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [priceAlertEmail, setPriceAlertEmail] = useState("")

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

  const filteredBrands = cementBrands.filter((brand) => {
    const matchesSearch =
      brand.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.brandFA.includes(searchTerm) ||
      brand.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === "all" || brand.location.toLowerCase().includes(selectedRegion)
    return matchesSearch && matchesRegion
  })

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-8 lg:py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="gap-1">
                    <RefreshCw className="h-3 w-3" />
                    Live Updates
                  </Badge>
                  <Badge variant="outline">
                    <Calendar className="h-3 w-3 mr-1" />
                    Updated: Dec 2, 2024
                  </Badge>
                </div>
                <h1 className="text-2xl lg:text-4xl font-bold text-balance">Weekly Cement Price Index</h1>
                <p className="text-muted-foreground mt-2 text-sm lg:text-base">
                  شاخص هفتگی قیمت سیمان ایران - Real-time prices from verified factories across Iran
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="gap-2 bg-transparent" size="sm">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span> PDF
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent" size="sm">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Price</span> Alerts
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Market Overview Cards */}
        <section className="py-6 lg:py-8 border-b border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              <Card className="bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground truncate">Avg. Price (Type 2)</p>
                      <p className="text-lg lg:text-xl font-bold">{marketInsights.avgPrice.toLocaleString()}</p>
                      <p className="text-xs text-destructive">+{marketInsights.weeklyChange}% this week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Factory className="h-5 w-5 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground truncate">Active Factories</p>
                      <p className="text-lg lg:text-xl font-bold">{marketInsights.totalFactories}</p>
                      <p className="text-xs text-muted-foreground">Nationwide</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center shrink-0">
                      <TrendingUp className="h-5 w-5 text-chart-3" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground truncate">Daily Production</p>
                      <p className="text-lg lg:text-xl font-bold">220K</p>
                      <p className="text-xs text-muted-foreground">Tons/day</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-chart-4/10 flex items-center justify-center shrink-0">
                      <TrendingUp className="h-5 w-5 text-chart-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground truncate">YoY Change</p>
                      <p className="text-lg lg:text-xl font-bold">+{marketInsights.yearlyChange}%</p>
                      <p className="text-xs text-muted-foreground">vs last year</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-6 lg:py-10">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="prices" className="space-y-6">
              <div className="flex flex-col gap-4">
                <TabsList className="w-full lg:w-auto grid grid-cols-3 lg:inline-flex">
                  <TabsTrigger value="prices" className="text-xs lg:text-sm">
                    Price Table
                  </TabsTrigger>
                  <TabsTrigger value="charts" className="text-xs lg:text-sm">
                    Price Charts
                  </TabsTrigger>
                  <TabsTrigger value="factories" className="text-xs lg:text-sm">
                    Factories
                  </TabsTrigger>
                </TabsList>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by brand, factory, or region..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="All Regions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="tehran">Tehran</SelectItem>
                      <SelectItem value="isfahan">Isfahan</SelectItem>
                      <SelectItem value="fars">Fars</SelectItem>
                      <SelectItem value="qazvin">Qazvin</SelectItem>
                      <SelectItem value="hormozgan">Hormozgan</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Cement Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="type1">Type 1</SelectItem>
                      <SelectItem value="type2">Type 2</SelectItem>
                      <SelectItem value="type5">Type 5</SelectItem>
                      <SelectItem value="white">White Cement</SelectItem>
                      <SelectItem value="bulk">Bulk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Prices Tab */}
              <TabsContent value="prices" className="space-y-4">
                {filteredBrands.map((brand) => (
                  <Card key={brand.id} className="overflow-hidden">
                    <CardHeader className="pb-3 bg-muted/30">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl flex items-center justify-center text-white font-bold text-sm lg:text-lg shrink-0"
                            style={{ backgroundColor: brand.color }}
                          >
                            {brand.brand.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-base lg:text-lg">{brand.brand}</CardTitle>
                              {brand.verified && <BadgeCheck className="h-4 w-4 lg:h-5 lg:w-5 text-accent shrink-0" />}
                            </div>
                            <CardDescription className="text-xs lg:text-sm">
                              {brand.brandFA} • {brand.locationFA}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <Badge variant="outline" className="gap-1">
                            <Factory className="h-3 w-3" />
                            {brand.capacity}
                          </Badge>
                          <Badge variant="secondary">{brand.quality}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
                        <table className="w-full min-w-[500px]">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 text-xs lg:text-sm font-medium text-muted-foreground">
                                Product Type
                              </th>
                              <th className="text-left py-2 text-xs lg:text-sm font-medium text-muted-foreground">
                                Packaging
                              </th>
                              <th className="text-right py-2 text-xs lg:text-sm font-medium text-muted-foreground">
                                Price (تومان)
                              </th>
                              <th className="text-right py-2 text-xs lg:text-sm font-medium text-muted-foreground">
                                Weekly Change
                              </th>
                              <th className="text-right py-2 text-xs lg:text-sm font-medium text-muted-foreground"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {brand.types.map((type, idx) => (
                              <tr
                                key={idx}
                                className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                              >
                                <td className="py-3">
                                  <div className="font-medium text-sm">{type.type}</div>
                                  <div className="text-xs text-muted-foreground">{type.typeFA}</div>
                                </td>
                                <td className="py-3 text-xs lg:text-sm text-muted-foreground">{type.packaging}</td>
                                <td className="py-3 text-right font-semibold text-sm lg:text-base">
                                  {type.price.toLocaleString()}
                                </td>
                                <td className={`py-3 text-right text-xs lg:text-sm ${getChangeColor(type.change)}`}>
                                  <span className="flex items-center justify-end gap-1">
                                    {getChangeIcon(type.change)}
                                    {type.change > 0 ? "+" : ""}
                                    {type.change}%
                                  </span>
                                </td>
                                <td className="py-3 text-right">
                                  <Button variant="ghost" size="sm" asChild className="h-7 text-xs">
                                    <Link href={`/category/cement?brand=${brand.id}`}>
                                      Order
                                      <ChevronRight className="h-3 w-3 ml-1" />
                                    </Link>
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {brand.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {brand.phone}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Charts Tab */}
              <TabsContent value="charts" className="space-y-6">
                {/* Price Trend Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base lg:text-lg">Price Trend - Last 4 Months</CardTitle>
                    <CardDescription>روند قیمت سیمان - ۴ ماه گذشته (Type 2, 50kg bag)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        tehran: { label: "Tehran", color: "hsl(217, 91%, 60%)" },
                        abyek: { label: "Abyek", color: "hsl(142, 76%, 36%)" },
                        saveh: { label: "Saveh", color: "hsl(262, 83%, 58%)" },
                        fars: { label: "Fars", color: "hsl(340, 82%, 52%)" },
                      }}
                      className="h-[250px] lg:h-[350px] w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={priceHistoryData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                          <XAxis dataKey="date" tick={{ fontSize: 10 }} className="text-muted-foreground" />
                          <YAxis
                            tick={{ fontSize: 10 }}
                            className="text-muted-foreground"
                            tickFormatter={(v) => `${v / 1000}K`}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend wrapperStyle={{ fontSize: "12px" }} />
                          <Line
                            type="monotone"
                            dataKey="tehran"
                            stroke="hsl(217, 91%, 60%)"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            name="Tehran"
                          />
                          <Line
                            type="monotone"
                            dataKey="abyek"
                            stroke="hsl(142, 76%, 36%)"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            name="Abyek"
                          />
                          <Line
                            type="monotone"
                            dataKey="saveh"
                            stroke="hsl(262, 83%, 58%)"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            name="Saveh"
                          />
                          <Line
                            type="monotone"
                            dataKey="fars"
                            stroke="hsl(340, 82%, 52%)"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            name="Fars (White)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Volume Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base lg:text-lg">Monthly Sales Volume (Tons)</CardTitle>
                    <CardDescription>حجم فروش ماهانه کارخانجات</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        tehran: { label: "Tehran", color: "hsl(217, 91%, 60%)" },
                        abyek: { label: "Abyek", color: "hsl(142, 76%, 36%)" },
                        saveh: { label: "Saveh", color: "hsl(262, 83%, 58%)" },
                      }}
                      className="h-[250px] lg:h-[300px] w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyVolumeData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                          <XAxis dataKey="month" tick={{ fontSize: 10 }} className="text-muted-foreground" />
                          <YAxis
                            tick={{ fontSize: 10 }}
                            className="text-muted-foreground"
                            tickFormatter={(v) => `${v / 1000}K`}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend wrapperStyle={{ fontSize: "12px" }} />
                          <Bar dataKey="tehran" fill="hsl(217, 91%, 60%)" name="Tehran" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="abyek" fill="hsl(142, 76%, 36%)" name="Abyek" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="saveh" fill="hsl(262, 83%, 58%)" name="Saveh" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Price Comparison Area Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base lg:text-lg">Price Range Analysis</CardTitle>
                    <CardDescription>تحلیل محدوده قیمت</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        tehran: { label: "Tehran", color: "hsl(217, 91%, 60%)" },
                        abyek: { label: "Abyek", color: "hsl(142, 76%, 36%)" },
                      }}
                      className="h-[250px] lg:h-[300px] w-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={priceHistoryData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                          <XAxis dataKey="date" tick={{ fontSize: 10 }} className="text-muted-foreground" />
                          <YAxis
                            tick={{ fontSize: 10 }}
                            className="text-muted-foreground"
                            tickFormatter={(v) => `${v / 1000}K`}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area
                            type="monotone"
                            dataKey="tehran"
                            stroke="hsl(217, 91%, 60%)"
                            fill="hsl(217, 91%, 60%)"
                            fillOpacity={0.3}
                            name="Tehran"
                          />
                          <Area
                            type="monotone"
                            dataKey="abyek"
                            stroke="hsl(142, 76%, 36%)"
                            fill="hsl(142, 76%, 36%)"
                            fillOpacity={0.3}
                            name="Abyek"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Factories Tab */}
              <TabsContent value="factories" className="space-y-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cementBrands.map((brand) => (
                    <Card key={brand.id} className="hover:border-primary/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div
                            className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                            style={{ backgroundColor: brand.color }}
                          >
                            {brand.brand.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold truncate">{brand.factory}</h3>
                              {brand.verified && <BadgeCheck className="h-4 w-4 text-accent shrink-0" />}
                            </div>
                            <p className="text-sm text-muted-foreground">{brand.factoryFA}</p>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span className="truncate">{brand.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Factory className="h-4 w-4 shrink-0" />
                            <span>Capacity: {brand.capacity}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4 shrink-0" />
                            <span>{brand.phone}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Badge variant="secondary" className="text-xs">
                            {brand.quality}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {brand.types.length} products
                          </Badge>
                        </div>
                        <Button asChild variant="outline" className="w-full mt-4 bg-transparent" size="sm">
                          <Link href={`/category/cement?brand=${brand.id}`}>
                            View Products
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Price Alert CTA */}
        <section className="py-8 lg:py-12 bg-muted/50 border-t border-border">
          <div className="container mx-auto px-4">
            <Card className="bg-primary text-primary-foreground overflow-hidden">
              <CardContent className="p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Bell className="h-5 w-5" />
                      <span className="font-semibold">Price Alert Notifications</span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-2">Never Miss a Price Change</h3>
                    <p className="text-primary-foreground/80 text-sm lg:text-base">
                      Get instant alerts when cement prices change. Set your target price and we will notify you.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 lg:w-auto w-full">
                    <Input
                      placeholder="Enter your email"
                      value={priceAlertEmail}
                      onChange={(e) => setPriceAlertEmail(e.target.value)}
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                    />
                    <Button variant="secondary" className="whitespace-nowrap">
                      <Bell className="h-4 w-4 mr-2" />
                      Set Alert
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Market Info */}
        <section className="py-8 lg:py-12 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Info className="h-5 w-5 text-primary" />
              <h2 className="text-lg lg:text-xl font-bold">Market Information</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">About Cement Types</h3>
                <p className="leading-relaxed">
                  <strong>Type 1:</strong> General purpose cement for most applications.
                  <br />
                  <strong>Type 2:</strong> Moderate sulfate resistance, most common in Iran.
                  <br />
                  <strong>Type 5:</strong> High sulfate resistance for harsh environments.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Pricing Notes</h3>
                <p className="leading-relaxed">
                  Prices are factory gate prices excluding delivery. Bulk orders (100+ bags) qualify for volume
                  discounts. All prices are in Iranian Toman and updated weekly.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Quality Standards</h3>
                <p className="leading-relaxed">
                  <strong>ISIRI:</strong> Iranian national standard.
                  <br />
                  <strong>ISO 9001:</strong> International quality management.
                  <br />
                  <strong>API:</strong> American Petroleum Institute (oil well cement).
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
