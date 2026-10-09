"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Trash2,
  Eye,
  Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllProducts } from "@/services/productService";
import { api } from "@/lib/api";
import { useCategories } from "@/hooks/useCategories";


interface Product {
  id: number;
  productName: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    productName: "Wireless Headphones",
    category: "Electronics",
    price: 89.99,
    stock: 24,
    imageUrl: "https://placehold.co/100x100",
  },
  {
    id: 2,
    productName: "Mechanical Keyboard",
    category: "Electronics",
    price: 129.99,
    stock: 8,
    imageUrl: "https://placehold.co/100x100",
  },
  {
    id: 3,
    productName: "Classic T-Shirt",
    category: "Clothing",
    price: 24.99,
    stock: 0,
    imageUrl: "https://placehold.co/100x100",
  },
  {
    id: 4,
    productName: "Running Shoes",
    category: "Footwear",
    price: 74.99,
    stock: 15,
    imageUrl: "https://placehold.co/100x100",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [selectedcategory, setselectedCategory] = useState("electronics");
  const {categories, fetchCategories} = useCategories();
  const[loading , setLoading] = useState<boolean>(false);

  // const categories = useMemo(() => {
  //   return [...new Set(products.map((product) => product.category))];
  // }, [products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.productName.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesCategory =
        selectedcategory=== "all" || product.category === selectedcategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedcategory]);

  const totalProducts = products.length;

  const inStock = products.filter((product) => product.stock > 10).length;

  const lowStock = products.filter(
    (product) => product.stock > 0 && product.stock <= 10
  ).length;

  const outOfStock = products.filter(
    (product) => product.stock === 0
  ).length;

  const handleDelete = (id: number) => {
    setProducts((current) =>
      current.filter((product) => product.id !== id)
    );
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) {
      return {
        label: "Out of stock",
        className:
          "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
      };
    }

    if (stock <= 10) {
      return {
        label: "Low stock",
        className:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
      };
    }

    return {
      label: "In stock",
      className:
        "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    };
  };

  useEffect(()=>{
      FetchProducts();
  
  },[search,categories])

  const FetchProducts = async()=>{
    try {
      const pathVariables ={
        search,
        categories,
      }
      const res = await getAllProducts(pathVariables);
      setProducts(res?.data?.data)
      console.log(res);
    } catch (error:any) {
        console.log(error?.response?.data)
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-950 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl space-y-6">

        {/* Header */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Products
            </h1>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Manage your products and inventory.
            </p>
          </div>

          <Button
            className="w-full bg-slate-950 text-slate-100 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-300 sm:w-auto"
          >
            <Link href="/admin/products/create">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          <StatCard
            title="Total Products"
            value={totalProducts}
          />

          <StatCard
            title="In Stock"
            value={inStock}
          />

          <StatCard
            title="Low Stock"
            value={lowStock}
          />

          <StatCard
            title="Out of Stock"
            value={outOfStock}
          />
        </section>

        {/* Filters */}
        <section className="rounded-lg border border-slate-300 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="pl-9"
              />
            </div>

            {/* Category */}
            <Select value={selectedcategory}
            onValueChange={(value) => {
              if (value !== null) setselectedCategory(value);
            }}
            >
              <SelectTrigger className="w-full sm:w-50">
                <SelectValue placeholder="Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All Categories
                </SelectItem>

                {categories.map((category) => (
                  <SelectItem key={category.Id} value={category.Id}>
                    {category.category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Products */}
        <section className="overflow-hidden rounded-lg border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900">

          {/* Desktop */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-187.5">
                <thead className="border-b border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Product
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Price
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Stock
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts.map((product) => {
                    const stock = getStockStatus(product.stock);

                    return (
                      <tr
                        key={product.id}
                        className="border-b border-slate-200 last:border-0 dark:border-slate-800"
                      >
                        {/* Product */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.imageUrl}
                              alt={product.productName}
                              className="h-12 w-12 rounded-md border border-slate-300 object-cover dark:border-slate-700"
                            />

                            <div>
                              <p className="font-medium">
                                {product.productName}
                              </p>

                              <p className="text-xs text-slate-500">
                                ID: {product.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                          {product.category}
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4 text-sm font-medium">
                          ${product.price.toFixed(2)}
                        </td>

                        {/* Stock */}
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${stock.className}`}
                          >
                            {product.stock} — {stock.label}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                            >
                              <Link href={`/products/${product.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                            >
                              <Link
                                href={`/admin/products/${product.id}/edit`}
                              >
                                <Pencil className="h-4 w-4" />
                              </Link>
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile */}
          <div className="divide-y divide-slate-200 md:hidden dark:divide-slate-800">
            {filteredProducts.map((product) => {
              const stock = getStockStatus(product.stock);

              return (
                <div
                  key={product.id}
                  className="p-4"
                >
                  <div className="flex gap-3">
                    <img
                      src={product.imageUrl}
                      alt={product.productName}
                      className="h-16 w-16 shrink-0 rounded-md border border-slate-300 object-cover dark:border-slate-700"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="truncate font-medium">
                            {product.productName}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            {product.category}
                          </p>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger >
                         
                              <MoreHorizontal className="h-4 w-4" />

                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem >
                              <Link href={`/products/${product.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem >
                              <Link
                                href={`/admin/products/${product.id}/edit`}
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() =>
                                handleDelete(product.id)
                              }
                              className="text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold">
                          ${product.price.toFixed(2)}
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${stock.className}`}
                        >
                          {product.stock} — {stock.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
              <Package className="h-10 w-10 text-slate-400" />

              <h3 className="mt-4 font-semibold">
                No products found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or category filter.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border border-slate-300 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-5">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold sm:text-3xl">
        {value}
      </p>
    </div>
  );
}