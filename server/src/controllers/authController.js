const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register Student Logic
exports.registerStudent = async (req, res) => {
  const { fullName, matricNumber, fingerprintId, password, email, role } =
    req.body;

  const student = await User.create({
    fullName,
    matricNumber,
    fingerprintId,
    password,
    email,
    role,
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

//login Student Logic

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );

  res.json({
    token,
    data: user,
  });
};
