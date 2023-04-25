import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function POST(request) {
    // Deconstruct object - enter final vars on final object here 
    const { url, img } = await request.json();
    const dataObj = await request.json();


    // Save to prisma DB according to save query 
    const newUrl = await prisma.baseurl.create({
        data: {
            url: url,
            img: img,
            dataObj: dataObj
        }
    })

    // Give a response that it saved properly 
    return NextResponse.json(newUrl);
}
