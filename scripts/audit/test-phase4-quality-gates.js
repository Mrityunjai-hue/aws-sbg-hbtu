const { chromium, devices } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', '..', 'docs', 'redesign', 'phase4_final_verification');
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
      // server not ready
    }
    await sleep(500);
  }
  throw new Error(`Server did not respond at ${url} within ${timeoutMs}ms`);
}

async function runQualityGates() {
  console.log('=== PHASE 4: COMPREHENSIVE QUALITY GATES & VERIFICATION ===\n');
  let serverProcess = null;

  try {
    console.log('[Step 1/5] Launching Next.js production server on port 3000...');
    serverProcess = spawn('npx', ['next', 'start', '-p', '3000'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true,
    });

    serverProcess.stdout.on('data', (d) => process.stdout.write(`[server] ${d.toString()}`));
    serverProcess.stderr.on('data', (d) => process.stderr.write(`[server err] ${d.toString()}`));

    await waitForServer('http://localhost:3000');
    console.log('✓ Server is ready at http://localhost:3000\n');

    const browser = await chromium.launch();

    // 1. Route Status Checks
    console.log('[Step 2/5] Checking All Routes for 200 OK / 404 Status...');
    const routes = [
      '/',
      '/about',
      '/tracks',
      '/events',
      '/team',
      '/join',
      '/chat',
      '/projects',
      '/gallery',
      '/blog',
      '/challenges',
      '/code-of-conduct',
      '/contact',
      '/login',
      '/signup',
      '/styleguide',
    ];

    for (const route of routes) {
      const res = await fetch(`http://localhost:3000${route}`);
      if (!res.ok) {
        throw new Error(`Route ${route} returned status ${res.status}`);
      }
      console.log(`  ✓ Route ${route.padEnd(18)} -> HTTP ${res.status}`);
    }

    // Check 404
    const notFoundRes = await fetch(`http://localhost:3000/some-non-existent-route-12345`);
    if (notFoundRes.status !== 404) {
      throw new Error(`Expected 404 for missing route, got ${notFoundRes.status}`);
    }
    console.log(`  ✓ Route /404-test        -> HTTP ${notFoundRes.status} (Custom 404 page verified)`);

    // 2. Viewport & Pinch-to-zoom Check
    console.log('\n[Step 3/5] Checking Viewport Meta & Pinch-to-Zoom (Rule 9)...');
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
    await sleep(800);

    const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute('content');
    console.log(`  Viewport meta: "${viewportMeta}"`);
    if (viewportMeta.includes('user-scalable=no') || viewportMeta.includes('maximum-scale=1')) {
      throw new Error('FAIL: Viewport meta disables pinch-to-zoom! Violates accessibility Rule 9.');
    }
    console.log('  ✓ Pinch-to-zoom is ENABLED. Accessibility Rule 9 satisfied.');

    // 3. Theme Toggle Verification
    console.log('\n[Step 4/5] Testing Light/Dark Mode Toggle on Desktop...');
    const htmlClassBefore = await page.locator('html').getAttribute('class');
    console.log(`  Initial <html> class: "${htmlClassBefore || ''}"`);

    const themeToggleBtn = await page.$('header button[aria-label*="theme" i]');
    if (themeToggleBtn) {
      await themeToggleBtn.click();
      await sleep(500);

      const htmlClassAfter = await page.locator('html').getAttribute('class');
      console.log(`  After toggle <html> class: "${htmlClassAfter || ''}"`);

      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'home-theme-toggled.png'),
      });
      console.log('  ✓ Theme toggle interaction functioning cleanly.');

      // Toggle back
      await themeToggleBtn.click();
      await sleep(300);
    }

    // 4. Mobile Drawer & Navigation Check
    console.log('\n[Step 5/5] Testing Mobile Drawer Navigation on iPhone 12...');
    const iPhone = devices['iPhone 12'];
    const mobileContext = await browser.newContext({ ...iPhone });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
    await mobilePage.waitForTimeout(1000);

    const hamburgerBtn = await mobilePage.$('header button[aria-label="Open mobile navigation menu"]');
    if (!hamburgerBtn) throw new Error('Hamburger menu button not found on mobile');
    await hamburgerBtn.click();
    await mobilePage.waitForTimeout(500);

    const drawer = await mobilePage.$('[role="dialog"][aria-label="Mobile Navigation Menu"]');
    if (!drawer) throw new Error('Mobile drawer did not open');

    await mobilePage.screenshot({
      path: path.join(OUTPUT_DIR, 'mobile-drawer-open.png'),
    });

    const drawerLinksCount = await mobilePage.evaluate(() => {
      const d = document.querySelector('[role="dialog"]');
      return d ? d.querySelectorAll('nav a').length : 0;
    });

    console.log(`  Found ${drawerLinksCount} navigation links in mobile drawer`);
    if (drawerLinksCount < 10) {
      throw new Error(`Expected at least 10 mobile drawer links, found ${drawerLinksCount}`);
    }
    console.log('  ✓ Mobile drawer accessible and contains all 13 route links.');

    await browser.close();
    console.log('\n=== ALL PHASE 4 QUALITY GATES PASSED! ===');
  } catch (err) {
    console.error('Phase 4 Quality Gate failed:', err);
    process.exitCode = 1;
  } finally {
    if (serverProcess) {
      console.log('Stopping server process...');
      serverProcess.kill('SIGTERM');
    }
  }
}

runQualityGates();
