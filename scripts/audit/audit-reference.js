const { chromium, webkit, devices } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://awssbggeu.com';
const OUT_DIR = path.join(process.cwd(), 'docs', 'redesign', 'reference');

// Core routes to audit
const ROUTES = [
  '/',
  '/about',
  '/projects',
  '/events',
  '/challenges',
  '/team',
  '/blog',
  '/gallery',
  '/contact',
  '/code-of-conduct'
];

async function smoothScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          setTimeout(resolve, 500);
        }
      }, 100);
    });
  });
  await page.waitForTimeout(500);
}

async function captureScrollPositions(page, namePrefix, outFolder) {
  const scrollSteps = [0, 25, 50, 75, 100];
  for (const pct of scrollSteps) {
    await page.evaluate((p) => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      window.scrollTo(0, (maxScroll * p) / 100);
    }, pct);
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(outFolder, `${namePrefix}_scroll_${pct}pct.png`),
      fullPage: false,
    });
  }
  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
}

async function extractPageStructure(page, route) {
  return await page.evaluate((r) => {
    const sections = Array.from(document.querySelectorAll('main > section, #root > div > section, #root > div > div > section, main > div, #root section'));
    const sectionData = sections.map((sec, idx) => {
      const h = sec.querySelector('h1, h2, h3, h4');
      const headingText = h ? h.innerText.trim() : '';
      const textSnippet = sec.innerText.trim().slice(0, 150).replace(/\n/g, ' ');
      const grid = window.getComputedStyle(sec).display;
      const cards = sec.querySelectorAll('.rounded-2xl, .rounded-xl, [class*="card"]');
      const buttons = sec.querySelectorAll('button, a[class*="btn"]');
      return {
        index: idx + 1,
        id: sec.id || '',
        className: sec.className,
        heading: headingText,
        snippet: textSnippet,
        display: grid,
        cardsCount: cards.length,
        buttonsCount: buttons.length,
      };
    });

    return {
      route: r,
      title: document.title,
      sectionsCount: sections.length,
      sections: sectionData,
    };
  }, route);
}

