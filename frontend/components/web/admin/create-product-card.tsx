import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@base-ui/react";
import { PackagePlus } from "lucide-react";

export default function CreateProductCard() {
  return (
    <Card
      className="
                border-slate-300
                bg-slate-100
                text-slate-950

                dark:border-slate-800
                dark:bg-slate-950
                dark:text-slate-100

                lg:col-span-2
              "
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          <div
            className="
                      flex h-10 w-10 items-center justify-center
                      rounded-lg
                      bg-slate-200
                      dark:bg-slate-800
                    "
          >
            <PackagePlus className="h-5 w-5" />
          </div>

          <div>
            <CardTitle>Product Information</CardTitle>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Enter your product details
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Product Name */}

        <div className="space-y-2">
          <label htmlFor="productName" className="text-sm font-medium">
            Product Name
          </label>

          <Input
            id="productName"
            name="productName"
            placeholder="e.g. Wireless Headphones"
            required
            className="
                      border-slate-300
                      bg-slate-100
                      text-slate-950

                      placeholder:text-slate-500

                      focus-visible:ring-slate-950

                      dark:border-slate-700
                      dark:bg-slate-950
                      dark:text-slate-100

                      dark:placeholder:text-slate-500

                      dark:focus-visible:ring-slate-100
                    "
          />
        </div>

        {/* Description */}

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>

          <Textarea
            id="description"
            name="description"
            placeholder="Write a detailed description..."
            required
            className="
                      min-h-32
                      resize-none

                      border-slate-300
                      bg-slate-100
                      text-slate-950

                      placeholder:text-slate-500

                      focus-visible:ring-slate-950

                      dark:border-slate-700
                      dark:bg-slate-950
                      dark:text-slate-100

                      dark:placeholder:text-slate-500

                      dark:focus-visible:ring-slate-100
                    "
          />
        </div>

        {/* Price + Stock */}

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Price
            </label>

            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              required
              className="
                        border-slate-300
                        bg-slate-100
                        text-slate-950

                        placeholder:text-slate-500

                        focus-visible:ring-slate-950

                        dark:border-slate-700
                        dark:bg-slate-950
                        dark:text-slate-100

                        dark:placeholder:text-slate-500

                        dark:focus-visible:ring-slate-100
                      "
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="stock" className="text-sm font-medium">
              Stock
            </label>

            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              placeholder="0"
              required
              className="
                        border-slate-300
                        bg-slate-100
                        text-slate-950

                        placeholder:text-slate-500

                        focus-visible:ring-slate-950

                        dark:border-slate-700
                        dark:bg-slate-950
                        dark:text-slate-100

                        dark:placeholder:text-slate-500

                        dark:focus-visible:ring-slate-100
                      "
            />
          </div>
        </div>

        {/* Category */}

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            Category
          </label>

          <select
            id="category"
            name="category"
            required
            className="
                      h-10
                      w-full
                      rounded-md
                      border
                      border-slate-300
                      bg-slate-100
                      px-3
                      text-sm
                      text-slate-950
                      outline-none

                      focus:ring-2
                      focus:ring-slate-950

                      dark:border-slate-700
                      dark:bg-slate-950
                      dark:text-slate-100

                      dark:focus:ring-slate-100
                    "
          >
            <option value="">Select category</option>

            <option value="electronics">Electronics</option>

            <option value="clothing">Clothing</option>

            <option value="footwear">Footwear</option>

            <option value="bags">Bags</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
}
