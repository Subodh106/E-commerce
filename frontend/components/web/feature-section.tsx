import {
  Headphones,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure checkout",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated support",
  },
]

export function FeaturesSection() {
  return (
    <section className="border-b bg-muted/30">
      <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="flex items-center gap-3"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background">
                  <Icon className="size-5 text-primary" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}