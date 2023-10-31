import Image from "next/image";

export const Logo = ()=>{
    return (
        <div className="flex ml-1 text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-50 font-extrabold">
            Vanila-LMS
        </div>
    //     <Image
    //     src="/vanila-high-resolution-logo.svg"
    //     height={0}
    //     width={0}
    //     alt="logo"
    //     className="justify-center shadow-slate-950 rounded-xl w-44 h-8"
    //    />
    )
}