import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { LayoutDashboard, ListChecks, IndianRupeeIcon, File } from "lucide-react";
import { redirect } from "next/navigation";



import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attahment-form";
import { ChaptersForm } from "./_components/chapters-form";

const CourseIdPage = async ({
    params
}:{
    params: {courseId: string} 
} ) => {
const {userId} = auth();
    
    if(!userId){
        return redirect("/");
    }
    
    const course = await db.course.findUnique({
    where: {id: params.courseId, userId:userId},
    include: {
        chapters: {
            orderBy:{
                position: "asc", 
            }
        },

        attachments: {
            orderBy:{
                createdAt: "desc",
            },
        },
    }
    });

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        }
    })

    //console.log("categories = " + categories[0].name);
   

    if(!course){
        return redirect("/");
    }
    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished),
    ];
    const totlaFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totlaFields})`;

    console.log(completionText);


    return ( 
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium text-[#5e6601]">
                        Course Setup
                    </h1>
                    <span className="text-sm text-[#5e6601]">
                        Complete all fields {completionText}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={LayoutDashboard} />
                        <h2 className="text-xl text-[#5e6601]">
                            Customize Your Course
                        </h2>
                    </div>
                    <TitleForm
                        initialData = {course}
                        courseId={course.id}
                    />
                    <DescriptionForm
                        initialData = {course}
                        courseId={course.id}
                    />
                    <ImageForm
                        initialData = {course}
                        courseId={course.id}
                    />

                    <CategoryForm
                        initialData = {course}
                        courseId={course.id}
                        options={categories.map((category) => ({
                            label: category.name,
                            value: category.id,
                        }))}
                    />
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge 
                                icon={ListChecks}
                            />
                            <h2 className="text-xl">
                                Course chapters
                            </h2>
                        </div>
                    <ChaptersForm
                        initialData = {course}
                        courseId={course.id}
                    />
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge 
                                icon={IndianRupeeIcon}
                            />
                            <h2 className="text-xl">
                                Sell your course
                            </h2>
                        </div>
                        <PriceForm 
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge 
                                icon={File}
                            />
                            <h2 className="text-xl">
                                Resources & Attachments
                            </h2>
                        </div>
                    <AttachmentForm
                        initialData = {course}
                        courseId={course.id}
                    />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default CourseIdPage;