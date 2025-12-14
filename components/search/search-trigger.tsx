"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AdvancedSearch } from "./advanced-search"
import { useI18n } from "@/lib/i18n/context"

interface SearchTriggerProps {
  variant?: "button" | "input"
  className?: string
}

export function SearchTrigger({ variant = "input", className }: SearchTriggerProps) {
  const [isIslandOpen, setIsIslandOpen] = useState(false)
  const { locale } = useI18n()

  if (variant === "button") {
    return (
      <>
        <Button variant="ghost" size="icon" onClick={() => setIsIslandOpen(true)} className={className}>
          <Search className="h-5 w-5" />
        </Button>
        {isIslandOpen && <AdvancedSearch variant="island" onClose={() => setIsIslandOpen(false)} />}
      </>
    )
  }

  return (
    <>
      <button
        onClick={() => setIsIslandOpen(true)}
        className={cn(
          "flex items-center gap-2 w-full h-9 sm:h-11 px-3 sm:px-4 bg-muted/50 border border-border rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors",
          className,
        )}
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left truncate">
          {locale === "fa" ? "جستجوی محصولات..." : locale === "zh" ? "搜索产品..." : "Search products..."}
        </span>
        <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 bg-background rounded text-xs">
          <kbd className="font-mono">⌘</kbd>
          <kbd className="font-mono">K</kbd>
        </div>
      </button>
      {isIslandOpen && <AdvancedSearch variant="island" onClose={() => setIsIslandOpen(false)} />}
    </>
  )
}
