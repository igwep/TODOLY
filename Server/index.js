const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./config/todolist-8e390-firebase-adminsdk-xach1-ff5cb6075a.json');
const multer = require('multer');
const path = require('path');
const upload = multer({ storage: multer.memoryStorage() });
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require('cors');



const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://todolist-8e390-default-rtdb.firebaseio.com/"
});

const database = admin.database();
const app = express();
const port = 5000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_URL  // Use the platform URL from an environment variable
    : 'http://localhost:5173',     // Use localhost during development
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

app.post("/verify-google-token", async (req, res) => {
  const { idToken } = req.body;
  try {
    // Verify the token with Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    console.log("Decoded Token:", decodedToken);

    // Perform user-related operations (e.g., check if user exists in your DB)
    res.status(200).json({ success: true, user: decodedToken });
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }

})

app.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    // Validate that the file and userId are provided
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    if (!req.body.userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    // Upload image to Cloudinary
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
    const userId = req.body.userId;

    // Save image URL under the user's record in Firebase Realtime Database
    /* await database.ref(`users/${userId}`).update({
      taskImage: imageUrl,
    }); */

    res.status(200).json({ message: 'Image uploaded and URL saved!', imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image. Try again later." });
  }
});


// Sample route to write data to Firebase Realtime Database
/* app.get('/add-user', (req, res) => {
  database.ref('users').set({
    username: 'JohnDoe',
    email: 'johndoe@example.com'
  })
  .then(() => {
    res.send('User data added successfully!');
  })
  .catch(error => {
    res.status(500).send('Error adding user: ' + error.message);
  });
}); */
// Serve static files from the Vite build folder
app.use(express.static(path.join(__dirname, "../client/dist")));

// API routes
app.get("/api", (req, res) => {
    res.json({ message: "API is working!" });
});

// Serve React app for all other routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
