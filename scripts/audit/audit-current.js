const { chromium, webkit, devices } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://aws-sbg-hbtu.vercel.app';
const OUT_DIR = path.join(process.cwd(), 'docs', 'redesign', 'current');

const ROUTES = [
  '/',
  '/about',
  '/tracks',
  '/events',
  '/team',
  '/join',
  '/chat'
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

async function extractContentInventory(page, route) {
  return await page.evaluate((r) => {
    const title = document.title;
    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    
    // Extract sections
    const sectionEls = Array.from(document.querySelectorAll('main section, main > div, body section, div[class*="container"]'));
    const sections = sectionEls.map((sec, idx) => {
      const headings = Array.from(sec.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
        tag: h.tagName,
        text: h.innerText.trim()
      }));
      const paragraphs = Array.from(sec.querySelectorAll('p')).map(p => p.innerText.trim()).filter(Boolean);
      const links = Array.from(sec.querySelectorAll('a')).map(a => ({
        text: a.innerText.trim(),
        href: a.href,
        external: !a.href.includes('aws-sbg-hbtu') && !a.href.startsWith('/')
      }));
      const buttons = Array.from(sec.querySelectorAll('button')).map(b => b.innerText.trim()).filter(Boolean);

      return {
        sectionIndex: idx + 1,
        headings,
        paragraphs: paragraphs.slice(0, 10),
        links,
        buttons
      };
    });

    // Extract footer content
    const footer = document.querySelector('footer');
    const footerData = footer ? {
      text: footer.innerText.trim(),
      links: Array.from(footer.querySelectorAll('a')).map(a => ({
        text: a.innerText.trim(),
        href: a.href
      }))
    } : null;

    return {
      route: r,
      title,
      metaDesc,
      sections,
      footer: footerData
    };
  }, route);
}

async function extractFunctionalityInventory(page) {
  return await page.evaluate(() => {
    const forms = Array.from(document.querySelectorAll('form')).map(f => ({
      action: f.action,
      method: f.method,
      inputs: Array.from(f.querySelectorAll('input, select, textarea')).map(i => ({
        name: i.name,
        type: i.type,
        placeholder: i.placeholder,
        required: i.required
      }))
    }));

    const chatContainer = document.querySelector('[class*="chat"], #chat, main input[placeholder*="Ask"]');
    const themeToggle = document.querySelector('button[aria-label*="theme" i], button[aria-label*="mode" i], button:has(svg)');
    const mobileNav = document.querySelector('nav[class*="fixed bottom"], [class*="bottom-nav"], [class*="MobileNav"]');

    return {
      formsCount: forms.length,
      forms,
      hasChatContainer: !!chatContainer,
      hasThemeToggle: !!themeToggle,
      hasMobileBottomNav: !!mobileNav,
      firebaseMarkers: window.firebase ? true : false
    };
  });
}

async function runCurrentAudit() {
  console.log('--- Starting Current-Site Audit (Playwright) ---');
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const screenshotsDir = path.join(OUT_DIR, 'screenshots');
  fs.mkdirSync(screenshotsDir, { recursive: true });

  const contentInventory = {};
  const functionalityInventory = {};

  const browserChromium = await chromium.launch({ headless: true });

  // 1. Desktop Dark & Light 1440x900
  console.log('\n[1/4] Running Chromium Desktop 1440x900...');
  const ctxDesktopDark = await browserChromium.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark'
  });
  const pageDesktopDark = await ctxDesktopDark.newPage();

  for (const route of ROUTES) {
    console.log(`Auditing current site route: ${route} (Desktop Dark)...`);
    try {
      await pageDesktopDark.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 35000 });
      await pageDesktopDark.waitForTimeout(2000);
      await smoothScroll(pageDesktopDark);

      const safeName = route === '/' ? 'home' : route.replace('/', '').replace(/-/g, '_');
      await pageDesktopDark.screenshot({
        path: path.join(screenshotsDir, `current_${safeName}_1440_dark_full.png`),
        fullPage: true
      });

      contentInventory[route] = await extractContentInventory(pageDesktopDark, route);
      if (route === '/join' || route === '/chat' || route === '/') {
        functionalityInventory[route] = await extractFunctionalityInventory(pageDesktopDark);
      }
    } catch (e) {
      console.warn(`Error on route ${route}:`, e.message);
    }
  }

  // Home in light mode
  await pageDesktopDark.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  await pageDesktopDark.waitForTimeout(1000);
  const themeBtn = await pageDesktopDark.$('button[aria-label*="mode" i], button[aria-label*="theme" i]');
  if (themeBtn) {
    await themeBtn.click();
    await pageDesktopDark.waitForTimeout(500);
  }
  await pageDesktopDark.screenshot({
    path: path.join(screenshotsDir, 'current_home_1440_light_full.png'),
    fullPage: true
  });
  await ctxDesktopDark.close();

  // 2. Tablet 1024x768 & 768x1024
  console.log('\n[2/4] Running Tablet Viewports...');
  const ctxTablet1024 = await browserChromium.newContext({ viewport: { width: 1024, height: 768 } });
  const pageTablet1024 = await ctxTablet1024.newPage();
  await pageTablet1024.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  await pageTablet1024.waitForTimeout(1500);
  await pageTablet1024.screenshot({
    path: path.join(screenshotsDir, 'current_home_1024_dark_full.png'),
    fullPage: true
  });
  await ctxTablet1024.close();

  const ctxTablet768 = await browserChromium.newContext({ viewport: { width: 768, height: 1024 } });
  const pageTablet768 = await ctxTablet768.newPage();
  await pageTablet768.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  await pageTablet768.waitForTimeout(1500);
  await pageTablet768.screenshot({
    path: path.join(screenshotsDir, 'current_home_768_dark_full.png'),
    fullPage: true
  });
  await ctxTablet768.close();

  // 3. Mobile 390x844 (iPhone 12)
  console.log('\n[3/4] Running Mobile 390x844...');
  const iPhone = devices['iPhone 12'];
  const ctxMobile = await browserChromium.newContext({
    ...iPhone,
    colorScheme: 'dark'
  });
  const pageMobile = await ctxMobile.newPage();
  for (const route of ['/', '/join', '/chat']) {
    await pageMobile.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded' });
    await pageMobile.waitForTimeout(1500);
    const safeName = route === '/' ? 'home' : route.replace('/', '');
    await pageMobile.screenshot({
      path: path.join(screenshotsDir, `current_${safeName}_390_dark_full.png`),
      fullPage: true
    });
  }
  await ctxMobile.close();
  await browserChromium.close();

  // 4. WebKit Desktop & Mobile
  console.log('\n[4/4] Running WebKit at 1440 and 390...');
  const browserWebKit = await webkit.launch({ headless: true });
  const ctxWebKit = await browserWebKit.newContext({ viewport: { width: 1440, height: 900 } });
  const pageWebKit = await ctxWebKit.newPage();
  await pageWebKit.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  await pageWebKit.waitForTimeout(1500);
  await pageWebKit.screenshot({
    path: path.join(screenshotsDir, 'current_home_webkit_1440_dark.png'),
    fullPage: true
  });
  await ctxWebKit.close();
  await browserWebKit.close();

  fs.writeFileSync(path.join(OUT_DIR, 'content_inventory.json'), JSON.stringify(contentInventory, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, 'functionality_inventory.json'), JSON.stringify(functionalityInventory, null, 2));

  console.log('\n--- Current Site Audit Complete! Saved to docs/redesign/current/ ---');
}

runCurrentAudit().catch(err => {
  console.error('Current audit failed:', err);
  process.exit(1);
});
