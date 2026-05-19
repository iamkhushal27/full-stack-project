const argon2 = require("argon2");
const { InternalServerError, UnauthorizedError } = require("./error");

async function hashPassword(password) {
  const hashedPassword = await argon2.hash(password);
  return hashedPassword;
}
async function verifyPassword(password, oldpassword) {
  const decryptPassword = await argon2.verify(oldpassword, password);

  if (!decryptPassword) {
    throw new UnauthorizedError("Invalid email or password");
  }

  return decryptPassword;
}

module.exports = {
  hashPassword,
  verifyPassword,
};
