const mongoose = require("mongoose");

const fingerprintSchema = new mongoose.Schema(
  {
    thumb: {
      type: String,
    },
    fingerprintId: {
      type: String,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

//
module.exports = mongoose.model("Fingerprint", fingerprintSchema);
