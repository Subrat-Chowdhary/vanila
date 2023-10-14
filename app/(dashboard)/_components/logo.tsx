import Image from "next/image";

export const Logo = ()=>{
    return (
        <Image
        src="/vanila-lms-high-resolution-color-logo.svg"
        height={130}
        width={240}
        alt="logo"
        className="rounded-3xl justify-center p-4"
        />
    )
}