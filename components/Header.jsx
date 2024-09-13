"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "./ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Menubar } from "@/components/ui/menubar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sun,Moon,AlignJustify} from 'lucide-react';
import { useState } from "react";
const Header = () => {
  const [searchText,setSearchText]= useState("")
  const { setTheme } = useTheme();
  async function search(formData) {
    const q = formData.get("q");
    redirect(`/search?q=${q}`);
  }
    return (
    <Menubar className="fixed top-0 left-0 right-0 justify-between mb-4 py-2 md:ml-[200px]">
      <div className="flex items-center">
        <AlignJustify className="block md:hidden cursor-pointer"/>
        <h1 className="ml-2 sm:text-xl md:text-2xl font-bold">Movie Show</h1>
      </div>       
        <form action={search} className="flex space-x-2 items-center mt-2">
            <Input type="text" name="q" />
            <Button type="submit">Search</Button>
        </form>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Sun className=" scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className=" absolute scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Menubar>
  )
}

export default Header;