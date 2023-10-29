"use client";

import { Category } from "@prisma/client";
import {agri} from "@/public/icons/tractor.png"

import {
    FcIdea,
    FcGraduationCap,
    FcCircuit,
    FcConferenceCall,
    FcDiploma2,
    FcElectricalSensor,
    FcElectronics,
    FcHome,
    FcLowPriority,
    FcSerialTasks,
    FcReading,
    FcPositiveDynamic,
    FcCrystalOscillator,
    FcSynchronize,
    FcBiomass,
    FcHeatMap,
    FcCollaboration,

} from "react-icons/fc";
import {IconType} from "react-icons";
import { Record } from "@prisma/client/runtime/library";
import { CategoryItem } from "./category-item";


interface CategoriesProps {
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
"Computer Science": FcIdea,
"Medicine and Healthcare":FcReading,
"Engineering": FcCircuit,
"Education": FcDiploma2,
"Business and Management": FcSerialTasks,
"Psychology": FcPositiveDynamic,
"Music and Performing Arts": FcCrystalOscillator,
"Environmental Science": FcSynchronize,
"Agriculture and Farming": FcBiomass,
"Architecture": FcHeatMap,
"Fashion and Apparel": FcCollaboration,
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
                    imgAsIcon={agri}
                />
            ))}
        </div>
    )
}