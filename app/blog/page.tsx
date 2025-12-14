"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Clock, User, TrendingUp, BookOpen, ArrowRight } from "lucide-react"

// Blog categories
const categories = [
  { id: "all", name: "All Posts", nameFA: "همه مقالات", count: 48 },
  { id: "market", name: "Market News", nameFA: "اخبار بازار", count: 15 },
  { id: "guides", name: "Buying Guides", nameFA: "راهنمای خرید", count: 12 },
  { id: "technical", name: "Technical", nameFA: "فنی", count: 10 },
  { id: "industry", name: "Industry Trends", nameFA: "روند صنعت", count: 8 },
  { id: "safety", name: "Safety Tips", nameFA: "نکات ایمنی", count: 3 },
]

// Featured post
const featuredPost = {
  id: "cement-market-2024",
  title: "Iran Cement Market Outlook 2025: Price Forecasts & Trends",
  titleFA: "چشم‌انداز بازار سیمان ایران ۱۴۰۴",
  excerpt:
    "Comprehensive analysis of Iran's cement industry, including price predictions, demand forecasts, major factory expansions, and expert insights on what to expect in the coming year.",
  image: "/placeholder.svg?height=500&width=900",
  category: "Market News",
  categoryId: "market",
  author: "Dr. Mohammad Ahmadi",
  authorRole: "Industry Analyst",
  date: "Dec 1, 2024",
  readTime: "12 min read",
  tags: ["Cement", "Market Analysis", "2025 Forecast"],
}

// Blog posts
const blogPosts = [
  {
    id: "cement-types-guide",
    title: "Complete Guide to Cement Types: Which One for Your Project?",
    titleFA: "راهنمای جامع انواع سیمان",
    excerpt:
      "Understanding the differences between Type 1, 2, 3, and 5 cement and choosing the right one for your construction needs.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Buying Guides",
    categoryId: "guides",
    author: "Ali Rezaei",
    date: "Nov 28, 2024",
    readTime: "8 min read",
  },
  {
    id: "safety-equipment-checklist",
    title: "Essential Safety Equipment Checklist for Construction Sites",
    titleFA: "چک‌لیست تجهیزات ایمنی کارگاه",
    excerpt: "A comprehensive checklist of mandatory safety gear and equipment for every construction project in Iran.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Safety Tips",
    categoryId: "safety",
    author: "Hassan Mohammadi",
    date: "Nov 25, 2024",
    readTime: "6 min read",
  },
  {
    id: "bulk-buying-strategies",
    title: "How to Negotiate Bulk Prices: Pro Tips for Contractors",
    titleFA: "استراتژی‌های خرید عمده",
    excerpt: "Learn the best practices for negotiating volume discounts with cement factories and suppliers.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Buying Guides",
    categoryId: "guides",
    author: "Reza Karimi",
    date: "Nov 22, 2024",
    readTime: "7 min read",
  },
  {
    id: "cement-storage-tips",
    title: "Proper Cement Storage: Avoiding Waste and Maintaining Quality",
    titleFA: "نگهداری صحیح سیمان",
    excerpt: "Expert tips on storing cement properly to prevent moisture damage and extend shelf life.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Technical",
    categoryId: "technical",
    author: "Eng. Sara Hosseini",
    date: "Nov 20, 2024",
    readTime: "5 min read",
  },
  {
    id: "construction-industry-growth",
    title: "Iran Construction Industry Growth: Opportunities in 2025",
    titleFA: "رشد صنعت ساختمان ایران",
    excerpt: "Analysis of construction sector growth drivers, government initiatives, and investment opportunities.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Industry Trends",
    categoryId: "industry",
    author: "Dr. Mohammad Ahmadi",
    date: "Nov 18, 2024",
    readTime: "10 min read",
  },
  {
    id: "power-tools-maintenance",
    title: "Power Tool Maintenance: Extend the Life of Your Equipment",
    titleFA: "نگهداری ابزار برقی",
    excerpt: "Regular maintenance routines to keep your power tools running efficiently and safely.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Technical",
    categoryId: "technical",
    author: "Mehdi Nazari",
    date: "Nov 15, 2024",
    readTime: "6 min read",
  },
  {
    id: "cement-price-weekly",
    title: "Weekly Cement Price Update: Week 35",
    titleFA: "به‌روزرسانی هفتگی قیمت سیمان",
    excerpt: "This week's cement prices across major Iranian factories with analysis of market movements.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Market News",
    categoryId: "market",
    author: "Peysaz Team",
    date: "Nov 12, 2024",
    readTime: "4 min read",
  },
  {
    id: "fire-extinguisher-guide",
    title: "Fire Extinguisher Types: A Complete Selection Guide",
    titleFA: "راهنمای انتخاب کپسول آتش‌نشانی",
    excerpt: "Understanding different fire extinguisher classes and choosing the right one for your needs.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Safety Tips",
    categoryId: "safety",
    author: "Capt. Ahmad Farahani",
    date: "Nov 10, 2024",
    readTime: "7 min read",
  },
]

