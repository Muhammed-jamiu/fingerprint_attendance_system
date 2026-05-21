const Attendance = require("../models/Attendance");

const User = require("../models/User");

exports.markAttendance = async (req, res) => {
  const { fingerprintId } = req.body;

  const student = await User.findOne({
    fingerprintId,
  });

  if (!student) {
    return res.status(404).json({
      message: "Fingerprint not found",
    });
  }

  const alreadyMarked = await Attendance.findOne({
    student: student._id,

    createdAt: {
      $gte: new Date().setHours(0, 0, 0, 0),
    },
  });

  if (alreadyMarked) {
    return res.json({
      message: "Attendance already marked today",
    });
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

  const attendance = await Attendance.countDocuments();

  res.json({
    students,
    attendance,
  });
};
