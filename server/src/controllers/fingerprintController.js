const Fingerprint = require("../models/Fingerprint");

// CAPTURE FINGERPRINT
exports.captureFingerprint = async (req, res) => {
  try {
    // fake generated fingerprint ID

    const fingerprintId = "FP" + Math.floor(100000 + Math.random() * 900000);

    // fake fingerprint images

    const images = [
      "../public/fingerprint_1.jpg",

      "../public/fingerprint_2.jpg",
    ];

    // random image

    const image = images[Math.floor(Math.random() * images.length)];

    res.json({
      success: true,

      fingerprintId,

      image,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Capture failed");
  }
};

// SAVE FINGERPRINT

exports.saveFingerprint = async (req, res) => {
  try {
    const { thumb, fingerprintId, image } = req.body;

    // prevent duplicate

    const exists = await Fingerprint.findOne({
      fingerprintId,
    });

    if (exists) {
      res.status(400);
      throw new Error("Fingerprint already exists");
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

      data: fingerprint,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to save fingerprint");
  }
};
