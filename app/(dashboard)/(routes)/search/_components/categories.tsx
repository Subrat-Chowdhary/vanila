"use client";

import { Category } from "@prisma/client";

import { HiAcademicCap } from "react-icons/hi";


import {IconType} from "react-icons";
import { Record } from "@prisma/client/runtime/library";
import { CategoryItem } from "./category-item";


interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
"Arts": HiAcademicCap,
"Science":HiAcademicCap,
"Commerce": HiAcademicCap,
}
export const Categories = ({
    items,
} : CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 flex-wrap pb-2 gap-y-4 justify-center">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    )
}