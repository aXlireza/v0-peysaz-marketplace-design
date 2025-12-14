import Link from "next/link"
import Image from "next/image"
import { BadgeCheck, MapPin, Package, Star, MessageCircle, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SupplierCardProps {
  supplier: {
    id: string
    name: string
    nameFA: string
    logo: string
    location: string
    products: number
    rating: number
    reviews: number
    verified: boolean
    badge: string
    responseTime: string
    memberSince: string
  }
}

const badgeColors: Record<string, string> = {
  Gold: "bg-amber-500 text-white",
  Silver: "bg-slate-400 text-white",
  Bronze: "bg-orange-600 text-white",
}

export function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Supplier Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 rounded-lg bg-muted overflow-hidden shrink-0">
            <Image src={supplier.logo || "/placeholder.svg"} alt={supplier.name} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Link
                href={`/supplier/${supplier.id}`}
                className="font-semibold hover:text-primary transition-colors truncate"
              >
                {supplier.name}
              </Link>
              {supplier.verified && <BadgeCheck className="h-4 w-4 text-accent shrink-0" />}
            </div>
            <p className="text-xs text-muted-foreground">{supplier.nameFA}</p>
            <Badge className={`mt-1 ${badgeColors[supplier.badge]}`}>{supplier.badge} Supplier</Badge>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{supplier.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>{supplier.products} products</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
            <span className="font-medium">{supplier.rating}</span>
            <span className="text-muted-foreground">({supplier.reviews})</span>
          </div>
          <div className="text-muted-foreground">Member since {supplier.memberSince}</div>
        </div>

        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="text-xs text-muted-foreground">Average Response Time</div>
          <div className="font-medium text-sm">{supplier.responseTime}</div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button variant="outline" className="flex-1 gap-2 bg-transparent" size="sm">
            <MessageCircle className="h-4 w-4" />
            Message
          </Button>
          <Button variant="outline" className="flex-1 gap-2 bg-transparent" size="sm">
            <Phone className="h-4 w-4" />
            Call
          </Button>
        </div>

        <Button asChild variant="default" className="w-full mt-3" size="sm">
          <Link href={`/supplier/${supplier.id}`}>View Full Profile</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
