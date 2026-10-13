const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const dir = 'docs/redesign/phase5_black_green_verification';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Testing Homepage on http://localhost:3005...');
  await page.goto('http://localhost:3005', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${dir}/01_homepage_hero_black_green.png`, fullPage: false });
  console.log('Homepage hero captured.');

  // Click on Cloud Architecture node
  const bedrockBtn = page.locator('button:has-text("Amazon Bedrock")').first();
  if (await bedrockBtn.isVisible()) {
    await bedrockBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${dir}/02_cloud_architecture_interactive.png`, fullPage: false });
    console.log('Bedrock node inspection captured.');
  }

  // Toggle Telemetry HUD
  const hudBtn = page.locator('button:has-text("Telemetry HUD")').first();
  if (await hudBtn.isVisible()) {
    await hudBtn.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${dir}/03_telemetry_hud.png`, fullPage: false });
    console.log('Telemetry HUD captured.');
  }

  // Visit Challenges page
  console.log('Testing Challenges page...');
  await page.goto('http://localhost:3005/challenges', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${dir}/04_challenges_black_green.png`, fullPage: false });
  console.log('Challenges page captured.');

  // Visit Tracks page
  console.log('Testing Tracks page...');
  await page.goto('http://localhost:3005/tracks', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${dir}/05_tracks_black_green.png`, fullPage: false });
  console.log('Tracks page captured.');

  // Visit Events page
  console.log('Testing Events page...');
  await page.goto('http://localhost:3005/events', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${dir}/06_events_black_green.png`, fullPage: false });
  console.log('Events page captured.');

  await browser.close();
  console.log('ALL VERIFICATION SCREENSHOTS SAVED SUCCESSFULLY!');
})();
