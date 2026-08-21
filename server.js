const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Environment akan otomatis diset 'production' oleh cPanel Node.js App
const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';

// cPanel (Phusion Passenger) akan mengalokasikan port secara dinamis melalui process.env.PORT
const port = process.env.PORT || 3000;

// Inisialisasi aplikasi Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Pastikan untuk mem-parsing URL
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error: ' + (err.message || err.toString()) + '\n\n' + (err.stack || ''));
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
}).catch((err) => {
  console.error('Failed to prepare Next.js app:', err);
  // Start a fallback server to show the error in browser
  createServer((req, res) => {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Next.js Startup Error:\n\n' + err.message + '\n\n' + (err.stack || ''));
  }).listen(port, () => {
    console.log(`> Fallback error server running on http://${hostname}:${port}`);
  });
});
