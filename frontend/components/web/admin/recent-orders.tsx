import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const orders = [
  {
    id: "#ORD-1001",
    customer: "John Doe",
    amount: "Rs. 2,400",
    status: "Processing",
  },
  {
    id: "#ORD-1002",
    customer: "Alex Smith",
    amount: "Rs. 1,200",
    status: "Shipped",
  },
  {
    id: "#ORD-1003",
    customer: "Sam Wilson",
    amount: "Rs. 4,500",
    status: "Delivered",
  },
  {
    id: "#ORD-1004",
    customer: "David Lee",
    amount: "Rs. 800",
    status: "Pending",
  },
];

export default function RecentOrders() {
  return (
    <Card className="border-black/10 shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>

          <a
            href="/admin/orders"
            className="text-xs font-medium underline underline-offset-4"
          >
            View all
          </a>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between border-b border-black/5 pb-4 last:border-0"
          >
            <div>
              <p className="text-sm font-medium">{order.id}</p>
              <p className="text-xs text-black/50">{order.customer}</p>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium">{order.amount}</p>

              <span className="text-xs text-black/50">
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}