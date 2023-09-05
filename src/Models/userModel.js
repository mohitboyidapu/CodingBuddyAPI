/* eslint-disable prettier/prettier */
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
  //   role: {
  //     type: String,
  //     required: true
  //   },
  //   coding_platform_handles: {
  //     type: Array,
  //     required: true
  //   },
  //   account_verification: {
  //     type: Boolean,
  //     required: true
  //   },
  //   account_status: {
  //     type: String,
  //     required: true
  //   },
  //   registration_date: {
  //     type: Date
  //   },
  //   display_picture: {
  //     type: String
  //   }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
