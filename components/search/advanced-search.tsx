"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search,
  X,
  Clock,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Filter,
  ChevronRight,
  Building2,
  Package,
  Shield,
  Flame,
  Boxes,
  Mic,
  Camera,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n/context"

// Mock data for suggestions and products
const recentSearches = [
  { query: "سیمان تهران", queryEn: "Tehran Cement", queryZh: "德黑兰水泥" },
  { query: "ابزار برقی بوش", queryEn: "Bosch Power Tools", queryZh: "博世电动工具" },
  { query: "کلاه ایمنی", queryEn: "Safety Helmet", queryZh: "安全帽" },
]

const trendingSearches = [
  { query: "سیمان تیپ ۲", queryEn: "Type 2 Cement", queryZh: "2型水泥", count: "۲.۵k" },
  { query: "سیمان سفید", queryEn: "White Cement", queryZh: "白水泥", count: "۱.۸k" },
  { query: "آجر نسوز", queryEn: "Refractory Brick", queryZh: "耐火砖", count: "۱.۲k" },
  { query: "میلگرد آجدار", queryEn: "Deformed Rebar", queryZh: "螺纹钢", count: "۹۵۰" },
]

const categories = [
  { id: "cement", name: "سیمان", nameEn: "Cement", nameZh: "水泥", icon: Building2, count: 156 },
  { id: "tools", name: "ابزارآلات", nameEn: "Tools", nameZh: "工具", icon: Package, count: 342 },
  { id: "safety", name: "تجهیزات ایمنی", nameEn: "Safety Gear", nameZh: "安全设备", icon: Shield, count: 89 },
  { id: "firefighting", name: "آتش‌نشانی", nameEn: "Firefighting", nameZh: "消防", icon: Flame, count: 67 },
  { id: "materials", name: "مصالح ساختمانی", nameEn: "Materials", nameZh: "建材", icon: Boxes, count: 234 },
]

const mockProducts = [
  {
    id: 1,
    name: "سیمان تیپ ۲ تهران",
    nameEn: "Tehran Type 2 Cement",
    nameZh: "德黑兰2型水泥",
    price: "۲۸۵,۰۰۰",
    priceEn: "285,000",
    image: "/placeholder.svg?height=60&width=60",
    category: "cement",
    inStock: true,
  },
  {
    id: 2,
    name: "سیمان سفید ساوه",
    nameEn: "Saveh White Cement",
    nameZh: "萨维白水泥",
    price: "۴۲۰,۰۰۰",
    priceEn: "420,000",
    image: "/placeholder.svg?height=60&width=60",
    category: "cement",
    inStock: true,
  },
  {
    id: 3,
    name: "دریل شارژی بوش",
    nameEn: "Bosch Cordless Drill",
    nameZh: "博世无绑电钻",
    price: "۸,۵۰۰,۰۰۰",
    priceEn: "8,500,000",
    image: "/placeholder.svg?height=60&width=60",
    category: "tools",
    inStock: true,
  },
  {
    id: 4,
    name: "کلاه ایمنی صنعتی",
    nameEn: "Industrial Safety Helmet",
    nameZh: "工业安全帽",
    price: "۳۵۰,۰۰۰",
    priceEn: "350,000",
    image: "/placeholder.svg?height=60&width=60",
    category: "safety",
    inStock: false,
  },
]

interface AdvancedSearchProps {
  variant?: "default" | "island"
  className?: string
  onClose?: () => void
}

