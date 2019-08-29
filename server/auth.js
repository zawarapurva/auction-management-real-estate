const User = require('./Models/users');

const isExistingUser = async (email, username) => {

  let result = false;
  const user = await User.findOne({
    $or: [
      { email: email },
      { username: username }
    ]
  });
  if (user) {
    result = true;
    if (user.username === username && user.email === email) {
      return {
        message: 'User already exits!!',
        code: 400
      }
    }
    if (user.username === username) {
      return {
        message: 'Username taken!!',
        code: 400
      }
    }
    if (user.email === email) {
      return {
        message: 'Email taken!!',
        code: 400
      }
    }
    return result;
  }
}

module.exports = {
  isExistingUser
}
