'use strict';

const User = require('./Models/users');
const bcrypt = require('bcrypt');

const verifyCredentials = async(email, password) => {
    // let result = false;
    const user = await User.findOne({ 
      $or: [ 
        { email: email }
      ]
    }); 
    console.log(user);
    if (user) {
      
        const isValid = await bcrypt.compare(password, user.password);
        console.log(isValid);
        
          if (isValid) {
            // result = true;
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
