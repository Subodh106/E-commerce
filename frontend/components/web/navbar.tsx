"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  ShoppingCart,
  User,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from "./ModeToggle"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger >
              <Menu className="size-5" />
          </SheetTrigger>

          <SheetContent side="left" className="w-72">
            <div className="flex h-full flex-col">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold"
              >
                <ShoppingBag className="size-5" />
                ShopHub
              </Link>

              <nav className="mt-10 flex flex-col gap-2">
                {navItems.map((item) => (
                  <SheetClose key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto space-y-2 border-t pt-6">
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  <Heart className="size-4" />
                  Wishlist
                </Link>

                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  <User className="size-4" />
                  My Account
                </Link>

                <Link
                  href="/cart"
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  <ShoppingCart className="size-4" />
                  Cart
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-lg font-bold md:text-xl"
        >
          <ShoppingBag className="size-5" />
          <span>ShopHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="hidden max-w-sm flex-1 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search products..."
              className="pl-9"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Mobile Search */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="size-5" />
          </Button>
          {/* Wishlist */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
          >
            <Link href="/wishlist">
              <Heart className="size-5" />
            </Link>
          </Button>

          {/* Profile */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
          >
            <Link href="/profile">
              <User className="size-5" />
            </Link>
          </Button>

          {/* Theme toggle */}
          <ModeToggle/>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Link href="/cart">
              <ShoppingCart className="size-5" />

              <span className="absolute right-0 top-0 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                2
              </span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      {searchOpen && (
        <div className="container border-t py-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              autoFocus
              placeholder="Search products..."
              className="pl-9"
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
              onClick={() => setSearchOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}