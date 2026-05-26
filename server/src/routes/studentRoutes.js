const express = require("express");

const studentRoutes = express.Router();

const {
  registerStudent,
  getAllStudents,
} = require("../controllers/studentController");

studentRoutes.post("/register", registerStudent);

studentRoutes.get("/", getAllStudents);

module.exports = studentRoutes;
