const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./config/todolist-8e390-firebase-adminsdk-xach1-ff5cb6075a.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://todolist-8e390-default-rtdb.firebaseio.com/"
});

const database = admin.database();
const app = express();
const port = 3000;

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
