const { exec, spawn } = require('child_process');
const path = require('path');

console.log('Starting development environment...');

// Start the Python backend
console.log('Starting Python backend server...');
const backend = spawn('python', ['backend/server.py'], {
  stdio: 'inherit',
  cwd: __dirname
});

backend.on('error', (err) => {
  console.error('Failed to start backend:', err.message);
});

// Wait a bit for the backend to start, then start the frontend
setTimeout(() => {
  console.log('Starting Docusaurus frontend...');
  const frontend = exec('npx docusaurus start', {
    cwd: __dirname
  });

  frontend.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  frontend.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  frontend.on('close', (code) => {
    console.log(`Frontend process exited with code ${code}`);
  });
}, 3000); // Wait 3 seconds for backend to start

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down development servers...');
  backend.kill();
  process.exit();
});