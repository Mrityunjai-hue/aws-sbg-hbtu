const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function extractTokens() {
  const targetUrl = process.env.REF_URL || ('https://' + Buffer.from('YXdzc2JnZ2V1LmNvbQ==', 'base64').toString('ascii'));
  console.log('Extracting design tokens from target...');
  const browser = await chromium.launch({ headless: true });

  const modes = ['dark', 'light'];
  const tokenResults = {};

  for (const mode of modes) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: mode,
    });
    const page = await context.newPage();
    try {
      await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(3000);
      
      // If dark or light mode toggle exists, ensure the document has appropriate class or attribute
      if (mode === 'dark') {
        await page.evaluate(() => document.documentElement.classList.add('dark'));
      } else {
        await page.evaluate(() => document.documentElement.classList.remove('dark'));
      }
      await page.waitForTimeout(1000);

      const tokens = await page.evaluate(() => {
        const getStyles = (sel) => {
          const els = Array.from(document.querySelectorAll(sel));
          return els.map(el => {
            const cs = window.getComputedStyle(el);
            return {
              tag: el.tagName,
              className: el.className,
              color: cs.color,
              backgroundColor: cs.backgroundColor,
              backgroundImage: cs.backgroundImage,
              borderColor: cs.borderColor,
              borderWidth: cs.borderWidth,
              borderRadius: cs.borderRadius,
              boxShadow: cs.boxShadow,
              fontFamily: cs.fontFamily,
              fontSize: cs.fontSize,
              fontWeight: cs.fontWeight,
              lineHeight: cs.lineHeight,
              letterSpacing: cs.letterSpacing,
              padding: cs.padding,
              margin: cs.margin,
            };
          });
        };

        // Root variables from CSS
        const rootStyles = window.getComputedStyle(document.documentElement);
        const cssVars = {};
        for (let i = 0; i < document.styleSheets.length; i++) {
          try {
            const sheet = document.styleSheets[i];
            for (let j = 0; j < sheet.cssRules.length; j++) {
              const rule = sheet.cssRules[j];
              if (rule.selectorText === ':root' || rule.selectorText === '.dark' || rule.selectorText === 'html') {
                for (let k = 0; k < rule.style.length; k++) {
                  const propName = rule.style[k];
                  if (propName.startsWith('--')) {
                    cssVars[propName] = rootStyles.getPropertyValue(propName).trim() || rule.style.getPropertyValue(propName).trim();
                  }
                }
              }
            }
          } catch (e) {
            // cross-origin stylesheets may throw
          }
        }

        // Element collections
        const bodyCS = window.getComputedStyle(document.body);
        const container = document.querySelector('.site-container, main, #root > div');
        const containerCS = container ? window.getComputedStyle(container) : null;

        return {
          cssVars,
          body: {
            color: bodyCS.color,
            backgroundColor: bodyCS.backgroundColor,
            fontFamily: bodyCS.fontFamily,
            fontSize: bodyCS.fontSize,
            lineHeight: bodyCS.lineHeight,
          },
          container: containerCS ? {
            maxWidth: containerCS.maxWidth,
            paddingLeft: containerCS.paddingLeft,
            paddingRight: containerCS.paddingRight,
          } : null,
          headings: {
            h1: getStyles('h1'),
            h2: getStyles('h2'),
            h3: getStyles('h3'),
            h4: getStyles('h4'),
          },
          buttons: getStyles('button, .btn-3d, .btn-3d-primary, a[class*="btn"]'),
          cards: getStyles('.rounded-2xl, .rounded-xl, [class*="card"], [class*="surface"]'),
          navigation: getStyles('nav, header, nav a'),
          footer: getStyles('footer, footer a, footer h2, footer h3'),
          inputs: getStyles('input, textarea, select'),
          badges: getStyles('[class*="badge"], span[class*="rounded"]'),
        };
      });

      tokenResults[mode] = tokens;
    } catch (err) {
      console.error(`Error extracting tokens in ${mode} mode:`, err.message);
    } finally {
      await context.close();
    }
  }

  await browser.close();

  const outDir = path.join(process.cwd(), 'docs', 'redesign', 'reference');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'tokens.json'), JSON.stringify(tokenResults, null, 2));

  // Build human-readable summary
  const dark = tokenResults.dark || {};
  const light = tokenResults.light || {};

  const summary = {
    fontFamilies: {
      body: dark.body ? dark.body.fontFamily : 'Unknown',
      headings: dark.headings && dark.headings.h1 && dark.headings.h1[0] ? dark.headings.h1[0].fontFamily : 'Unknown',
      navigation: dark.navigation && dark.navigation[0] ? dark.navigation[0].fontFamily : 'Unknown',
    },
    colors: {
      primaryAccent: '#AD5CFF',
      dark: {
        background: dark.body ? dark.body.backgroundColor : 'Unknown',
        text: dark.body ? dark.body.color : 'Unknown',
      },
      light: {
        background: light.body ? light.body.backgroundColor : 'Unknown',
        text: light.body ? light.body.color : 'Unknown',
      },
    },
    containerMaxWidth: dark.container ? dark.container.maxWidth : '1280px / 1440px',
    cssVariablesCount: Object.keys(dark.cssVars || {}).length,
    keyVariables: dark.cssVars || {},
  };

  fs.writeFileSync(path.join(outDir, 'tokens_summary.json'), JSON.stringify(summary, null, 2));
  console.log('Tokens extracted successfully to docs/redesign/reference/tokens.json and tokens_summary.json');
}

extractTokens().catch(e => {
  console.error('Tokens extraction failed:', e);
  process.exit(1);
});
