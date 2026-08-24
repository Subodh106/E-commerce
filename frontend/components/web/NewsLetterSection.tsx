import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="rounded-2xl border bg-muted/40 px-6 py-10 md:px-12 md:py-14">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-background shadow-sm">
              <Mail className="size-5 text-primary" />
            </div>

            <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
              Get 10% off your first order
            </h2>

            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              Subscribe to get updates on new products, exclusive offers,
              and special deals.
            </p>

            <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-11"
                required
              />

              <Button type="submit" className="h-11">
                Subscribe
              </Button>
            </form>

            <p className="mt-3 text-xs text-muted-foreground">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}