"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IconType } from "react-icons";
import qs from "query-string";
import { stringify } from "querystring";

import Image from 'next/image';
import CompSc from "@/public/icons/engineering.png"

interface CategoryItemProps {
    label: string;
    value?: string;
    icon?: IconType;
}

export const CategoryItem = ({
    label,
    value,
    icon: Icon,
}: CategoryItemProps) => {

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategoryId = searchParams.get("categoryId");
    const currentTitle = searchParams.get("title");

    const isSelected = currentCategoryId === value;

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
             categoryId: isSelected ? null : value,
            }
        }, { skipNull: true, skipEmptyString: true });
        router.push(url);
    };



    return (
        <button
        onClick={onClick}
            className={cn(
                "flex bg-white  dark:bg-stone-800 dark:text-white text-gray-600 border-4 items-center py-2 px-3 text-sm border-slate-200 rounded-2xl gap-x-1 hover:border-sky-900 transition",
                isSelected && "bg-green-700 text-white border-green-800"
            )}
            type="button"
        >
            {Icon && <Icon size={30} />}
            {/* {<Image
                src={CompSc}
                alt="logo"
                className="h-6 w-6"
            />} */}
            <div className="truncate font-semibold">
                {label}
            </div>
        </button>
    )
}