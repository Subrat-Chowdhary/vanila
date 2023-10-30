"use client";

import { Category } from "@prisma/client";

import {

    FcDiploma2,

    FcElectronics,

    FcSportsMode,
    FcBusinessman,

} from "react-icons/fc";
import {IconType} from "react-icons";
import { Record } from "@prisma/client/runtime/library";
import { CategoryItem } from "./category-item";


interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
"Technology": FcElectronics,
"Health":FcSportsMode,
"Learning & Development": FcBusinessman,
"Education": FcDiploma2,
}
export const Categories = ({
    items,
} : CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 flex-wrap pb-2 gap-y-4 justify-between">
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