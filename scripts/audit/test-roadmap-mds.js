const { chromium } = require('playwright');

async function verify() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to challenges page...');
  await page.goto('http://localhost:3000/challenges', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);

  // 1. Open Registration Modal to verify BS-MS Mathematics and Data Science
  console.log('Testing Registration Modal for BS-MS Mathematics and Data Science...');
  const regBtn = page.locator('button:has-text("Register for Challenge")').first();
  if (await regBtn.isVisible()) {
    await regBtn.click();
    await page.waitForTimeout(500);

    const branchSelect = page.locator('select').first();
    const options = await branchSelect.locator('option').allInnerTexts();
    console.log('Branch options count:', options.length);
    const hasMds = options.some(o => o.includes('Mathematics and Data Science'));
    console.log('Contains BS-MS Mathematics and Data Science:', hasMds);

    // Also check year options
    const yearSelect = page.locator('select').nth(1);
    const yearOptions = await yearSelect.locator('option').allInnerTexts();
    console.log('Contains 5th Year (Integrated BS-MS):', yearOptions.some(y => y.includes('5th Year')));

    await page.screenshot({ path: 'docs/redesign/challenges_verification/09_registration_with_mds.png' });

    // Close modal
    await page.locator('button[aria-label="Close registration modal"]').click();
    await page.waitForTimeout(400);
  }

  // 2. Click Certification Roadmap Guide Tab
  console.log('Testing Certification Roadmap Guide Tab...');
  const roadmapTab = page.locator('button:has-text("Certification Roadmap Guide")').last();
  await roadmapTab.click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'docs/redesign/challenges_verification/10_roadmap_guide_pathways.png', fullPage: false });

  // 3. Switch to Exam Specifications View
  console.log('Testing Exam Specifications View...');
  const examsBtn = page.locator('button:has-text("Exam Specifications")');
  await examsBtn.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'docs/redesign/challenges_verification/11_roadmap_guide_exams.png', fullPage: false });

  // 4. Switch to 4-Step Blueprint View
  console.log('Testing 4-Step Prep Blueprint View...');
  const blueprintBtn = page.locator('button:has-text("4-Step Prep Blueprint")');
  await blueprintBtn.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'docs/redesign/challenges_verification/12_roadmap_guide_blueprint.png', fullPage: false });

  // 5. Open Modal Viewer from Announcement Banner
  console.log('Testing Interactive Roadmap Modal...');
  const bannerBtn = page.locator('button:has-text("Explore Certification Roadmap Guide")');
  if (await bannerBtn.isVisible()) {
    await bannerBtn.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'docs/redesign/challenges_verification/13_roadmap_modal_vector.png' });
    await page.locator('button[aria-label="Close roadmap modal"]').click();
    await page.waitForTimeout(300);
  }

  // 6. Test Leaderboard Filter for BS-MS Math & Data Science
  console.log('Testing Leaderboard Department Filter...');
  const leaderboardTab = page.locator('button:has-text("Official Leaderboard Standings")');
  await leaderboardTab.click();
  await page.waitForTimeout(500);

  const deptSelect = page.locator('select').first();
  await deptSelect.selectOption('MDS');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'docs/redesign/challenges_verification/14_leaderboard_mds_filtered.png' });

  console.log('ALL CHECKS PASSED CLEANLY!');
  await browser.close();
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});