export function AdvancedSearch({ variant = "default", className, onClose }: AdvancedSearchProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"all" | "products" | "categories" | "suppliers">("all")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [recentHistory, setRecentHistory] = useState(recentSearches)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { t, locale } = useI18n()

  // Get localized text
  const getLocalizedName = (item: {
    name?: string
    nameEn?: string
    nameZh?: string
    query?: string
    queryEn?: string
    queryZh?: string
  }) => {
    if (locale === "fa") return item.name || item.query || ""
    if (locale === "zh") return item.nameZh || item.queryZh || item.name || item.query || ""
    return item.nameEn || item.queryEn || item.name || item.query || ""
  }

  // Filter products based on query
  const filteredProducts =
    query.length > 0
      ? mockProducts.filter((p) => {
          const searchName = getLocalizedName(p).toLowerCase()
          return searchName.includes(query.toLowerCase())
        })
      : []

  // Filter categories based on query
  const filteredCategories =
    query.length > 0
      ? categories.filter((c) => {
          const searchName = getLocalizedName(c).toLowerCase()
          return searchName.includes(query.toLowerCase())
        })
      : categories

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + K to focus search
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        inputRef.current?.focus()
        setIsOpen(true)
      }
      // Escape to close
      if (event.key === "Escape") {
        setIsOpen(false)
        inputRef.current?.blur()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Simulate search loading
  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true)
      const timer = setTimeout(() => setIsLoading(false), 300)
      return () => clearTimeout(timer)
    }
  }, [query])

  const handleSearch = useCallback(
    (searchQuery: string) => {
      if (!searchQuery.trim()) return
      // Add to recent history
      setRecentHistory((prev) => {
        const newItem = { query: searchQuery, queryEn: searchQuery, queryZh: searchQuery }
        const filtered = prev.filter((item) => item.query !== searchQuery)
        return [newItem, ...filtered].slice(0, 5)
      })
      setIsOpen(false)
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      onClose?.()
    },
    [router, onClose],
  )

  const handleClearRecent = () => {
    setRecentHistory([])
  }

  const isIsland = variant === "island"

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full",
        isIsland && "fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-background/80 backdrop-blur-sm",
        className,
      )}
    >
      {/* Search Input Container */}
      <div
        className={cn(
          "w-full transition-all duration-300 ease-out",
          isIsland && "w-full max-w-2xl px-4",
          isOpen && !isIsland && "relative z-50",
        )}
      >
        {/* Main Search Bar */}
        <div
          className={cn(
            "relative flex items-center gap-2 bg-card border border-border rounded-xl transition-all duration-200",
            isOpen && "ring-2 ring-primary/20 border-primary shadow-lg",
            isIsland && "shadow-2xl border-2",
          )}
        >
          {/* Category Filter Button */}
          <button
            onClick={() => setIsOpen(true)}
            className={cn(
              "hidden sm:flex items-center gap-1.5 h-full px-3 py-2.5 border-r border-border text-sm text-muted-foreground hover:text-foreground transition-colors",
              isIsland && "px-4 py-3",
            )}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden md:inline">
              {selectedCategory
                ? getLocalizedName(categories.find((c) => c.id === selectedCategory) || {})
                : locale === "fa"
                  ? "همه"
                  : locale === "zh"
                    ? "全部"
                    : "All"}
            </span>
            <ChevronRight className="h-3 w-3" />
          </button>

          {/* Search Icon */}
          <div className="flex items-center pl-3 sm:pl-0">
            {isLoading ? (
              <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground animate-spin" />
            ) : (
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            )}
          </div>

          {/* Input */}
          <Input
            ref={inputRef}
            type="text"
            placeholder={
              locale === "fa"
                ? "جستجوی محصولات، برندها و دسته‌بندی‌ها..."
                : locale === "zh"
                  ? "搜索产品、品牌和类别..."
                  : "Search products, brands, categories..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(query)
              }
            }}
            className={cn(
              "flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 text-sm sm:text-base h-10 sm:h-12 px-2",
              isIsland && "h-14 text-base",
            )}
          />

          {/* Right Actions */}
          <div className="flex items-center gap-1 pr-2">
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-foreground"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}

            {/* Voice Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-primary hidden sm:flex"
              title={locale === "fa" ? "جستجوی صوتی" : locale === "zh" ? "语音搜索" : "Voice search"}
            >
              <Mic className="h-4 w-4" />
            </Button>

            {/* Image Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-primary hidden sm:flex"
              title={locale === "fa" ? "جستجوی تصویری" : locale === "zh" ? "图片搜索" : "Image search"}
            >
              <Camera className="h-4 w-4" />
            </Button>

            {/* Keyboard Shortcut Hint */}
            <div className="hidden lg:flex items-center gap-1 px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
              <kbd className="font-mono">⌘</kbd>
              <kbd className="font-mono">K</kbd>
            </div>
          </div>
        </div>

        {/* Search Dropdown / Results Panel */}
        {isOpen && (
          <div
            className={cn(
              "absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50",
              isIsland && "relative mt-4",
            )}
          >
            {/* Tabs */}
            <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/30">
              {[
                { id: "all", labelFa: "همه", labelEn: "All", labelZh: "全部" },
                { id: "products", labelFa: "محصولات", labelEn: "Products", labelZh: "产品" },
                { id: "categories", labelFa: "دسته‌بندی", labelEn: "Categories", labelZh: "分类" },
                { id: "suppliers", labelFa: "تامین‌کنندگان", labelEn: "Suppliers", labelZh: "供应商" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-lg transition-colors",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  {locale === "fa" ? tab.labelFa : locale === "zh" ? tab.labelZh : tab.labelEn}
                </button>
              ))}
            </div>

            <ScrollArea className="max-h-[60vh]">
              <div className="p-3">
                {/* No query state - show recent and trending */}
                {query.length === 0 && (
                  <>
                    {/* Recent Searches */}
                    {recentHistory.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {locale === "fa" ? "جستجوهای اخیر" : locale === "zh" ? "最近搜索" : "Recent Searches"}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-muted-foreground hover:text-destructive h-auto py-1"
                            onClick={handleClearRecent}
                          >
                            {locale === "fa" ? "پاک کردن" : locale === "zh" ? "清除" : "Clear"}
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentHistory.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSearch(getLocalizedName(item))}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
                            >
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {getLocalizedName(item)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Trending Searches */}
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4" />
                        {locale === "fa" ? "جستجوهای پرطرفدار" : locale === "zh" ? "热门搜索" : "Trending Searches"}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {trendingSearches.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSearch(getLocalizedName(item))}
                            className="flex items-center justify-between px-3 py-2 bg-muted/50 hover:bg-muted rounded-lg text-sm transition-colors group"
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-muted-foreground font-mono text-xs">{idx + 1}</span>
                              {getLocalizedName(item)}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {item.count}
                            </Badge>
                          </button>
                        ))}
                      </div>
                    </div>

                    <Separator className="my-3" />

                    {/* Quick Categories */}
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        {locale === "fa" ? "دسته‌بندی‌های محبوب" : locale === "zh" ? "热门分类" : "Popular Categories"}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/category/${cat.id}`}
                            onClick={() => setIsOpen(false)}
                            className="flex flex-col items-center gap-2 p-3 bg-muted/50 hover:bg-muted rounded-lg transition-colors group"
                          >
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <cat.icon className="h-5 w-5 text-primary" />
                            </div>
                            <span className="text-xs text-center font-medium">{getLocalizedName(cat)}</span>
                            <span className="text-[10px] text-muted-foreground">
                              {cat.count} {locale === "fa" ? "محصول" : locale === "zh" ? "产品" : "items"}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Query results */}
                {query.length > 0 && (
                  <>
                    {/* AI Suggestion */}
                    <div className="mb-4 p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                      <div className="flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">
                            {locale === "fa" ? "پیشنهاد هوشمند" : locale === "zh" ? "智能建议" : "Smart Suggestion"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {locale === "fa"
                              ? `برای "${query}" ممکن است به دنبال سیمان تیپ ۲ یا مصالح ساختمانی باشید.`
                              : locale === "zh"
                                ? `对于"${query}"，您可能在寻找2型水泥或建筑材料。`
                                : `For "${query}", you might be looking for Type 2 Cement or Building Materials.`}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Products Results */}
                    {(activeTab === "all" || activeTab === "products") && filteredProducts.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">
                            {locale === "fa" ? "محصولات" : locale === "zh" ? "产品" : "Products"}
                          </h3>
                          <Link
                            href={`/products?search=${encodeURIComponent(query)}`}
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                            onClick={() => setIsOpen(false)}
                          >
                            {locale === "fa" ? "مشاهده همه" : locale === "zh" ? "查看全部" : "View all"}
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                        <div className="space-y-2">
                          {filteredProducts.slice(0, 4).map((product) => (
                            <Link
                              key={product.id}
                              href={`/product/${product.id}`}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors group"
                            >
                              <div className="h-12 w-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={getLocalizedName(product)}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                                  {getLocalizedName(product)}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-sm font-bold text-primary">
                                    {locale === "fa" ? product.price : product.priceEn}{" "}
                                    {locale === "fa" ? "تومان" : locale === "zh" ? "托曼" : "T"}
                                  </span>
                                  {product.inStock ? (
                                    <Badge variant="secondary" className="text-[10px] bg-accent/10 text-accent">
                                      {locale === "fa" ? "موجود" : locale === "zh" ? "有库存" : "In Stock"}
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="secondary"
                                      className="text-[10px] bg-destructive/10 text-destructive"
                                    >
                                      {locale === "fa" ? "ناموجود" : locale === "zh" ? "缺货" : "Out of Stock"}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Categories Results */}
                    {(activeTab === "all" || activeTab === "categories") && filteredCategories.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">
                          {locale === "fa" ? "دسته‌بندی‌ها" : locale === "zh" ? "分类" : "Categories"}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {filteredCategories.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/category/${cat.id}`}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                            >
                              <cat.icon className="h-4 w-4 text-primary" />
                              <span className="text-sm">{getLocalizedName(cat)}</span>
                              <Badge variant="secondary" className="text-[10px]">
                                {cat.count}
                              </Badge>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* No Results */}
                    {filteredProducts.length === 0 && query.length > 2 && (
                      <div className="text-center py-8">
                        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                          <Search className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {locale === "fa"
                            ? `نتیجه‌ای برای "${query}" یافت نشد`
                            : locale === "zh"
                              ? `未找到"${query}"的结果`
                              : `No results found for "${query}"`}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {locale === "fa"
                            ? "جستجوی دیگری امتحان کنید یا دسته‌بندی‌ها را مرور کنید"
                            : locale === "zh"
                              ? "尝试其他搜索或浏览分类"
                              : "Try a different search or browse categories"}
                        </p>
                      </div>
                    )}

                    {/* Search Actions */}
                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-border">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                        onClick={() => {
                          setQuery("")
                          inputRef.current?.focus()
                        }}
                      >
                        <X className="h-4 w-4 mr-1" />
                        {locale === "fa" ? "پاک کردن" : locale === "zh" ? "清除" : "Clear"}
                      </Button>
                      <Button size="sm" onClick={() => handleSearch(query)} className="gap-2">
                        <Search className="h-4 w-4" />
                        {locale === "fa" ? "جستجو" : locale === "zh" ? "搜索" : "Search"}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {/* Backdrop for island mode */}
      {isIsland && <button className="absolute inset-0 -z-10" onClick={onClose} aria-label="Close search" />}
    </div>
  )
}
