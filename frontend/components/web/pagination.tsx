import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

const Pagination = ({page ,setPage}:{page:number , setPage:(page:number)=>void}) => {

const handleIncrement = ()=>{
    setPage(page + 1);
}
const handleDecrement = ()=>{
    setPage(page-1);
}

  return (
    <div className="mt-10 flex justify-center">
            <div className="flex items-center gap-2">
              <button 
              className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50 disabled:cursor-not-allowed active:bg-black" 
               onClick={handleDecrement}
               disabled={page === 0}
               >
                <ChevronLeft size={16} />
              </button>

              <button className="rounded-lg bg-slate-950 px-4 py-2 text-sm text-white">
                {page}
              </button>

              <button
               className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50 active:bg-black"
               onClick={handleIncrement}
               >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
  )
}

export default Pagination