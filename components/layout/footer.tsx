import Link from "next/link"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      {/* Newsletter */}
      <div className="border-b border-sidebar-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Subscribe to Price Updates</h3>
              <p className="text-sidebar-foreground/70 text-sm">Get weekly cement prices and exclusive deals</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 w-full md:w-64"
              />
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shrink-0">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold text-xl">
                P
              </div>
              <div>
                <div className="font-bold text-lg">Peysaz</div>
                <div className="text-xs text-sidebar-foreground/70">پیساز</div>
              </div>
            </div>
            <p className="text-sm text-sidebar-foreground/70 mb-4">زیرساخت هوشمند تأمین مصالح ساختمانی</p>
            <p className="text-sm text-sidebar-foreground/70">Smart Infrastructure for Construction Supply</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/category/cement"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  Cement
                </Link>
              </li>
              <li>
                <Link
                  href="/category/tools"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/category/safety"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  Safety Gear
                </Link>
              </li>
              <li>
                <Link
                  href="/category/materials"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  Building Materials
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/suppliers"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  Suppliers
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/help"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-sidebar-foreground/70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>۰۲۱-۰۰۰۰۰۰۰۰</span>
              </li>
              <li className="flex items-center gap-2 text-sidebar-foreground/70">
                <MessageCircle className="h-4 w-4 shrink-0" />
                <span>WhatsApp Support</span>
              </li>
              <li className="flex items-center gap-2 text-sidebar-foreground/70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@peysaz.com</span>
              </li>
              <li className="flex items-start gap-2 text-sidebar-foreground/70">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Tehran, Iran</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sidebar-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-sidebar-foreground/70">
            <p>© 2025 Peysaz. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-sidebar-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-sidebar-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
