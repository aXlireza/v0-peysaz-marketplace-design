"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight, Truck, Shield, CreditCard } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "Weekly Cement Prices",
    titleFA: "قیمت هفتگی سیمان",
    subtitle: "Updated every Monday with verified factory prices",
    cta: "View Prices",
    href: "/cement-prices",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: 2,
    title: "Bulk Orders, Better Prices",
    titleFA: "سفارش عمده، قیمت بهتر",
    subtitle: "Save up to 25% on orders over 100 tons",
    cta: "Start Ordering",
    href: "/category/cement",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: 3,
    title: "Professional Tools",
    titleFA: "ابزار حرفه‌ای",
    subtitle: "Top brands for construction professionals",
    cta: "Shop Tools",
    href: "/category/tools",
    image: "/placeholder.svg?height=600&width=1200",
  },
]

const features = [
  { icon: Truck, title: "Fast Delivery", titleShort: "Delivery", description: "Nationwide shipping" },
  { icon: Shield, title: "Verified Suppliers", titleShort: "Verified", description: "KYC certified" },
  { icon: CreditCard, title: "Flexible Payment", titleShort: "Payment", description: "Credit available" },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative">
      {/* Main Hero Carousel - Reduced height on mobile, better touch targets */}
      <div className="relative h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden bg-muted">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-sidebar/95 via-sidebar/70 to-transparent" />
            <div className="relative h-full container mx-auto px-4 flex items-center">
              <div className="max-w-xl text-sidebar-foreground pr-8 sm:pr-0">
                <p className="text-accent font-medium mb-1 sm:mb-2 text-sm sm:text-base">{slide.titleFA}</p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-balance leading-tight">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-sidebar-foreground/80 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-none">
                  {slide.subtitle}
                </p>
                <Button
                  asChild
                  size="default"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground h-10 sm:h-11 text-sm sm:text-base"
                >
                  <Link href={slide.href}>
                    {slide.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows - Smaller on mobile, better positioning */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-card/80 hover:bg-card flex items-center justify-center transition-colors shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-card/80 hover:bg-card flex items-center justify-center transition-colors shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Dots - Better touch targets */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-6 sm:w-8 bg-accent" : "w-2 bg-card/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Features Bar - Improved mobile layout */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 divide-x divide-border">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 py-3 sm:py-4 px-1"
              >
                <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 text-accent shrink-0" />
                <div className="text-center sm:text-left">
                  <div className="font-medium text-[10px] sm:text-sm leading-tight">
                    <span className="sm:hidden">{feature.titleShort}</span>
                    <span className="hidden sm:inline">{feature.title}</span>
                  </div>
                  <div className="text-[9px] sm:text-xs text-muted-foreground hidden sm:block">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
