"use client"

import { useState } from "react"
import {
  Check,
  Building2,
  TrendingUp,
  Shield,
  Users,
  Package,
  Globe,
  ChevronRight,
  Upload,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useI18n } from "@/lib/i18n/context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function BecomeSupplierPage() {
  const { t, locale, dir } = useI18n()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: "",
    registrationNumber: "",
    taxNumber: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    website: "",
    productCategories: [] as string[],
    monthlyVolume: "",
    yearsInBusiness: "",
    certifications: "",
    bankName: "",
    accountNumber: "",
    iban: "",
    termsAgreed: false,
  })

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  const benefits = [
    {
      icon: TrendingUp,
      title: locale === "fa" ? "افزایش فروش" : locale === "zh" ? "增加销售" : "Increase Sales",
      description:
        locale === "fa"
          ? "دسترسی به هزاران خریدار فعال در سراسر کشور"
          : locale === "zh"
            ? "覆盖全国数千活跃买家"
            : "Access to thousands of active buyers nationwide",
    },
    {
      icon: Shield,
      title: locale === "fa" ? "امنیت مالی" : locale === "zh" ? "财务安全" : "Financial Security",
      description:
        locale === "fa"
          ? "پرداخت تضمین شده و به موقع، بدون نگرانی"
          : locale === "zh"
            ? "保证按时付款，无忧无虑"
            : "Guaranteed and timely payments, worry-free",
    },
    {
      icon: Users,
      title: locale === "fa" ? "پشتیبانی اختصاصی" : locale === "zh" ? "专属支持" : "Dedicated Support",
      description:
        locale === "fa"
          ? "تیم پشتیبانی فروشنده 24/7 در خدمت شما"
          : locale === "zh"
            ? "24/7 卖家支持团队"
            : "24/7 seller support team at your service",
    },
    {
      icon: Package,
      title: locale === "fa" ? "مدیریت آسان" : locale === "zh" ? "轻松管理" : "Easy Management",
      description:
        locale === "fa"
          ? "پنل فروشنده با امکانات کامل برای مدیریت محصولات و سفارشات"
          : locale === "zh"
            ? "功能齐全的卖家面板，管理产品和订单"
            : "Full-featured seller panel for managing products and orders",
    },
    {
      icon: Globe,
      title: locale === "fa" ? "دسترسی گسترده" : locale === "zh" ? "广泛覆盖" : "Wide Reach",
      description:
        locale === "fa"
          ? "نمایش محصولات شما در بزرگترین پلتفرم مصالح ساختمانی"
          : locale === "zh"
            ? "在最大的建材平台展示您的产品"
            : "Showcase your products on the largest construction materials platform",
    },
    {
      icon: Building2,
      title: locale === "fa" ? "اعتبارسازی" : locale === "zh" ? "建立信誉" : "Build Credibility",
      description:
        locale === "fa"
          ? "نشان تایید شده و رتبه‌بندی برای افزایش اعتماد مشتریان"
          : locale === "zh"
            ? "认证徽章和评级以增加客户信任"
            : "Verified badge and ratings to increase customer trust",
    },
  ]

  const requirements = [
    locale === "fa"
      ? "ثبت رسمی شرکت یا کسب و کار"
      : locale === "zh"
        ? "公司或企业正式注册"
        : "Official company or business registration",
    locale === "fa"
      ? "حداقل 1 سال سابقه فعالیت"
      : locale === "zh"
        ? "至少1年经营历史"
        : "Minimum 1 year of operation history",
    locale === "fa"
      ? "مجوزها و گواهینامه‌های لازم"
      : locale === "zh"
        ? "必要的许可证和证书"
        : "Necessary licenses and certificates",
    locale === "fa"
      ? "توانایی تامین محصولات به صورت منظم"
      : locale === "zh"
        ? "定期供应产品的能力"
        : "Ability to supply products regularly",
    locale === "fa"
      ? "پایبندی به استانداردهای کیفی"
      : locale === "zh"
        ? "遵守质量标准"
        : "Commitment to quality standards",
  ]

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    console.log("[v0] Supplier application submitted:", formData)
    setStep(totalSteps + 1)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background" dir={dir}>
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                {locale === "fa" ? "فرصت همکاری" : locale === "zh" ? "合作机会" : "Partnership Opportunity"}
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                {locale === "fa"
                  ? "تامین‌کننده پیساز شوید"
                  : locale === "zh"
                    ? "成为Peysaz供应商"
                    : "Become a Peysaz Supplier"}
              </h1>
              <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                {locale === "fa"
                  ? "به بزرگترین پلتفرم تامین مصالح ساختمانی ایران بپیوندید و فروش خود را چند برابر کنید"
                  : locale === "zh"
                    ? "加入伊朗最大的建材供应平台，成倍增加您的销售额"
                    : "Join Iran's largest construction materials supply platform and multiply your sales"}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" variant="secondary" className="gap-2">
                  {locale === "fa" ? "شروع ثبت نام" : locale === "zh" ? "开始注册" : "Start Registration"}
                  <ChevronRight className={`h-5 w-5 ${dir === "rtl" ? "rotate-180" : ""}`} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10"
                >
                  {locale === "fa" ? "دریافت اطلاعات بیشتر" : locale === "zh" ? "获取更多信息" : "Learn More"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {locale === "fa"
                  ? "مزایای همکاری با پیساز"
                  : locale === "zh"
                    ? "与Peysaz合作的好处"
                    : "Benefits of Partnering with Peysaz"}
              </h2>
              <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                {locale === "fa"
                  ? "با پیوستن به پیساز، از امکانات و خدمات ویژه برای رشد کسب و کار خود بهره‌مند شوید"
                  : locale === "zh"
                    ? "加入Peysaz，享受特殊功能和服务，促进业务增长"
                    : "By joining Peysaz, benefit from special features and services to grow your business"}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                      <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
                {locale === "fa" ? "شرایط عضویت" : locale === "zh" ? "会员条件" : "Membership Requirements"}
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <span className="text-base">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  {locale === "fa"
                    ? "فرم ثبت نام تامین‌کننده"
                    : locale === "zh"
                      ? "供应商注册表"
                      : "Supplier Registration Form"}
                </h2>
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  {locale === "fa"
                    ? `مرحله ${step} از ${totalSteps}`
                    : locale === "zh"
                      ? `第${step}步，共${totalSteps}步`
                      : `Step ${step} of ${totalSteps}`}
                </p>
              </div>

              {step <= totalSteps && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {step === 1 &&
                        (locale === "fa" ? "اطلاعات شرکت" : locale === "zh" ? "公司信息" : "Company Information")}
                      {step === 2 &&
                        (locale === "fa" ? "اطلاعات تماس" : locale === "zh" ? "联系信息" : "Contact Information")}
                      {step === 3 &&
                        (locale === "fa"
                          ? "اطلاعات محصول و فروش"
                          : locale === "zh"
                            ? "产品和销售信息"
                            : "Product & Sales Information")}
                      {step === 4 &&
                        (locale === "fa"
                          ? "اطلاعات مالی و تایید"
                          : locale === "zh"
                            ? "财务信息和确认"
                            : "Financial Information & Confirmation")}
                    </CardTitle>
                    <CardDescription>
                      {step === 1 &&
                        (locale === "fa"
                          ? "لطفا اطلاعات کامل شرکت خود را وارد کنید"
                          : locale === "zh"
                            ? "请输入您的完整公司信息"
                            : "Please enter your complete company information")}
                      {step === 2 &&
                        (locale === "fa"
                          ? "نحوه ارتباط با شما"
                          : locale === "zh"
                            ? "如何联系您"
                            : "How to contact you")}
                      {step === 3 &&
                        (locale === "fa"
                          ? "محصولات و حجم فروش شما"
                          : locale === "zh"
                            ? "您的产品和销售量"
                            : "Your products and sales volume")}
                      {step === 4 &&
                        (locale === "fa"
                          ? "اطلاعات حساب بانکی و تایید شرایط"
                          : locale === "zh"
                            ? "银行账户信息和确认条款"
                            : "Bank account information and terms confirmation")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Step 1: Company Information */}
                    {step === 1 && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="companyName">
                            {locale === "fa" ? "نام شرکت" : locale === "zh" ? "公司名称" : "Company Name"} *
                          </Label>
                          <Input
                            id="companyName"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            placeholder={
                              locale === "fa"
                                ? "نام رسمی شرکت"
                                : locale === "zh"
                                  ? "公司正式名称"
                                  : "Official company name"
                            }
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="registrationNumber">
                              {locale === "fa" ? "شماره ثبت" : locale === "zh" ? "注册号" : "Registration Number"} *
                            </Label>
                            <Input
                              id="registrationNumber"
                              value={formData.registrationNumber}
                              onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="taxNumber">
                              {locale === "fa"
                                ? "شناسه ملی/کد اقتصادی"
                                : locale === "zh"
                                  ? "税号/经济代码"
                                  : "Tax/Economic ID"}{" "}
                              *
                            </Label>
                            <Input
                              id="taxNumber"
                              value={formData.taxNumber}
                              onChange={(e) => setFormData({ ...formData, taxNumber: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">
                            {locale === "fa" ? "وبسایت" : locale === "zh" ? "网站" : "Website"}
                          </Label>
                          <Input
                            id="website"
                            type="url"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            placeholder="https://example.com"
                          />
                        </div>
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            {locale === "fa"
                              ? "لطفا اطمینان حاصل کنید تمام اطلاعات با مدارک رسمی شرکت مطابقت دارد"
                              : locale === "zh"
                                ? "请确保所有信息与公司官方文件一致"
                                : "Please ensure all information matches your company's official documents"}
                          </AlertDescription>
                        </Alert>
                      </>
                    )}

                    {/* Step 2: Contact Information */}
                    {step === 2 && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="contactPerson">
                            {locale === "fa"
                              ? "نام و نام خانوادگی مسئول"
                              : locale === "zh"
                                ? "负责人姓名"
                                : "Contact Person Name"}{" "}
                            *
                          </Label>
                          <Input
                            id="contactPerson"
                            value={formData.contactPerson}
                            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">
                              {locale === "fa" ? "ایمیل" : locale === "zh" ? "电子邮件" : "Email"} *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">
                              {locale === "fa" ? "شماره تماس" : locale === "zh" ? "电话号码" : "Phone Number"} *
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">
                            {locale === "fa" ? "آدرس کامل" : locale === "zh" ? "完整地址" : "Full Address"} *
                          </Label>
                          <Textarea
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            rows={3}
                          />
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">
                              {locale === "fa" ? "شهر" : locale === "zh" ? "城市" : "City"} *
                            </Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="province">
                              {locale === "fa" ? "استان" : locale === "zh" ? "省" : "Province"} *
                            </Label>
                            <Input
                              id="province"
                              value={formData.province}
                              onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="postalCode">
                              {locale === "fa" ? "کد پستی" : locale === "zh" ? "邮政编码" : "Postal Code"} *
                            </Label>
                            <Input
                              id="postalCode"
                              value={formData.postalCode}
                              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 3: Product & Sales Information */}
                    {step === 3 && (
                      <>
                        <div className="space-y-2">
                          <Label>
                            {locale === "fa" ? "دسته‌بندی محصولات" : locale === "zh" ? "产品类别" : "Product Categories"}{" "}
                            *
                          </Label>
                          <div className="grid grid-cols-2 gap-3">
                            {["Cement", "Tools", "Safety", "Materials", "Equipment", "Firefighting"].map((cat) => (
                              <div key={cat} className="flex items-center space-x-2 space-x-reverse">
                                <Checkbox id={cat} />
                                <label htmlFor={cat} className="text-sm cursor-pointer">
                                  {cat}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="monthlyVolume">
                              {locale === "fa"
                                ? "حجم فروش ماهانه (تومان)"
                                : locale === "zh"
                                  ? "月销售额（里亚尔）"
                                  : "Monthly Sales Volume (Toman)"}
                            </Label>
                            <Input
                              id="monthlyVolume"
                              type="number"
                              value={formData.monthlyVolume}
                              onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="yearsInBusiness">
                              {locale === "fa" ? "سال‌های فعالیت" : locale === "zh" ? "营业年限" : "Years in Business"} *
                            </Label>
                            <Input
                              id="yearsInBusiness"
                              type="number"
                              value={formData.yearsInBusiness}
                              onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="certifications">
                            {locale === "fa"
                              ? "گواهینامه‌ها و مجوزها"
                              : locale === "zh"
                                ? "证书和许可证"
                                : "Certifications & Licenses"}
                          </Label>
                          <Textarea
                            id="certifications"
                            value={formData.certifications}
                            onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                            placeholder={
                              locale === "fa"
                                ? "ISO, استاندارد، مجوز و..."
                                : locale === "zh"
                                  ? "ISO、标准、许可证等"
                                  : "ISO, Standards, Permits, etc."
                            }
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>
                            {locale === "fa"
                              ? "مدارک و گواهینامه‌ها"
                              : locale === "zh"
                                ? "文件和证书"
                                : "Documents & Certificates"}
                          </Label>
                          <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                            <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                            <p className="text-sm text-muted-foreground">
                              {locale === "fa"
                                ? "کلیک کنید یا فایل را بکشید"
                                : locale === "zh"
                                  ? "点击或拖动文件"
                                  : "Click or drag files here"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (حداکثر 10MB)</p>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Step 4: Financial & Confirmation */}
                    {step === 4 && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="bankName">
                            {locale === "fa" ? "نام بانک" : locale === "zh" ? "银行名称" : "Bank Name"} *
                          </Label>
                          <Input
                            id="bankName"
                            value={formData.bankName}
                            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accountNumber">
                            {locale === "fa" ? "شماره حساب" : locale === "zh" ? "账号" : "Account Number"} *
                          </Label>
                          <Input
                            id="accountNumber"
                            value={formData.accountNumber}
                            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="iban">
                            {locale === "fa" ? "شماره شبا" : locale === "zh" ? "IBAN" : "IBAN"} *
                          </Label>
                          <Input
                            id="iban"
                            value={formData.iban}
                            onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
                            placeholder="IR"
                          />
                        </div>
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            {locale === "fa"
                              ? "حساب بانکی باید به نام شرکت ثبت شده باشد"
                              : locale === "zh"
                                ? "银行账户必须以公司名义注册"
                                : "Bank account must be registered in the company's name"}
                          </AlertDescription>
                        </Alert>
                        <div className="flex items-start space-x-2 space-x-reverse pt-4">
                          <Checkbox
                            id="terms"
                            checked={formData.termsAgreed}
                            onCheckedChange={(checked) => setFormData({ ...formData, termsAgreed: checked as boolean })}
                          />
                          <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                            {locale === "fa"
                              ? "شرایط و قوانین همکاری با پیساز را خوانده‌ام و می‌پذیرم"
                              : locale === "zh"
                                ? "我已阅读并接受Peysaz的合作条款和条件"
                                : "I have read and accept Peysaz's partnership terms and conditions"}
                          </label>
                        </div>
                      </>
                    )}

                    <div className="flex gap-3 pt-6">
                      {step > 1 && (
                        <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                          {locale === "fa" ? "مرحله قبل" : locale === "zh" ? "上一步" : "Previous"}
                        </Button>
                      )}
                      {step < totalSteps ? (
                        <Button onClick={handleNext} className="flex-1">
                          {locale === "fa" ? "مرحله بعد" : locale === "zh" ? "下一步" : "Next"}
                          <ChevronRight className={`h-4 w-4 ${dir === "rtl" ? "mr-2 rotate-180" : "ml-2"}`} />
                        </Button>
                      ) : (
                        <Button onClick={handleSubmit} className="flex-1" disabled={!formData.termsAgreed}>
                          {locale === "fa" ? "ارسال درخواست" : locale === "zh" ? "提交申请" : "Submit Application"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Success State */}
              {step > totalSteps && (
                <Card className="text-center">
                  <CardContent className="pt-12 pb-12">
                    <div className="inline-flex p-4 rounded-full bg-accent/20 mb-6">
                      <Check className="h-12 w-12 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      {locale === "fa"
                        ? "درخواست شما ثبت شد!"
                        : locale === "zh"
                          ? "您的申请已提交！"
                          : "Application Submitted!"}
                    </h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      {locale === "fa"
                        ? "درخواست شما در حال بررسی است. تیم ما ظرف 48 ساعت آینده از طریق ایمیل یا تلفن با شما تماس خواهند گرفت."
                        : locale === "zh"
                          ? "您的申请正在审核中。我们的团队将在48小时内通过电子邮件或电话与您联系。"
                          : "Your application is under review. Our team will contact you via email or phone within 48 hours."}
                    </p>
                    <Button size="lg" asChild>
                      <a href="/">
                        {locale === "fa" ? "بازگشت به صفحه اصلی" : locale === "zh" ? "返回首页" : "Back to Homepage"}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
