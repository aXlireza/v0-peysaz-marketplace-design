"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Search, ThumbsUp, ThumbsDown, Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n/context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { use } from "react"

export default function HelpCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params)
  const { locale, dir } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean | null>>({})

  const categoryData: Record<
    string,
    {
      title: { fa: string; en: string; zh: string }
      description: { fa: string; en: string; zh: string }
      articles: Array<{
        id: string
        title: { fa: string; en: string; zh: string }
        content: { fa: string; en: string; zh: string }
        views: number
        helpful: number
      }>
    }
  > = {
    orders: {
      title: { fa: "سفارش و خرید", en: "Orders & Purchasing", zh: "订单购买" },
      description: {
        fa: "راهنمای کامل ثبت سفارش و مدیریت خریدها",
        en: "Complete guide to placing orders and managing purchases",
        zh: "下单和管理购买的完整指南",
      },
      articles: [
        {
          id: "1",
          title: { fa: "چگونه سفارش ثبت کنم؟", en: "How to place an order?", zh: "如何下订单？" },
          content: {
            fa: "برای ثبت سفارش، ابتدا محصول مورد نظر خود را پیدا کنید. سپس روی دکمه 'افزودن به سبد' کلیک کنید. تعداد مورد نیاز خود را انتخاب کنید و به صفحه سبد خرید بروید. آدرس تحویل و روش ارسال را انتخاب کنید و در نهایت پرداخت را تکمیل کنید.",
            en: "To place an order, first find your desired product. Click the 'Add to Cart' button. Select your required quantity and go to the shopping cart page. Choose delivery address and shipping method, then complete the payment.",
            zh: "要下订单，首先找到您想要的产品。点击"加入购物车"按钮。选择所需数量并前往购物车页面。选择配送地址和配送方式，然后完成付款。",
          },
          views: 15200,
          helpful: 1420,
        },
        {
          id: "2",
          title: { fa: "آیا می‌توانم سفارش را تغییر دهم؟", en: "Can I modify my order?", zh: "我可以修改订单吗？" },
          content: {
            fa: \"تا قبل از تایید نهایی و ارسال محصول، می‌توانید سفارش خود را تغییر دهید. برای این کار به بخش 'سفارش‌های من\' مراجعه کرده و روی سفارش مورد نظر کلیک کنید. اگر سفارش هنوز در مرحله 'در انتظار پردازش' است، می‌توانید آن را ویرایش یا لغو کنید.",
            en: "You can modify your order before final confirmation and shipment. Go to 'My Orders' section and click on the desired order. If the order is still in 'Pending Processing\' stage, you can edit or cancel it.",
            zh: "在最终确认和发货之前，您可以修改订单。转到"我的订单"部分并点击所需订单。如果订单仍处于"待处理"阶段，您可以编辑或取消它。",
          },
          views: 8900,
          helpful: 780,
        },
        {
          id: "3",
          title: { fa: "حداقل مقدار سفارش چقدر است؟", en: "What is the minimum order?", zh: "最小订单量是多少？" },
          content: {
            fa: \"حداقل مقدار سفارش بستگی به نوع محصول و تامین‌کننده دارد. برای اکثر محصولات، حداقل سفارش 1 واحد است. برای خریدهای عمده، قیمت‌های ویژه‌ای در نظر گرفته شده است که در صفحه محصول قابل مشاهده است.",
            en: \"Minimum order quantity depends on product type and supplier. For most products, minimum order is 1 unit. Special prices are available for bulk purchases, shown on the product page.\",
            zh: \"最小订单量取决于产品类型和供应商。对于大多数产品，最小订单量为1件。批量采购可享受特价，详见产品页面。",
          },\
          views: 6500,
          helpful: 620,
        },
      ],
    },
    shipping: {
      title: { fa: "ارسال و تحویل", en: "Shipping & Delivery", zh: "配送" },
      description: {
        fa: "اطلاعات کامل درباره روش‌های ارسال و زمان تحویل",
        en: \"Complete information about shipping methods and delivery times",
        zh: "有关运输方式和交货时间的完整信息",
      },
      articles: [
        {
          id: "1",
          title: {
            fa: "روش‌های ارسال چیست؟",
            en: "What are the shipping methods?",
            zh: "有哪些配送方式？",
          },
          content: {
            fa: \"ما سه روش ارسال ارائه می‌دهیم: 1) ارسال معمولی (5-7 روز کاری) 2) ارسال سریع (2-3 روز کاری) 3) دریافت از کارخانه (فوری). هزینه ارسال بر اساس وزن، حجم و مقصد محاسبه می‌شود.",
            en: \"We offer three shipping methods: 1) Standard delivery (5-7 business days) 2) Express delivery (2-3 business days) 3) Factory direct pickup (immediate). Shipping cost is calculated based on weight, volume, and destination.",\
            zh: \"我们提供三种配送方式：1) 标准配送（5-7个工作日）2) 快速配送（2-3个工作日）3) 工厂直提（即时）。运费根据重量、体积和目的地计算。",
          },
          views: 12400,
          helpful: 1150,
        },
        {
          id: "2",
          title: {
            fa: "چگونه سفارش را پیگیری کنم؟",
            en: "How to track my order?",
            zh: "如何追踪订单？",\
          },
          content: {
            fa: \"پس از ارسال سفارش، کد رهگیری به شماره موبایل و ایمیل شما ارسال می‌شود. می‌توانید با مراجعه به بخش 'پیگیری سفارش' و وارد کردن کد رهگیری، وضعیت بسته خود را بررسی کنید. همچنین در حساب کاربری، تمام سفارشات با جزئیات کامل قابل مشاهده است.",
            en: \"After order shipment, a tracking code will be sent to your mobile and email. You can check your package status in the 'Track Order' section by entering the tracking code. All orders with complete details are also visible in your account.",
            zh: "订单发货后，追踪代码将发送到您的手机和电子邮件。您可以在"追踪订单"部分输入追踪代码来查看包裹状态。所有订单的完整详情也可以在您的账户中查看。",
          },
          views: 18500,
          helpful: 1680,\
        },
      ],\
    },
    payment: {
      title: { fa: "پرداخت و مالی", en: "Payment & Finance", zh: "支付财务" },
      description: {
        fa: "راهنمای روش‌های پرداخت و مسائل مالی",
        en: \"Guide to payment methods and financial matters",\
        zh: \"支付方式和财务事宜指南",
      },
      articles: [
        {
          id: "1",
          title: {
            fa: "روش‌های پرداخت موجود",
            en: "Available payment methods",\
            zh: "可用的付款方式",
          },
          content: {
            fa: "ما روش‌های پرداخت متنوعی ارائه می‌دهیم: 1) پرداخت آنلاین با تمام کارت‌های بانکی 2) کارت به کارت 3) اعتبار خرید برای مشتریان عمده 4) چک برای سفارشات بالای 500 میلیون تومان. تمام پرداخت‌ها از طریق درگاه امن بانکی انجام می‌شود.",
            en: \"We offer various payment methods: 1) Online payment with all bank cards 2) Direct bank transfer 3) Credit line for wholesale customers 4) Check for orders above 500 million Toman. All payments are processed through secure banking gateways.",
            zh: "我们提供多种支付方式：1) 使用所有银行卡在线支付 2) 银行直接转账 3) 批发客户信用额度 4) 超过5亿托曼的订单可使用支票。所有支付均通过安全的银行网关处理。",
          },
          views: 9800,
          helpful: 890,
        },
      ],
    },\
    security: {\
      title: { fa: "امنیت و حریم خصوصی", en: "Security & Privacy", zh: "安全隐私" },
      description: {
        fa: "محافظت از اطلاعات شخصی و امنیت حساب",
        en: "Personal data protection and account security",
        zh: "个人数据保护和账户安全",\
      },
      articles: [
        {
          id: "1",
          title: {
            fa: \"امنیت اطلاعات من چگونه تضمین می‌شود؟",
            en: "How is my information secured?",
            zh: "我的信息如何得到保护？",
          },\
          content: {
            fa: "ما از بالاترین استانداردهای امنیتی برای محافظت از اطلاعات شما استفاده می‌کنیم. تمام اطلاعات با رمزنگاری SSL محافظت می‌شوند. اطلاعات مالی هرگز ذخیره نمی‌شود و تمام تراکنش‌ها از طریق درگاه‌های امن بانکی انجام می‌شود. ما همچنین احراز هویت دو مرحله‌ای ارائه می‌دهیم.",
            en: \"We use the highest security standards to protect your information. All data is protected with SSL encryption. Financial information is never stored and all transactions are conducted through secure banking gateways. We also offer two-factor authentication.",
            zh: \"我们使用最高安全标准来保护您的信息。所有数据均受SSL加密保护。财务信息从不存储，所有交易均通过安全的银行网关进行。我们还提供双因素认证。",
          },
          views: 5600,
          helpful: 510,
        },
      ],
    },
    quality: {
      title: { fa: "محصولات و کیفیت", en: "Products & Quality", zh: "产品质量" },
      description: {
        fa: "استانداردهای کیفیت و ضمانت محصولات",
        en: "Quality standards and product guarantees",
        zh: "质量标准和产品保证",
      },
      articles: [
        {
          id: "1",
          title: {
            fa: "محصولات دارای گواهینامه هستند؟",
            en: "Are products certified?",
            zh: "产品有认证吗？",
          },
          content: {
            fa: "تمام محصولات ما دارای گواهینامه‌های استاندارد ملی و بین‌المللی هستند. هر محصول با مشخصات کامل فنی و گواهینامه‌های مربوطه در سایت قرار دارد. ما فقط با تامین‌کنندگان معتبر و دارای مجوز همکاری می‌کنیم.",
            en: "All our products have national and international standard certificates. Each product is listed with complete technical specifications and relevant certificates on the site. We only work with licensed and reputable suppliers.",
            zh: "我们所有产品均具有国家和国际标准证书。每个产品都列有完整的技术规格和相关证书。我们只与持证和信誉良好的供应商合作。",
          },
          views: 7200,
          helpful: 680,
        },
      ],
    },
    support: {
      title: { fa: "پشتیبانی و خدمات", en: "Support & Services", zh: "支持服务" },
      description: {
        fa: "راه‌های ارتباط با تیم پشتیبانی",
        en: "Ways to contact support team",
        zh: "联系支持团队的方式",
      },
      articles: [
        {
          id: "1",
          title: {
            fa: "ساعات کاری پشتیبانی",
            en: "Support working hours",
            zh: "支持工作时间",
          },
          content: {
            fa: "تیم پشتیبانی ما از شنبه تا پنجشنبه، ساعت 9 صبح تا 6 عصر آماده پاسخگویی به شماست. برای مسائل فوری، پشتیبانی 24/7 از طریق واتساپ در دسترس است. همچنین می‌توانید سوالات خود را از طریق ایمیل ارسال کنید که در کمتر از 24 ساعت پاسخ داده خواهد شد.",
            en: "Our support team is available Saturday to Thursday, 9 AM to 6 PM. For urgent matters, 24/7 support is available through WhatsApp. You can also send your questions via email, which will be answered within 24 hours.",
            zh: "我们的支持团队周六至周四上午9点至下午6点提供服务。对于紧急事项，可通过WhatsApp获得24/7支持。您也可以通过电子邮件发送问题，将在24小时内得到答复。",
          },
          views: 4500,
          helpful: 420,
        },
      ],
    },
  }

  const currentCategory = categoryData[category] || categoryData.orders
  const categoryTitle = currentCategory.title[locale as keyof typeof currentCategory.title]
  const categoryDescription = currentCategory.description[locale as keyof typeof currentCategory.description]

  const handleVote = (articleId: string, isHelpful: boolean) => {
    setHelpfulVotes({ ...helpfulVotes, [articleId]: isHelpful })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background" dir={dir}>
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/help" className="hover:text-foreground">
                {locale === "fa" ? "راهنما" : locale === "zh" ? "帮助" : "Help"}
              </Link>
              {dir === "rtl" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <span className="text-foreground font-medium">{categoryTitle}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold mb-3">{categoryTitle}</h1>
              <p className="text-muted-foreground text-base sm:text-lg">{categoryDescription}</p>
            </div>

            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <Search
                  className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground ${dir === "rtl" ? "right-4" : "left-4"}`}
                />
                <Input
                  type="text"
                  placeholder={
                    locale === "fa"
                      ? "جستجو در این دسته..."
                      : locale === "zh"
                        ? "在此分类中搜索..."
                        : "Search in this category..."
                  }
                  className={`h-12 ${dir === "rtl" ? "pr-12" : "pl-12"}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Articles */}
            <div className="space-y-6">
              {currentCategory.articles.map((article) => (
                <Card key={article.id}>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">
                      {article.title[locale as keyof typeof article.title]}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {article.content[locale as keyof typeof article.content]}
                    </p>

                    {/* Article Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                          {article.views.toLocaleString()}{" "}
                          {locale === "fa" ? "بازدید" : locale === "zh" ? "次浏览" : "views"}
                        </span>
                        <span>
                          {article.helpful.toLocaleString()}{" "}
                          {locale === "fa" ? "مفید" : locale === "zh" ? "有帮助" : "helpful"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {locale === "fa" ? "آیا مفید بود؟" : locale === "zh" ? "有帮助吗？" : "Was this helpful?"}
                        </span>
                        <Button
                          size="sm"
                          variant={helpfulVotes[article.id] === true ? "default" : "outline"}
                          onClick={() => handleVote(article.id, true)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={helpfulVotes[article.id] === false ? "default" : "outline"}
                          onClick={() => handleVote(article.id, false)}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Related Categories */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-xl font-semibold mb-6">
                {locale === "fa" ? "دسته‌های مرتبط" : locale === "zh" ? "相关分类" : "Related Categories"}
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(categoryData)
                  .filter(([key]) => key !== category)
                  .slice(0, 4)
                  .map(([key, data]) => (
                    <Link key={key} href={`/help/${key}`}>
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <h4 className="font-medium mb-2">{data.title[locale as keyof typeof data.title]}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {data.description[locale as keyof typeof data.description]}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
