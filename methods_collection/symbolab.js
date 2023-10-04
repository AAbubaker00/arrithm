const puppeteer = require("puppeteer");

const _FixedEndPointMathSolver = "https://www.symbolab.com/solver/step-by-step/";

function formatEquation(equ) {
  equ = equ.replace(/\\\\/g, "\\");
  equ = equ.replace(/\\/g, "%5C");
  equ = equ.replace(/\s+/g, "");

  return equ;
}

async function solver(exp, cheerio, res) {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  expression = formatEquation(exp);

  //   console.log(expression);

  const url = _FixedEndPointMathSolver + expression;

  await page.goto(url, { waitUntil: "domcontentloaded" }); // Wait for initial page load

  // Function to check if the target element is present
  const isElementPresent = async () => {
    const element = await page.$("div.solution_math");
    return !!element;
  };

  // Wait for the element to appear with a timeout
  const timeoutMilliseconds = 10000; // Adjust the timeout as needed
  const pollIntervalMilliseconds = 500; // Adjust the polling interval as needed

  const waitForElement = async () => {
    const startTime = Date.now();
    while (!(await isElementPresent())) {
      if (Date.now() - startTime > timeoutMilliseconds) {
        throw new Error("Timeout: Element not found.");
      }
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMilliseconds));
    }
  };

  await waitForElement();

  // Now that the element is present, you can scrape it
  const sectionMultipleSolutions = await page.$eval("div.solution_math", (el) => el.innerHTML);

  const doc = cheerio.load(sectionMultipleSolutions);

  res.json({
    equation: exp,
    solution: doc("span").first().text(),
  });
}

module.exports.solver = solver;
