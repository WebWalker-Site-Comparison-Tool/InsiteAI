import { NextResponse } from "next/server";

export async function GET(req) {
  const { url } = req;

  let finalUrl;
  // parse incomeing url to either add or replace starting with https://
  if (url.slice(0, 7) === "http://") {
    finalUrl = "https://" + url.slice(8);
  } else if (url.slice(0, 8) !== "https://") {
    finalUrl = "https://" + url;
  } else {
    finalUrl = url;
  }

  return NextResponse.json()
}
