const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const dir = 'docs/redesign/fixes_verification';
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop - Homepage CloudArchitectureVisual in Light Mode
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  await page.goto('http://localhost:3005', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    document.documentElement.classList.add('light');
    localStorage.setItem('theme', 'light');
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // Locate CloudArchitectureVisual
  const archVisual = page.locator('.group\\/canvas').first();
  if (await archVisual.isVisible()) {
    await archVisual.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await archVisual.screenshot({ path: `${dir}/08_cloud_arch_visual_light_component.png` });
    console.log('Saved CloudArchitectureVisual Light screenshot.');
  }

  // 2. Mobile Drawer Test
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3005', { waitUntil: 'domcontentloaded' });
  await mobilePage.waitForTimeout(1000);

  const menuBtn = mobilePage.locator('button[aria-label="Open mobile navigation menu"]').first();
  if (await menuBtn.isVisible()) {
    await menuBtn.click();
    await mobilePage.waitForTimeout(600);
    await mobilePage.screenshot({ path: `${dir}/09_mobile_drawer_open_dark.png` });
    console.log('Saved Mobile Drawer screenshot.');
  }

  // 3. Challenge Podiums in Light Mode
  await page.goto('http://localhost:3005/challenges', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    document.documentElement.classList.add('light');
  });
  await page.waitForTimeout(800);
  const lbBtn = page.locator('button:has-text("Official Leaderboard Standings")').first();
  await lbBtn.click();
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${dir}/10_podium_zero_state_light.png` });
  console.log('Saved Podium zero state light screenshot.');

  await browser.close();
  console.log('DONE!');
})();
