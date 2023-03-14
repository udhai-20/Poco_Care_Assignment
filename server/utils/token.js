var jwt = require("jsonwebtoken");
function generateToken(id) {
  let token = jwt.sign({ id }, process.env.SECRATE, {
    expiresIn: "1d",
  });
  return token;
}

module.exports = { generateToken };
