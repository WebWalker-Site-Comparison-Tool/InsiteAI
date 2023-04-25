import { NextResponse } from "next/server";

export async function GET(req) {
    const url = req.url.slice(req.url.lastIndexOf('/')+1);
    
}