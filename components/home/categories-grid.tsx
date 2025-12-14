import Link from "next/link"
import { Building2, Wrench, HardHat, FlameKindling, Layers, Package } from "lucide-react"

const categories = [
  {
    name: "Cement",
    nameFA: "سیمان",
    description: "Type 2, Type 5, White & more",
    icon: Building2,
    href: "/category/cement",
    count: "150+ products",
    color: "bg-primary/10 text-primary",
  },
  {
    name: "Tools",
    nameFA: "ابزارآلات",
    description: "Power tools & hand tools",
    icon: Wrench,
    href: "/category/tools",
    count: "500+ products",
    color: "bg-chart-3/10 text-chart-3",
  },
  {
    name: "Safety Gear",
    nameFA: "تجهیزات ایمنی",
    description: "Helmets, vests, gloves",
    icon: HardHat,
    href: "/category/safety",
    count: "300+ products",
    color: "bg-accent/10 text-accent",
  },
  {
    name: "Firefighting",
    nameFA: "آتش‌نشانی",
    description: "Extinguishers & equipment",
    icon: FlameKindling,
    href: "/category/firefighting",
    count: "80+ products",
    color: "bg-destructive/10 text-destructive",
  },
  {
    name: "Building Materials",
    nameFA: "مصالح ساختمانی",
    description: "Bricks, steel, aggregates",
    icon: Layers,
    href: "/category/materials",
    count: "400+ products",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    name: "All Products",
    nameFA: "همه محصولات",
    description: "Browse full catalog",
    icon: Package,
    href: "/products",
    count: "2000+ products",
    color: "bg-muted text-muted-foreground",
  },
]

export function CategoriesGrid() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground mt-1">دسته‌بندی محصولات</p>
          </div>
          <Link href="/categories" className="text-primary hover:underline text-sm font-medium">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all"
            >
              <div className={`${cat.color} p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                <cat.icon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{cat.nameFA}</p>
              <p className="text-xs text-muted-foreground mt-2">{cat.count}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
