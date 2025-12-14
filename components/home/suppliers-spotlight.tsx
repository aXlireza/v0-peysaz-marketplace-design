import Link from "next/link"
import Image from "next/image"
import { BadgeCheck, MapPin, Package, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const suppliers = [
  {
    id: "1",
    name: "Tehran Cement Factory",
    nameFA: "کارخانه سیمان تهران",
    logo: "/placeholder.svg?height=80&width=80",
    location: "Tehran",
    products: 45,
    rating: 4.9,
    verified: true,
    badge: "Gold",
  },
  {
    id: "2",
    name: "ToolMart Iran",
    nameFA: "تول‌مارت ایران",
    logo: "/placeholder.svg?height=80&width=80",
    location: "Isfahan",
    products: 320,
    rating: 4.8,
    verified: true,
    badge: "Silver",
  },
  {
    id: "3",
    name: "SafetyPro",
    nameFA: "سیفتی پرو",
    logo: "/placeholder.svg?height=80&width=80",
    location: "Tabriz",
    products: 180,
    rating: 4.7,
    verified: true,
    badge: "Bronze",
  },
  {
    id: "4",
    name: "Abyek Cement Co.",
    nameFA: "شرکت سیمان آبیک",
    logo: "/placeholder.svg?height=80&width=80",
    location: "Qazvin",
    products: 28,
    rating: 4.8,
    verified: true,
    badge: "Gold",
  },
]

const badgeColors: Record<string, string> = {
  Gold: "bg-amber-500 text-white",
  Silver: "bg-slate-400 text-white",
  Bronze: "bg-orange-600 text-white",
}

export function SuppliersSpotlight() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Top Suppliers</h2>
            <p className="text-muted-foreground mt-1">تأمین‌کنندگان برتر</p>
          </div>
          <Link href="/suppliers" className="text-primary hover:underline text-sm font-medium">
            View All Suppliers →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {suppliers.map((supplier) => (
            <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 rounded-lg bg-muted overflow-hidden shrink-0">
                    <Image
                      src={supplier.logo || "/placeholder.svg"}
                      alt={supplier.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{supplier.name}</h3>
                      {supplier.verified && <BadgeCheck className="h-4 w-4 text-accent shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{supplier.nameFA}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {supplier.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Package className="h-3.5 w-3.5" />
                    {supplier.products} products
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    <span className="font-medium">{supplier.rating}</span>
                  </div>
                  <Badge className={badgeColors[supplier.badge]}>{supplier.badge}</Badge>
                </div>

                <Button asChild variant="outline" className="w-full mt-4 bg-transparent" size="sm">
                  <Link href={`/supplier/${supplier.id}`}>View Profile</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
