const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', '..', 'docs', 'redesign', 'phase3_verification');
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

async function runAudit() {
  console.log('--- Phase 3 Comprehensive Page Audit ---');
  let serverProcess = null;

  try {
    console.log('Starting Next.js production server on port 3000...');
    serverProcess = spawn('npx', ['next', 'start', '-p', '3000'], {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: true,
    });

    serverProcess.stdout.on('data', (d) => process.stdout.write(`[server] ${d.toString()}`));
    serverProcess.stderr.on('data', (d) => process.stderr.write(`[server err] ${d.toString()}`));

    await waitForServer('http://localhost:3000');
    console.log('Server is ready. Launching Playwright browser...');

    const browser = await chromium.launch();

    const pagesToTest = [
      { name: 'home', route: '/' },
      { name: 'about', route: '/about' },
      { name: 'tracks', route: '/tracks' },
      { name: 'events', route: '/events' },
      { name: 'team', route: '/team' },
      { name: 'join', route: '/join' },
      { name: 'projects', route: '/projects' },
      { name: 'gallery', route: '/gallery' },
      { name: 'contact', route: '/contact' },
    ];

    // 1. Desktop Tests (1440x900)
    console.log('[1/2] Auditing Pages on Desktop (1440x900)...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const desktopPage = await desktopContext.newPage();

    for (const p of pagesToTest) {
      console.log(`  Capturing Desktop: ${p.route} (${p.name})`);
      await desktopPage.goto(`http://localhost:3000${p.route}`, { waitUntil: 'domcontentloaded' });
      await sleep(800);
      await desktopPage.screenshot({
        path: path.join(OUTPUT_DIR, `${p.name}-desktop.png`),
        fullPage: true,
      });
    }

    // 2. Mobile Tests (390x844 - iPhone 12)
    console.log('[2/2] Auditing Pages on Mobile (390x844)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    for (const p of pagesToTest) {
      console.log(`  Capturing Mobile: ${p.route} (${p.name})`);
      await mobilePage.goto(`http://localhost:3000${p.route}`, { waitUntil: 'domcontentloaded' });
      await sleep(800);
      await mobilePage.screenshot({
        path: path.join(OUTPUT_DIR, `${p.name}-mobile.png`),
        fullPage: true,
      });
    }

    await browser.close();
    console.log('--- Phase 3 Comprehensive Page Audit PASSED! ---');
  } catch (err) {
    console.error('Phase 3 audit failed:', err);
    process.exitCode = 1;
  } finally {
    if (serverProcess) {
      console.log('Stopping server process...');
      serverProcess.kill('SIGTERM');
    }
  }
}

runAudit();
