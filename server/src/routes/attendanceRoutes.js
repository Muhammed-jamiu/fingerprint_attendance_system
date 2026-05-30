const express = require("express");
const { verifyStudent } = require("../controllers/attendanceController");
const attendanceRoutes = express.Router();

attendanceRoutes.post("/verify", verifyStudent);

module.exports = attendanceRoutes;
