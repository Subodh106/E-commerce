"use client";

import { Bell, Search } from "lucide-react";
import { Avatar , AvatarFallback } from "@base-ui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-black/10 bg-white px-6">
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />

        <Input
          placeholder="Search..."
          className="border-black/10 bg-black/2 pl-9 focus-visible:ring-black"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-black/60 hover:bg-black/5 hover:text-black"
        >
          <Bell className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-3 border-l border-black/10 pl-4">
          {/* <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-black text-white">
              AD
            </AvatarFallback>
          </Avatar> */}

          <div className="hidden sm:block">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-black/50">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}