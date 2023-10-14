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
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
import { url } from "inspector";



interface ImageFormProps {
    initialData: Course;
    courseId: string;
};

const formSchema = z.object({
    imageUrl: z.string().min(1,{
        message: "Image is required",
    })
})


export const ImageForm = ({
initialData,
courseId

}: ImageFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
       
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: initialData?.imageUrl || "",
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
                Course image
                <Button onClick={toggleEdit} variant="logoColor">
                    {isEditing && (
                        <>Cancel</>
                    )}

                    {!isEditing && !initialData.imageUrl &&  (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Add an image
                        </>
                    )}

                    {!isEditing && initialData.imageUrl && (
                        <>
                          <Pencil className="h-4 w-4 mr-2" />Edit image
                        </>
                    )

                    }
                </Button>
            </div>
            {!isEditing && (
                !initialData.imageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-purple-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-purple-500" />
                    </div>
                ): (
                    <div className="relative aspect-video mt-2 ">
                        <Image 
                        alt="upload"
                        fill
                        className="object-cover rounded-md"

                        src={initialData.imageUrl}
                        />
                    </div>
                )
            )}
            {isEditing && (
                    <div>
                        <FileUpload 
                            endpoint="courseImage"
                            onChange={(url) => {
                                if (url){
                                    onSubmit({ imageUrl: url});
                                }
                            }}
                        />
                        <div className="text-xs text-muted-foreground mt-4">
                            16:9 aspect ratio recommended
                        </div>
                    </div>
                )
            }
        </div>
    )
}

