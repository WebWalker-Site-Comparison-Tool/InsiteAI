import { NextResponse } from "next/server";
// import lighthouse from "lighthouse";

export async function GET(request) {
  console.log("test1");

  // // lighthouse boilerplate, converting website url into a json object with performance, accessibility, and seo metrics
  // const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  // const options = {
  //   logLevel: "info",
  //   output: "json",
  //   onlyCategories: ["performance", "accessibility", "seo"],
  //   port: chrome.port,
  // };
  // const runnerResult = await lighthouse('https://reddit.com', options);

  // // `.report` is the HTML report as a string
  // let data = runnerResult.report;
  // // fs.writeFileSync("lhreport.json", reportJson);

  // // `.lhr` is the Lighthouse Result as a JS object
  // console.log("Report is done for", runnerResult.lhr.finalDisplayedUrl);
  // console.log(
  //   "Performance score was",
  //   runnerResult.lhr.categories.performance.score * 100
  // );

  // console.log(data);

  // await chrome.kill();

  /*
  // -------- PERFORMANCE ---------

  // First Contentful Paint (FCP)
  console.log(data.audits["first-contentful-paint"].displayValue);

  // Total Blocking Time (TBT)
  console.log(data.audits["total-blocking-time"].displayValue);

  // Largest Contentful Paint (LCP)
  console.log(data.audits["largest-contentful-paint"].displayValue);

  // -------- ACCESSIBILITY ---------

  // # of buttons without accessible name
  console.log(data.audits["button-name"].details.items.length);

  // # of images without alt attributes
  // 11956 audits / 'image-alt' / details / items.length
  console.log(data.audits["image-alt"].details.items.length);

  // # of links without discernable name
  console.log(data.audits["link-name"].details.items.length);

  // # of poor contrast ratio elements
  console.log(data.audits["color-contrast"].details.items.length);

  // -------- SEO ---------

  // % legible font sizes
  const fontSize = data.audits["font-size"].displayValue;
  console.log(fontSize.slice(0, fontSize.indexOf("%") + 1));
  */
  return NextResponse.json("hello");
}
