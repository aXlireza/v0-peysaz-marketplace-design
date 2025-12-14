"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Building2,
  Wrench,
  HardHat,
  FlameKindling,
  Layers,
  Package,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Tags,
  Menu,
  X,
} from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SubCategory {
  name: string
  nameFA: string
  nameZH: string
  href: string
  isNew?: boolean
  isTrending?: boolean
}

interface Category {
  id: string
  name: string
  nameFA: string
  nameZH: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  color: string
  subCategories: SubCategory[]
  featuredProducts?: {
    title: string
    titleFA: string
    titleZH: string
    href: string
    image: string
    discount?: string
  }[]
  banner?: {
    title: string
    titleFA: string
    titleZH: string
    subtitle: string
    subtitleFA: string
    subtitleZH: string
    href: string
    color: string
  }
}

const categories: Category[] = [
  {
    id: "cement",
    name: "Cement & Concrete",
    nameFA: "سیمان و بتن",
    nameZH: "水泥和混凝土",
    icon: Building2,
    href: "/category/cement",
    color: "bg-primary/10 text-primary",
    subCategories: [
      {
        name: "Type 2 Cement",
        nameFA: "سیمان تیپ 2",
        nameZH: "2型水泥",
        href: "/category/cement/type-2",
        isTrending: true,
      },
      { name: "Type 5 Cement", nameFA: "سیمان تیپ 5", nameZH: "5型水泥", href: "/category/cement/type-5" },
      { name: "White Cement", nameFA: "سیمان سفید", nameZH: "白水泥", href: "/category/cement/white" },
      {
        name: "Ready-Mix Concrete",
        nameFA: "بتن آماده",
        nameZH: "预拌混凝土",
        href: "/category/cement/ready-mix",
        isNew: true,
      },
      {
        name: "Cement Additives",
        nameFA: "افزودنی‌های سیمان",
        nameZH: "水泥添加剂",
        href: "/category/cement/additives",
      },
      { name: "Mortar & Plaster", nameFA: "ملات و گچ", nameZH: "砂浆和石膏", href: "/category/cement/mortar" },
    ],
    featuredProducts: [
      {
        title: "Tehran Cement Type 2",
        titleFA: "سیمان تهران تیپ 2",
        titleZH: "德黑兰2型水泥",
        href: "/product/1",
        image: "/placeholder.svg?height=100&width=100",
        discount: "15%",
      },
    ],
    banner: {
      title: "Weekly Cement Prices",
      titleFA: "قیمت هفتگی سیمان",
      titleZH: "周水泥价格",
      subtitle: "Updated Every Monday",
      subtitleFA: "به‌روزرسانی هر دوشنبه",
      subtitleZH: "每周一更新",
      href: "/cement-prices",
      color: "bg-gradient-to-r from-primary/20 to-primary/5",
    },
  },
  {
    id: "tools",
    name: "Tools & Equipment",
    nameFA: "ابزار و تجهیزات",
    nameZH: "工具和设备",
    icon: Wrench,
    href: "/category/tools",
    color: "bg-chart-3/10 text-chart-3",
    subCategories: [
      {
        name: "Power Tools",
        nameFA: "ابزار برقی",
        nameZH: "电动工具",
        href: "/category/tools/power",
        isTrending: true,
      },
      { name: "Hand Tools", nameFA: "ابزار دستی", nameZH: "手工工具", href: "/category/tools/hand" },
      { name: "Drills & Drivers", nameFA: "دریل و پیچ‌گوشتی", nameZH: "钻孔机", href: "/category/tools/drills" },
      { name: "Saws & Cutters", nameFA: "اره و برش‌کار", nameZH: "锯和切割机", href: "/category/tools/saws" },
      { name: "Measuring Tools", nameFA: "ابزار اندازه‌گیری", nameZH: "测量工具", href: "/category/tools/measuring" },
      { name: "Tool Storage", nameFA: "جعبه ابزار", nameZH: "工具存储", href: "/category/tools/storage", isNew: true },
    ],
    featuredProducts: [
      {
        title: "Professional Drill Set",
        titleFA: "ست دریل حرفه‌ای",
        titleZH: "专业钻孔套装",
        href: "/product/2",
        image: "/placeholder.svg?height=100&width=100",
        discount: "25%",
      },
    ],
    banner: {
      title: "Professional Tools Sale",
      titleFA: "فروش ویژه ابزار حرفه‌ای",
      titleZH: "专业工具促销",
      subtitle: "Up to 40% Off",
      subtitleFA: "تا 40٪ تخفیف",
      subtitleZH: "高达40％折扣",
      href: "/category/tools/sale",
      color: "bg-gradient-to-r from-chart-3/20 to-chart-3/5",
    },
  },
  {
    id: "safety",
    name: "Safety Equipment",
    nameFA: "تجهیزات ایمنی",
    nameZH: "安全设备",
    icon: HardHat,
    href: "/category/safety",
    color: "bg-accent/10 text-accent",
    subCategories: [
      { name: "Hard Hats & Helmets", nameFA: "کلاه ایمنی", nameZH: "安全帽", href: "/category/safety/helmets" },
      {
        name: "Safety Vests",
        nameFA: "جلیقه ایمنی",
        nameZH: "安全背心",
        href: "/category/safety/vests",
        isTrending: true,
      },
      { name: "Safety Gloves", nameFA: "دستکش ایمنی", nameZH: "安全手套", href: "/category/safety/gloves" },
      { name: "Safety Boots", nameFA: "کفش ایمنی", nameZH: "安全靴", href: "/category/safety/boots" },
      { name: "Eye Protection", nameFA: "محافظ چشم", nameZH: "护目镜", href: "/category/safety/eye-protection" },
      {
        name: "Respiratory Protection",
        nameFA: "ماسک تنفسی",
        nameZH: "呼吸防护",
        href: "/category/safety/respiratory",
        isNew: true,
      },
    ],
    banner: {
      title: "Safety First",
      titleFA: "ایمنی اول",
      titleZH: "安全第一",
      subtitle: "Certified Equipment",
      subtitleFA: "تجهیزات گواهی‌شده",
      subtitleZH: "认证设备",
      href: "/category/safety",
      color: "bg-gradient-to-r from-accent/20 to-accent/5",
    },
  },
  {
    id: "firefighting",
    name: "Firefighting",
    nameFA: "آتش‌نشانی",
    nameZH: "消防",
    icon: FlameKindling,
    href: "/category/firefighting",
    color: "bg-destructive/10 text-destructive",
    subCategories: [
      {
        name: "Fire Extinguishers",
        nameFA: "کپسول آتش‌نشانی",
        nameZH: "灭火器",
        href: "/category/firefighting/extinguishers",
        isTrending: true,
      },
      { name: "Fire Hoses", nameFA: "شیلنگ آتش‌نشانی", nameZH: "消防水带", href: "/category/firefighting/hoses" },
      {
        name: "Fire Alarms",
        nameFA: "دستگاه اعلام حریق",
        nameZH: "火警",
        href: "/category/firefighting/alarms",
        isNew: true,
      },
      { name: "Fire Cabinets", nameFA: "جعبه آتش‌نشانی", nameZH: "消防柜", href: "/category/firefighting/cabinets" },
      {
        name: "Sprinkler Systems",
        nameFA: "سیستم اسپرینکلر",
        nameZH: "喷淋系统",
        href: "/category/firefighting/sprinklers",
      },
    ],
    banner: {
      title: "Fire Safety Solutions",
      titleFA: "راه‌حل‌های ایمنی آتش",
      titleZH: "消防安全解决方案",
      subtitle: "Protect Your Site",
      subtitleFA: "محافظت از سایت شما",
      subtitleZH: "保护您的场地",
      href: "/category/firefighting",
      color: "bg-gradient-to-r from-destructive/20 to-destructive/5",
    },
  },
  {
    id: "materials",
    name: "Building Materials",
    nameFA: "مصالح ساختمانی",
    nameZH: "建筑材料",
    icon: Layers,
    href: "/category/materials",
    color: "bg-secondary/80 text-secondary-foreground",
    subCategories: [
      { name: "Bricks & Blocks", nameFA: "آجر و بلوک", nameZH: "砖和砌块", href: "/category/materials/bricks" },
      {
        name: "Steel & Rebar",
        nameFA: "فولاد و میلگرد",
        nameZH: "钢筋",
        href: "/category/materials/steel",
        isTrending: true,
      },
      { name: "Aggregates", nameFA: "سنگ‌دانه", nameZH: "骨料", href: "/category/materials/aggregates" },
      { name: "Insulation", nameFA: "عایق", nameZH: "绝缘材料", href: "/category/materials/insulation" },
      {
        name: "Waterproofing",
        nameFA: "ایزوگام و عایق رطوبتی",
        nameZH: "防水材料",
        href: "/category/materials/waterproofing",
      },
      { name: "Gypsum & Plaster", nameFA: "گچ و پلاستر", nameZH: "石膏", href: "/category/materials/gypsum" },
    ],
    banner: {
      title: "Bulk Orders Available",
      titleFA: "سفارش عمده موجود",
      titleZH: "批量订购",
      subtitle: "Best Prices Guaranteed",
      subtitleFA: "بهترین قیمت تضمینی",
      subtitleZH: "保证最优价格",
      href: "/category/materials",
      color: "bg-gradient-to-r from-secondary/40 to-secondary/10",
    },
  },
]

