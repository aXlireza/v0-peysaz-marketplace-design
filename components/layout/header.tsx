"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, User, Menu, ChevronDown, Phone, Building2, Truck, Shield, GitCompareArrows } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useI18n } from "@/lib/i18n/context"
import { useCompare } from "@/lib/compare-context"
import { AdvancedSearch } from "@/components/search/advanced-search"
import { SearchTrigger } from "@/components/search/search-trigger"

const categories = [
  { nameKey: "Cement", nameFA: "سیمان", href: "/category/cement", icon: Building2 },
  { nameKey: "Tools", nameFA: "ابزارآلات", href: "/category/tools", icon: Building2 },
  { nameKey: "Safety Gear", nameFA: "تجهیزات ایمنی", href: "/category/safety", icon: Shield },
  { nameKey: "Firefighting", nameFA: "آتش‌نشانی", href: "/category/firefighting", icon: Shield },
  { nameKey: "Building Materials", nameFA: "مصالح ساختمانی", href: "/category/materials", icon: Building2 },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useI18n()
  const { items: compareItems } = useCompare()

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-sidebar text-sidebar-foreground hidden sm:block">
        <div className="container mx-auto px-4">
          <div className="flex h-9 items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-4">
              <a href="tel:+982100000000" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span className="hidden sm:inline">021-00000000</span>
              </a>
              <span className="hidden lg:flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5" />
                {t("general.free_shipping_over")} 50M {t("general.toman")}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/supplier" className="hover:text-accent transition-colors">
                {t("nav.become_supplier")}
              </Link>
              <Link href="/help" className="hover:text-accent transition-colors hidden md:inline">
                {t("nav.help")}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation - Desktop */}
      <nav className="hidden lg:block bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-6 h-11 text-sm">
            {categories.map((cat) => (
              <Link
                key={cat.nameKey}
                href={cat.href}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                {cat.nameKey}
              </Link>
            ))}
            <Link href="/cement-prices" className="text-primary font-medium">
              {t("nav.cement_prices")}
            </Link>
            <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("nav.blog")}
            </Link>
            <Link
              href="/compare"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <GitCompareArrows className="h-3.5 w-3.5" />
              {t("product.compare")}
              {compareItems.length > 0 && (
                <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                  {compareItems.length}
                </Badge>
              )}
            </Link>
            <Link href="/suppliers" className="text-accent font-medium ml-auto">
              {t("nav.suppliers")}
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Main Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex h-14 sm:h-16 items-center gap-2 sm:gap-4">
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">{t("nav.categories")}</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.nameKey}
                      href={cat.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <cat.icon className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{cat.nameKey}</div>
                        <div className="text-sm text-muted-foreground">{cat.nameFA}</div>
                      </div>
                    </Link>
                  ))}
                </nav>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="space-y-2">
                    <Link
                      href="/cement-prices"
                      className="block px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("nav.cement_prices")}
                    </Link>
                    <Link
                      href="/blog"
                      className="block px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("nav.blog")}
                    </Link>
                    <Link
                      href="/compare"
                      className="block px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("product.compare")} {compareItems.length > 0 && `(${compareItems.length})`}
                    </Link>
                    <Link
                      href="/suppliers"
                      className="block px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium text-accent"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t("nav.suppliers")}
                    </Link>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <LanguageSwitcher />
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg sm:text-xl">
                P
              </div>
              <div className="hidden xs:block sm:block">
                <div className="font-bold text-base sm:text-xl text-foreground tracking-tight">Peysaz</div>
                <div className="text-[9px] sm:text-[10px] text-muted-foreground leading-none">پیساز</div>
              </div>
            </Link>

            {/* Category Dropdown - Desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="hidden lg:flex">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Menu className="h-4 w-4" />
                  {t("nav.all_categories")}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {categories.map((cat) => (
                  <DropdownMenuItem key={cat.nameKey} asChild>
                    <Link href={cat.href} className="flex items-center gap-3 cursor-pointer">
                      <cat.icon className="h-4 w-4 text-primary" />
                      <div>
                        <div className="font-medium">{cat.nameKey}</div>
                        <div className="text-xs text-muted-foreground">{cat.nameFA}</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/categories" className="text-primary font-medium cursor-pointer">
                    {t("nav.view_all")} →
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex-1 min-w-0 hidden sm:block">
              <AdvancedSearch />
            </div>

            <div className="flex-1 min-w-0 sm:hidden">
              <SearchTrigger />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Link href="/compare">
                <Button variant="ghost" size="icon" className="relative h-9 w-9">
                  <GitCompareArrows className="h-4 w-4 sm:h-5 sm:w-5" />
                  {compareItems.length > 0 && (
                    <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 flex items-center justify-center text-[9px] sm:text-[10px] bg-primary text-primary-foreground">
                      {compareItems.length}
                    </Badge>
                  )}
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-9 w-9">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/login" className="cursor-pointer">
                      {t("auth.login")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register" className="cursor-pointer">
                      {t("auth.register")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative h-9 w-9">
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 flex items-center justify-center text-[9px] sm:text-[10px] bg-accent text-accent-foreground">
                    3
                  </Badge>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
