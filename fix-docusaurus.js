const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting Docusaurus error fix...');

try {
  // 1. Clear Docusaurus cache
  console.log('Step 1: Clearing Docusaurus cache...');
  execSync('npx docusaurus clear', { stdio: 'inherit' });
  
  // 2. Remove .docusaurus directory
  console.log('Step 2: Removing .docusaurus directory...');
  if (fs.existsSync('.docusaurus')) {
    execSync('rmdir /s /q .docusaurus', { stdio: 'inherit' });
  }
  
  // 3. Install missing dependencies
  console.log('Step 3: Installing missing dependencies...');
  
  // First, install fs-extra which was missing earlier
  execSync('npm install fs-extra --save-dev', { stdio: 'inherit' });
  
  // Install the theme dependencies that are failing
  execSync('npm install @docusaurus/theme-common @docusaurus/theme-search-algolia @docusaurus/preset-classic --save', { stdio: 'inherit' });
  
  // Install the specific missing package
  execSync('npm install @rc-component/mini-decimal --save', { stdio: 'inherit' });
  
  // 4. Update all Docusaurus packages to ensure compatibility
  console.log('Step 4: Updating Docusaurus packages...');
  execSync('npm update @docusaurus/core @docusaurus/preset-classic @docusaurus/theme-classic @docusaurus/theme-common @docusaurus/types', { stdio: 'inherit' });
  
  // 5. Clear npm cache
  console.log('Step 5: Clearing npm cache...');
  execSync('npm cache clean --force', { stdio: 'inherit' });
  
  // 6. Try building again
  console.log('Step 6: Attempting to build...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Error during fix process:', error.message);
  console.log('\nIf the error persists, try the following manual steps:');
  console.log('1. Close all Node.js processes');
  console.log('2. Run Command Prompt as Administrator');
  console.log('3. Execute: rmdir /s /q node_modules');
  console.log('4. Execute: del package-lock.json');
  console.log('5. Execute: npm install');
  console.log('6. Execute: npm run build');
}