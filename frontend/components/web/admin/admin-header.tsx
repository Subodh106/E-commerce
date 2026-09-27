"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../mode-toggle";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-black/10 bg-white dark:bg-slate-950 dark:text-white px-6 ">
      <div className="relative w-80 border border-black rounded-lg dark:border-white flex justify-center items-center px-2">
        <Search className="size-5" />

        <Input
          placeholder="Search..."
          className=" border-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer"
        >
          <Bell className="size-5" />
        </Button>

        <ModeToggle/>

        <div className="flex items-center gap-3 border-l border-black/10 pl-4">
          <div className="hidden sm:block">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-black/50">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}