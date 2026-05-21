const express = require("express");

const router = express.Router();
// const { authorize } = require("../../src/middlewares/authMiddleware");
const {
  captureFingerprint,
  saveFingerprint,
} = require("../controllers/fingerprintController");

// CAPTURE

router.post("/capture", captureFingerprint);

// SAVE

router.post("/save", saveFingerprint);

module.exports = router;
