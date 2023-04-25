import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function GET() {
    // prisma logic to barf out every object in the db according to url_id;
    const allRows = await prisma.baseurl.findMany({
        select: {
            dataObj: true,
        }
    })

    // Return object in NextResponse;
    return NextResponse(allRows); 
}