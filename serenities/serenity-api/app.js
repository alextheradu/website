const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Serve static files (webpage) from /public
app.use(express.static(path.join(__dirname, 'public')));

// API code (updated to avoid caching)
const IMAGES_DIR = path.join(__dirname, 'images');
let images = [];

try {
  images = fs.readdirSync(IMAGES_DIR)
    .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
  if (images.length === 0) throw new Error('No images found');
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}

app.get('/api', (req, res) => {
  const randomIndex = Math.floor(Math.random() * images.length);
  const imageFile = images[randomIndex];
  const imagePath = path.join(IMAGES_DIR, imageFile);

  // Force fresh headers to prevent caching
  res.setHeader('Content-Type', `image/${path.extname(imageFile).slice(1)}`);
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  fs.createReadStream(imagePath).pipe(res);
});

// Start server
const PORT = 3090;
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}/`);
});