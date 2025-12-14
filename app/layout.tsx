import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { I18nProvider } from "@/lib/i18n/context"
import { CompareProvider } from "@/lib/compare-context"
import { CartProvider } from "@/lib/cart-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Peysaz | زیرساخت هوشمند تأمین مصالح ساختمانی",
  description:
    "Peysaz - Smart Infrastructure for Construction Supply. B2B/B2C marketplace for cement, construction materials, tools, and safety gear in Iran.",
  keywords: [
    "construction materials",
    "cement",
    "tools",
    "safety gear",
    "B2B",
    "marketplace",
    "Iran",
    "مصالح ساختمانی",
    "سیمان",
  ],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <I18nProvider>
          <CartProvider>
            <CompareProvider>{children}</CompareProvider>
          </CartProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