// Trending topics
const trendingTopics = [
  { title: "Cement Price Forecast 2025", posts: 8 },
  { title: "Construction Safety Standards", posts: 5 },
  { title: "Bulk Buying Tips", posts: 4 },
  { title: "Tehran Cement Factory", posts: 4 },
  { title: "New Building Materials", posts: 3 },
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || post.categoryId === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-8 lg:py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Peysaz Blog</span>
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold text-balance">Construction Industry Insights</h1>
            <p className="text-muted-foreground mt-2 text-sm lg:text-base max-w-2xl">
              بینش‌های صنعت ساختمان - Expert guides, market news, and tips for construction professionals
            </p>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-6 lg:py-10 border-b border-border">
          <div className="container mx-auto px-4">
            <Link href={`/blog/${featuredPost.id}`} className="group block">
              <Card className="overflow-hidden hover:border-primary/50 transition-colors">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative aspect-video lg:aspect-auto lg:min-h-[350px] bg-muted overflow-hidden">
                    <Image
                      src={featuredPost.image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">Featured</Badge>
                  </div>
                  <CardContent className="p-5 lg:p-8 flex flex-col justify-center">
                    <Badge variant="secondary" className="w-fit mb-3">
                      {featuredPost.category}
                    </Badge>
                    <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-2 group-hover:text-primary transition-colors text-balance">
                      {featuredPost.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-2">{featuredPost.titleFA}</p>
                    <p className="text-muted-foreground text-sm lg:text-base mb-4 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-xs lg:text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {featuredPost.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-6 lg:py-10">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Sidebar */}
              <aside className="lg:col-span-1 space-y-6 order-last lg:order-first">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Categories */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3">Categories</h3>
                    <div className="space-y-1">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeCategory === cat.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                          }`}
                        >
                          <span>{cat.name}</span>
                          <Badge variant={activeCategory === cat.id ? "secondary" : "outline"} className="text-xs">
                            {cat.count}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Trending Topics */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold">Trending Topics</h3>
                    </div>
                    <div className="space-y-2">
                      {trendingTopics.map((topic, idx) => (
                        <Link
                          key={idx}
                          href={`/blog?search=${encodeURIComponent(topic.title)}`}
                          className="flex items-center justify-between text-sm hover:text-primary transition-colors py-1"
                        >
                          <span className="truncate">{topic.title}</span>
                          <span className="text-xs text-muted-foreground">{topic.posts} posts</span>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter CTA */}
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Subscribe to Newsletter</h3>
                    <p className="text-sm text-primary-foreground/80 mb-3">
                      Get weekly market updates and industry news
                    </p>
                    <Input
                      placeholder="Your email"
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 mb-2"
                    />
                    <Button variant="secondary" className="w-full">
                      Subscribe
                    </Button>
                  </CardContent>
                </Card>
              </aside>

              {/* Posts Grid */}
              <div className="lg:col-span-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h2 className="text-lg lg:text-xl font-bold">
                    {activeCategory === "all"
                      ? "Latest Articles"
                      : categories.find((c) => c.id === activeCategory)?.name}
                  </h2>
                  <span className="text-sm text-muted-foreground">{filteredPosts.length} articles found</span>
                </div>

                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">No articles found</h3>
                    <p className="text-muted-foreground text-sm">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                    {filteredPosts.map((post) => (
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
                            <Badge variant="secondary" className="mb-2 text-xs">
                              {post.category}
                            </Badge>
                            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2 text-sm lg:text-base">
                              {post.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mb-2">{post.titleFA}</p>
                            <p className="text-muted-foreground text-xs lg:text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {post.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.readTime}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Load More */}
                {filteredPosts.length > 0 && (
                  <div className="text-center mt-8">
                    <Button variant="outline" className="gap-2 bg-transparent">
                      Load More Articles
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
