const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./config/todolist-8e390-firebase-adminsdk-xach1-ff5cb6075a.json');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

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
const port = 3000;

app.post('/upload-image', upload.single('image'), async (req, res) => {
  try {
    // Upload to Cloudinary
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

    // Get the user's ID and image URL from the upload response
    const userId = req.body.userId;
    const imageUrl = result.secure_url;

    // Save image URL in Firebase under the user's record
    await database.ref(`users/${userId}`).update({
      profileImage: imageUrl
    });

    res.status(200).json({ message: 'Image uploaded and URL saved!', imageUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Sample route to write data to Firebase Realtime Database
app.get('/add-user', (req, res) => {
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
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
