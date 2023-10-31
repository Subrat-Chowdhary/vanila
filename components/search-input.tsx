"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { UseDebounce } from "@/hooks/use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import qs from "query-string";

export const SearchInput = () => {

    const [value, setValue] = useState("");
    const debouncedValue = UseDebounce(value);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategoryId = searchParams.get("categoryId");
    

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debouncedValue,
            }
            }, {skipNull: true, skipEmptyString:true});
            router.push(url);
        },[debouncedValue,currentCategoryId, router, pathname]);

  
    return (
        <div className="relative">
            <Search 
                className="h-4 w-4 absolute top-3 left-3 text-slate-600"
            />
            <Input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="w-full md:w-[300px] pl-9 text-black rounded-full bg-slate-100 focus-visible:ring-slate-200 dark:bg-slate-950 dark:text-white"
                placeholder="Search for a course"
            />
        </div>
    )
}