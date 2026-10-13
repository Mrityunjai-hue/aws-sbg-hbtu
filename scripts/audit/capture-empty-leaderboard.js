const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/challenges', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  const tab = page.locator('button:has-text("Official Leaderboard Standings")').first();
  await tab.click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'docs/redesign/challenges_verification/15_authentic_empty_leaderboard.png' });
  await browser.close();
  console.log('Zero-state leaderboard screenshot captured!');
})();
