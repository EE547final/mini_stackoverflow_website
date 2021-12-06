'use strict'
// const {listPopulerTags } = require('./tags');
const { upvote, downvote, unvote } = require('./votes');
const { updateComments, createComment, deleteComment } = require('./comments');
const jwt = require('jsonwebtoken'); // need jwt to provide 
const jwtDecode = require('jwt-decode'); // a small browser library that helps decoding JWTs token which are Base64Url encoded.

let check = require('express-validator').check; 


const express = require('express');
const router = express.Router(); // 创建路由容器。

const {signup,authenticate,listUsers,searchuser,finduser} = require('./users');
const {updateQuestions,newQuestion,showQuestion,listQuestions,removeQuestion } = require('./questions');
const {listByTags, listByUser} = require('./questions'); 
const {updateAnswers,newAnswer,deleteAnswer} = require('./answers'); 

// 删除的时候只有自己写的内容，或者管理员权限可以删除内容
const remove_answer_qualify = (req, res, next) => {
  if (req.answer.author._id.equals(req.user.id) || req.user.role === 'admin') 
    return next();
  res.status(401).end();
};

const remove_question_qualify = (req, res, next) => {
  if (req.question.author._id.equals(req.user.id) || req.user.role == 'admin') 
    return next();  // 这里必须return，否则返回401状态出错。
  res.status(401).end();
};

const remove_comment_qualify = (req, res, next) => {
  if (req.comment.author._id.equals(req.user.id) || req.user.role == 'admin') return next(); 
  res.status(401).end();
}

const userAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authentication invalid.' });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'development_secret', {
      algorithms: 'HS256', 
      expiresIn: '10d'
    });
    req.user = decodedToken;
    next();
  } 
  catch (error) {
    return res.status(401).json({
      message: error.message
    });
  }
};


//authentication
router.post('/signup', [
  check('username')
    .exists()
    .withMessage('is required')
    .notEmpty()
    .withMessage('cannot be blank')
    .isLength({ max: 20 })
    .withMessage('must be at most 20 characters long')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('contains invalid characters'),

  check('password')
    .exists()
    .withMessage('is required')
    .notEmpty()
    .withMessage('cannot be blank')
    .isLength({ min: 6 })
    .withMessage('must be at least 6 characters long')
], signup);



router.post('/authenticate',  [
  check('username')
    .exists()
    .withMessage('is required')
    .notEmpty()
    .withMessage('cannot be blank')
    .isLength({ max: 16 })
    .withMessage('must be at most 16 characters long')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('contains invalid characters'),

  check('password')
    .exists()
    .withMessage('is required')
    .notEmpty()
    .withMessage('cannot be blank')
    .isLength({ min: 6 })
    .withMessage('must be at least 6 characters long')
], authenticate);

//users
router.get('/users', listUsers);
router.get('/users/:search', searchuser);
router.get('/user/:username', finduser);

//questions
router.param('question', updateQuestions);


router.post('/questions', [userAuth, [
  check('title')
    .exists()
    .withMessage('is required')
    .notEmpty()
    .withMessage('cannot be blank')
    .isLength({ max: 180 })
    .withMessage('must be at most 180 characters long'),
  check('text')
    .exists()
    .withMessage('is required')
    .isLength({ max: 1000 })
    .withMessage('must be at most 1000 characters long'),
  check('tags').exists().withMessage('is required')]], newQuestion);

router.get('/question/:question', showQuestion);
router.get('/question', listQuestions);
router.get('/questions/:tags', listByTags);
router.get('/question/user/:username', listByUser);
router.delete('/question/:question', [userAuth, remove_question_qualify], removeQuestion); // 为什么这里无法删除。

//tags
const question_model = require('../models/questionSchema'); 
router.get('/tags/populertags' , async (req, res, next) => {
  try{
    const tags = await question_model.aggregate([ 
      // aggregate 聚合管道，
      { $project: { tags: 1 } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(tags);
  }catch(error){
    console.log(error); 
    next(error); 
  }
  next();
  
})


//answers
// param map logic to route parameters. 
router.param('answer', updateAnswers);

router.post('/answer/:question', [userAuth, [
  check('text')
    .exists()
    .withMessage('is required')
    .notEmpty()
    .isLength({ max: 10000 })
    .withMessage('must be at most 3000 characters long')
]], newAnswer);

router.delete('/answer/:question/:answer', [userAuth, remove_answer_qualify], deleteAnswer);

//votes
router.get('/votes/upvote/:question/:answer?', userAuth, upvote);
router.get('/votes/downvote/:question/:answer?', userAuth, downvote);
router.get('/votes/unvote/:question/:answer?', userAuth, unvote);

//comments
router.param('comment', updateComments);
router.post('/comment/:question/:answer?', [userAuth, [
  check('comment')
    .exists()
    .withMessage('is required')
    .notEmpty()
    .withMessage('cannot be blank')
    .isLength({ max: 1000 })
    .withMessage('must be at most 1000 characters long')
]], createComment);
router.delete('/comment/:question/:comment', [userAuth, remove_comment_qualify], deleteComment); // 为什么这里有问题。
router.delete('/comment/:question/:answer/:comment', [userAuth, remove_comment_qualify], deleteComment);

module.exports = (app) => {
  app.use('/api', router); // router 路由对象中的路由都会匹配到/api后面
  // 定义路由配置
  // error handling 中间件，与其他中间件只有三个参数不同的是，只有指定四个参数的中间件才被认可为error handling中间件
  app.use((error, req, res, next) => {
    console.error(error.stack); 
    res.status(500).send('Something go wrong!');
    next(error);
  })
  // app.use((req, res, next) => {
  //   const error = new Error('Not found');
  //   error.status = 404;
  //   next(error);
  // });

  // // 碰到错误的情况，会执行这样的指令。
  // app.use((error, req, res, next) => {
  //   // console.log('res: ', res);
  //   console.error(error.stack);
  //   res.status(error.status || 500).json({
  //     message: error.message
  //   });
  // });
};