export function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { t, locale, dir } = useI18n()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setActiveCategory(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const getCategoryName = (category: Category) => {
    if (locale === "fa") return category.nameFA
    if (locale === "zh") return category.nameZH
    return category.name
  }

  const getSubCategoryName = (subCat: SubCategory) => {
    if (locale === "fa") return subCat.nameFA
    if (locale === "zh") return subCat.nameZH
    return subCat.name
  }

  const getProductName = (product: { title: string; titleFA: string; titleZH: string }) => {
    if (locale === "fa") return product.titleFA
    if (locale === "zh") return product.titleZH
    return product.title
  }

  const getBannerText = (banner: Category["banner"], field: "title" | "subtitle") => {
    if (!banner) return ""
    if (field === "title") {
      if (locale === "fa") return banner.titleFA
      if (locale === "zh") return banner.titleZH
      return banner.title
    }
    if (locale === "fa") return banner.subtitleFA
    if (locale === "zh") return banner.subtitleZH
    return banner.subtitle
  }

  // Mobile Menu
  if (isMobile) {
    return (
      <div ref={menuRef} dir={dir}>
        <Button
          variant="outline"
          className="gap-2 w-full sm:w-auto justify-start bg-transparent"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          {t("nav.all_categories")}
        </Button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-xl z-50 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="container mx-auto px-4 py-4">
              {categories.map((category) => (
                <div key={category.id} className="mb-4">
                  <button
                    onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                    className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-lg", category.color)}>
                        <category.icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium">{getCategoryName(category)}</span>
                    </div>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        activeCategory === category.id && "rotate-90",
                        dir === "rtl" && "rotate-180",
                      )}
                    />
                  </button>

                  {activeCategory === category.id && (
                    <div className="mt-2 ml-4 pl-4 border-l-2 border-border space-y-1">
                      {category.subCategories.map((subCat) => (
                        <Link
                          key={subCat.href}
                          href={subCat.href}
                          className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted text-sm transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{getSubCategoryName(subCat)}</span>
                          <div className="flex items-center gap-1">
                            {subCat.isNew && (
                              <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                                <Sparkles className="h-3 w-3 mr-0.5" />
                                {locale === "fa" ? "جدید" : locale === "zh" ? "新" : "NEW"}
                              </Badge>
                            )}
                            {subCat.isTrending && (
                              <Badge variant="default" className="h-5 px-1.5 text-[10px]">
                                <TrendingUp className="h-3 w-3 mr-0.5" />
                                {locale === "fa" ? "ترند" : locale === "zh" ? "热" : "HOT"}
                              </Badge>
                            )}
                          </div>
                        </Link>
                      ))}
                      <Link
                        href={category.href}
                        className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted text-sm font-medium text-primary transition-colors mt-2"
                        onClick={() => setIsOpen(false)}
                      >
                        {t("nav.view_all")} →
                      </Link>
                    </div>
                  )}
                </div>
              ))}

              {/* Quick Links */}
              <div className="mt-6 pt-6 border-t border-border space-y-2">
                <Link
                  href="/cement-prices"
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-primary/10 text-primary font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <Tags className="h-4 w-4" />
                  {t("nav.cement_prices")}
                </Link>
                <Link
                  href="/suppliers"
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-accent/10 text-accent font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <Building2 className="h-4 w-4" />
                  {t("nav.suppliers")}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Desktop Mega Menu
  return (
    <div ref={menuRef} className="relative" dir={dir}>
      <Button
        variant="outline"
        className="gap-2 bg-transparent"
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-4 w-4" />
        {t("nav.all_categories")}
        <ChevronRight
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90", dir === "rtl" && "rotate-180")}
        />
      </Button>

      {isOpen && (
        <div
          className="absolute top-full mt-2 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
          style={{ width: "900px", maxWidth: "calc(100vw - 2rem)" }}
          onMouseLeave={() => {
            setIsOpen(false)
            setActiveCategory(null)
          }}
        >
          <div className="flex" style={{ minHeight: "500px" }}>
            {/* Categories Sidebar */}
            <div className="w-64 bg-muted/30 border-r border-border overflow-y-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onMouseEnter={() => setActiveCategory(category.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 transition-colors text-left",
                    activeCategory === category.id ? "bg-background text-foreground" : "hover:bg-background/50",
                  )}
                >
                  <div className={cn("p-2 rounded-lg", category.color)}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{getCategoryName(category)}</div>
                    <div className="text-xs text-muted-foreground">
                      {category.subCategories.length} {locale === "fa" ? "گروه" : locale === "zh" ? "组" : "groups"}
                    </div>
                  </div>
                  <ChevronRight className={cn("h-4 w-4", dir === "rtl" && "rotate-180")} />
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 overflow-y-auto">
              {activeCategory ? (
                (() => {
                  const category = categories.find((cat) => cat.id === activeCategory)
                  if (!category) return null

                  return (
                    <div className="space-y-6">
                      {/* Subcategories Grid */}
                      <div>
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <category.icon className="h-5 w-5 text-primary" />
                          {getCategoryName(category)}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {category.subCategories.map((subCat) => (
                            <Link
                              key={subCat.href}
                              href={subCat.href}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="text-sm group-hover:text-primary transition-colors">
                                {getSubCategoryName(subCat)}
                              </span>
                              <div className="flex items-center gap-1">
                                {subCat.isNew && (
                                  <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                                    <Sparkles className="h-3 w-3" />
                                  </Badge>
                                )}
                                {subCat.isTrending && (
                                  <Badge variant="default" className="h-5 px-1.5 text-[10px]">
                                    <TrendingUp className="h-3 w-3" />
                                  </Badge>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                        <Link
                          href={category.href}
                          className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary hover:underline"
                          onClick={() => setIsOpen(false)}
                        >
                          {t("nav.view_all")} →
                        </Link>
                      </div>

                      {/* Featured Products & Banner */}
                      <div className="flex gap-4 pt-4 border-t border-border">
                        {/* Featured Product */}
                        {category.featuredProducts && category.featuredProducts[0] && (
                          <Link
                            href={category.featuredProducts[0].href}
                            className="flex-1 p-4 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <img
                                  src={category.featuredProducts[0].image || "/placeholder.svg"}
                                  alt={getProductName(category.featuredProducts[0])}
                                  className="h-16 w-16 rounded-lg object-cover"
                                />
                                {category.featuredProducts[0].discount && (
                                  <Badge className="absolute -top-2 -right-2 h-6 px-2 text-[10px] bg-destructive">
                                    -{category.featuredProducts[0].discount}
                                  </Badge>
                                )}
                              </div>
                              <div>
                                <div className="text-sm font-medium group-hover:text-primary transition-colors">
                                  {getProductName(category.featuredProducts[0])}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {locale === "fa" ? "محصول ویژه" : locale === "zh" ? "特色产品" : "Featured Deal"}
                                </div>
                              </div>
                            </div>
                          </Link>
                        )}

                        {/* Promotional Banner */}
                        {category.banner && (
                          <Link
                            href={category.banner.href}
                            className={cn(
                              "flex-1 p-4 rounded-lg hover:shadow-md transition-all group",
                              category.banner.color,
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="font-semibold group-hover:text-primary transition-colors">
                              {getBannerText(category.banner, "title")}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {getBannerText(category.banner, "subtitle")}
                            </div>
                            <div className="text-xs font-medium mt-2 text-primary">
                              {locale === "fa" ? "مشاهده →" : locale === "zh" ? "查看 →" : "View →"}
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  )
                })()
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">
                      {locale === "fa"
                        ? "یک دسته را انتخاب کنید"
                        : locale === "zh"
                          ? "选择一个类别"
                          : "Select a category"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
