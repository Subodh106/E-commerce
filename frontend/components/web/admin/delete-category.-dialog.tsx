import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import React, { useState } from 'react'

export default function DeleteCategoryDialog({
    id ,
    deleteCategory
}:{
    id:number ,
    deleteCategory:(categoryId:number)=>void}) {

        
    const[isDeleteDialogOpen , setIsDeleteDialogOpen] = useState<boolean>(false);
  return (
    <Dialog 
    open={isDeleteDialogOpen}
    onOpenChange={setIsDeleteDialogOpen}
    >
        <DialogContent className=" w-[calc(100%-1.5rem)max-w-md border-slate-300 bg-slate-100 text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
            <DialogHeader>
                <DialogContent>
                    Do you want to delete this category?
                </DialogContent>
            </DialogHeader>
            <DialogFooter className='flex-col gap-2 sm-flex-row'>
                <div>
                    <Button
                    type='button'
                    variant="outline"
                    className=" w-full

                border-slate-300
                bg-slate-100
                hover:bg-slate-200

                dark:border-slate-700
                dark:bg-slate-950
                dark:hover:bg-slate-800

                sm:w-auto"
                     onClick={()=>setIsDeleteDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        className=" w-full

                border-slate-300
                bg-slate-100
                hover:bg-slate-200

                dark:border-slate-700
                dark:bg-slate-950
                dark:hover:bg-slate-800

                sm:w-auto"

                onClick={() => deleteCategory(id)}
                    >
                        Delete
                    </Button>
                </div>
                </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
