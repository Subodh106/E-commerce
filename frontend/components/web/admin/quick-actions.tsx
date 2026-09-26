import Link from "next/link";
import { Plus, Package, ShoppingCart } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  {
    title: "Add Product",
    description: "Create a new product",
    href: "/admin/products/create",
    icon: Plus,
  },
  {
    title: "Manage Products",
    description: "View and edit products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Manage Orders",
    description: "View customer orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
];

export default function QuickActions() {
  return (
    <Card className="border-black/10 shadow-none">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-lg border border-black/10 p-5 transition hover:border-black hover:bg-black hover:text-white"
              >
                <Icon className="h-5 w-5" />

                <h3 className="mt-4 font-semibold">
                  {action.title}
                </h3>

                <p className="mt-1 text-sm text-black/50 group-hover:text-white/60">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}