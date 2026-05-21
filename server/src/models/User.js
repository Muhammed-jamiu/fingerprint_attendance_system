const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    matricNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    fingerprintId: String,

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
