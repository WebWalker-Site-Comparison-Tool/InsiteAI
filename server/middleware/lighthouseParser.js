import fs from "fs";
import lighthouse from "lighthouse";
import chromeLauncher from "chrome-launcher";

const parser = {};

parser.parseMetrics = async (req, res, next) => {
  console.log("res.locals.metrics: ", res.locals.metrics);

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
  return next();
};

module.exports = parser;
