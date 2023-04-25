import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function GET() {
    // prisma logic to barf out everything in the db assembled according to url_id;
    
    // ideas: make multiple objects by querying 7 different tables lol 
    // Other idea: somehow join it all together using prisma


    // Return object in NextResponse; 
}