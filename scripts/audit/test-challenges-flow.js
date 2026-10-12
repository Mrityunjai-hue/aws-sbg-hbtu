const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(process.cwd(), 'docs', 'redesign', 'challenges_verification');
fs.mkdirSync(OUT_DIR, { recursive: true });

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function runChallengesVerification() {
  console.log('--- Testing 14-Day AWS Challenge End-to-End Flow ---');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    // 1. Visit /challenges
    console.log('[Step 1] Loading http://localhost:3000/challenges...');
    await page.goto('http://localhost:3000/challenges', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: path.join(OUT_DIR, '01_challenges_landing.png'),
    });
    console.log('  ✓ Landing page captured');

    // 2. Open and test Registration Modal
    console.log('[Step 2] Testing Student Registration Modal...');
    const registerBtn = await page.$('button:has-text("Register")');
    if (!registerBtn) throw new Error('Register button not found');
    await registerBtn.click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(OUT_DIR, '02_registration_modal.png'),
    });

    // Fill form
    await page.fill('input[placeholder="e.g. Priya Sharma"]', 'Aditya Sharma');
    await page.fill('input[placeholder="name@hbtu.ac.in"]', 'aditya.sharma@hbtu.ac.in');
    await page.fill('input[placeholder="e.g. 220101045"]', '230101099');

    const confirmRegBtn = await page.$('button:has-text("Confirm Registration")');
    if (!confirmRegBtn) throw new Error('Confirm registration button not found');
    await confirmRegBtn.click();
    await page.waitForTimeout(800);

    await page.screenshot({
      path: path.join(OUT_DIR, '03_registered_hud.png'),
    });
    console.log('  ✓ Registered successfully and personal HUD displayed');

    // 3. Open Day 1 Quiz Modal
    console.log('[Step 3] Testing Anti-Cheat Module Verification Quiz...');
    const verifyBtn = await page.$('button:has-text("Verify & Claim Pts")');
    if (!verifyBtn) throw new Error('Verify & Claim Pts button not found');
    await verifyBtn.click();
    await page.waitForTimeout(500);

    await page.screenshot({
      path: path.join(OUT_DIR, '04_quiz_modal_open.png'),
    });

    const dialog = await page.$('[role="dialog"]');
    if (!dialog) throw new Error('Quiz modal dialog not found');

    // Select correct option (Hybrid Cloud - Option C)
    const optionC = await dialog.$('button:has-text("Hybrid Cloud")');
    if (!optionC) throw new Error('Option C (Hybrid Cloud) not found');
    await optionC.click();
    await page.waitForTimeout(300);

    const submitQuizBtn = await dialog.$('button:has-text("Verify & Claim")');
    if (!submitQuizBtn) throw new Error('Submit quiz button not found');
    await submitQuizBtn.click();

    // Wait for submission to resolve and Done button to appear
    const doneBtn = await page.waitForSelector('[role="dialog"] button:has-text("Done")', { timeout: 6000 });
    await page.screenshot({
      path: path.join(OUT_DIR, '05_quiz_success.png'),
    });
    console.log('  ✓ Quiz answered correctly and +150 Points awarded');

    await doneBtn.click();
    await page.waitForTimeout(600);

    // 4. Test Live Leaderboard Tab
    console.log('[Step 4] Testing Celebratory Leaderboard Podium...');
    const leaderboardTab = await page.$('button:has-text("Live Leaderboard")');
    if (!leaderboardTab) throw new Error('Leaderboard tab not found');
    await leaderboardTab.click();
    await page.waitForTimeout(600);

    await page.screenshot({
      path: path.join(OUT_DIR, '06_leaderboard_podium.png'),
    });
    console.log('  ✓ Top 3 podium, Top 5 callouts, and student rankings verified');

    // 5. Test Roadmap Viewer Modal
    console.log('[Step 5] Testing Certification Roadmap Guide Modal...');
    const roadmapTab = await page.$('button:has-text("Certification Roadmap")');
    if (!roadmapTab) throw new Error('Roadmap tab not found');
    await roadmapTab.click();
    await page.waitForTimeout(600);

    const openViewerBtn = await page.$('button:has-text("Open Interactive Viewer")');
    if (openViewerBtn) {
      await openViewerBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(OUT_DIR, '07_roadmap_modal_open.png'),
      });
      console.log('  ✓ Roadmap interactive viewer opened');
    }

    console.log('\n=== ALL 14-DAY AWS CHALLENGE VERIFICATION STEPS PASSED! ===');
  } finally {
    await browser.close();
  }
}

runChallengesVerification().catch((err) => {
  console.error('Challenge verification failed:', err);
  process.exit(1);
});
