const Attendance = require("../models/Attendance");

const User = require("../models/User");

exports.markAttendance = async (req, res) => {
  const { fingerprintId } = req.body;

  const student = await User.findOne({
    fingerprintId,
  });

  if (!student) {
    // return res.status(404).json({
    //   message: "Fingerprint not found",
    // });
    res.status(404);
    throw new Error("Fingerprint not found");
  }

  const alreadyMarked = await Attendance.findOne({
    student: student._id,

    createdAt: {
      $gte: new Date().setHours(0, 0, 0, 0),
    },
  });

  if (alreadyMarked) {
    res.status(400);
    throw new Error("Attendance already marked today");
  }

  await Attendance.create({
    student: student._id,
    fingerprintId,
  });

  res.json({
    message: "Attendance marked successfully",
  });
};

exports.getStats = async (req, res) => {
  const students = await User.countDocuments({
    role: "student",
  });

  if (students <= 0) {
    res.status(404);
    throw new Error("No students found");
  }

  const attendance = await Attendance.countDocuments();

  res.json({
    students,
    attendance,
  });
};
