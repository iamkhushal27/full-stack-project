const db = require("../models");
const User = db.User;
const {passwordHashing} = require("../utils/passwordhashing");



module.exports = {
  checkingEmail: async function (email) {
    try {
      console.log(email)
      const user = await User.findOne({
        where: {
          email,
        },
      });
      console.log('outt')
      console.log(user)
      return user;
    } catch (error) {
      console.log(error)
    }
   
  },
  checkingUserName: async function (userName) {
    console.log(userName)
    const user = await User.findOne({
      where: {
       name: userName,
      },
    });
    console.log(user)
    return user;
  },
  creatingUser: async function ({ name, email, password }) {
    const hashedPassword = await passwordHashing(password);
    console.log(hashedPassword);

    const user = await User.create({
      name:name,
      email,
      password: hashedPassword,
    });
    return user;
  },
  
};
