import { prisma } from "@/prisma";

export async function POST(req) {
    // Deconstruct object - enter final vars on final object here 
    const { url, image, firstContentfulPaint, totalBlockingTime, largestContentfulPaint, buttonName, imageAlt, linkName, colorContrast, fontSize } = await req.json();
    const dataObj = {url, firstContentfulPaint, totalBlockingTime, largestContentfulPaint, buttonName, imageAlt, linkName, colorContrast, fontSize};
    dataObj.image = image; 

    let finalUrl;

    if (url.slice(0, 7) === "http://") {
    finalUrl = "https://" + url.slice(8);
  } else if (url.slice(0, 8) !== "https://") {
    finalUrl = "https://" + url;
  } else {
    finalUrl = url;
  }

    dataObj.url = finalUrl; 
    // Save to prisma DB according to save query 
    const newUrl = await prisma.baseurl.create({
        data: {
            url: finalUrl,
            img: image,
            dataObj: dataObj
        }
    })

    // Give a response that it saved properly 
    return new Response( JSON.stringify({newUrl:newUrl}) );
}
