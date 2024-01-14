import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req:Request, res:Response) => {
    try {
        const category = await db.category.findMany()
        return NextResponse.json({message: "ok", category}, {status: 200})
        
    } catch (error) {
        console.log("[category]", error);
        return new NextResponse("Internal Error" + error);        
    }
}


