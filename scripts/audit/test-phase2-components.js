const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', '..', 'docs', 'redesign', 'phase2_verification');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 200 || res.status === 304) {
        return true;
      }
    } catch (e) {
      // server not ready yet
    }
    await sleep(500);
  }
  throw new Error(`Server did not respond at ${url} within ${timeoutMs}ms`);
}

async function runTest() {
  console.log('--- Phase 2 Component Library Verification ---');
  let serverProcess = null;

  try {
    console.log('Starting Next.js production server on port 3000...');
    serverProcess = spawn('npx', ['next', 'start', '-p', '3000'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true,
    });

    serverProcess.stdout.on('data', (d) => process.stdout.write(`[server] ${d.toString()}`));
    serverProcess.stderr.on('data', (d) => process.stderr.write(`[server err] ${d.toString()}`));

    await waitForServer('http://localhost:3000/styleguide');
    console.log('Server is ready. Launching Playwright browser...');

    const browser = await chromium.launch();

    // 1. Desktop Check (1440x900)
    console.log('[1/4] Testing Styleguide Showcase on Desktop (1440x900)...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto('http://localhost:3000/styleguide', { waitUntil: 'domcontentloaded' });
    await desktopPage.waitForSelector('text=AWS SBG HBTU Component Library', { timeout: 10000 });
    await sleep(1000);

    await desktopPage.screenshot({
      path: path.join(OUTPUT_DIR, 'styleguide-desktop-full.png'),
      fullPage: true,
    });

    // Test Tabs interaction
    console.log('[2/4] Testing Interactive Tabs...');
    const devopsTab = desktopPage.locator('button:has-text("DevOps & CI/CD")');
    await devopsTab.click();
    await sleep(400);
    const isSelected = await devopsTab.getAttribute('aria-selected');
    if (isSelected !== 'true') throw new Error('Tabs interaction failed: tab not selected');
    console.log('  ✓ Tabs switching passed!');

    // Test FAQ Accordion interaction
    console.log('[3/4] Testing FAQ Accordion Toggle...');
    const faqHeader = desktopPage.locator('button:has-text("Who can join the AWS Student Builder Group")');
    await faqHeader.click();
    await sleep(500);
    const faqExpanded = await faqHeader.getAttribute('aria-expanded');
    if (faqExpanded !== 'true') throw new Error('FAQ toggle failed: not expanded');
    console.log('  ✓ FAQ Accordion toggle passed!');

    await desktopPage.screenshot({
      path: path.join(OUTPUT_DIR, 'styleguide-desktop-interactive.png'),
    });

    // 2. Mobile Check (390x844 - iPhone 12)
    console.log('[4/4] Testing Styleguide Showcase on Mobile (390x844)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:3000/styleguide', { waitUntil: 'domcontentloaded' });
    await mobilePage.waitForSelector('text=AWS SBG HBTU Component Library', { timeout: 10000 });
    await sleep(1000);

    await mobilePage.screenshot({
      path: path.join(OUTPUT_DIR, 'styleguide-mobile-full.png'),
      fullPage: true,
    });

    await browser.close();
    console.log('--- Phase 2 Component Library Verification PASSED! ---');
  } catch (err) {
    console.error('Phase 2 test failed:', err);
    process.exitCode = 1;
  } finally {
    if (serverProcess) {
      console.log('Stopping server process...');
      serverProcess.kill('SIGTERM');
    }
  }
}

runTest();
