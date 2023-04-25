import fs from "fs";
import lighthouse from "lighthouse";
import chromeLauncher from "chrome-launcher";

const lighthouse = {};

lighthouse.getMetrics = async (req, res, next) => {
  console.log(req.body);

  /*
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    logLevel: "info",
    output: "json",
    onlyCategories: ["performance", "accessibility", "seo"],
    port: chrome.port,
  };
  const runnerResult = await lighthouse("https://www.reddit.com/", options);

  // `.report` is the HTML report as a string
  res.locals.metrics = runnerResult.report;
  // fs.writeFileSync("lhreport.json", reportJson);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log("Report is done for", runnerResult.lhr.finalDisplayedUrl);
  console.log(
    "Performance score was",
    runnerResult.lhr.categories.performance.score * 100
  );

  await chrome.kill();
  */

  return next();
};

module.exports = lighthouse;
