const express = require("express");
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
  },
});

module.exports = mongoose.model("Student", registerStudent);
