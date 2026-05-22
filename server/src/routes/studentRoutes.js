const express = require("express");

const studentRoutes = express.Router();

const {
  registerStudent,
  //   getStudents,
} = require("../controllers/studentController");

studentRoutes.post("/register", registerStudent);

// router.get("/", authorize("admin"), getStudents);

module.exports = studentRoutes;
