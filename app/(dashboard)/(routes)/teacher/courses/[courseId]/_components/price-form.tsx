"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";



interface PriceFormProps {
    initialData: Course;
    courseId: string;
};

const formSchema = z.object({
    price: z.coerce.number(),

})


export const PriceForm = ({
initialData,
courseId

}: PriceFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
       
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData.price || undefined,
        },

    });
 
    const {isSubmitting, isValid} = form.formState;

    const toggleEdit = () => setIsEditing ((current) => !current)

    const router = useRouter();

    const onSubmit = async ( values: z.infer<typeof formSchema> ) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course updated");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong....");
            
        }
    }

    return(
        <div className="mt-6 border bg-purple-200 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course price
                <Button onClick={toggleEdit} variant="logoColor">
                    {isEditing ? (
                        <>Cancel</>
                    ): (
                    <>
                      <Pencil className="h-4 w-4 mr-2" />Edit price
                    </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData?.price && "text-slate-500 italic"
                )}>
                    {initialData.price
                        ? formatPrice(initialData.price) : "No Price"
                    }
                </p>
            )}
            {isEditing && (
                    <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="space-y-4 mt-4"
                        >
                        <FormField
                        control={form.control}
                        name="price"
                        render={({field})=>{
                            return (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                    disabled={isSubmitting}
                                    type="number"
                                    step="0.01"
                                    placeholder="Set a price for your course'"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            );
                        }}
                        />

                        <div className="flex items-center gap-x-2">

                            <Button variant={"logoColor"}
                            disabled={!isValid || isSubmitting}
                            type="submit"
                            >
                                Save
                            </Button>

                        </div>

                        </form>

                    </Form>
                )
            }
        </div>
    )
}

