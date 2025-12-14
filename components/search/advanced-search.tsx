"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search,
  X,
  Clock,
  ArrowRight,
  Sparkles,
  Filter,
  Building2,
  Package,
  Shield,
  Flame,
  Boxes,
  Mic,
  Camera,
  Loader2,
  ChevronDown,
  MapPin,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n/context"

const categories = [
  {
    id: "cement",
    name: "سیمان",
    nameEn: "Cement",
    nameZh: "水泥",
    icon: Building2,
    count: 156,
    keywords: ["cement", "سیمان", "水泥"],
  },
  {
    id: "tools",
    name: "ابزارآلات",
    nameEn: "Tools",
    nameZh: "工具",
    icon: Package,
    count: 342,
    keywords: ["tools", "ابزار", "工具", "drill", "دریل"],
  },
  {
    id: "safety",
    name: "تجهیزات ایمنی",
    nameEn: "Safety Gear",
    nameZh: "安全设备",
    icon: Shield,
    count: 89,
    keywords: ["safety", "ایمنی", "安全", "helmet", "کلاه"],
  },
  {
    id: "firefighting",
    name: "آتش‌نشانی",
    nameEn: "Firefighting",
    nameZh: "消防",
    icon: Flame,
    count: 67,
    keywords: ["fire", "آتش", "消防"],
  },
  {
    id: "materials",
    name: "مصالح ساختمانی",
    nameEn: "Building Materials",
    nameZh: "建材",
    icon: Boxes,
    count: 234,
    keywords: ["materials", "مصالح", "建材", "brick", "آجر"],
  },
]

const mockProducts = [
  {
    id: 1,
    name: "سیمان تیپ ۲ تهران",
    nameEn: "Tehran Type 2 Cement",
    nameZh: "德黑兰2型水泥",
    price: "۲۸۵,۰۰۰",
    priceEn: "285,000",
    priceNum: 285000,
    image: "/placeholder.svg?height=60&width=60",
    category: "cement",
    brand: "تهران",
    brandEn: "Tehran",
    inStock: true,
    rating: 4.5,
    supplier: "کارخانه سیمان تهران",
    supplierEn: "Tehran Cement Factory",
    keywords: ["cement", "سیمان", "تهران", "type 2", "تیپ 2"],
  },
  {
    id: 2,
    name: "سیمان سفید ساوه",
    nameEn: "Saveh White Cement",
    nameZh: "萨维白水泥",
    price: "۴۲۰,۰۰۰",
    priceEn: "420,000",
    priceNum: 420000,
    image: "/placeholder.svg?height=60&width=60",
    category: "cement",
    brand: "ساوه",
    brandEn: "Saveh",
    inStock: true,
    rating: 4.8,
    supplier: "کارخانه سیمان ساوه",
    supplierEn: "Saveh Cement Factory",
    keywords: ["cement", "white", "سیمان", "سفید", "ساوه", "白水泥"],
  },
  {
    id: 3,
    name: "دریل شارژی بوش",
    nameEn: "Bosch Cordless Drill",
    nameZh: "博世无绳电钻",
    price: "۸,۵۰۰,۰۰۰",
    priceEn: "8,500,000",
    priceNum: 8500000,
    image: "/placeholder.svg?height=60&width=60",
    category: "tools",
    brand: "بوش",
    brandEn: "Bosch",
    inStock: true,
    rating: 4.9,
    supplier: "ابزار صنعتی پارس",
    supplierEn: "Pars Industrial Tools",
    keywords: ["drill", "bosch", "دریل", "بوش", "power tool", "ابزار برقی"],
  },
  {
    id: 4,
    name: "کلاه ایمنی صنعتی",
    nameEn: "Industrial Safety Helmet",
    nameZh: "工业安全帽",
    price: "۳۵۰,۰۰۰",
    priceEn: "350,000",
    priceNum: 350000,
    image: "/placeholder.svg?height=60&width=60",
    category: "safety",
    brand: "پارس",
    brandEn: "Pars",
    inStock: false,
    rating: 4.2,
    supplier: "تجهیزات ایمنی البرز",
    supplierEn: "Alborz Safety Equipment",
    keywords: ["helmet", "safety", "کلاه", "ایمنی", "安全帽"],
  },
  {
    id: 5,
    name: "آجر نسوز صنعتی",
    nameEn: "Industrial Refractory Brick",
    nameZh: "工业耐火砖",
    price: "۱۸۵,۰۰۰",
    priceEn: "185,000",
    priceNum: 185000,
    image: "/placeholder.svg?height=60&width=60",
    category: "materials",
    brand: "کاشی اصفهان",
    brandEn: "Isfahan Tiles",
    inStock: true,
    rating: 4.6,
    supplier: "مصالح ساختمانی کیان",
    supplierEn: "Kian Building Materials",
    keywords: ["brick", "refractory", "آجر", "نسوز", "耐火砖"],
  },
]

