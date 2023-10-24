import Image from "next/image";

export const Logo = ()=>{
    return (
        <Image
        src="/vanila-high-resolution-logo-transparent.svg"
        height={10}
        width={162}
        alt="logo"
        className="justify-center ml-10 p-2 mt-0"
        />
    )
}