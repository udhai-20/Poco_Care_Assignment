const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.SECRATE, {
    expiresIn: `1d`,
  });
};

module.exports = { generateRefreshToken };
