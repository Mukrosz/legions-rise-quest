#!/usr/bin/env node

/**
 * Setup Verification Script
 * Checks if all dependencies and files are correctly installed
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(colors[color] + message + colors.reset);
}

function checkFile(filePath, description) {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    log(`✓ ${description}`, 'green');
    return true;
  } else {
    log(`✗ ${description} - Missing: ${filePath}`, 'red');
    return false;
  }
}

function checkDirectory(dirPath, description) {
  const fullPath = path.join(__dirname, dirPath);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
    log(`✓ ${description}`, 'green');
    return true;
  } else {
    log(`✗ ${description} - Missing: ${dirPath}`, 'red');
    return false;
  }
}

async function main() {
  log('\n🏛️  THE ASCENT OF KAESO DARDANUS', 'cyan');
  log('Setup Verification Script\n', 'cyan');

  let errors = 0;

  // Check Node.js version
  log('Checking system requirements...', 'blue');
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  if (majorVersion >= 18) {
    log(`✓ Node.js version: ${nodeVersion}`, 'green');
  } else {
    log(`✗ Node.js version too old: ${nodeVersion} (requires 18+)`, 'red');
    errors++;
  }

  // Check core directories
  log('\nChecking project structure...', 'blue');
  errors += checkDirectory('src', 'Source directory') ? 0 : 1;
  errors += checkDirectory('src/app', 'App directory') ? 0 : 1;
  errors += checkDirectory('src/components', 'Components directory') ? 0 : 1;
  errors += checkDirectory('src/lib', 'Library directory') ? 0 : 1;
  errors += checkDirectory('src/validators', 'Validators directory') ? 0 : 1;

  // Check core files
  log('\nChecking core files...', 'blue');
  errors += checkFile('package.json', 'Package manifest') ? 0 : 1;
  errors += checkFile('tsconfig.json', 'TypeScript config') ? 0 : 1;
  errors += checkFile('tailwind.config.ts', 'Tailwind config') ? 0 : 1;
  errors += checkFile('next.config.mjs', 'Next.js config') ? 0 : 1;

  // Check pages
  log('\nChecking pages...', 'blue');
  errors += checkFile('src/app/page.tsx', 'Landing page') ? 0 : 1;
  errors += checkFile('src/app/stage-1/page.tsx', 'Stage I') ? 0 : 1;
  errors += checkFile('src/app/stage-2/page.tsx', 'Stage II') ? 0 : 1;
  errors += checkFile('src/app/stage-3/page.tsx', 'Stage III') ? 0 : 1;
  errors += checkFile('src/app/stage-4/page.tsx', 'Stage IV') ? 0 : 1;
  errors += checkFile('src/app/stage-5/page.tsx', 'Stage V') ? 0 : 1;
  errors += checkFile('src/app/victory/page.tsx', 'Victory page') ? 0 : 1;

  // Check components
  log('\nChecking components...', 'blue');
  errors += checkFile('src/components/Panel.tsx', 'Panel component') ? 0 : 1;
  errors += checkFile('src/components/CaptionBox.tsx', 'CaptionBox component') ? 0 : 1;
  errors += checkFile('src/components/HintBubble.tsx', 'HintBubble component') ? 0 : 1;
  errors += checkFile('src/components/InputCard.tsx', 'InputCard component') ? 0 : 1;
  errors += checkFile('src/components/ProgressBar.tsx', 'ProgressBar component') ? 0 : 1;

  // Check utilities
  log('\nChecking utilities...', 'blue');
  errors += checkFile('src/lib/crypto.ts', 'Crypto utilities') ? 0 : 1;
  errors += checkFile('src/lib/progress.ts', 'Progress tracking') ? 0 : 1;
  errors += checkFile('src/lib/guard.ts', 'Route guards') ? 0 : 1;

  // Check validators
  log('\nChecking validators...', 'blue');
  errors += checkFile('src/validators/v1.js', 'Stage I validator') ? 0 : 1;
  errors += checkFile('src/validators/v2.js', 'Stage II validator') ? 0 : 1;
  errors += checkFile('src/validators/v3.js', 'Stage III validator') ? 0 : 1;
  errors += checkFile('src/validators/v4.js', 'Stage IV validator') ? 0 : 1;
  errors += checkFile('src/validators/v5a.js', 'Stage V validator (part A)') ? 0 : 1;
  errors += checkFile('src/validators/v5b.js', 'Stage V validator (part B)') ? 0 : 1;

  // Check dependencies
  log('\nChecking dependencies...', 'blue');
  const hasNodeModules = checkDirectory('node_modules', 'Dependencies installed');
  if (!hasNodeModules) {
    log('  → Run: npm install', 'yellow');
    errors++;
  }

  // Check documentation
  log('\nChecking documentation...', 'blue');
  checkFile('README.md', 'Main README');
  checkFile('SETUP.md', 'Setup guide');
  checkFile('DEPLOYMENT.md', 'Deployment guide');
  checkFile('PUZZLES_EXPLAINED.md', 'Puzzle philosophy');
  checkFile('PROJECT_SUMMARY.md', 'Project summary');

  // Summary
  log('\n' + '='.repeat(50), 'cyan');
  if (errors === 0) {
    log('✅ All checks passed!', 'green');
    log('\nNext steps:', 'cyan');
    log('  1. Run: npm install (if not done)', 'yellow');
    log('  2. Run: npm run dev', 'yellow');
    log('  3. Visit: http://localhost:3000', 'yellow');
    log('\n🏛️  Begin your ascent!\n', 'cyan');
  } else {
    log(`❌ ${errors} error(s) found`, 'red');
    log('\nPlease fix the issues above and run this script again.', 'yellow');
    log('If you just cloned the repo, run: npm install\n', 'yellow');
  }
  log('='.repeat(50) + '\n', 'cyan');

  process.exit(errors);
}

main().catch(err => {
  console.error('Script error:', err);
  process.exit(1);
});

