const User = require("../models/User");
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../utils/comparePassword");
const loginSuccess = require("../utils/loginSuccess");
const findUser = require("../utils/findUser");
const sendError = require("../utils/sendError");
const sendSuccess = require("../utils/sendSuccess");

//* POST - Register
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!password || typeof password !== "string") {
    return sendError(res, 400, "Password is missing.");
  }
  try {
    const existingUser = await findUser(username);
    if (existingUser) {
      return sendError(res, 400, "User already exists!");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return loginSuccess(res, user);
  } catch (err) {
    return sendError(res, 500, err.message);
  }
};

//* POST - Login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUser(username, true);
    if (!user) {
      return sendError(res, 400, "Login failed! 😢");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return sendError(res, 400, "Invalid password.");

    return loginSuccess(res, user);
  } catch (err) {
    return sendError(res, 500, "Login has failed!");
  }
};

//? GET - Get info on current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username email role");
    if (!user) return sendError(res, 400, "User not found.");

    return sendSuccess(res, 200, "User info fetched.", { user });
  } catch (err) {
    return sendError(res, 500, "Failed to fetch user.", err.message);
  }
};
