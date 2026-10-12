const { chromium, devices } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const OUT_DIR = path.join(process.cwd(), 'docs', 'redesign', 'phase1_verification');

async function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.status === 200) return true;
    } catch (e) {
      // wait
    }
    await new Promise(r => setTimeout(r, 500));
  }
  throw new Error(`Server did not respond at ${url} within ${timeout}ms`);
}

async function runPhase1Tests() {
  console.log('--- Phase 1 Navigation & Shell Playwright Verification ---');
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log('Starting next start on port', PORT, '...');
  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    shell: true,
    stdio: 'pipe',
  });

  server.stdout.on('data', d => process.stdout.write(`[server] ${d}`));
  server.stderr.on('data', d => process.stderr.write(`[server-err] ${d}`));

  try {
    await waitForServer(BASE_URL, 20000);
    console.log('Next.js server is ready at', BASE_URL);

    const browser = await chromium.launch({ headless: true });

    // 1. Desktop Test (1440x900)
    console.log('\n[1/3] Testing Desktop Floating Island Navbar & Dropdowns...');
    const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const desktopPage = await desktopCtx.newPage();

    await desktopPage.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await desktopPage.waitForTimeout(1000);

    // Verify brand logo exists
    const brand = await desktopPage.$('header a[aria-label="AWS Student Builder Group HBTU Home"]');
    if (!brand) throw new Error('Desktop header brand logo not found');

    // Screenshot Desktop Header
    await desktopPage.screenshot({
      path: path.join(OUT_DIR, 'desktop_header_foundation.png'),
      clip: { x: 0, y: 0, width: 1440, height: 100 },
    });

    // Test Community Dropdown
    const communityBtn = await desktopPage.$('button:has-text("Community")');
    if (!communityBtn) throw new Error('Community dropdown button not found');
    await communityBtn.click();
    await desktopPage.waitForTimeout(400);

    // Verify dropdown items
    const projectsLink = await desktopPage.$('a[href="/projects"]');
    const challengesLink = await desktopPage.$('a[href="/challenges"]');
    const blogLink = await desktopPage.$('a[href="/blog"]');
    if (!projectsLink || !challengesLink || !blogLink) {
      throw new Error('Community dropdown items missing');
    }

    await desktopPage.screenshot({
      path: path.join(OUT_DIR, 'desktop_community_dropdown_open.png'),
      clip: { x: 400, y: 0, width: 640, height: 350 },
    });

    // Test Theme Toggle
    console.log('\n[2/3] Testing Theme Toggle...');
    const themeBtn = await desktopPage.$('header button[aria-label*="theme" i]');
    if (!themeBtn) throw new Error('Theme toggle button not found');

    const initialLight = await desktopPage.evaluate(() => document.documentElement.classList.contains('light'));
    await themeBtn.click();
    await desktopPage.waitForTimeout(300);
    const toggledLight = await desktopPage.evaluate(() => document.documentElement.classList.contains('light'));
    if (initialLight === toggledLight) {
      throw new Error('Theme toggle did not update documentElement classList');
    }

    // Toggle back to dark
    await themeBtn.click();
    await desktopPage.waitForTimeout(300);

    // Screenshot Desktop Footer
    const footer = await desktopPage.$('footer');
    if (!footer) throw new Error('Footer not found');
    await desktopPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await desktopPage.waitForTimeout(500);
    await desktopPage.screenshot({
      path: path.join(OUT_DIR, 'desktop_footer_foundation.png'),
    });

    await desktopCtx.close();

    // 2. Mobile Drawer Test (390x844 iPhone 12)
    console.log('\n[3/3] Testing Mobile Header & Slide-in Drawer...');
    const iPhone = devices['iPhone 12'];
    const mobileCtx = await browser.newContext({ ...iPhone });
    const mobilePage = await mobileCtx.newPage();

    await mobilePage.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await mobilePage.waitForTimeout(1000);

    // Check that desktop pill is hidden
    const desktopPillHidden = await mobilePage.evaluate(() => {
      const nav = document.querySelector('header nav');
      if (!nav) return true;
      return window.getComputedStyle(nav).display === 'none';
    });
    if (!desktopPillHidden) throw new Error('Desktop navigation pill is not hidden on mobile');

    // Click Hamburger Button
    const hamburgerBtn = await mobilePage.$('header button[aria-label="Open mobile navigation menu"]');
    if (!hamburgerBtn) throw new Error('Hamburger menu button not found on mobile');
    await hamburgerBtn.click();
    await mobilePage.waitForTimeout(500);

    // Check that drawer opened
    const drawer = await mobilePage.$('[role="dialog"][aria-label="Mobile Navigation Menu"]');
    if (!drawer) throw new Error('Mobile drawer did not open');

    await mobilePage.screenshot({
      path: path.join(OUT_DIR, 'mobile_drawer_open.png'),
      fullPage: false,
    });

    // Check drawer navigation items count
    const drawerLinksCount = await mobilePage.evaluate(() => {
      const d = document.querySelector('[role="dialog"]');
      return d ? d.querySelectorAll('nav a').length : 0;
    });
    console.log(`Found ${drawerLinksCount} navigation links in mobile drawer`);
    if (drawerLinksCount < 10) throw new Error(`Expected at least 10 mobile drawer links, found ${drawerLinksCount}`);

    // Close Drawer
    const closeBtn = await mobilePage.$('[role="dialog"] button[aria-label="Close menu"]');
    if (!closeBtn) throw new Error('Drawer close button not found');
    await closeBtn.click();
    await mobilePage.waitForTimeout(400);

    const isClosed = await mobilePage.$('[role="dialog"]');
    if (isClosed) throw new Error('Drawer did not close when close button was clicked');

    await mobilePage.screenshot({
      path: path.join(OUT_DIR, 'mobile_header_closed.png'),
      clip: { x: 0, y: 0, width: 390, height: 100 },
    });

    await mobileCtx.close();
    await browser.close();

    console.log('\n--- Phase 1 Navigation & Shell Verification PASSED! ---');
  } finally {
    console.log('Shutting down server...');
    server.kill();
  }
}

runPhase1Tests().catch(err => {
  console.error('Phase 1 test failed:', err);
  process.exit(1);
});
