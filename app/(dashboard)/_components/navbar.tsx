import { NavbarRoutes } from "@/components/navbar-routes"
import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {
    return(
        <div className="p-4 border-b flex items-center bg-whithe shadow-sm bg-white h-auto">
            <MobileSidebar />
            <NavbarRoutes/>
       </div>
    )
}