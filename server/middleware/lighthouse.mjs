import lighthouse from "lighthouse";
import chromeLauncher from "chrome-launcher";

const lighthouseMiddleware = async (req, res, next) => {
  const { url } = req.query;
  // lighthouse boilerplate to get data on specified website
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    logLevel: "info",
    output: "json",
    onlyCategories: ["performance", "accessibility", "seo"],
    port: chrome.port,
  };
  const runnerResult = await lighthouse("https://" + url, options);

  // `.report` is the HTML report as a string, parsed to JSON object
  let data = JSON.parse(runnerResult.report);

  // metricObject containing relevant metrics for Performance, Accessbility, SEO
  let metricObject = {
    image: data.audits["final-screenshot"].details.data,
    firstContentfulPaint: data.audits["first-contentful-paint"].displayValue,
    totalBlockingTime: data.audits["total-blocking-time"].displayValue,
    largestContentfulPaint:
      data.audits["largest-contentful-paint"].displayValue,
    buttonName: data.audits["button-name"].details.items.length,
    imageAlt: data.audits["image-alt"].details.items.length,
    linkName: data.audits["link-name"].details.items.length,
    colorContrast: data.audits["color-contrast"].details.items.length,
    fontSize: data.audits["font-size"].displayValue.slice(
      0,
      data.audits["font-size"].displayValue.indexOf("%") + 1
    ),
  };

  console.log(metricObject);
  res.locals.metrics = metricObject;
  return next();

  await chrome.kill();
};

export default lighthouseMiddleware;
