import { Search } from 'lucide-react'
import React from 'react'

const SearchItem = () => {
  return (
    <div className="relative mb-6">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
    
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-slate-900"
                />
              </div>
  )
}

export default SearchItem