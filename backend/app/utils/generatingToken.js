const jwt = require("jsonwebtoken");

async function generateToken(userId) {
  const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
}
async function verifyToken(token) {
  const id = await jwt.verify(token, process.env.JWT_SECRET);
  return id;
}

module.exports = {
  generateToken,
  verifyToken,
};
