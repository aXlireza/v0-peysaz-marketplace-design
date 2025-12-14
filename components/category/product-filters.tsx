"use client"
import { ChevronDown, X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface FilterOption {
  id: string
  label: string
  labelFA?: string
  count: number
}

interface FilterGroup {
  id: string
  name: string
  nameFA: string
  options: FilterOption[]
}

const filterGroups: FilterGroup[] = [
  {
    id: "brand",
    name: "Brand",
    nameFA: "برند",
    options: [
      { id: "tehran-cement", label: "Tehran Cement", labelFA: "سیمان تهران", count: 45 },
      { id: "abyek-cement", label: "Abyek Cement", labelFA: "سیمان آبیک", count: 38 },
      { id: "saveh-cement", label: "Saveh Cement", labelFA: "سیمان ساوه", count: 32 },
      { id: "sepahan-cement", label: "Sepahan Cement", labelFA: "سیمان سپاهان", count: 28 },
      { id: "fars-cement", label: "Fars Cement", labelFA: "سیمان فارس", count: 22 },
    ],
  },
  {
    id: "type",
    name: "Cement Type",
    nameFA: "نوع سیمان",
    options: [
      { id: "type-1", label: "Type 1 (General)", count: 35 },
      { id: "type-2", label: "Type 2 (Modified)", count: 48 },
      { id: "type-3", label: "Type 3 (High Early)", count: 18 },
      { id: "type-4", label: "Type 4 (Low Heat)", count: 12 },
      { id: "type-5", label: "Type 5 (Sulfate)", count: 24 },
      { id: "white", label: "White Cement", count: 15 },
    ],
  },
  {
    id: "delivery",
    name: "Delivery Time",
    nameFA: "زمان تحویل",
    options: [
      { id: "same-day", label: "Same Day", count: 22 },
      { id: "1-3-days", label: "1-3 Days", count: 78 },
      { id: "3-7-days", label: "3-7 Days", count: 45 },
      { id: "factory-direct", label: "Factory Direct", count: 32 },
    ],
  },
  {
    id: "rating",
    name: "Rating",
    nameFA: "امتیاز",
    options: [
      { id: "4-up", label: "4 Stars & Up", count: 89 },
      { id: "3-up", label: "3 Stars & Up", count: 112 },
      { id: "2-up", label: "2 Stars & Up", count: 128 },
    ],
  },
  {
    id: "verification",
    name: "Supplier Status",
    nameFA: "وضعیت تأمین‌کننده",
    options: [
      { id: "verified", label: "Verified Only", count: 95 },
      { id: "gold", label: "Gold Suppliers", count: 32 },
      { id: "silver", label: "Silver Suppliers", count: 45 },
    ],
  },
]

interface ProductFiltersProps {
  activeFilters: Record<string, string[]>
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void
  onClearFilters: () => void
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
}

export function ProductFilters({
  activeFilters,
  onFilterChange,
  onClearFilters,
  priceRange,
  onPriceChange,
}: ProductFiltersProps) {
  const activeCount = Object.values(activeFilters).flat().length

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeCount > 0 && (
        <div className="pb-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Active Filters ({activeCount})</span>
            <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-auto p-0 text-destructive">
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([groupId, options]) =>
              options.map((optionId) => {
                const group = filterGroups.find((g) => g.id === groupId)
                const option = group?.options.find((o) => o.id === optionId)
                return (
                  <Badge key={`${groupId}-${optionId}`} variant="secondary" className="gap-1">
                    {option?.label}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => onFilterChange(groupId, optionId, false)} />
                  </Badge>
                )
              }),
            )}
          </div>
        </div>
      )}

      {/* Price Range */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <div>
            <span className="font-medium">Price Range</span>
            <span className="text-xs text-muted-foreground block">محدوده قیمت</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceChange(value as [number, number])}
            min={0}
            max={500000}
            step={10000}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm">
            <span>{priceRange[0].toLocaleString()} تومان</span>
            <span>{priceRange[1].toLocaleString()} تومان</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Filter Groups */}
      {filterGroups.map((group) => (
        <Collapsible key={group.id} defaultOpen={group.id === "brand" || group.id === "type"}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <div>
              <span className="font-medium">{group.name}</span>
              <span className="text-xs text-muted-foreground block">{group.nameFA}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            {group.options.map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-3 py-1.5 cursor-pointer hover:text-foreground text-muted-foreground transition-colors"
              >
                <Checkbox
                  checked={activeFilters[group.id]?.includes(option.id) || false}
                  onCheckedChange={(checked) => onFilterChange(group.id, option.id, checked as boolean)}
                />
                <span className="flex-1 text-sm">{option.label}</span>
                <span className="text-xs text-muted-foreground">({option.count})</span>
              </label>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-32 bg-card rounded-xl border border-border p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </h3>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filters */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" className="gap-2 bg-transparent">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeCount > 0 && <Badge className="ml-1">{activeCount}</Badge>}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
