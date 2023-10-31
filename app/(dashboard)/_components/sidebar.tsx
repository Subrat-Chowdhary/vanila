import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"

export const Sidebar = () => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white dark:bg-slate-950 dark:text-white shadow-sm">
            <div className="flex flex-col w-full">
                <SidebarRoutes/>
            </div>
        </div>
    )
}