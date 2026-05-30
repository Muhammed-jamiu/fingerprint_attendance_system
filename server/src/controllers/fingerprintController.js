const Fingerprint = require("../models/Fingerprint");
const Student = require("../models/Student");

// CAPTURE FINGERPRINT
exports.captureFingerprint = async (req, res) => {
  try {
    const fingerprintId = "FP" + Math.floor(100000 + Math.random() * 900000);
    // fake fingerprint images
    const images = [
      "http://localhost:5000/public/fingerprint_1.jpg",

      "http://localhost:5000/public/fingerprint_2.jpg",
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
    const { matricNo, thumb, fingerprintId, image } = req.body;

    //find student
    const student = await Student.findOne({ matricNo });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // save fingerprint data to database
    const fingerprint = await Fingerprint.create({
      thumb,
      fingerprintId,
      image,
    });

    //update student
    student.attendanceStatus = "present";

    await student.save();

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
