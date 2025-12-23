import { Suspense } from "react"
import OrdersContent from "./orders-content"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

function OrdersLoadingFallback() {
  return (
    <div className="max-w-6xl mx-auto">
      <Skeleton className="h-10 w-40 mb-2" />
      <Skeleton className="h-5 w-60 mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <Skeleton className="h-10 sm:col-span-2" />
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>

      <div className="space-y-4">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="grid grid-cols-5 gap-4">
                  <Skeleton className="h-20" />
                  <Skeleton className="h-20" />
                  <Skeleton className="h-20" />
                  <Skeleton className="h-20" />
                  <Skeleton className="h-20" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default function OrdersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-6 sm:py-10 px-4 sm:px-6">
        <Suspense fallback={<OrdersLoadingFallback />}>
          <OrdersContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
