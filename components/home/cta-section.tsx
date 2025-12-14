import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building2, Users, TrendingUp, ArrowRight } from "lucide-react"

const stats = [
  { value: "500+", label: "Verified Suppliers", icon: Building2 },
  { value: "50K+", label: "Happy Customers", icon: Users },
  { value: "2M+", label: "Tons Delivered", icon: TrendingUp },
]

export function CTASection() {
  return (
    <section className="py-16 bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              Join Iran&apos;s Leading Construction Marketplace
            </h2>
            <p className="text-lg text-sidebar-foreground/70 mt-4 leading-relaxed">
              Whether you&apos;re a contractor looking for bulk materials or a supplier wanting to expand your reach,
              Peysaz connects you with verified partners across Iran.
            </p>
            <p className="text-sidebar-foreground/70 mt-2">به بزرگترین بازار آنلاین مصالح ساختمانی ایران بپیوندید</p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/register">
                  Start Buying
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-sidebar-foreground/30 text-sidebar-foreground hover:bg-sidebar-accent bg-transparent"
              >
                <Link href="/supplier/register">Become a Supplier</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-xl bg-sidebar-accent">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-accent" />
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-sidebar-foreground/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
