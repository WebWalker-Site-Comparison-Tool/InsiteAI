import { prisma } from "@/prisma";

export async function GET(request) {

    const url = request.url.slice(request.url.lastIndexOf('/')+1);
    let finalUrl;

    if (url.slice(0, 7) === 'http://') {
        finalUrl = 'https://' + url.slice(7);
    } else if (url.slice(0, 8) !== 'https://') {
        finalUrl = 'https://' + url;
    } else {
        finalUrl = url;
    }

    // Prisma logic to check if URL exists
    const searchedUrl = await prisma.baseurl.findUnique({
        where: {
            url: finalUrl,
        },
        select: {
            dataObj: true,
        }
    })

    const searchedUrlObj = searchedUrl? searchedUrl : false

    // If it exists, prisma logic to return all info related to URL 
    return new Response( JSON.stringify(searchedUrlObj) )
}