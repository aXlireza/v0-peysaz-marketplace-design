import { Check, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PricingTier {
  minQty: number
  maxQty?: number
  price: number
  savings?: number
}

interface PricingTiersProps {
  tiers: PricingTier[]
  unit: string
}

export function PricingTiers({ tiers, unit }: PricingTiersProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-accent" />
          Bulk Pricing Tiers
          <Badge variant="secondary" className="ml-auto">
            قیمت عمده
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                index === 0 ? "bg-muted border-border" : "border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-accent" />
                <span className="text-sm">
                  {tier.maxQty ? `${tier.minQty} - ${tier.maxQty} ${unit}` : `${tier.minQty}+ ${unit}`}
                </span>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  {tier.price.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">تومان</span>
                </div>
                {tier.savings && <div className="text-xs text-accent">Save {tier.savings}%</div>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
