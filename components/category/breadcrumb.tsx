import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  labelFA?: string
  href?: string
}

interface CategoryBreadcrumbProps {
  items: BreadcrumbItem[]
}

export function CategoryBreadcrumb({ items }: CategoryBreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto py-4">
      <Link href="/" className="hover:text-foreground transition-colors shrink-0">
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2 shrink-0">
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
