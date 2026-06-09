const Fingerprint = require("../models/Fingerprint");
const Student = require("../models/Student");

// CAPTURE FINGERPRINT
exports.captureFingerprint = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const images = [
      `${baseUrl}/public/fingerprint_1.jpg`,
      `${baseUrl}/public/fingerprint_2.jpg`,
    ];

    const image = images[Math.floor(Math.random() * images.length)];

    res.json({
      success: true,
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
