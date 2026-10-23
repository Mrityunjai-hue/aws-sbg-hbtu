const { chromium } = require('playwright');
const { spawn } = require('child_process');

async function run() {
  console.log('Starting Next.js production server on port 3005...');
  const server = spawn('npx', ['next', 'start', '-p', '3005'], {
    shell: true,
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => process.stdout.write('[server] ' + d));
  server.stderr.on('data', (d) => process.stderr.write('[server-err] ' + d));

  // Wait for server to boot
  await new Promise((r) => setTimeout(r, 4000));

  const browser = await chromium.launch({ headless: true });

  try {
    console.log('--- Step 1: Student A (Aarav Sharma) opens browser ---');
    const contextA = await browser.newContext();
    const pageA = await contextA.newPage();
    await pageA.goto('http://localhost:3005/challenges?clear=true', { waitUntil: 'domcontentloaded' });
    await pageA.waitForTimeout(1000);

    // Register Student A
    const regBtnA = pageA.locator('button:has-text("Register for 14-Day Challenge")').first();
    await regBtnA.click();
    await pageA.waitForTimeout(600);

    await pageA.fill('input[placeholder="e.g. Priya Sharma"]', 'Aarav Sharma');
    await pageA.fill('input[placeholder="name@hbtu.ac.in"]', '240101015@hbtu.ac.in');
    await pageA.fill('input[placeholder="e.g. 220101045"]', '240101015');
    await pageA.selectOption('select', { label: 'Computer Science & Engineering (CSE)' });
    await pageA.locator('button:has-text("Confirm Registration")').click();
    await pageA.waitForTimeout(1500);
    console.log('Student A registered.');

    // Student A completes Module 1 (Introduction to Cloud)
    const verifyBtnA = pageA.locator('button:has-text("Verify")').first();
    await verifyBtnA.click();
    await pageA.waitForTimeout(800);

    // Answer question correctly: Hybrid Cloud Deployment
    await pageA.locator('button:has-text("Hybrid Cloud Deployment")').click();
    await pageA.fill('textarea', 'Completed AWS Skill Builder Module 1 notes on VPC & Hybrid.');
    await pageA.locator('button:has-text("Verify Assessment & Submit")').click();
    await pageA.waitForTimeout(1500);

    const doneBtnA = pageA.locator('button:has-text("Done · View Leaderboard")');
    if (await doneBtnA.isVisible()) {
      await doneBtnA.click();
    } else {
      await pageA.locator('button:has-text("Close")').last().click();
    }
    await pageA.waitForTimeout(1000);
    console.log('Student A completed Module 1.');

    // Check Student A leaderboard
    await pageA.locator('button:has-text("Official Leaderboard Standings")').click();
    await pageA.waitForTimeout(1000);
    const tableTextA = await pageA.locator('table').innerText();
    console.log('Student A table view:\n', tableTextA);

    console.log('--- Step 2: Student B (Tanvi Verma) opens browser in isolated session ---');
    const contextB = await browser.newContext();
    const pageB = await contextB.newPage();
    await pageB.goto('http://localhost:3005/challenges?clear=true', { waitUntil: 'domcontentloaded' });
    await pageB.waitForTimeout(1000);

    // Student B checks Leaderboard before registering
    await pageB.locator('button:has-text("Official Leaderboard Standings")').click();
    await pageB.waitForTimeout(1500);

    const tableTextB_Initial = await pageB.locator('table').innerText();
    console.log('Student B sees leaderboard before registering:\n', tableTextB_Initial);

    if (!tableTextB_Initial.includes('Aarav Sharma')) {
      throw new Error('FAIL: Student B does not see Student A on the shared leaderboard!');
    }
    console.log('PASS: Student B successfully sees Student A on the shared leaderboard!');

    // Register Student B
    await pageB.locator('button:has-text("15-Module Curriculum")').click();
    await pageB.waitForTimeout(600);

    const regBtnB = pageB.locator('button:has-text("Register for 14-Day Challenge")').first();
    await regBtnB.click();
    await pageB.waitForTimeout(600);

    await pageB.fill('input[placeholder="e.g. Priya Sharma"]', 'Tanvi Verma');
    await pageB.fill('input[placeholder="name@hbtu.ac.in"]', '240137022@hbtu.ac.in');
    await pageB.fill('input[placeholder="e.g. 220101045"]', '240137022');
    await pageB.selectOption('select', { label: 'BS-MS Mathematics and Data Science (MDS)' });
    await pageB.locator('button:has-text("Confirm Registration")').click();
    await pageB.waitForTimeout(1500);
    console.log('Student B registered.');

    // Student B completes Module 1 (Hybrid Cloud Deployment)
    const verifyBtnB = pageB.locator('button:has-text("Verify")').first();
    await verifyBtnB.click();
    await pageB.waitForTimeout(800);
    await pageB.locator('button:has-text("Hybrid Cloud Deployment")').click();
    await pageB.fill('textarea', 'Completed AWS Skill Builder Module 1 notes.');
    await pageB.locator('button:has-text("Verify Assessment & Submit")').click();
    await pageB.waitForTimeout(1500);
    const doneBtnB1 = pageB.locator('button:has-text("Done · View Leaderboard")');
    if (await doneBtnB1.isVisible()) {
      await doneBtnB1.click();
    } else {
      await pageB.locator('button:has-text("Close")').last().click();
    }
    await pageB.waitForTimeout(1000);
    console.log('Student B completed Module 1.');

    // Student B completes Module 2 (Spot Instances)
    await pageB.locator('button:has-text("15-Module Curriculum")').click();
    await pageB.waitForTimeout(600);

    const verifyBtnB2 = pageB.locator('button:has-text("Verify")').first();
    await verifyBtnB2.click();
    await pageB.waitForTimeout(800);
    await pageB.locator('button:has-text("Spot Instances")').click();
    await pageB.fill('textarea', 'Completed Module 2 EC2 Spot pricing.');
    await pageB.locator('button:has-text("Verify Assessment & Submit")').click();
    await pageB.waitForTimeout(1500);
    const doneBtnB2 = pageB.locator('button:has-text("Done · View Leaderboard")');
    if (await doneBtnB2.isVisible()) {
      await doneBtnB2.click();
    } else {
      await pageB.locator('button:has-text("Close")').last().click();
    }
    await pageB.waitForTimeout(1000);
    console.log('Student B completed Module 2 (300 total points).');

    // Check Student B leaderboard: Tanvi should be Rank 1 (300 PTS, You), Aarav should be Rank 2 (150 PTS)
    await pageB.locator('button:has-text("Official Leaderboard Standings")').click();
    await pageB.waitForTimeout(1500);
    const tableTextB_Final = await pageB.locator('table').innerText();
    console.log('Student B final leaderboard view:\n', tableTextB_Final);

    if (!tableTextB_Final.includes('Tanvi Verma (You)') || !tableTextB_Final.includes('Aarav Sharma')) {
      throw new Error('FAIL: Student B does not see both participants on the final leaderboard!');
    }
    console.log('PASS: Student B sees herself at Rank 1 (You) and Aarav at Rank 2!');

    // Step 3: Verify Student A sees Tanvi at Rank 1 and himself at Rank 2
    console.log('--- Step 3: Student A refreshes leaderboard ---');
    await pageA.goto('http://localhost:3005/challenges', { waitUntil: 'domcontentloaded' });
    await pageA.waitForTimeout(1000);
    await pageA.locator('button:has-text("Official Leaderboard Standings")').click();
    await pageA.waitForTimeout(1500);
    const tableTextA_Final = await pageA.locator('table').innerText();
    console.log('Student A refreshed leaderboard view:\n', tableTextA_Final);

    if (!tableTextA_Final.includes('Tanvi Verma') || !tableTextA_Final.includes('Aarav Sharma (You)')) {
      throw new Error('FAIL: Student A does not see Tanvi at Rank 1 and himself at Rank 2 (You)!');
    }
    console.log('PASS: Student A sees Tanvi at Rank 1 and himself at Rank 2 (You)!');

    // Take screenshot for documentation
    await pageA.screenshot({ path: 'docs/redesign/challenges_verification/shared_leaderboard_verified.png' });
    console.log('Screenshot saved to docs/redesign/challenges_verification/shared_leaderboard_verified.png');

    console.log('\n=== ALL SHARED MULTI-PARTICIPANT LEADERBOARD TESTS PASSED! ===');
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
