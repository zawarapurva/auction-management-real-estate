const User = require('./Models/users');

const isExistingUser = async (email, username, h) => {
  
    let result = false;
    const user =  await User.findOne({ 
      $or: [ 
        { email: email }, 
        { username: username }
      ]
    });
    if (user) {
      result = true;
      if (user.username === username) {
        return h.response({
            messgae:'Username taken'
          }).code(400);
      }
      if (user.email === email) {
        return h.response({
          messgae:'Email taken'
      }).code(400);
    }
    return result;
}
}

module.exports = {
    isExistingUser
}
