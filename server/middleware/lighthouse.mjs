import lighthouse from "lighthouse";
import chromeLauncher from "chrome-launcher";

const lighthouseMiddleware = async (req, res, next) => {
  const { url } = req.query;
  // lighthouse boilerplate setup to get performance, accessiblity, best practices, and SEO data
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    logLevel: "info",
    output: "json",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    port: chrome.port,
  };
  // invokes lighthouse passing in naked url with https in front
  const runnerResult = await lighthouse("https://" + url, options);

  // `.report` is the HTML report as a string, parsed to JSON object
  let data = JSON.parse(runnerResult.report);

  // function to convert seconds string to milliseconds string
  function convertToMS(str) {
    if (str[str.length - 2] !== "m") {
      let num = Number(str.slice(0, str.indexOf(" ")));
      return (num * 1000).toString() + " ms";
    }
    return str;
  }

  // function to convert milliseconds string to seconds string
  function convertToS(str) {
    if (str[str.length - 2] === "m") {
      let num = Number(str.slice(0, str.indexOf(" ")));
      return (num / 1000).toString() + " s";
    }
    return str;
  }

  // metricObject containing relevant metrics in proper format for URL, screenshot image, Performance, Accessbility, SEO, JS Libraries
  let metricObject = {
    url: "https://" + url,
    image: data.audits["final-screenshot"].details.data,
    firstContentfulPaint: convertToS(
      data.audits["first-contentful-paint"].displayValue
    ),
    totalBlockingTime: convertToMS(
      data.audits["total-blocking-time"].displayValue
    ),
    largestContentfulPaint: convertToS(
      data.audits["largest-contentful-paint"].displayValue
    ),
    buttonName: data.audits["button-name"].details.items.length,
    imageAlt: data.audits["image-alt"].details.items.length,
    linkName: data.audits["link-name"].details.items.length,
    colorContrast: data.audits["color-contrast"].details.items.length,
    fontSize: data.audits["font-size"].displayValue.slice(
      0,
      data.audits["font-size"].displayValue.indexOf("%") + 1
    ),
    libraries: data.audits["js-libraries"].score
      ? data.audits["js-libraries"].details.items.map((el) => el.name)
      : [],
  };

  res.locals.metrics = metricObject;
  return next();
};

export default lighthouseMiddleware;
