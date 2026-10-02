"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FolderPlus,
  Search,
  Pencil,
  Trash2,
  Package,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateCategory from "@/components/web/admin/create-category-section";

import { create_Category, getAllCateogry } from "@/services/categoryService";
import { toast } from "sonner";
import { ProductType } from "@/Types/HomeTypes";

export interface Category {
  id: number;
  name: string;
  products: ProductType[];
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");

  const filteredCategories = useMemo(() => {
    if (!categories) return [];
    return categories.filter((category) =>
      category?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  const getCategory = async () => {
    try {
      const res = await getAllCateogry();
      if (res?.status === 200) {
        setCategories(res?.data?.data || []);
      }
    } catch (error: any) {
      console.error(error?.response?.data?.message || "Failed to fetch categories");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const openCreateDialog = () => {
    setEditingCategory(null);
    setCategoryName("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setCategoryName(category.name);
    setIsDialogOpen(true);
  };

  const deleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  console.log(categories)
  console.log("filter  categories")
  console.log(filteredCategories)

  const createCategory = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const res = await create_Category({ category: categoryName });
      toast.success(res?.data?.message || "Category created successfully");
      setIsDialogOpen(false);
      setCategoryName("");
      getCategory(); 
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create category");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-3 py-5 text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">Categories</h1>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
              Create and manage your product categories
            </p>
          </div>

          <Button
            onClick={openCreateDialog}
            className="w-full bg-slate-950 text-slate-100 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-300 sm:w-auto"
          >
            <FolderPlus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>

        {/* SEARCH */}
        <Card className="mb-5 border-slate-300 bg-slate-100 text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search categories..."
                className="pl-9 border-slate-300 bg-slate-100 text-slate-950 placeholder:text-slate-500 focus-visible:ring-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:ring-slate-100"
              />
            </div>
          </CardContent>
        </Card>

        {/* DESKTOP TABLE */}
        <Card className="hidden border-slate-300 bg-slate-100 text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 md:block">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Categories</CardTitle>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {categories.length} categories found
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-300 text-left dark:border-slate-800">
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Products</th>
                    <th className="px-4 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((category,index) => (
                    <tr
                      key={index + 1}
                      className="border-b border-slate-200 hover:bg-slate-200 dark:border-slate-800 dark:hover:bg-slate-800"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800">
                            <Package className="h-4 w-4" />
                          </div>
                          <span className="font-medium">afdsf</span>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="inline-flex rounded-md bg-slate-200 px-2 py-1 text-xs font-medium dark:bg-slate-800">
                          {category.products?.length} products
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => openEditDialog(category)}
                            className="border-slate-300 bg-slate-100 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-800"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => deleteCategory(category.id)}
                            className="border-slate-300 bg-slate-100 text-slate-950 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredCategories.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-sm text-slate-500">No categories found.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* MOBILE CARDS */}
        <div className="space-y-3 md:hidden">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">All Categories</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {categories.length} categories found
              </p>
            </div>
          </div>

          {categories.map((category,index) => (
            <Card
              key={index + 1}
              className="border-slate-300 bg-slate-100 text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800">
                      <Package className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold">{category.name}</h3>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger >
                      <MoreHorizontal className="h-5 w-5" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-950"
                    >
                      <DropdownMenuItem
                        onClick={() => openEditDialog(category)}
                        className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800"
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => deleteCategory(category.id)}
                        className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-800">
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    Products
                  </span>
                  <span className="rounded-md bg-slate-200 px-2 py-1 text-xs font-medium dark:bg-slate-800">
                    {category.products?.length || 0}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        }
          {categories.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-slate-500">No categories found.</p>
            </div>
          )}
        </div>
      </div>

      {/* CREATE / EDIT DIALOG */}
      <CreateCategory
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        editingCategory={editingCategory}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        createCategory={createCategory}
      />
    </div>
  );
}