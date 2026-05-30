const mongoose = require("mongoose");

const registerStudent = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },

  matricNo: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    uppercase: true,
    match: [/^FPN\d{4}[A-Z]{2}\d{4}$/],
  },

  attendanceStatus: {
    type: String,
    enum: ["present", "absent"],
    default: "absent",
  },
});

module.exports = mongoose.model("Student", registerStudent);
