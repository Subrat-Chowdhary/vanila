import { ModeToggle } from "@/components/mode-selector";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DasboarLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return ( 
        <div className="h-full">
            <div className="h-[80px] fixed inset-y-0 w-full z-50">
                <Navbar/>
            </div>
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 mt-[80px]">
                <Sidebar/>
            </div>
            <main className="md:pl-56 pt-[80px] h-full bg-white dark:bg-slate-950">
                    {children}
            </main>
        </div>

     );
}
 
export default DasboarLayout;