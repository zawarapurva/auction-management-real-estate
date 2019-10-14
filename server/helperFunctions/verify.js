'use strict';

const User = require('../Models/users');
const bcrypt = require('bcrypt');

const verifyCredentials = async(email, password) => {
    const user = await User.findOne({ 
      $or: [ 
        { email: email }
      ]
    }); 
    if (user) {
      
        const isValid = await bcrypt.compare(password, user.password);
          if (isValid) {
            return(user);
          }
          else return {
                code:400,
                message:'Incorrect password!'
            }
    }
    return {
        code:400,
        message:'User not registered!'
    }
  }

module.exports = {
    verifyCredentials: verifyCredentials
}
