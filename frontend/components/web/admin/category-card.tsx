// import { Card, CardContent } from '@/components/ui/card'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
// import { categoryType } from '@/services/categoryService';
// import { MoreHorizontal, Package, Pencil, Trash2 } from 'lucide-react'

// export type CategoryCartprop = {
//     id : number;
//     name : string ;
//     products : number;
//     openEditDialog:(category:categoryType)=>void;
//     deleteCategory : (categoryId : number)=>void;
// }

// export default function CategoryCard({id , name , products , openEditDialog , deleteCategory}:CategoryCartprop) {
//   return (
//      <Card
//               className="border-slate-300 bg-slate-100 text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
//             >
//               <CardContent className="p-4">
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex min-w-0 items-center gap-3">
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800">
//                       <Package className="h-5 w-5" />
//                     </div>
//                     <div className="min-w-0">
//                       <h3 className="truncate font-semibold">{name}</h3>
//                     </div>
//                   </div>

//                   <DropdownMenu>
//                     <DropdownMenuTrigger >
//                       <MoreHorizontal className="h-5 w-5" />
//                     </DropdownMenuTrigger>

//                     <DropdownMenuContent
//                       align="end"
//                       className="border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-950"
//                     >
//                       <DropdownMenuItem
//                         onClick={() => openEditDialog(category)}
//                         className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800"
//                       >
//                         <Pencil className="mr-2 h-4 w-4" />
//                         Edit
//                       </DropdownMenuItem>

//                       <DropdownMenuItem
//                         onClick={() => deleteCategory(id)}
//                         className="cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800"
//                       >
//                         <Trash2 className="mr-2 h-4 w-4" />
//                         Delete
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>

//                 <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 dark:border-slate-800">
//                   <span className="text-xs text-slate-600 dark:text-slate-400">
//                     Products
//                   </span>
//                   <span className="rounded-md bg-slate-200 px-2 py-1 text-xs font-medium dark:bg-slate-800">
//                     {products || 0}
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//   )
// }
