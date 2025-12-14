"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Share2, Bookmark, ChevronLeft, Facebook, Twitter, Linkedin, TrendingUp } from "lucide-react"

// Mock post data
const postData = {
  id: "cement-market-2024",
  title: "Iran Cement Market Outlook 2025: Price Forecasts & Trends",
  titleFA: "چشم‌انداز بازار سیمان ایران ۱۴۰۴",
  excerpt:
    "Comprehensive analysis of Iran's cement industry, including price predictions, demand forecasts, major factory expansions, and expert insights.",
  image: "/placeholder.svg?height=600&width=1200",
  category: "Market News",
  categoryId: "market",
  author: {
    name: "Dr. Mohammad Ahmadi",
    role: "Industry Analyst",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "Dr. Ahmadi has over 15 years of experience in construction materials market analysis and has advised major cement manufacturers in the region.",
  },
  date: "Dec 1, 2024",
  readTime: "12 min read",
  tags: ["Cement", "Market Analysis", "2025 Forecast", "Iran Construction"],
  content: `
## Executive Summary

The Iranian cement market is entering 2025 with cautious optimism. After navigating through challenging years marked by economic pressures and fluctuating demand, the industry shows signs of stabilization with several positive indicators on the horizon.

## Current Market Overview

Iran remains one of the largest cement producers in the Middle East, with a production capacity exceeding **85 million tons annually**. The domestic market currently operates at approximately 70% capacity utilization, leaving room for growth as construction activity picks up.

### Key Market Statistics (2024)
- Total Production Capacity: 85+ million tons/year
- Current Utilization: ~70%
- Active Cement Factories: 72
- Export Volume: 15 million tons/year
- Average Price (Type 2): 84,500 تومان/bag

## Price Forecast for 2025

Based on our analysis of multiple factors including:
- Raw material costs (limestone, gypsum, energy)
- Transportation expenses
- Demand projections
- Government regulations
- Currency fluctuations

We project the following price ranges for Q1-Q2 2025:

| Cement Type | Current Price | Projected Q2 2025 | Change |
|-------------|--------------|-------------------|--------|
| Type 1 | 82,000 | 86,000-90,000 | +5-10% |
| Type 2 | 85,000 | 89,000-93,000 | +5-9% |
| Type 5 | 95,000 | 100,000-105,000 | +5-10% |
| White | 145,000 | 155,000-165,000 | +7-14% |

## Major Factory Expansions

Several cement manufacturers have announced expansion plans:

### Tehran Cement Factory
- New production line expected Q3 2025
- Additional capacity: 3,000 tons/day
- Investment: 500 billion تومان

### Abyek Cement Company
- Modernization of existing lines
- Improved energy efficiency by 15%
- Expected completion: Q2 2025

## Demand Drivers

### Residential Construction
The government's Mehr Housing Project and new housing initiatives are expected to drive significant cement demand, particularly in:
- Tehran metropolitan area
- Major provincial capitals
- New town developments

### Infrastructure Projects
Several large-scale infrastructure projects are in the pipeline:
1. Highway expansions in northwestern provinces
2. Railway development projects
3. Water management and dam construction
4. Port development in southern Iran

## Challenges and Risks

### Energy Costs
Rising natural gas prices continue to pressure production costs. Cement manufacturing is energy-intensive, and energy accounts for approximately 40% of production costs.

### Transportation
Logistics costs remain a significant factor, particularly for factories serving distant markets. Investment in dedicated cement transport infrastructure could help mitigate these costs.

### Environmental Regulations
Stricter environmental standards are being implemented, requiring factories to invest in pollution control equipment and alternative fuels.

## Recommendations for Buyers

### For Large-Scale Contractors
1. **Lock in contracts early**: Negotiate long-term supply agreements with factories to secure favorable pricing
2. **Diversify suppliers**: Don't rely on a single source; maintain relationships with multiple factories
3. **Plan inventory**: Consider strategic stockpiling before projected price increases

### For Small to Medium Projects
1. **Use Peysaz's bulk ordering**: Combine orders with other buyers to access volume discounts
2. **Monitor weekly prices**: Take advantage of price dips for non-urgent purchases
3. **Consider alternatives**: Type 1 cement may offer cost savings for suitable applications

## Conclusion

The Iranian cement market in 2025 presents both opportunities and challenges. While prices are expected to rise moderately, strong demand fundamentals and ongoing infrastructure investment provide a solid foundation for the industry. Buyers who plan strategically and leverage digital platforms like Peysaz can optimize their procurement and manage costs effectively.

---

*This analysis is based on publicly available data, industry interviews, and our proprietary market models. Actual prices may vary based on market conditions.*
  `,
}

