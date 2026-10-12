const fs = require('fs');
const path = require('path');

function getFiles(dir, filter = () => true) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        results = results.concat(getFiles(fullPath, filter));
      }
    } else if (filter(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

function auditRepo() {
  console.log('--- Starting Codebase Repository Audit ---');
  const root = process.cwd();

  // 1. Routes
  const appDir = path.join(root, 'src', 'app');
  const routeFiles = getFiles(appDir, f => f.endsWith('page.tsx') || f.endsWith('route.ts') || f.endsWith('layout.tsx'));
  const routes = routeFiles.map(f => {
    const rel = path.relative(appDir, f).replace(/\\/g, '/');
    return {
      file: rel,
      route: '/' + rel.replace(/\/page\.tsx$/, '').replace(/^page\.tsx$/, '').replace(/\/layout\.tsx$/, ' (layout)'),
    };
  });

  // 2. Components
  const compDir = path.join(root, 'src', 'components');
  const componentFiles = getFiles(compDir, f => f.endsWith('.tsx') || f.endsWith('.jsx'));
  const components = componentFiles.map(f => {
    const rel = path.relative(compDir, f).replace(/\\/g, '/');
    const content = fs.readFileSync(f, 'utf-8');
    const exports = content.match(/export (const|function|default) ([A-Za-z0-9_]+)/g) || [];
    return {
      componentPath: rel,
      exports,
      usesFirebase: content.includes('firebase') || content.includes('firestore'),
      usesFramerMotion: content.includes('framer-motion'),
      lineCount: content.split('\n').length,
    };
  });

  // 3. Lib / Data / Services
  const libDir = path.join(root, 'src', 'lib');
  const libFiles = getFiles(libDir, f => f.endsWith('.ts') || f.endsWith('.tsx'));
  const libSummary = libFiles.map(f => {
    const rel = path.relative(libDir, f).replace(/\\/g, '/');
    const content = fs.readFileSync(f, 'utf-8');
    return {
      path: rel,
      isFirebase: content.includes('firebase/app') || content.includes('firebase/firestore'),
      isChatService: content.includes('chat') || content.includes('gemini') || content.includes('ai'),
      lines: content.split('\n').length,
    };
  });

  // 4. Styles & Tailwind config
  const tailwindPath = path.join(root, 'tailwind.config.ts');
  const globalsCssPath = path.join(root, 'src', 'app', 'globals.css');
  const tailwindContent = fs.existsSync(tailwindPath) ? fs.readFileSync(tailwindPath, 'utf-8') : '';
  const globalsCss = fs.existsSync(globalsCssPath) ? fs.readFileSync(globalsCssPath, 'utf-8') : '';

  // 5. Env variables audit
  const envExample = path.join(root, '.env.example');
  const envLocal = path.join(root, '.env.local');
  const envVars = {
    example: fs.existsSync(envExample) ? fs.readFileSync(envExample, 'utf-8').split('\n').map(l => l.split('=')[0].trim()).filter(Boolean) : [],
    localExists: fs.existsSync(envLocal),
  };

  // 6. Fragile Areas Analysis
  const fragileAreas = [
    {
      area: 'Firebase Initialization & Client SDK',
      location: 'src/lib/firebase/config.ts',
      risk: 'SSR vs client hydration errors; must ensure db is initialized once and environment variables are present.',
    },
    {
      area: 'Join Community Form Submission',
      location: 'src/app/join/page.tsx',
      risk: 'Writes directly to Firestore collection ("members" or "join_requests"). Any prop mismatch or field removal breaks signup pipeline.',
    },
    {
      area: 'Chat Assistant / API Endpoint',
      location: 'src/app/chat/page.tsx & src/lib/services/chat.ts',
      risk: 'Chat state management, streaming/API calls, API keys. Must remain fully functional with zero interruption.',
    },
    {
      area: 'Mobile Bottom Navigation vs Island Shell',
      location: 'src/components/layout/MobileNav.tsx',
      risk: 'Current site uses a fixed bottom bar. The reference uses a top header with mobile drawer. Must transition cleanly without breaking mobile routing.',
    },
    {
      area: 'Next.js 14 App Router Dynamic Routes',
      location: 'src/app/admin/edit-notification/[id]/page.tsx',
      risk: 'Admin and notifications routes must be preserved intact without route conflict.',
    }
  ];

  const repoAuditReport = {
    totalRoutes: routes.length,
    routes,
    totalComponents: components.length,
    components,
    libSummary,
    envVars,
    styling: {
      tailwindConfigLines: tailwindContent.split('\n').length,
      globalsCssLines: globalsCss.split('\n').length,
    },
    fragileAreas,
  };

  const outDir = path.join(root, 'docs', 'redesign');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'repo_audit.json'), JSON.stringify(repoAuditReport, null, 2));
  console.log('Repo audit report saved to docs/redesign/repo_audit.json');
}

auditRepo();