const mockSuppliers = [
  {
    id: 1,
    name: "کارخانه سیمان تهران",
    nameEn: "Tehran Cement Factory",
    nameZh: "德黑兰水泥厂",
    verified: true,
    rating: 4.8,
    city: "تهران",
    cityEn: "Tehran",
  },
  {
    id: 2,
    name: "ابزار صنعتی پارس",
    nameEn: "Pars Industrial Tools",
    nameZh: "帕斯工业工具",
    verified: true,
    rating: 4.7,
    city: "تهران",
    cityEn: "Tehran",
  },
  {
    id: 3,
    name: "تجهیزات ایمنی البرز",
    nameEn: "Alborz Safety Equipment",
    nameZh: "阿尔伯兹安全设备",
    verified: false,
    rating: 4.3,
    city: "کرج",
    cityEn: "Karaj",
  },
]

const SEARCH_HISTORY_KEY = "peysaz_search_history"
const MAX_HISTORY_ITEMS = 10

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
  const [recentHistory, setRecentHistory] = useState<Array<{ query: string; queryEn: string; queryZh: string }>>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isVoiceListening, setIsVoiceListening] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { t, locale } = useI18n()

  useEffect(() => {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY)
    if (savedHistory) {
      try {
        setRecentHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error("[v0] Failed to parse search history", e)
      }
    }
  }, [])

  const saveSearchHistory = useCallback((searchQuery: string) => {
    const newItem = { query: searchQuery, queryEn: searchQuery, queryZh: searchQuery }
    setRecentHistory((prev) => {
      const filtered = prev.filter((item) => item.query.toLowerCase() !== searchQuery.toLowerCase())
      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS)
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  // Get localized text
  const getLocalizedName = (item: any) => {
    if (locale === "fa") return item.name || item.query || ""
    if (locale === "zh") return item.nameZh || item.queryZh || item.name || item.query || ""
    return item.nameEn || item.queryEn || item.name || item.query || ""
  }

  const searchProducts = useCallback(
    (searchQuery: string) => {
      const lowerQuery = searchQuery.toLowerCase()
      return mockProducts.filter((p) => {
        // Category filter
        if (selectedCategory && p.category !== selectedCategory) return false

        // Text search in multiple fields
        const searchableText = [
          getLocalizedName(p),
          p.name,
          p.nameEn,
          p.nameZh,
          p.brand,
          p.brandEn,
          p.supplier,
          p.supplierEn,
          ...(p.keywords || []),
        ]
          .join(" ")
          .toLowerCase()

        return searchableText.includes(lowerQuery)
      })
    },
    [selectedCategory, locale],
  )

  const searchCategories = useCallback(
    (searchQuery: string) => {
      const lowerQuery = searchQuery.toLowerCase()
      return categories.filter((c) => {
        const searchableText = [getLocalizedName(c), c.name, c.nameEn, c.nameZh, ...(c.keywords || [])]
          .join(" ")
          .toLowerCase()

        return searchableText.includes(lowerQuery)
      })
    },
    [locale],
  )

  const searchSuppliers = useCallback(
    (searchQuery: string) => {
      const lowerQuery = searchQuery.toLowerCase()
      return mockSuppliers.filter((s) => {
        const searchableText = [getLocalizedName(s), s.name, s.nameEn, s.nameZh, s.city, s.cityEn]
          .join(" ")
          .toLowerCase()

        return searchableText.includes(lowerQuery)
      })
    },
    [locale],
  )

  // Filter results based on query
  const filteredProducts = query.length > 0 ? searchProducts(query) : []
  const filteredCategories = query.length > 0 ? searchCategories(query) : []
  const filteredSuppliers = query.length > 0 ? searchSuppliers(query) : []

  const allResults = useMemo(
    () => [
      ...filteredProducts.map((p) => ({ type: "product" as const, item: p, href: `/product/${p.id}` })),
      ...filteredCategories.map((c) => ({ type: "category" as const, item: c, href: `/category/${c.id}` })),
      ...filteredSuppliers.map((s) => ({ type: "supplier" as const, item: s, href: `/suppliers/${s.id}` })),
    ],
    [filteredProducts, filteredCategories, filteredSuppliers],
  )

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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
        setSelectedIndex(-1)
        inputRef.current?.blur()
      }

      // Arrow navigation when search is open
      if (isOpen && allResults.length > 0) {
        if (event.key === "ArrowDown") {
          event.preventDefault()
          setSelectedIndex((prev) => (prev < allResults.length - 1 ? prev + 1 : prev))
        } else if (event.key === "ArrowUp") {
          event.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        } else if (event.key === "Enter" && selectedIndex >= 0) {
          event.preventDefault()
          const selected = allResults[selectedIndex]
          router.push(selected.href)
          setIsOpen(false)
          setSelectedIndex(-1)
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, allResults, selectedIndex, router])

  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`)
      selectedElement?.scrollIntoView({ block: "nearest", behavior: "smooth" })
    }
  }, [selectedIndex])

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

      saveSearchHistory(searchQuery)
      setIsOpen(false)
      setSelectedIndex(-1)

      const params = new URLSearchParams()
      params.set("search", searchQuery)
      if (selectedCategory) params.set("category", selectedCategory)

      router.push(`/products?${params.toString()}`)
      onClose?.()
    },
    [router, onClose, saveSearchHistory, selectedCategory],
  )

  const handleClearRecent = () => {
    setRecentHistory([])
    localStorage.removeItem(SEARCH_HISTORY_KEY)
  }

  const handleVoiceSearch = useCallback(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert(t("search.voice_not_supported") || "Voice search not supported in this browser")
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = locale === "fa" ? "fa-IR" : locale === "zh" ? "zh-CN" : "en-US"
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsVoiceListening(true)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setQuery(transcript)
      setIsVoiceListening(false)
      setIsOpen(true)
    }

    recognition.onerror = () => {
      setIsVoiceListening(false)
    }

    recognition.onend = () => {
      setIsVoiceListening(false)
    }

    recognition.start()
  }, [locale, t])

  const handleImageSearch = useCallback(() => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e: any) => {
      const file = e.target?.files?.[0]
      if (file) {
        // In a real implementation, upload to image search API
        console.log("[v0] Image search file:", file.name)
        alert(`${t("search.image")} - ${file.name}\n(Image search API integration needed)`)
      }
    }
    input.click()
  }, [t])

  const isIsland = variant === "island"
  const isRTL = locale === "fa"

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full",
        isIsland && "fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-background/80 backdrop-blur-sm",
        className,
      )}
      dir={isRTL ? "rtl" : "ltr"}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "hidden sm:flex items-center gap-1.5 h-full px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
                  isRTL ? "border-l border-border" : "border-r border-border",
                  isIsland && "px-4 py-3",
                )}
              >
                <Filter className="h-4 w-4" />
                <span className="hidden md:inline">
                  {selectedCategory
                    ? getLocalizedName(categories.find((c) => c.id === selectedCategory))
                    : t("search.all")}
                </span>
                <ChevronDown className="h-3 w-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isRTL ? "end" : "start"}>
              <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                <span className="font-medium">{t("search.all")}</span>
              </DropdownMenuItem>
              <Separator className="my-1" />
              {categories.map((cat) => (
                <DropdownMenuItem key={cat.id} onClick={() => setSelectedCategory(cat.id)}>
                  <cat.icon className="h-4 w-4 mr-2 text-primary" />
                  {getLocalizedName(cat)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search Icon */}
          <div className={cn("flex items-center", isRTL ? "pr-3 sm:pr-0" : "pl-3 sm:pl-0")}>
            {isLoading || isVoiceListening ? (
              <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground animate-spin" />
            ) : (
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            )}
          </div>

          {/* Input */}
          <Input
            ref={inputRef}
            type="text"
            placeholder={t("search.placeholder")}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(-1)
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && selectedIndex === -1) {
                handleSearch(query)
              }
            }}
            className={cn(
              "flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 text-sm sm:text-base h-10 sm:h-12 px-2",
              isIsland && "h-14 text-base",
            )}
            dir={isRTL ? "rtl" : "ltr"}
          />

          {/* Right Actions */}
          <div className={cn("flex items-center gap-1", isRTL ? "pl-2" : "pr-2")}>
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setQuery("")
                  setSelectedIndex(-1)
                  inputRef.current?.focus()
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-primary hidden sm:flex",
                isVoiceListening && "text-primary animate-pulse",
              )}
              title={t("search.voice")}
              onClick={handleVoiceSearch}
            >
              <Mic className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-primary hidden sm:flex"
              title={t("search.image")}
              onClick={handleImageSearch}
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
                { id: "all", count: filteredProducts.length + filteredCategories.length + filteredSuppliers.length },
                { id: "products", count: filteredProducts.length },
                { id: "categories", count: filteredCategories.length },
                { id: "suppliers", count: filteredSuppliers.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as typeof activeTab)
                    setSelectedIndex(-1)
                  }}
                  className={cn(
                    "px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1.5",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  {t(`search.${tab.id}`)}
                  {query.length > 0 && tab.count > 0 && (
                    <Badge variant={activeTab === tab.id ? "secondary" : "outline"} className="h-5 px-1.5 text-[10px]">
                      {tab.count}
                    </Badge>
                  )}
                </button>
              ))}
            </div>

            <ScrollArea className="max-h-[60vh]" ref={resultsRef}>
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
                            {t("search.recent")}
                          </h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-muted-foreground hover:text-destructive h-auto py-1"
                            onClick={handleClearRecent}
                          >
                            {t("search.clear")}
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentHistory.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                setQuery(getLocalizedName(item))
                                inputRef.current?.focus()
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
                            >
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {getLocalizedName(item)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Popular Categories */}
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        {t("search.popular_categories")}
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
                              {cat.count} {t("cart.items")}
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
                    {filteredProducts.length > 0 && (
                      <div className="mb-4 p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
                        <div className="flex items-start gap-2">
                          <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{t("search.smart_suggestion")}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {locale === "fa"
                                ? `${filteredProducts.length} محصول، ${filteredCategories.length} دسته‌بندی و ${filteredSuppliers.length} تامین‌کننده یافت شد`
                                : locale === "zh"
                                  ? `找到${filteredProducts.length}个产品、${filteredCategories.length}个分类和${filteredSuppliers.length}个供应商`
                                  : `Found ${filteredProducts.length} products, ${filteredCategories.length} categories, and ${filteredSuppliers.length} suppliers`}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Products Results */}
                    {(activeTab === "all" || activeTab === "products") && filteredProducts.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">{t("search.products")}</h3>
                          <Link
                            href={`/products?search=${encodeURIComponent(query)}`}
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                            onClick={() => setIsOpen(false)}
                          >
                            {t("search.view_all")}
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                        <div className="space-y-2">
                          {filteredProducts.slice(0, 4).map((product, idx) => (
                            <Link
                              key={product.id}
                              data-index={idx}
                              href={`/product/${product.id}`}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors group",
                                selectedIndex === idx && "bg-muted ring-2 ring-primary/20",
                              )}
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
                                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                  <span className="text-sm font-bold text-primary">
                                    {locale === "fa" ? product.price : product.priceEn} {t("general.toman")}
                                  </span>
                                  {product.inStock ? (
                                    <Badge variant="secondary" className="text-[10px] bg-accent/10 text-accent">
                                      {t("product.in_stock")}
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="secondary"
                                      className="text-[10px] bg-destructive/10 text-destructive"
                                    >
                                      {t("product.out_of_stock")}
                                    </Badge>
                                  )}
                                  <div className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    {product.rating}
                                  </div>
                                </div>
                              </div>
                              <ArrowRight
                                className={cn(
                                  "h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0",
                                  isRTL && "rotate-180",
                                )}
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Categories Results */}
                    {(activeTab === "all" || activeTab === "categories") && filteredCategories.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">{t("search.categories")}</h3>
                        <div className="flex flex-wrap gap-2">
                          {filteredCategories.slice(0, activeTab === "categories" ? 10 : 5).map((cat, idx) => {
                            const dataIdx = activeTab === "all" ? filteredProducts.length + idx : idx
                            return (
                              <Link
                                key={cat.id}
                                data-index={dataIdx}
                                href={`/category/${cat.id}`}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "flex items-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors",
                                  selectedIndex === dataIdx && "ring-2 ring-primary/20",
                                )}
                              >
                                <cat.icon className="h-4 w-4 text-primary" />
                                <span className="text-sm">{getLocalizedName(cat)}</span>
                                <Badge variant="secondary" className="text-[10px]">
                                  {cat.count}
                                </Badge>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Suppliers Results */}
                    {(activeTab === "all" || activeTab === "suppliers") && filteredSuppliers.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-sm font-medium mb-2">{t("search.suppliers")}</h3>
                        <div className="space-y-2">
                          {filteredSuppliers.map((supplier, idx) => {
                            const dataIdx =
                              activeTab === "all" ? filteredProducts.length + filteredCategories.length + idx : idx
                            return (
                              <Link
                                key={supplier.id}
                                data-index={dataIdx}
                                href={`/suppliers/${supplier.id}`}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors group",
                                  selectedIndex === dataIdx && "bg-muted ring-2 ring-primary/20",
                                )}
                              >
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <Building2 className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium truncate">{getLocalizedName(supplier)}</p>
                                    {supplier.verified && <Shield className="h-3.5 w-3.5 text-accent flex-shrink-0" />}
                                  </div>
                                  <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    {locale === "fa" ? supplier.city : supplier.cityEn}
                                    <span>•</span>
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    {supplier.rating}
                                  </div>
                                </div>
                                <ArrowRight
                                  className={cn(
                                    "h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0",
                                    isRTL && "rotate-180",
                                  )}
                                />
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* No Results */}
                    {filteredProducts.length === 0 &&
                      filteredCategories.length === 0 &&
                      filteredSuppliers.length === 0 &&
                      query.length > 2 && (
                        <div className="text-center py-8">
                          <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                            <Search className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground">{t("search.no_results")}</p>
                          <p className="text-xs text-muted-foreground mt-1">{t("search.try_different")}</p>
                        </div>
                      )}

                    {/* Search Actions */}
                    {(filteredProducts.length > 0 || filteredCategories.length > 0 || filteredSuppliers.length > 0) && (
                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-border">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground"
                          onClick={() => {
                            setQuery("")
                            setSelectedIndex(-1)
                            inputRef.current?.focus()
                          }}
                        >
                          <X className={cn("h-4 w-4", isRTL ? "ml-1" : "mr-1")} />
                          {t("search.clear")}
                        </Button>
                        <Button size="sm" onClick={() => handleSearch(query)} className="gap-2">
                          <Search className="h-4 w-4" />
                          {t("search.all")} (
                          {filteredProducts.length + filteredCategories.length + filteredSuppliers.length})
                        </Button>
                      </div>
                    )}
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
