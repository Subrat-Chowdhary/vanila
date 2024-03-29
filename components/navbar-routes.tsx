"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";

import { isTeacher } from "@/lib/teacher";
import { Logo } from "@/app/(dashboard)/_components/logo";



export const NavbarRoutes = () => {

    const {userId} = useAuth();
    const pathname = usePathname();
    

    const isTeacherPage = pathname?.startsWith("/teacher");
    const isPlayerPage = pathname?.includes("/courses");
    const isSearchPage = pathname === "/search";


    return (

        <>
            <div className="">
                <Logo/>
            </div>
            {isSearchPage && (
                <div className="hidden md:block ml-12">
                    <SearchInput/>
                </div>
            )}
        
            <div className="flex gap-x-2 ml-auto">
                {isTeacherPage || isPlayerPage ?(
                    <Link href="/">
                        <Button size="sm" variant="logoColor" className="bg-[#5e6601]-900" >
                            <LogOut className="h-4 w-4 mr-2" />
                            Exit
                        </Button>
                    </Link>
                ): isTeacher(userId) ? (
                    <Link href="/teacher/courses">
                        <Button size="sm" variant="logoColor" className="bg-[#5e6601]-900">
                            Admin Mode
                        </Button>
                    </Link>
                ): null}
                <UserButton
                    afterSignOutUrl="/"
                />
            </div>
        </>

    )
}