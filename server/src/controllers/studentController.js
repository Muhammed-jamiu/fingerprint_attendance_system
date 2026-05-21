const User = require("../models/User");

exports.registerStudent = async (req, res) => {
  const { fullName, matricNumber, fingerprintId } = req.body;

  const student = await User.create({
    fullName,
    matricNumber,
    fingerprintId,
    role: "student",
  });

  res.status(201).json({
    message: "Student Registered",
    data: student,
  });
};

exports.getStudents = async (req, res) => {
  const students = await User.find({
    role: "student",
  });

  res.json({
    data: students,
  });
};
