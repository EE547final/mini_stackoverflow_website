'use strict'
const User = require('../models/userSchema');
const jwtDecode = require('jwt-decode'); // a small browser library that helps decoding JWTs token which are Base64Url encoded.
const { body, validationResult } = require('express-validator');
// 使用express-validator 对你的express应用的用户数据进行验证。

const { Tokencreated, hashPassword, verifyPassword } = require('../verify/verify');
// https://www.jianshu.com/p/1d329a1f3dfb

let check = require('express-validator').check; 

exports.signup = async (req, res) => {
  // const result = validationResult(req);
  // if (!result.isEmpty()) { // 一定不能是空的
  //   const errors = result.array({ onlyFirstError: true });
  //   return res.status(422).json({ errors });
  // }
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    // 一定不能是空的
    return res.status(422).json({errors}); 
  }

  try {
    // const { username } = req.body;
    const { username } = req.headers
    const hashedPassword = await hashPassword(req.headers.password);

    const userData = {
      username: username.toLowerCase(),
      password: hashedPassword
    };
    const existingUsername = await User.findOne({
      username: userData.username
    });

    if (existingUsername) {
      return res.status(400).json({
        message: 'Username already exists.'
      });
    }

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    if (savedUser) {
      const token = Tokencreated(savedUser);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;

      const { username, role, id, created, profilePhoto } = savedUser;
      const userInfo = {
        username,
        role,
        id,
        created,
        profilePhoto
      };

      return res.json({
        message: 'User create successfully!',
        token,
        userInfo,
        expiresAt,
        success: true
      });
    } 
    else {
      return res.status(400).json({
        message: 'There was a problem creating your account.'
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: 'There was a problem creating your account.'
    });
  }
};

exports.authenticate = async (req, res) => {
  // const result = validationResult(req);
  // if (!result.isEmpty()) {
  //   const errors = result.array({ onlyFirstError: true });
  //   return res.status(422).json({ errors });
  // }
  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    return res.status(422).json({errors});
  }
  try {
    const { username, password } = req.headers;

    const user = await User.findOne({
      username: username.toLowerCase()
    });

    if (!user) {
      return res.status(403).json({
        message: 'Wrong username or password.'
      });
    }
    const passwordValid = await verifyPassword(password, user.password);
    if (passwordValid) {
      // const token = createToken(user);
      const token = Tokencreated(user); 
      // const token = jwt.sign(
      //   {
      //     id: user._id, 
      //     username: user.username, 
      //     role: user.role
      //   }, 
      //   process.env.JWT_SECRET || 'development_secret', 
      //   {algorithm: 'HS256', expiresIn: '10d'}
      // ); 
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;
      const { username, role, id, created, profilePhoto } = user;
      const userInfo = { username, role, id, created, profilePhoto, token };

      res.json({
        message: 'Authentication successful!',
        userInfo,
        expiresAt,
        success: true
      });
    } else {
      res.status(403).json({
        message: 'Wrong username or password.'
      });
    }
  } catch (error) {
    return res.status(400).json({ 
      // 为什么登陆显示something went wrong 
      // 把Tokencreate封装起来，不能直接调用
      message: 'Something went wrong.' 
    });
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const { sortType = '-created' } = req.body;
    const users = await User.find().sort(sortType);
    res.json(users);
  } catch (error) {
    console.log(error); 
  }
  next();
};

exports.searchuser = async (req, res, next) => {
  try {
    const users = await User.find({ username: { $regex: req.params.search, $options: 'i' } });
    res.json(users);
  } catch (error) {
    console.log(error); 
  }
  next();
};

exports.finduser = async (req, res, next) => {
  try {
    const users = await User.findOne({ username: req.params.username });
    res.json(users);
  } catch (error) {
    console.log(error); 
  }
  next();
};

