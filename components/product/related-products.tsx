import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Product {
  id: string
  name: string
  nameFA: string
  image: string
  price: number
  rating: number
  reviews: number
}

interface RelatedProductsProps {
  title: string
  titleFA?: string
  products: Product[]
}

export function RelatedProducts({ title, titleFA, products }: RelatedProductsProps) {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          {titleFA && <p className="text-sm text-muted-foreground">{titleFA}</p>}
        </div>
        <Link href="/products" className="text-primary hover:underline text-sm">
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
            <Link href={`/product/${product.id}`}>
              <div className="relative aspect-square bg-muted overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            <CardContent className="p-3">
              <Link href={`/product/${product.id}`}>
                <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="text-xs text-muted-foreground mt-0.5">{product.nameFA}</p>
              <div className="flex items-center gap-1 mt-2">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                <span className="text-xs">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div>
              <div className="font-semibold text-sm mt-2">
                {product.price.toLocaleString()}{" "}
                <span className="text-xs font-normal text-muted-foreground">تومان</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
