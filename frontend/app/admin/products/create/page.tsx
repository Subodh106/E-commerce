"use client";

import { useState } from "react";
import {
  ImagePlus,
  X,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateProductCard from "@/components/web/admin/create-product-card";

interface ProductImage {
  file: File;
  preview: string;
}

export default function CreateProductPage() {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);

    event.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);

      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);

      console.log("Product:", {
        productName: formData.get("productName"),
        description: formData.get("description"),
        price: formData.get("price"),
        stock: formData.get("stock"),
        category: formData.get("category"),
      });

      console.log(
        "Images:",
        images.map((image) => image.file)
      );

      // Later:
      // await createProduct(formData);

    } catch (error) {
      console.error("Create product failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-3 py-5 text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-6 sm:py-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-6 flex items-center gap-3">

          <div>
            <h1 className="text-xl font-bold sm:text-2xl">
              Create Product
            </h1>

            <p className="text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
              Add a new product to your store
            </p>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid gap-5 lg:grid-cols-3">

            {/* PRODUCT INFORMATION */}
                <CreateProductCard/>

            {/* IMAGE SECTION */}

            <Card
              className="
                h-fit

                border-slate-300
                bg-slate-100
                text-slate-950

                dark:border-slate-800
                dark:bg-slate-950
                dark:text-slate-100
              "
            >

              <CardHeader>

                <CardTitle>
                  Product Images
                </CardTitle>

                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Upload one or more product images
                </p>

              </CardHeader>

              <CardContent className="space-y-4">

                {/* Upload Box */}

                <label
                  htmlFor="images"
                  className="
                    flex
                    min-h-40
                    cursor-pointer
                    flex-col
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-dashed
                    border-slate-400
                    bg-slate-200/50
                    px-4
                    py-8
                    text-center
                    transition-colors

                    hover:bg-slate-200

                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:hover:bg-slate-800
                  "
                >

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-slate-300
                      dark:bg-slate-800
                    "
                  >
                    <ImagePlus className="h-5 w-5" />
                  </div>

                  <p className="mt-3 text-sm font-medium">
                    Click to upload
                  </p>

                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    PNG, JPG or WEBP
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Multiple images supported
                  </p>

                  <input
                    id="images"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />

                </label>

                {/* Preview */}

                {images.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">

                    {images.map((image, index) => (

                      <div
                        key={`${image.file.name}-${index}`}
                        className="
                          group
                          relative
                          aspect-square
                          overflow-hidden
                          rounded-lg
                          border

                          border-slate-300
                          bg-slate-200

                          dark:border-slate-700
                          dark:bg-slate-900
                        "
                      >

                        <img
                          src={image.preview}
                          alt={`Product ${index + 1}`}
                          className="h-full w-full object-cover"
                        />

                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="
                            absolute
                            right-2
                            top-2
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full

                            bg-slate-950
                            text-slate-100

                            hover:bg-slate-800

                            dark:bg-slate-100
                            dark:text-slate-950
                            dark:hover:bg-slate-300
                          "
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>

                        <span
                          className="
                            absolute
                            bottom-2
                            left-2
                            rounded-md
                            bg-slate-950/80
                            px-2
                            py-1
                            text-[10px]
                            text-slate-100

                            dark:bg-slate-100/90
                            dark:text-slate-950
                          "
                        >
                          {index + 1}
                        </span>

                      </div>

                    ))}

                  </div>
                )}

              </CardContent>
            </Card>

          </div>

          {/* ACTIONS */}

          <div
            className="
              mt-5
              flex
              flex-col-reverse
              gap-3

              sm:flex-row
              sm:justify-end
            "
          >

            <Button
              type="button"
              variant="outline"
              className="
                w-full
                border-slate-300
                bg-slate-100
                text-slate-950
                hover:bg-slate-200

                dark:border-slate-700
                dark:bg-slate-950
                dark:text-slate-100
                dark:hover:bg-slate-800

                sm:w-auto
              "
            >
              <Link href="/admin/products">
                Cancel
              </Link>
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="
                w-full

                bg-slate-950
                text-slate-100
                hover:bg-slate-800

                dark:bg-slate-100
                dark:text-slate-950
                dark:hover:bg-slate-300

                sm:w-auto
              "
            >
              {isSubmitting
                ? "Creating..."
                : "Create Product"}
            </Button>

          </div>

        </form>

      </div>
    </div>
  );
}
