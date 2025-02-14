require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 4005;
const loginsFile = path.join(__dirname, 'logins.json');
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'someSecretKey',
  resave: false,
  saveUninitialized: false
}));

// Utility functions for managing logins
function loadLogins() {
  if (!fs.existsSync(loginsFile)) {
    fs.writeFileSync(loginsFile, JSON.stringify([]));
  }
  const data = fs.readFileSync(loginsFile);
  return JSON.parse(data);
}

function saveLogins(logins) {
  fs.writeFileSync(loginsFile, JSON.stringify(logins, null, 2));
}

// Signup endpoint – using bcrypt for password hashing.
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const logins = loadLogins();

  if (logins.find(user => user.username === username)) {
    return res.status(400).json({ error: 'User already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  logins.push({ username, password: hashedPassword, playlist: [] });
  saveLogins(logins);
  req.session.user = { username };
  return res.json({ success: true, username });
});

// Login endpoint – comparing the password with bcrypt.
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const logins = loadLogins();

  const user = logins.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }
  
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  req.session.user = { username };
  return res.json({ success: true, username });
});

// Check login status
app.get('/check-login', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, username: req.session.user.username });
  } else {
    res.json({ loggedIn: false });
  }
});

// Logout endpoint
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Get user's playlist
app.get('/playlist', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }
  const logins = loadLogins();
  const user = logins.find(u => u.username === req.session.user.username);
  if (user) {
    return res.json({ playlist: user.playlist || [] });
  }
  res.status(404).json({ error: 'User not found.' });
});

// Add a video to the user's playlist
app.post('/playlist/add', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }
  const video = req.body.video; // expects { videoId, title }
  if (!video || !video.videoId || !video.title) {
    return res.status(400).json({ error: 'Invalid video object.' });
  }
  const logins = loadLogins();
  const user = logins.find(u => u.username === req.session.user.username);
  if (user) {
    user.playlist = user.playlist || [];
    if (!user.playlist.find(v => v.videoId === video.videoId)) {
      user.playlist.push(video);
      saveLogins(logins);
    }
    return res.json({ success: true, playlist: user.playlist });
  }
  res.status(404).json({ error: 'User not found.' });
});

// Remove a video from the user's playlist
app.post('/playlist/remove', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }
  const videoId = req.body.videoId;
  if (!videoId) return res.status(400).json({ error: 'Missing videoId.' });

  const logins = loadLogins();
  const user = logins.find(u => u.username === req.session.user.username);
  if (user && user.playlist) {
    user.playlist = user.playlist.filter(v => v.videoId !== videoId);
    saveLogins(logins);
    return res.json({ success: true, playlist: user.playlist });
  }
  res.status(404).json({ error: 'User not found or no playlist.' });
});

// Add endpoint to clear the user's playlist
app.post('/playlist/clear', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }
  const logins = loadLogins();
  const user = logins.find(u => u.username === req.session.user.username);
  if (user) {
    user.playlist = [];
    saveLogins(logins);
    return res.json({ success: true, playlist: [] });
  }
  res.status(404).json({ error: 'User not found.' });
});

// YouTube Search Proxy Endpoint
app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter.' });
  }
  const lowerQuery = query.toLowerCase();
  const searchQuery = lowerQuery.includes('karaoke') ? query : query + ' karaoke';

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(searchQuery)}&maxResults=10&videoEmbeddable=true&key=${YOUTUBE_API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('YouTube API error:', error);
    res.status(500).json({ error: 'Failed to fetch data from YouTube API.' });
  }
});

// Delete account endpoint
app.post('/delete-account', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }
  const username = req.session.user.username;
  let logins = loadLogins();
  const userIndex = logins.findIndex(user => user.username === username);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found.' });
  }
  logins.splice(userIndex, 1);
  saveLogins(logins);
  req.session.destroy(err => {
    if(err) {
      return res.status(500).json({ error: 'Error deleting account.' });
    }
    return res.json({ success: true });
  });
});

// New Reset Password endpoint (updated logging)
app.post('/reset-password', async (req, res) => {
  if (!req.session.user) {
    console.error("Reset password: no active session.");
    return res.status(401).json({ error: 'Not authenticated.' });
  }
  const { newPassword } = req.body;
  if (!newPassword) {
    console.error("Reset password: newPassword is missing.");
    return res.status(400).json({ error: 'Missing newPassword.' });
  }
  const username = req.session.user.username;
  let logins = loadLogins();
  const user = logins.find(u => u.username === username);
  if (!user) {
    console.error("Reset password: user not found for", username);
    return res.status(404).json({ error: 'User not found.' });
  }
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    saveLogins(logins);
    console.log(`Password updated for user ${username}`);
    return res.json({ success: true });
  } catch (error) {
    console.error("Reset password error for user", username, ":", error);
    return res.status(500).json({ error: 'Error updating password: ' + error.message });
  }
});

// Routes to serve the login and app pages
app.get('/', (req, res) => {
  if(req.session.user) {
    return res.redirect('/login');
  } else {
    return res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/app', (req, res) => {
  if(!req.session.user) {
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, 'public', 'app.html'));
});

// Ensure all API endpoints are registered before this line:
app.use(express.static(path.join(__dirname, 'public'))); // static serving at end

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});