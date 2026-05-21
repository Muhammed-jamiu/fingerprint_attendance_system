const express = require("express");

const router = express.Router();

const {
  captureFingerprint,
  saveFingerprint,
} = require("../controllers/fingerprintController");

// CAPTURE

router.post("/capture", captureFingerprint);

// SAVE

router.post("/save", saveFingerprint);

module.exports = router;
