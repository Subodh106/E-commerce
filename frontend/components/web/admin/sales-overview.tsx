import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const sales = [
  { day: "Mon", value: 400 },
  { day: "Tue", value: 700 },
  { day: "Wed", value: 500 },
  { day: "Thu", value: 900 },
  { day: "Fri", value: 650 },
  { day: "Sat", value: 1100 },
  { day: "Sun", value: 850 },
];

export default function SalesOverview() {
  const max = Math.max(...sales.map((item) => item.value));

  return (
    <Card className="border-black/10 shadow-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sales Overview</CardTitle>
            <p className="mt-1 text-sm text-black/50">
              Sales performance for the last 7 days
            </p>
          </div>

          <select className="rounded-md border border-black/10 bg-white px-3 py-2 text-sm outline-none">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex h-64 items-end gap-4 border-b border-black/10 px-2 pb-0">
          {sales.map((item) => (
            <div
              key={item.day}
              className="flex flex-1 flex-col items-center justify-end gap-2"
            >
              <div
                className="w-full max-w-10 rounded-t-sm bg-black transition hover:bg-black/70"
                style={{
                  height: `${(item.value / max) * 80}%`,
                }}
              />

              <span className="pb-3 text-xs text-black/50">
                {item.day}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}