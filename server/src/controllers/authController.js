const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register Student Logic
exports.registerStudent = async (req, res) => {
  const { fullName, password, email } = req.body;

  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //register student/admin
  const student = await User.create({
    fullName,
    password: hashedPassword,
    email,
  });

  res.status(201).json({
    message: "Student Registered",
    data: student,
  });
};

// exports.getStudents = async (req, res) => {
//   const students = await User.find({ matricNo });
//   res.json({
//     data: students,
//   });
// };

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

  console.log(token);

  res.json({
    token,
    data: user,
  });
};
