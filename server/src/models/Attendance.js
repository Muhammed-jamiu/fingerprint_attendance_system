const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    fingerprintId: String,

    status: {
      type: String,
      default: "present",
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Attendance", attendanceSchema);