// Related posts
const relatedPosts = [
  {
    id: "cement-types-guide",
    title: "Complete Guide to Cement Types",
    image: "/placeholder.svg?height=200&width=300",
    date: "Nov 28, 2024",
  },
  {
    id: "bulk-buying-strategies",
    title: "How to Negotiate Bulk Prices",
    image: "/placeholder.svg?height=200&width=300",
    date: "Nov 22, 2024",
  },
  {
    id: "construction-industry-growth",
    title: "Iran Construction Industry Growth",
    image: "/placeholder.svg?height=200&width=300",
    date: "Nov 18, 2024",
  },
]

export default function BlogPostPage() {
  const params = useParams()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/blog" className="hover:text-foreground transition-colors flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back to Blog
              </Link>
              <span>/</span>
              <span className="text-foreground truncate">{postData.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-[21/9] lg:aspect-[3/1] bg-muted">
          <Image
            src={postData.image || "/placeholder.svg"}
            alt={postData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        {/* Article Content */}
        <article className="container mx-auto px-4 -mt-16 lg:-mt-24 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <Card className="mb-8">
              <CardContent className="p-5 lg:p-8">
                <Badge variant="secondary" className="mb-3">
                  {postData.category}
                </Badge>
                <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 text-balance">{postData.title}</h1>
                <p className="text-muted-foreground mb-4">{postData.titleFA}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {postData.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {postData.readTime}
                  </span>
                </div>

                {/* Author */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
                      <Image
                        src={postData.author.avatar || "/placeholder.svg"}
                        alt={postData.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">{postData.author.name}</div>
                      <div className="text-sm text-muted-foreground">{postData.author.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                      <Bookmark className="h-4 w-4" />
                      <span className="hidden sm:inline">Save</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                      <Share2 className="h-4 w-4" />
                      <span className="hidden sm:inline">Share</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Article Body */}
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <Card>
                  <CardContent className="p-5 lg:p-8 prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-xl prose-h2:lg:text-2xl prose-h3:text-lg prose-h3:lg:text-xl prose-p:text-sm prose-p:lg:text-base prose-li:text-sm prose-li:lg:text-base">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: postData.content.replace(/\n/g, "<br/>").replace(/##/g, "<h2>").replace(/###/g, "<h3>"),
                      }}
                    />
                  </CardContent>
                </Card>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2 mt-6">
                  <span className="text-sm text-muted-foreground">Tags:</span>
                  {postData.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Share */}
                <Card className="mt-6">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="font-semibold">Share this article</span>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                          <Facebook className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Author Bio */}
                <Card className="mt-6">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted shrink-0">
                        <Image
                          src={postData.author.avatar || "/placeholder.svg"}
                          alt={postData.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">About {postData.author.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{postData.author.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1 space-y-6">
                {/* Table of Contents */}
                <Card className="sticky top-24">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 text-sm">Table of Contents</h3>
                    <nav className="space-y-2 text-sm">
                      <a
                        href="#executive-summary"
                        className="block text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Executive Summary
                      </a>
                      <a
                        href="#current-market"
                        className="block text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Current Market Overview
                      </a>
                      <a
                        href="#price-forecast"
                        className="block text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Price Forecast for 2025
                      </a>
                      <a
                        href="#factory-expansions"
                        className="block text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Major Factory Expansions
                      </a>
                      <a
                        href="#demand-drivers"
                        className="block text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Demand Drivers
                      </a>
                      <a
                        href="#challenges"
                        className="block text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Challenges and Risks
                      </a>
                      <a
                        href="#recommendations"
                        className="block text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Recommendations
                      </a>
                    </nav>
                  </CardContent>
                </Card>

                {/* CTA */}
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-4">
                    <TrendingUp className="h-8 w-8 mb-2" />
                    <h3 className="font-semibold mb-2">Track Cement Prices</h3>
                    <p className="text-sm text-primary-foreground/80 mb-3">
                      Get real-time price updates from all major factories
                    </p>
                    <Button variant="secondary" asChild className="w-full">
                      <Link href="/cement-prices">View Prices</Link>
                    </Button>
                  </CardContent>
                </Card>
              </aside>
            </div>

            {/* Related Posts */}
            <section className="mt-12 mb-8">
              <h2 className="text-xl lg:text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid sm:grid-cols-3 gap-4 lg:gap-6">
                {relatedPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`} className="group block">
                    <Card className="h-full overflow-hidden hover:border-primary/50 transition-colors">
                      <div className="relative aspect-video bg-muted overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-sm lg:text-base group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-2">{post.date}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
