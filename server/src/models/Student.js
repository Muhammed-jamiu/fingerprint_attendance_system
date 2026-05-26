const mongoose = require("mongoose");

const registerStudent = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    // minlength: 5,
  },
  matricNo: {
    type: String,
    required: [true, " Matric number must be  13 characters long"],
    trim: true,
    unique: true,
    minlength: 13,
    maxlength: 13,
  },
});

module.exports = mongoose.model("Student", registerStudent);
