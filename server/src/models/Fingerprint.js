const mongoose = require("mongoose");

const fingerprintSchema = new mongoose.Schema(
  {
    thumb: String,

    fingerprintId: {
      type: String,
      unique: true,
    },

    image: String,
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Fingerprint", fingerprintSchema);
