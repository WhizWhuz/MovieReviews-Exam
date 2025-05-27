const bcrypt = require("bcryptjs");

const comparePassword = (entered, hashed) => {
  return bcrypt.compare(entered, hashed);
};

module.exports = comparePassword;
