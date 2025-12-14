"use client"

import { GitCompareArrows, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCompare, type CompareProduct } from "@/lib/compare-context"
import { useI18n } from "@/lib/i18n/context"
import { cn } from "@/lib/utils"

interface CompareButtonProps {
  product: CompareProduct
  variant?: "default" | "outline" | "ghost" | "icon"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function CompareButton({ product, variant = "outline", size = "sm", className }: CompareButtonProps) {
  const { t } = useI18n()
  const { addItem, removeItem, isInCompare, items, maxItems } = useCompare()

  const inCompare = isInCompare(product.id)
  const isFull = items.length >= maxItems

  const handleClick = () => {
    if (inCompare) {
      removeItem(product.id)
    } else if (!isFull) {
      addItem(product)
    }
  }

  if (variant === "icon" || size === "icon") {
    return (
      <Button
        variant={inCompare ? "default" : "outline"}
        size="icon"
        className={cn("h-9 w-9", inCompare && "bg-primary", !inCompare && "bg-transparent", className)}
        onClick={handleClick}
        disabled={!inCompare && isFull}
        title={inCompare ? t("product.remove_from_compare") : t("product.add_to_compare")}
      >
        {inCompare ? <Check className="h-4 w-4" /> : <GitCompareArrows className="h-4 w-4" />}
      </Button>
    )
  }

  return (
    <Button
      variant={inCompare ? "default" : "outline"}
      size={size}
      className={cn("gap-1.5", !inCompare && "bg-transparent", className)}
      onClick={handleClick}
      disabled={!inCompare && isFull}
    >
      {inCompare ? (
        <>
          <Check className="h-4 w-4" />
          {t("product.remove_from_compare")}
        </>
      ) : (
        <>
          <GitCompareArrows className="h-4 w-4" />
          {t("product.add_to_compare")}
        </>
      )}
    </Button>
  )
}
