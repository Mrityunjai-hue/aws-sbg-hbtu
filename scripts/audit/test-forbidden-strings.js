const fs = require('fs');
const path = require('path');

const forbiddenRegexes = [
  /\bGraphic\s+Era\b/i,
  /\bGEU\b/i,
  /\bDehradun\b/i,
  /\bPawan\b/i,
  /\bAmit\b/i,
  /awssbggeu/i,
  /SCD\s*2026/i,
  /\bKIRO\b/i
];

function scanDir(dir) {
  if (!fs.existsSync(dir)) return 0;
  let hits = 0;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      hits += scanDir(full);
    } else if (
      item.isFile() &&
      (item.name.endsWith('.js') ||
        item.name.endsWith('.html') ||
        item.name.endsWith('.json') ||
        item.name.endsWith('.tsx') ||
        item.name.endsWith('.ts') ||
        item.name.endsWith('.css') ||
        item.name.endsWith('.md'))
    ) {
      // Exclude redesign docs and reference audits
      if (full.includes('docs' + path.sep + 'redesign')) continue;
      if (full.includes('scripts' + path.sep + 'audit')) continue;

      const content = fs.readFileSync(full, 'utf8');
      for (const rx of forbiddenRegexes) {
        if (rx.test(content)) {
          console.error(`[FAIL] Forbidden string match ${rx} found in: ${full}`);
          hits++;
        }
      }
    }
  }
  return hits;
}

const hitsSrc = scanDir('src');
const hitsPublic = scanDir('public');
const hitsNext = scanDir('.next');
const totalHits = hitsSrc + hitsPublic + hitsNext;

console.log(`Scan completed: src (${hitsSrc}), public (${hitsPublic}), .next (${hitsNext}). Total forbidden hits: ${totalHits}`);

if (totalHits > 0) {
  console.error('[ERROR] Forbidden strings detected. Aborting build/test.');
  process.exit(1);
} else {
  console.log('[SUCCESS] 0 forbidden string hits. Rule 2 verified.');
  process.exit(0);
}
