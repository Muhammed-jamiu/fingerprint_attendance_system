const jwt = require("jsonwebtoken");

exports.authorize = (...roles) => {
  return (req, res, next) => {
    try {
      // Check if user role is allowed
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }
    } catch (error) {
      next(error);
    }
  };
};
