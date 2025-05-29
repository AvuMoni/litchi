const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Example route
app.get("/hello", (req, res) => {
  res.status(200).send("Hello from Firebase Cloud Functions!");
});

// Export the Express app as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);
