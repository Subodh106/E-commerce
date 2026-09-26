import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <Card className="border-black/10 shadow-none">
      <CardContent className="flex items-start justify-between p-5">
        <div>
          <p className="text-sm text-black/50">{title}</p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            {value}
          </h2>

          <p className="mt-1 text-xs text-black/50">{description}</p>
        </div>

        <div className="rounded-md border border-black/10 p-2.5">
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}