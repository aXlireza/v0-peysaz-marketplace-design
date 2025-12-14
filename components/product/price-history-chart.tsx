"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Minus, Calendar } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PriceHistoryChartProps {
  productName: string
  currentPrice: number
  data?: {
    date: string
    price: number
    marketAvg?: number
  }[]
}

// Default mock data for price history
const defaultPriceHistory = [
  { date: "Aug 1", price: 78000, marketAvg: 79000 },
  { date: "Aug 15", price: 79500, marketAvg: 80000 },
  { date: "Sep 1", price: 80000, marketAvg: 81000 },
  { date: "Sep 15", price: 81500, marketAvg: 82000 },
  { date: "Oct 1", price: 82000, marketAvg: 82500 },
  { date: "Oct 15", price: 83000, marketAvg: 83500 },
  { date: "Nov 1", price: 84000, marketAvg: 84000 },
  { date: "Nov 15", price: 84500, marketAvg: 84500 },
  { date: "Dec 1", price: 85000, marketAvg: 85000 },
]

export function PriceHistoryChart({ productName, currentPrice, data = defaultPriceHistory }: PriceHistoryChartProps) {
  // Calculate price changes
  const firstPrice = data[0]?.price || currentPrice
  const lastPrice = data[data.length - 1]?.price || currentPrice
  const priceChange = lastPrice - firstPrice
  const percentChange = ((priceChange / firstPrice) * 100).toFixed(1)

  const getChangeColor = () => {
    if (priceChange > 0) return "text-destructive"
    if (priceChange < 0) return "text-accent"
    return "text-muted-foreground"
  }

  const getChangeIcon = () => {
    if (priceChange > 0) return <TrendingUp className="h-4 w-4" />
    if (priceChange < 0) return <TrendingDown className="h-4 w-4" />
    return <Minus className="h-4 w-4" />
  }

  // Calculate stats
  const prices = data.map((d) => d.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base lg:text-lg">Price History</CardTitle>
            <CardDescription className="text-xs lg:text-sm">تاریخچه قیمت - Last 4 months</CardDescription>
          </div>
          <div className={`flex items-center gap-1.5 ${getChangeColor()}`}>
            {getChangeIcon()}
            <span className="font-semibold text-sm">
              {priceChange > 0 ? "+" : ""}
              {percentChange}%
            </span>
            <span className="text-xs text-muted-foreground">vs 4 months ago</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line" className="space-y-4">
          <TabsList className="grid grid-cols-2 w-full sm:w-auto sm:inline-flex">
            <TabsTrigger value="line" className="text-xs">
              Line Chart
            </TabsTrigger>
            <TabsTrigger value="area" className="text-xs">
              Area Chart
            </TabsTrigger>
          </TabsList>

          <TabsContent value="line">
            <ChartContainer
              config={{
                price: { label: "Price", color: "hsl(var(--primary))" },
                marketAvg: { label: "Market Avg", color: "hsl(var(--muted-foreground))" },
              }}
              className="h-[200px] lg:h-[250px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10 }}
                    className="text-muted-foreground"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    className="text-muted-foreground"
                    tickFormatter={(v) => `${v / 1000}K`}
                    tickLine={false}
                    axisLine={false}
                    width={40}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value: number) => [`${value.toLocaleString()} تومان`, ""]}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "hsl(var(--primary))" }}
                    activeDot={{ r: 5 }}
                    name="This Product"
                  />
                  <Line
                    type="monotone"
                    dataKey="marketAvg"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={1.5}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Market Average"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="area">
            <ChartContainer
              config={{
                price: { label: "Price", color: "hsl(var(--primary))" },
              }}
              className="h-[200px] lg:h-[250px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10 }}
                    className="text-muted-foreground"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    className="text-muted-foreground"
                    tickFormatter={(v) => `${v / 1000}K`}
                    tickLine={false}
                    axisLine={false}
                    width={40}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value: number) => [`${value.toLocaleString()} تومان`, ""]}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#priceGradient)"
                    name="Price"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>

        {/* Price Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Lowest</p>
            <p className="font-semibold text-sm text-accent">{minPrice.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Average</p>
            <p className="font-semibold text-sm">{avgPrice.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Highest</p>
            <p className="font-semibold text-sm text-destructive">{maxPrice.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Data updated weekly</span>
        </div>
      </CardContent>
    </Card>
  )
}
