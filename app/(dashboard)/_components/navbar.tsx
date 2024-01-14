import { NavbarRoutes } from "@/components/navbar-routes"
import { MobileSidebar } from "./mobile-sidebar"
import { ModeToggle } from "@/components/mode-selector"

export const Navbar = () => {
    return(
        <div className="p-4 border-b flex items-center bg-whithe shadow-sm bg-white dark:bg-slate-950 dark:text-white h-auto gap-x-4">
            <MobileSidebar />
            <NavbarRoutes/>
            <ModeToggle/>
       </div>
    )
}