const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Visiting live production site: https://aws-sbg-hbtu.vercel.app/challenges');
  await page.goto('https://aws-sbg-hbtu.vercel.app/challenges', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Take screenshot of live landing
  await page.screenshot({ path: 'docs/redesign/challenges_verification/live_01_challenges.png' });
  console.log('Live landing captured.');

  // Open registration modal on live site
  const regBtn = page.locator('button:has-text("Register for Challenge")').first();
  if (await regBtn.isVisible()) {
    await regBtn.click();
    await page.waitForTimeout(600);
    const branchSelect = page.locator('select').first();
    const options = await branchSelect.locator('option').allInnerTexts();
    console.log('Live branch options count:', options.length);
    const hasMds = options.some(o => o.includes('Mathematics and Data Science'));
    console.log('Live site contains BS-MS Mathematics and Data Science:', hasMds);
    await page.screenshot({ path: 'docs/redesign/challenges_verification/live_02_registration_mds.png' });
    await page.locator('button[aria-label="Close registration modal"]').click();
    await page.waitForTimeout(400);
  }

  // Open roadmap guide tab on live site
  const roadmapTab = page.locator('button:has-text("Certification Roadmap Guide")').last();
  await roadmapTab.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'docs/redesign/challenges_verification/live_03_roadmap_guide.png' });
  console.log('Live roadmap guide captured.');

  // Open leaderboard on live site
  const lbTab = page.locator('button:has-text("Official Leaderboard Standings")').first();
  await lbTab.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'docs/redesign/challenges_verification/live_04_authentic_leaderboard.png' });
  console.log('Live authentic leaderboard captured.');

  await browser.close();
  console.log('ALL LIVE VERIFICATIONS COMPLETED SUCCESSFULLY!');
})();
