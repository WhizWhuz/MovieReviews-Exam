const generateToken = require("./generateToken");

const loginSuccess = (res, user, message = "Login succesful!") => {
  const token = generateToken(user);

  res.status(200).json({
    message,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
};
module.exports = loginSuccess;
