const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // https://www.npmjs.com/package/bcrypt

// node + jwt 实现token身份验证。

// 服务器端token生成
const Tokencreated = (user ) => {
  if (!user.role) {
    throw new Error('No user role specified');
  }
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role
    },
    process.env.JWT_SECRET || 'development_secret',
    // expiresIn: '10d' 
    {algorithm: 'HS256', expiresIn: '10d'}
  );
};

const saltRounds = 12;
// to hash a password : generate a salt and hash on separate function calls 
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

//to verify password 
const verifyPassword = (password, hashword) => {
  // result can only be true or false; 
  return bcrypt.compare(password, hashword); 

}

// const verifyPassword = (password, hashword, function (err, result) {
//   // to check a password 
//   if (err) {
//     console.log("Faled to verify!");
//     reject(err);
//   }
//   // result can only be true or false 
//   result =  bcrypt.compare(password, hashword);
//   return result; 
// }); 

module.exports = {
  // userAuth,
  Tokencreated,
  hashPassword,
  verifyPassword
};
