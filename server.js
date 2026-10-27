/**
 * DEV. SAHIL - NETWORKING STUDIO
 * Ultra-Fast & Zero-Dependency Native Node.js Web Server
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const START_PORT = 8000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain'
};

function startServer(port) {
  const server = http.createServer((req, res) => {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/' || reqPath === '') {
      reqPath = '/index.html';
    }

    const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
    const filePath = path.join(ROOT, safePath);

    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<h1>404 - File Not Found</h1><p>${reqPath}</p>`);
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });

      fs.createReadStream(filePath).pipe(res);
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`[Port Busy] Port ${port} is in use. Trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`============================================================`);
    console.log(`  DEV. SAHIL / NETWORKING STUDIO`);
    console.log(`  The Complete Cybersecurity Networking Foundation`);
    console.log(`============================================================`);
    console.log(`\n[SUCCESS] Server active at: ${url}`);
    console.log(`Opening browser automatically...\n`);

    // Auto open browser on Windows
    exec(`start "" "${url}"`);
  });
}

startServer(START_PORT);
