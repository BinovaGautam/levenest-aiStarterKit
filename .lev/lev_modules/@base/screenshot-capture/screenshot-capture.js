// Screenshot capture tool using Playwright (base package)
const { chromium } = require('playwright');
module.exports = async function capture(url, outputPath) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.screenshot({ path: outputPath, fullPage: true });
  await browser.close();
}; 