// Screenshot capture tool using Playwright
const playwright = require('playwright');
module.exports = async function capture(url, path) {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path });
  await browser.close();
}
