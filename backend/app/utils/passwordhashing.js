const argon2 = require("argon2");

async function passwordHashing(password) {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (err) {
    throw new Error("Failed to hash password");
  }
}
async function passwordDecrypting( password, oldpassword) {
  try {
    const decryptPassword = await argon2.verify(password, oldpassword);
    return decryptPassword;
  } catch (err) {
    throw new Error("Failed to verify password");
  }
}

module.exports = {
  passwordHashing,
  passwordDecrypting,
};
