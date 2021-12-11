'use strict'
const Question = require('../models/questionSchema');
const User = require('../models/userSchema');
const { body, validationResult } = require('express-validator');

exports.newQuestion = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({ result });
  }
    console.log('new question-------------------------------');

  try {
    const { title, tags } = req.headers;
    const {text} = req.body
    // req.headers:  {
    //   title: 'who is the best football player ',
    //   text: 'messi or ronaldo or neymar or somebody else ',
    //   tags: [ 'football' ]
    // }
    const author = req.user.id;
    console.log('text: ', text);
    const question = await Question.create({
      title,
      author,
      tags,
      text
    });
    console.log('question: ', question);
    res.status(201).json(question);
  } catch (error) {
    next(error);
  }
};


exports.updateQuestions = async (req, res, next, id) => {
  try {
    const question = await Question.findById(id);
    if (!question) {      
      return res.status(404).json({ message: 'Question not found.' });
    }
    req.question = question;
  } catch (error) {
    res.status(400).json({ message: 'Invalid question id.' });
    return next(error);
  }
  next();
};



exports.showQuestion = async (req, res, next) => {
  try {
    const { id } = req.question;
    const question = await Question.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('answers');
    res.json(question);
  } catch (error) {
    next(error);
  }
};

exports.listQuestions = async (req, res, next) => {
  try {
    const { sortType = '-score' } = req.headers;
    const questions = await Question.find().sort(sortType);
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

exports.listByTags = async (req, res, next) => {
  try {
    const { sortType = '-score', tags } = req.params;
    const questions = await Question.find({ tags: { $all: tags } }).sort(sortType);
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

exports.listByUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { sortType = '-created' } = req.headers;
    const author = await User.findOne({ username });
    const questions = await Question.find({ author: author.id }).sort(sortType).limit(10);
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

exports.removeQuestion = async (req, res, next) => {
  try {
    await req.question.remove();
    res.json({ message: 'Your question successfully deleted.' });
  } catch (error) {
    console.log(error);
    next(error);
  }

};

exports.updateComment = async (req, res, next, id) => {
  try {
    const comment = await req.question.comments.id(id);
    if (!comment) 
      return res.status(404).json({ message: 'Comment not found.' });
    req.comment = comment;
  } catch (error) {
    res.status(400).json({message: 'Invalid comment id.'});
    return next(error);
  }
  next();
};

