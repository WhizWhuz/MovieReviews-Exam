const User = require("../models/User");

const findUser = async (usernameOrEmail, includePassword = false) => {
  const query = User.findOne({ username: usernameOrEmail });
  return includePassword ? query.select("+password") : query;
};

module.exports = findUser;
