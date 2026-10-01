import { Category } from '@/app/admin/categories/page'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


export type CreateCategoryProps ={
    isDialogOpen : boolean;
    setIsDialogOpen : (value:boolean)=>void;
    editingCategory : Category|null;
    categoryName : string;
    setCategoryName : (value:string)=>void;
    createCategory: ()=>void;
}


export default function CreateCategorySection({isDialogOpen,setIsDialogOpen,editingCategory,categoryName,setCategoryName,createCategory}:CreateCategoryProps) {
  return (
     <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent
          className="
            w-[calc(100%-1.5rem)]
            max-w-md

            border-slate-300
            bg-slate-100
            text-slate-950

            dark:border-slate-800
            dark:bg-slate-950
            dark:text-slate-100
          "
        >
          <DialogHeader>
            <DialogTitle>
              {editingCategory
                ? "Edit Category"
                : "Create Category"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">

            <div className="space-y-2">
              <Label htmlFor="categoryName">
                Category Name
              </Label>

              <Input
                id="categoryName"
                value={categoryName}
                onChange={(e) =>
                  setCategoryName(e.target.value)
                }
                placeholder="e.g. Electronics"
                className="
                  border-slate-300
                  bg-slate-100
                  text-slate-950
                  placeholder:text-slate-500

                  focus-visible:ring-slate-950

                  dark:border-slate-700
                  dark:bg-slate-950
                  dark:text-slate-100

                  dark:focus-visible:ring-slate-100
                "
              />
            </div>


          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="
                w-full

                border-slate-300
                bg-slate-100
                hover:bg-slate-200

                dark:border-slate-700
                dark:bg-slate-950
                dark:hover:bg-slate-800

                sm:w-auto
              "
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={createCategory}
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
              {editingCategory
                ? "Save Changes"
                : "Create Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}
