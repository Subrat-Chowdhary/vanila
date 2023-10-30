import Image from "next/image";

export const Logo = ()=>{
    return (
        <Image
        src="/vanila-high-resolution-logo.svg"
        height={400}
        width={400}
        alt="logo"
        className="justify-center shadow-slate-950 rounded-xl"
       />
    )
}