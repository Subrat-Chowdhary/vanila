import { LucideIcon } from "lucide-react";
import {cva, type VariantProps} from "class-variance-authority";

import { cn } from "@/lib/utils";

const backGroundVariants = cva(
    "rounded-full flex items-center justify-center p-2",
    {
        variants: {
            variant: {
                default: "bg-[#5e6601]-200",
                success: "bg-emerald-100",
            },

            size: {
                default: "p-2",
                sm: "p-1",
            },
            defaultVariants: {
                variant: "default",
                size: "default",
            }
        }
    }
);

const iconVariants = cva(
    "",
    {
        variants: {
            variant: {
                default: "text-[#5e6601]",
                success: "text-emerald-700",
            },
            size: {
                default: "h-8 w-8",
                sm: "h-4 w-4",                
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        }
    }
);

type BackGroundVariantProps = VariantProps<typeof backGroundVariants>;

type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackGroundVariantProps, IconVariantsProps {
icon: LucideIcon;
}

export const IconBadge = ({
    icon: Icon,
    variant,
    size,

}: IconBadgeProps) => {
    return(
        <div className={cn(backGroundVariants({variant, size }))}>
            <Icon className={cn(iconVariants({variant, size}))}/>
        </div>
    )
};

