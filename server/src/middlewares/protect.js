const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    // Check if authorization header exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user from token id
      req.user = await User.findById(decoded.id).select("-password");

      // Continue
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not authorized, No token provided",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token provided",
    });
  }
};

module.exports = protect;
