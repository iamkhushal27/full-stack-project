const jwt = require("jsonwebtoken");

async function generatingToken(userId) {
  console.log(userId);
  console.log(process.env.JWT_SECRET);
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
}

module.exports = {
  generatingToken,
};
