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
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // matricNumber: {
    //   type: String,
    //   unique: true,
    //   required: true,
    //   trim: true,
    // },

    // fingerprintId: {
    //   type: String,
    //   unique: true,
    //   required: true,
    //   trim: true,
    // },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
