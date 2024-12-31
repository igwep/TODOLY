const express = require('express');
const admin = require('firebase-admin');
const Dropbox = require('dropbox').Dropbox;
const multer = require('multer');
const path = require('path');
const upload = multer({ storage: multer.memoryStorage() });
const bodyParser = require("body-parser");
const fetch = require('node-fetch');
require('dotenv').config();
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

/* const ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN; // Store in .env
const FILE_PATH = '/todolist-8e390-firebase-adminsdk-xach1-ff5cb6075a.json';

let database; */

// Firebase Config
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

// Express App Setup
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_URL // Use the platform URL from an environment variable
    : 'http://localhost:5173', // Use localhost during development
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../Client/dist")));

// API routes
app.post("/verify-google-token", async (req, res) => {
  const { idToken } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("Decoded Token:", decodedToken);
    res.status(200).json({ success: true, user: decodedToken });
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

app.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }
    if (!req.body.userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    const imageUrl = result.secure_url;
    res.status(200).json({ message: 'Image uploaded and URL saved!', imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image. Try again later." });
  }
});

app.get("/api", (req, res) => {
  res.json({ message: "API is working!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/dist/index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
