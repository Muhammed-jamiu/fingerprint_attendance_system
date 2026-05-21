const Fingerprint = require("../models/Fingerprint");

// =======================================
// CAPTURE FINGERPRINT
// =======================================

exports.captureFingerprint = async (req, res) => {
  try {
    // fake generated fingerprint ID

    const fingerprintId = "FP" + Math.floor(100000 + Math.random() * 900000);

    // fake fingerprint images

    const images = [
      "https://i.imgur.com/7sKQ9P4.png",

      "https://i.imgur.com/Ws6X7jK.png",

      "https://i.imgur.com/0mKXcgk.png",
    ];

    // random image

    const image = images[Math.floor(Math.random() * images.length)];

    res.json({
      success: true,

      fingerprintId,

      image,
    });
  } catch (error) {
    res.status(500).json({
      message: "Capture failed",
    });
  }
};

// =======================================
// SAVE FINGERPRINT
// =======================================

exports.saveFingerprint = async (req, res) => {
  try {
    const { thumb, fingerprintId, image } = req.body;

    // prevent duplicate

    const exists = await Fingerprint.findOne({
      fingerprintId,
    });

    if (exists) {
      return res.json({
        message: "Fingerprint already exists",
      });
    }

    // save

    const fingerprint = await Fingerprint.create({
      thumb,
      fingerprintId,
      image,
    });

    res.status(201).json({
      success: true,

      message: "Fingerprint saved successfully",

      fingerprint,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save fingerprint",
    });
  }
};