async function runReferenceAudit() {
  console.log('--- Starting Reference Audit (Playwright) ---');
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const screenshotsDir = path.join(OUT_DIR, 'screenshots');
  const videosDir = path.join(OUT_DIR, 'videos');
  fs.mkdirSync(screenshotsDir, { recursive: true });
  fs.mkdirSync(videosDir, { recursive: true });

  const structureResults = {};

  // 1. Desktop Chromium 1440x900 (Dark & Light)
  console.log('\n[1/6] Running Chromium Desktop 1440x900...');
  const browserChromium = await chromium.launch({ headless: true });
  
  // Context with video recording
  const ctxDesktopDark = await browserChromium.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
    recordVideo: { dir: videosDir, size: { width: 1440, height: 900 } }
  });
  
  const pageDesktopDark = await ctxDesktopDark.newPage();

  // Test home and extract navigation study
  console.log('Auditing Reference Home (Desktop Dark)...');
  await pageDesktopDark.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await pageDesktopDark.waitForTimeout(2000);
  await pageDesktopDark.evaluate(() => document.documentElement.classList.add('dark'));
  await smoothScroll(pageDesktopDark);

  // Capture Home full page and scroll steps
  await pageDesktopDark.screenshot({
    path: path.join(screenshotsDir, 'ref_home_1440_dark_full.png'),
    fullPage: true,
  });
  await captureScrollPositions(pageDesktopDark, 'ref_home_1440_dark', screenshotsDir);

  // Extract home structure
  structureResults['/'] = await extractPageStructure(pageDesktopDark, '/');

  // Study Navigation (Desktop)
  const navStudy = await pageDesktopDark.evaluate(() => {
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const headerCS = header ? window.getComputedStyle(header) : null;
    return {
      headerSticky: headerCS ? headerCS.position : 'unknown',
      headerZIndex: headerCS ? headerCS.zIndex : 'unknown',
      navItems: nav ? Array.from(nav.querySelectorAll('a')).map(a => ({
        text: a.innerText.trim(),
        href: a.getAttribute('href'),
        className: a.className,
      })) : [],
    };
  });
  fs.writeFileSync(path.join(OUT_DIR, 'nav_study_desktop.json'), JSON.stringify(navStudy, null, 2));

  // Test sticky header by scrolling down 600px and checking screenshot
  await pageDesktopDark.evaluate(() => window.scrollTo(0, 600));
  await pageDesktopDark.waitForTimeout(300);
  await pageDesktopDark.screenshot({
    path: path.join(screenshotsDir, 'ref_header_scrolled_sticky_1440.png'),
    clip: { x: 0, y: 0, width: 1440, height: 120 }
  });
  await pageDesktopDark.evaluate(() => window.scrollTo(0, 0));

  // Audit remaining routes on desktop dark
  for (const route of ROUTES.slice(1)) {
    console.log(`Auditing ${route} on Desktop Dark...`);
    try {
      await pageDesktopDark.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 35000 });
      await pageDesktopDark.waitForTimeout(2000);
      await pageDesktopDark.evaluate(() => document.documentElement.classList.add('dark'));
      await smoothScroll(pageDesktopDark);

      const safeName = route.replace('/', '').replace(/-/g, '_') || 'home';
      await pageDesktopDark.screenshot({
        path: path.join(screenshotsDir, `ref_${safeName}_1440_dark_full.png`),
        fullPage: true,
      });
      await captureScrollPositions(pageDesktopDark, `ref_${safeName}_1440_dark`, screenshotsDir);
      structureResults[route] = await extractPageStructure(pageDesktopDark, route);
    } catch (e) {
      console.warn(`Could not audit route ${route}:`, e.message);
    }
  }

  await ctxDesktopDark.close(); // Saves video

  // Desktop Light Home check
  console.log('\n[2/6] Running Chromium Desktop 1440x900 (Light Mode)...');
  const ctxDesktopLight = await browserChromium.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'light',
  });
  const pageDesktopLight = await ctxDesktopLight.newPage();
  await pageDesktopLight.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await pageDesktopLight.waitForTimeout(2000);
  await pageDesktopLight.evaluate(() => document.documentElement.classList.remove('dark'));
  await pageDesktopLight.screenshot({
    path: path.join(screenshotsDir, 'ref_home_1440_light_full.png'),
    fullPage: true,
  });
  await ctxDesktopLight.close();

  // Desktop Reduced Motion run
  console.log('\n[3/6] Running Chromium Desktop with reducedMotion="reduce"...');
  const ctxReducedMotion = await browserChromium.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const pageReducedMotion = await ctxReducedMotion.newPage();
  await pageReducedMotion.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await pageReducedMotion.waitForTimeout(2000);
  await pageReducedMotion.screenshot({
    path: path.join(screenshotsDir, 'ref_home_1440_reduced_motion.png'),
    fullPage: true,
  });
  await ctxReducedMotion.close();

  // Tablet Landscape 1024x768 & Tablet Portrait 768x1024
  console.log('\n[4/6] Running Tablet Viewports (1024x768 and 768x1024)...');
  const ctxTablet1024 = await browserChromium.newContext({
    viewport: { width: 1024, height: 768 },
    recordVideo: { dir: videosDir, size: { width: 1024, height: 768 } }
  });
  const pageTablet1024 = await ctxTablet1024.newPage();
  await pageTablet1024.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  await pageTablet1024.waitForTimeout(2000);
  await smoothScroll(pageTablet1024);
  await pageTablet1024.screenshot({
    path: path.join(screenshotsDir, 'ref_home_1024_dark_full.png'),
    fullPage: true,
  });
  await ctxTablet1024.close();

  const ctxTablet768 = await browserChromium.newContext({
    viewport: { width: 768, height: 1024 },
    recordVideo: { dir: videosDir, size: { width: 768, height: 1024 } }
  });
  const pageTablet768 = await ctxTablet768.newPage();
  await pageTablet768.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  await pageTablet768.waitForTimeout(2000);
  await smoothScroll(pageTablet768);
  await pageTablet768.screenshot({
    path: path.join(screenshotsDir, 'ref_home_768_dark_full.png'),
    fullPage: true,
  });
  await ctxTablet768.close();

  // Mobile 390x844 (iPhone 12 profile)
  console.log('\n[5/6] Running Mobile 390x844 (iPhone Profile)...');
  const iPhone = devices['iPhone 12'];
  const ctxMobile = await browserChromium.newContext({
    ...iPhone,
    colorScheme: 'dark',
    recordVideo: { dir: videosDir, size: { width: 390, height: 844 } }
  });
  const pageMobile = await ctxMobile.newPage();
  await pageMobile.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await pageMobile.waitForTimeout(2000);
  await pageMobile.evaluate(() => document.documentElement.classList.add('dark'));
  await smoothScroll(pageMobile);

  await pageMobile.screenshot({
    path: path.join(screenshotsDir, 'ref_home_390_dark_full.png'),
    fullPage: true,
  });
  await captureScrollPositions(pageMobile, 'ref_home_390_dark', screenshotsDir);

  // Mobile Menu Study (Open and Closed states)
  console.log('Testing mobile menu drawer...');
  await pageMobile.screenshot({
    path: path.join(screenshotsDir, 'ref_mobile_menu_closed.png'),
    fullPage: false,
  });

  const menuButton = await pageMobile.$('button[aria-label*="menu" i], button.xl\\:hidden, header button:last-child');
  if (menuButton) {
    await menuButton.click();
    await pageMobile.waitForTimeout(600);
    await pageMobile.screenshot({
      path: path.join(screenshotsDir, 'ref_mobile_menu_open.png'),
      fullPage: false,
    });
    // Extract mobile menu items
    const mobileMenuItems = await pageMobile.evaluate(() => {
      const drawer = document.querySelector('[role="dialog"], aside, [class*="drawer"], [class*="menu"], [class*="fixed"]');
      if (!drawer) return [];
      return Array.from(drawer.querySelectorAll('a, button')).map(el => ({
        tag: el.tagName,
        text: el.innerText.trim(),
        href: el.getAttribute('href') || '',
        className: el.className,
      }));
    });
    fs.writeFileSync(path.join(OUT_DIR, 'nav_study_mobile.json'), JSON.stringify(mobileMenuItems, null, 2));
  }

  // Mobile Light Mode
  await ctxMobile.close();
  const ctxMobileLight = await browserChromium.newContext({
    ...iPhone,
    colorScheme: 'light',
  });
  const pageMobileLight = await ctxMobileLight.newPage();
  await pageMobileLight.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  await pageMobileLight.waitForTimeout(2000);
  await pageMobileLight.evaluate(() => document.documentElement.classList.remove('dark'));
  await pageMobileLight.screenshot({
    path: path.join(screenshotsDir, 'ref_home_390_light_full.png'),
    fullPage: true,
  });
  await ctxMobileLight.close();

  await browserChromium.close();

  // 6. WebKit run at 1440 and 390
  console.log('\n[6/6] Running WebKit at 1440x900 and 390x844...');
  const browserWebKit = await webkit.launch({ headless: true });
  const ctxWebKitDesktop = await browserWebKit.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
  });
  const pageWebKitDesktop = await ctxWebKitDesktop.newPage();
  await pageWebKitDesktop.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  await pageWebKitDesktop.waitForTimeout(2000);
  await pageWebKitDesktop.screenshot({
    path: path.join(screenshotsDir, 'ref_home_webkit_1440_dark.png'),
    fullPage: true,
  });
  await ctxWebKitDesktop.close();

  const ctxWebKitMobile = await browserWebKit.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    colorScheme: 'dark',
  });
  const pageWebKitMobile = await ctxWebKitMobile.newPage();
  await pageWebKitMobile.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  await pageWebKitMobile.waitForTimeout(2000);
  await pageWebKitMobile.screenshot({
    path: path.join(screenshotsDir, 'ref_home_webkit_390_dark.png'),
    fullPage: true,
  });
  await ctxWebKitMobile.close();
  await browserWebKit.close();

  // Save layout structure analysis
  fs.writeFileSync(path.join(OUT_DIR, 'page_structures.json'), JSON.stringify(structureResults, null, 2));

  console.log('\n--- Reference Audit Complete! Artifacts saved to docs/redesign/reference/ ---');
}

runReferenceAudit().catch(err => {
  console.error('Reference audit failed:', err);
  process.exit(1);
});
