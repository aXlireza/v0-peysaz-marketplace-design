"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  MessageCircle,
  Book,
  Package,
  CreditCard,
  Truck,
  Shield,
  ChevronRight,
  Phone,
  Mail,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useI18n } from "@/lib/i18n/context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function HelpPage() {
  const { t, locale, dir } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")

  const helpCategories = [
    {
      icon: Package,
      title: locale === "fa" ? "سفارش و خرید" : locale === "zh" ? "订单购买" : "Orders & Purchasing",
      description:
        locale === "fa"
          ? "راهنمای ثبت سفارش و خرید محصولات"
          : locale === "zh"
            ? "订单和产品购买指南"
            : "Guide to placing orders and buying products",
      articles: 12,
      href: "/help/orders",
    },
    {
      icon: Truck,
      title: locale === "fa" ? "ارسال و تحویل" : locale === "zh" ? "配送" : "Shipping & Delivery",
      description:
        locale === "fa"
          ? "اطلاعات روش‌های ارسال و زمان تحویل"
          : locale === "zh"
            ? "运输方式和交货时间"
            : "Shipping methods and delivery times",
      articles: 8,
      href: "/help/shipping",
    },
    {
      icon: CreditCard,
      title: locale === "fa" ? "پرداخت و مالی" : locale === "zh" ? "支付财务" : "Payment & Finance",
      description:
        locale === "fa"
          ? "روش‌های پرداخت و اعتبار خرید"
          : locale === "zh"
            ? "支付方式和信用额度"
            : "Payment methods and credit lines",
      articles: 10,
      href: "/help/payment",
    },
    {
      icon: Shield,
      title: locale === "fa" ? "امنیت و حریم خصوصی" : locale === "zh" ? "安全隐私" : "Security & Privacy",
      description:
        locale === "fa"
          ? "محافظت از اطلاعات و امنیت حساب"
          : locale === "zh"
            ? "信息保护和账户安全"
            : "Data protection and account security",
      articles: 6,
      href: "/help/security",
    },
    {
      icon: Book,
      title: locale === "fa" ? "محصولات و کیفیت" : locale === "zh" ? "产品质量" : "Products & Quality",
      description:
        locale === "fa"
          ? "استاندارد کیفیت و ضمانت محصولات"
          : locale === "zh"
            ? "质量标准和产品保证"
            : "Quality standards and product guarantees",
      articles: 15,
      href: "/help/quality",
    },
    {
      icon: MessageCircle,
      title: locale === "fa" ? "پشتیبانی و خدمات" : locale === "zh" ? "支持服务" : "Support & Services",
      description:
        locale === "fa" ? "راه‌های ارتباط با تیم پشتیبانی" : locale === "zh" ? "联系支持团队" : "Contact support team",
      articles: 9,
      href: "/help/support",
    },
  ]

  const popularQuestions = [
    {
      question:
        locale === "fa" ? "چگونه سفارش ثبت کنم؟" : locale === "zh" ? "如何下订单？" : "How do I place an order?",
      answer:
        locale === "fa"
          ? "برای ثبت سفارش، محصول مورد نظر را انتخاب کرده، تعداد را مشخص کنید و روی دکمه افزودن به سبد کلیک کنید. سپس از صفحه سبد خرید، روند خرید را تکمیل کنید."
          : locale === "zh"
            ? "要下订单，请选择所需产品，指定数量，然后点击添加到购物车。然后从购物车页面完成购买流程。"
            : "To place an order, select your desired product, specify the quantity, and click Add to Cart. Then complete the checkout process from your cart page.",
    },
    {
      question:
        locale === "fa" ? "هزینه ارسال چقدر است؟" : locale === "zh" ? "运费是多少？" : "What are the shipping costs?",
      answer:
        locale === "fa"
          ? "هزینه ارسال بستگی به وزن، حجم و مقصد محصول دارد. برای سفارشات بالای 50 میلیون تومان، ارسال رایگان است. هزینه دقیق در مرحله تکمیل خرید نمایش داده می‌شود."
          : locale === "zh"
            ? "运费取决于产品的重量、体积和目的地。超过5000万里亚尔的订单免运费。确切费用将在结账时显示。"
            : "Shipping costs depend on the weight, volume, and destination of the product. For orders above 50 million Toman, shipping is free. Exact costs are shown during checkout.",
    },
    {
      question:
        locale === "fa"
          ? "چگونه می‌توانم سفارش را پیگیری کنم؟"
          : locale === "zh"
            ? "如何追踪订单？"
            : "How can I track my order?",
      answer:
        locale === "fa"
          ? "پس از ثبت سفارش، یک کد پیگیری به شماره موبایل و ایمیل شما ارسال می‌شود. می‌توانید با ورود به حساب کاربری خود، وضعیت سفارش را مشاهده کنید."
          : locale === "zh"
            ? "下单后，追踪代码将发送到您的手机和电子邮件。您可以登录您的账户查看订单状态。"
            : "After placing an order, a tracking code will be sent to your mobile number and email. You can view order status by logging into your account.",
    },
    {
      question:
        locale === "fa"
          ? "آیا امکان بازگشت کالا وجود دارد؟"
          : locale === "zh"
            ? "可以退货吗？"
            : "Can I return products?",
      answer:
        locale === "fa"
          ? "بله، محصولات غیر مصرفی در صورت نقص یا عدم تطابق با سفارش، تا 7 روز پس از تحویل قابل بازگشت هستند. شرایط و جزئیات در صفحه شرایط و قوانین موجود است."
          : locale === "zh"
            ? "是的，未使用的产品如有缺陷或与订单不符，可在交货后7天内退货。详细条款和条件请查看条款页面。"
            : "Yes, unused products can be returned within 7 days of delivery if defective or don't match the order. Terms and conditions are available on our policies page.",
    },
    {
      question:
        locale === "fa"
          ? "روش‌های پرداخت چیست؟"
          : locale === "zh"
            ? "有哪些付款方式？"
            : "What are the payment methods?",
      answer:
        locale === "fa"
          ? "پرداخت از طریق کارت به کارت، پرداخت آنلاین، و برای مشتریان عمده، امکان استفاده از اعتبار خرید وجود دارد. همچنین پرداخت در محل برای سفارشات خاص امکان‌پذیر است."
          : locale === "zh"
            ? "可通过银行转账、在线支付付款，批量客户可使用信用额度。特殊订单也可货到付款。"
            : "Payment via bank transfer, online payment, and for wholesale customers, credit line is available. Cash on delivery is also possible for specific orders.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background" dir={dir}>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-background py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {locale === "fa"
                  ? "چطور می‌توانیم کمک کنیم؟"
                  : locale === "zh"
                    ? "我们如何帮助您？"
                    : "How Can We Help You?"}
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg mb-8">
                {locale === "fa"
                  ? "راهنما و پاسخ سوالات متداول"
                  : locale === "zh"
                    ? "指南和常见问题解答"
                    : "Guides and frequently asked questions"}
              </p>

              {/* Search Bar */}
              <div className="relative">
                <Search
                  className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground ${dir === "rtl" ? "right-4" : "left-4"}`}
                />
                <Input
                  type="text"
                  placeholder={
                    locale === "fa"
                      ? "سوال خود را جستجو کنید..."
                      : locale === "zh"
                        ? "搜索您的问题..."
                        : "Search your question..."
                  }
                  className={`h-14 text-base ${dir === "rtl" ? "pr-12" : "pl-12"}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
              {locale === "fa" ? "دسته‌بندی راهنما" : locale === "zh" ? "帮助分类" : "Help Categories"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {helpCategories.map((category, index) => {
                const Icon = category.icon
                return (
                  <Link key={index} href={category.href}>
                    <Card className="h-full hover:shadow-lg transition-shadow group">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                              {category.title}
                            </CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              {category.articles} {locale === "fa" ? "مقاله" : locale === "zh" ? "文章" : "articles"}
                            </Badge>
                          </div>
                          <ChevronRight
                            className={`h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors ${dir === "rtl" ? "rotate-180" : ""}`}
                          />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm">{category.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Popular Questions */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
              {locale === "fa" ? "سوالات متداول" : locale === "zh" ? "常见问题" : "Frequently Asked Questions"}
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {popularQuestions.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-background rounded-lg px-4 sm:px-6 border"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium text-sm sm:text-base">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm sm:text-base pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="text-center mt-8">
                <Link href="/faq">
                  <Button variant="outline" size="lg">
                    {locale === "fa" ? "مشاهده همه سوالات" : locale === "zh" ? "查看所有问题" : "View All Questions"}
                    <ChevronRight className={`h-4 w-4 ${dir === "rtl" ? "mr-2 rotate-180" : "ml-2"}`} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  {locale === "fa" ? "هنوز سوالی دارید؟" : locale === "zh" ? "还有问题？" : "Still Have Questions?"}
                </h2>
                <p className="text-muted-foreground text-base">
                  {locale === "fa"
                    ? "تیم پشتیبانی ما آماده کمک به شماست"
                    : locale === "zh"
                      ? "我们的支持团队随时为您提供帮助"
                      : "Our support team is ready to help you"}
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">
                      {locale === "fa" ? "تماس تلفنی" : locale === "zh" ? "电话" : "Phone Call"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">021-1234-5678</p>
                    <p className="text-xs text-muted-foreground">
                      {locale === "fa" ? "شنبه تا پنجشنبه" : locale === "zh" ? "周六至周四" : "Sat - Thu"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">
                      {locale === "fa" ? "ایمیل" : locale === "zh" ? "电子邮件" : "Email"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">support@peysaz.com</p>
                    <p className="text-xs text-muted-foreground">
                      {locale === "fa" ? "پاسخ در 24 ساعت" : locale === "zh" ? "24小时回复" : "Response in 24h"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">
                      {locale === "fa" ? "چت آنلاین" : locale === "zh" ? "在线聊天" : "Live Chat"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {locale === "fa" ? "پشتیبانی آنی" : locale === "zh" ? "即时支持" : "Instant Support"}
                    </p>
                    <Button size="sm" className="mt-1">
                      {locale === "fa" ? "شروع چت" : locale === "zh" ? "开始聊天" : "Start Chat"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
