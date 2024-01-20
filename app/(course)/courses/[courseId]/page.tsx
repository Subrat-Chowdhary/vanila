import { db } from "@/lib/db";
import { redirect } from "next/navigation";

// added user type
type User = {
  id: string
}

const CourseIdPage = async ({
    params
}: {
    params: { courseId: string; }
}) => {

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
        },
        include: {
            chapters: {
                where: {
                    isPublished:true,
                },
                orderBy:{
                    position: "asc"
                }
            }
        }
    });

    if(!course){
        return redirect("/");
    }

     // Check if course is completed
    if(course.completed) {
        
        // Create certification record 
        // Added this
        const user = await db.certification.create({
        data: {
            userId: user.id,
            courseId: params.courseId,
            issuedDate: new Date()  
        }
        })

        // Redirect to certification page
        // Added this 
        return redirect('/certification')
    }

    return ( 
       redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`)
     );
}
 
export default CourseIdPage;