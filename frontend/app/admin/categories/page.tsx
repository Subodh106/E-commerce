"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FolderPlus,
  Search,
  Pencil,
  Trash2,
  Package,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateCategory from "@/components/web/admin/create-category-section";
import LoadingSpinner from "@/components/web/loading-spinner";

import { create_Category, getAllCateogry } from "@/services/categoryService";
import { toast } from "sonner";
import { ProductType } from "@/Types/HomeTypes";

export interface Category {
  Id: number;
  category?: string;
  products?: ProductType[];
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const getCategory = async () => {
    try {
      setLoading(true);
      const res = await getAllCateogry();
      if (res?.status === 200) {
        const rawData = res?.data?.data || res?.data || [];
        console.log("Raw data " ,rawData);
        setCategories(rawData);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch categories"
      );
    } finally {
      setLoading(false);
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
    setIsDialogOpen(true);
  };

  const deleteCategory = (id: number) => {
    setCategories((prev) => prev.filter((category) => category.Id !== id));
  };

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
      toast.error(
        error?.response?.data?.message || "Failed to create category"
      );
    }
  };


  console.log(categories)

  if (categories.length==0 && loading) {
    return <LoadingSpinner />;
  }

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

        <Card className="border-slate-300 bg-slate-100 text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
          <CardHeader className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold sm:text-xl">
                  All Categories
                </CardTitle>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
                  {categories.length} categories found
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-3 sm:p-6">
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {categories.map((category) => (
                <div
                  key={category.Id}
                  className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4 transition-colors hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-lg px-2 sm:px-4"
                >
                  {/* Category Info */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800">
                      <Package className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                        {category.category}
                      </h3>
                      <span className="mt-1 inline-flex rounded-md bg-slate-200 dark:bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                        {category.products?.length || 0} products
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 sm:border-0 sm:pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(category)}
                      className="h-8 border-slate-300 bg-slate-100 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-800 px-3 text-xs"
                    >
                      <Pencil className="mr-1.5 h-3.5 w-3.5" />
                      <span className="hidden md:block lg:block">Edit</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteCategory(category.Id)}
                      className="h-8 border-slate-300 bg-slate-100 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-slate-700 dark:bg-slate-950 dark:text-red-400 dark:hover:bg-red-950/50 px-3 text-xs"
                    >
                      <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                      <span className="hidden md:block lg:block" >Delete</span>                      
                    </Button>
                  </div>
                </div>
              ))}

              {categories.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-sm text-slate-500">No categories found.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CREATE */}
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