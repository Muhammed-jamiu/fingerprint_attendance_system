const express = require("express");

const router = express.Router();

const {
  markAttendance,
  getStats,
} = require("../controllers/attendanceController");

router.post("/mark", markAttendance);

router.get("/stats", getStats);

module.exports = router;
