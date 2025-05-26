const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "You must have username"],
      unique: [true, "Username is already in use."],
      minlength: [4, "Must have a username longer than 4 characters."],
      maxlength: [24, "Username is too long."],
    },
    email: {
      type: String,
      required: [true, "You must have an email."],
      unique: [true, "Email is already in use."],
    },
    password: {
      type: String,
      required: [true, "You must have a password."],
      minlength: [6, "Password is too short."],
      maxlength: [50, "That password is too long."],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
