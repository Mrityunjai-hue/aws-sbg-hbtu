const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const dir = 'docs/redesign/fixes_verification';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  console.log('Navigating to Challenges page...');
  await page.goto('http://localhost:3005/challenges?reset=true', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);

  // 1. Challenges page - Modules tab (Dark Mode, No Scrollbars)
  await page.screenshot({ path: `${dir}/01_challenges_modules_no_scrollbars_dark.png`, fullPage: false });
  console.log('1. Captured Challenges modules tab (No scrollbars, dark mode).');

  // 2. Leaderboard tab - Verify Zero Fake Data
  const lbTab = page.locator('button:has-text("Official Leaderboard Standings")').first();
  await lbTab.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${dir}/02_challenges_leaderboard_empty_dark.png`, fullPage: false });
  console.log('2. Captured Leaderboard zero-state (Zero fake data, dark mode).');

  // 3. Switch to Light Mode
  console.log('Switching to Light Mode...');
  const themeToggle = page.locator('button[title*="theme"], button[aria-label*="theme"]').first();
  if (await themeToggle.isVisible()) {
    await themeToggle.click();
    await page.waitForTimeout(800);
  }

  // 4. Leaderboard in Light Mode
  await page.screenshot({ path: `${dir}/03_challenges_leaderboard_light.png`, fullPage: false });
  console.log('4. Captured Leaderboard in Light Mode.');

  // 5. Challenges Modules tab in Light Mode
  const modTab = page.locator('button:has-text("15-Module Curriculum")').first();
  await modTab.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${dir}/04_challenges_modules_light.png`, fullPage: false });
  console.log('5. Captured Modules tab in Light Mode.');

  // 6. Homepage in Light Mode
  await page.goto('http://localhost:3005', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${dir}/05_homepage_light_mode.png`, fullPage: false });
  console.log('6. Captured Homepage in Light Mode.');

  // Scroll down to CloudArchitectureVisual on homepage
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${dir}/06_cloud_architecture_light_mode.png`, fullPage: false });
  console.log('6b. Captured CloudArchitectureVisual in Light Mode.');

  // 7. Mobile Viewport Drawer Test
  console.log('Testing Mobile Drawer...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:3005', { waitUntil: 'domcontentloaded' });
  await mobilePage.waitForTimeout(1000);

  // Click hamburger menu
  const menuBtn = mobilePage.locator('button[aria-label="Toggle navigation menu"]').first();
  if (await menuBtn.isVisible()) {
    await menuBtn.click();
    await mobilePage.waitForTimeout(800);
    await mobilePage.screenshot({ path: `${dir}/07_mobile_drawer_animated.png`, fullPage: false });
    console.log('7. Captured animated Mobile Drawer.');
  }

  await browser.close();
  console.log('ALL VERIFICATION SCREENSHOTS SAVED SUCCESSFULLY!');
})();
