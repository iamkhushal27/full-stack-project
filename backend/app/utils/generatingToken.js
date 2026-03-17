const jwt = require("jsonwebtoken");

async function generateToken(id) {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1day",
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
