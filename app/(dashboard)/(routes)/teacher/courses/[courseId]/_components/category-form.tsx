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
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";



interface CategoryFormProps {
    initialData: Course;
    courseId: string;
    options: {label: string; value:string;}[];
};

const formSchema = z.object({
    categoryId: z.string().min(1),

    });
export const CategoryForm = ({
initialData,
courseId,
options

}: CategoryFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
       
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData.categoryId || ""
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

    const selectedOption = options.find((option) => option.value === initialData.categoryId);


    return(
        <div className="mt-6 border bg-purple-200 dark:bg-purple-900 dark:text-white rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course category
                <Button onClick={toggleEdit} variant="logoColor">
                    {isEditing ? (
                        <>Cancel</>
                    ): (
                    <>
                      <Pencil className="h-4 w-4 mr-2" />Edit category
                    </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData?.categoryId && "text-slate-500 italic"
                )}>
                    {selectedOption?.label || "No category"}
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
                        name="categoryId"
                        render={({field})=>{
                            return (
                            <FormItem>
                                <FormControl>
                                    <Combobox 
                                        options={...options}
                                        onChange = ""
                                        {...field}
                                    />

                                    {/* <Textarea 
                                    disabled={isSubmitting}
                                    placeholder="e.g. 'This course is about...'"
                                    {...field}
                                    /> */}
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

