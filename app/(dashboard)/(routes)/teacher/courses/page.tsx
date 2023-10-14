import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
    return ( 
        <div className="p-6">
            <Link href={"/teacher/create"}>
                <Button className="bg-[#8c3c7c]">
                    New Course
                </Button>
            </Link>            
        </div>
     );
}
 
export default CoursesPage;