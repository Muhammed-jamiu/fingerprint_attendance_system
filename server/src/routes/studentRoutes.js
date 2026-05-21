const express = require("express");
const { authorize } = require("../middlewares");
const { protect } = require("../middlewares/protect");
const router = express.Router();

const {
  registerStudent,
  getStudents,
} = require("../controllers/studentController");

router.post("/", registerStudent);

router.get("/", protect, authorize("admin"), getStudents);

module.exports = router;
