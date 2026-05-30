const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register Student Logic
exports.registerStudent = async (req, res) => {
  try {
    const { fullname, email, password, courseTitle, courseCode } = req.body;
    // CHECK EXISTING EMAIL
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // CREATE USER
    const admin = await User.create({
      fullname,
      email,
      password: hashedPassword,
      courseTitle,
      courseCode,
    });

    res.status(201).json({
      message: "Registration successfully",

      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
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
