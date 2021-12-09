'use strict';
const { body, validationResult } = require('express-validator');
let check = require('express-validator').check; 

exports.newAnswer = async (req, res, next) => {
  const result = validationResult(req); 
  if (!result.isEmpty()) {
    return res.status(422).json({ result });
  }
  try {
    // https://stackoverflow.com/questions/41058569/what-is-the-difference-between-const-and-const-in-javascript/41058622
    const {id }= req.user; // es6 destructuring assignment 只能是id和text，不能改成其他的变量。
    const{ text} = req.body; // id and text part of answerSchema
    const result  = await req.question.addAnswer(id, text); // from questionSchema.js 

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
  next();
};

exports.updateAnswers = async (req, res, next, id) => {
  try {
    const result = await req.question.answers.id(id);
    if (!result) {
      return res.status(404).json({ message: 'The answer is not found.' });}
    req.answer = result;
  } catch (error) {
    res.status(400).json({message: 'Invalid answer id.'});
    return next(error);
  }
  next();
};

exports.deleteAnswer = async (req, res, next) => {
  try {
    const { answer } = req.params;
    const result = await req.question.removeAnswer(answer); 
    // find the certain answer, delete from questionSchema
    res.json(result);
  } catch (error) {
    next(error);
  }
  next(); 
};



