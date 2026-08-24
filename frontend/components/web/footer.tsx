import Link from "next/link"
import {
  ShoppingBag,
} from "lucide-react"

const footerLinks = {
  Shop: [
    { name: "All Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Featured Products", href: "/products?featured=true" },
  ],

  Account: [
    { name: "My Account", href: "/profile" },
    { name: "My Orders", href: "/orders" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Cart", href: "/cart" },
  ],

  Support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Shipping & Returns", href: "/shipping" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold"
            >
              <ShoppingBag className="size-5" />
              ShopHub
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Discover quality products and enjoy a simple,
              secure, and reliable shopping experience.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold">
                {title}
              </h3>

              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} ShopHub. All rights reserved.
          </p>

          <div className="flex gap-4">
            <Link href="/privacy">
              Privacy
            </Link>

            <Link href="/terms">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}