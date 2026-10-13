const { chromium } = require('playwright');

(async () => {
  const dir = 'docs/redesign/phase6_verification';
  const browser = await chromium.launch({ headless: true });

  // 1. Mobile viewport 375x812 (iPhone X / SE / modern mobile)
  console.log('Testing Mobile Viewport (375x812)...');
  const mobile = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mPage = await mobile.newPage();
  await mPage.goto('http://localhost:3005/challenges', { waitUntil: 'domcontentloaded' });
  await mPage.waitForTimeout(1500);
  await mPage.screenshot({ path: `${dir}/05_challenges_mobile_header.png`, fullPage: false });

  // Mobile Leaderboard Tab
  const mLbBtn = mPage.locator('button:has-text("Official Leaderboard")').first();
  if (await mLbBtn.isVisible()) {
    await mLbBtn.click();
    await mPage.waitForTimeout(1000);
    await mPage.screenshot({ path: `${dir}/06_leaderboard_mobile_view.png`, fullPage: false });
    console.log('Captured mobile leaderboard.');
  }

  // 2. Events Page on Desktop
  console.log('Testing Events Page...');
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await desktop.newPage();
  await page.goto('http://localhost:3005/events', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${dir}/07_events_dynamic_status.png`, fullPage: false });
  console.log('Captured events page.');

  // 3. Quiz Modal with dynamic attempt scoring
  console.log('Testing Quiz Modal...');
  await page.goto('http://localhost:3005/challenges', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  const verifyBtn = page.locator('button:has-text("Verify Assessment")').first();
  if (await verifyBtn.isVisible()) {
    await verifyBtn.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${dir}/08_quiz_modal_attempt_hud.png`, fullPage: false });
    console.log('Captured quiz modal.');
  }

  await browser.close();
  console.log('ALL REMAINING AUDITS COMPLETE!');
})();
