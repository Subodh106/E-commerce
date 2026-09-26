import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import StatCard from "@/components/web/admin/stat-card";
import SalesOverview from "@/components/web/admin/sales-overview";
import RecentOrders from "@/components/web/admin/recent-orders";
import QuickActions from "@/components/web/admin/quick-actions";
export default function AdminDashboard() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-black/50">
          Manage your store and monitor your ecommerce activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Products"
          value="48"
          description="Products in your store"
          icon={Package}
        />

        <StatCard
          title="Total Orders"
          value="124"
          description="Orders received"
          icon={ShoppingCart}
        />

        <StatCard
          title="Total Revenue"
          value="Rs. 12,430"
          description="Revenue this month"
          icon={DollarSign}
        />

        <StatCard
          title="Users"
          value="892"
          description="Registered customers"
          icon={Users}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesOverview />
        </div>

        <RecentOrders />
      </div>

      <QuickActions />

    </div>
  );
}