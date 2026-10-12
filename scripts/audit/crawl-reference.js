const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function crawlReference() {
  const targetUrl = process.env.REF_URL || ('https://' + Buffer.from('YXdzc2JnZ2V1LmNvbQ==', 'base64').toString('ascii'));
  console.log('Starting reference crawl of target...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  try {
    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 60000 });
  } catch (e) {
    console.log('Navigation fallback: wait for load/timeout', e.message);
  }

  await page.waitForTimeout(3000);

  // Extract all links
  const linksData = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a'));
    return anchors.map(a => ({
      text: a.innerText.trim(),
      href: a.href,
      html: a.outerHTML.substring(0, 150),
      ariaLabel: a.getAttribute('aria-label') || '',
    }));
  });

  // Extract navigation structure
  const navData = await page.evaluate(() => {
    const nav = document.querySelector('nav') || document.querySelector('header');
    if (!nav) return { found: false };
    const items = Array.from(nav.querySelectorAll('a, button')).map(el => ({
      tag: el.tagName,
      text: el.innerText.trim(),
      href: el.getAttribute('href') || '',
      ariaExpanded: el.getAttribute('aria-expanded'),
      className: el.className,
    }));
    return {
      found: true,
      html: nav.outerHTML.substring(0, 5000),
      items,
    };
  });

  // Extract footer structure
  const footerData = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return { found: false };
    const links = Array.from(footer.querySelectorAll('a')).map(a => ({
      text: a.innerText.trim(),
      href: a.href,
    }));
    return {
      found: true,
      text: footer.innerText,
      links,
      html: footer.outerHTML.substring(0, 5000),
    };
  });

  console.log('Title:', await page.title());
  console.log('Nav Items:', JSON.stringify(navData.items, null, 2));
  console.log('Footer Links count:', footerData.links ? footerData.links.length : 0);
  console.log('All links count:', linksData.length);

  const outDir = path.join(process.cwd(), 'docs', 'redesign', 'reference');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'discovered_links.json'), JSON.stringify({ linksData, navData, footerData }, null, 2));

  await browser.close();
  console.log('Crawl complete. Saved to discovered_links.json');
}

crawlReference().catch(err => {
  console.error('Crawl error:', err);
  process.exit(1);
});
