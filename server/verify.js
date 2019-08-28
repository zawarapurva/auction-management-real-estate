'use strict';

const User = require('./Models/users');
const bcrypt = require('bcrypt');

async function verifyCredentials(request, reply) {
    const password = request.payload.password;
    console.log(request.payload);
    
    // Find an entry from the database that
    // matches either the email or username    
    const user = await User.findOne({ 
      $or: [ 
        { email: request.payload.email }
      ]
    }); 
    console.log(user);      

    if (user) {
        const isValid = await bcrypt.compare(password, user.password)
          if (isValid) {
            return(user);
          }
          else {
            return {
                code:400,
                message:'Incorrect password!'
            }
          }
        // return user;
    }
    return {
        code:400,
        message:'User not registered!'
    }
  }

module.exports = {
    verifyCredentials: verifyCredentials
}
