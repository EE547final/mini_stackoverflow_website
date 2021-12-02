const mongoose = require('mongoose');

const voteSchema = require('./voteSchema');
const commentSchema = require('./commentSchema');
const answerSchema = require('./answerSchema');

const questionSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title: { type: String, required: true },
  text: { type: String, required: true },
  tags: [{ type: String, required: true }],
  score: { type: Number, default: 0 },
  votes: [voteSchema],
  comments: [commentSchema],
  answers: [answerSchema],
  created: { type: Date, default: Date.now }
});

questionSchema.set('toJSON', { getters: true });

questionSchema.methods = {
  vote: function (user, vote) {
    const oldvote = this.votes.find((v) => v.user._id.equals(user));
    console.log('vote: ', vote);
    console.log('oldvote: ', oldvote);
    if (oldvote) { 
      // undefined from the very beginning.
      this.score -= oldvote.vote;
      if (vote == 0) {
        this.votes.pull(oldvote);
      } 
      else {
        //change vote
        this.score += vote;
        oldvote.vote = vote;
      }
    } 
    else if (vote !== 0) {
      // new vote
      this.score += vote;
      this.votes.push({ user, vote });
    }

    return this.save();
  },

  addComment: function (author, body) {
    this.comments.push({ author, body });
    return this.save();
  },

  removeComment: function (id) {
    const comment = this.comments.id(id);
    if (!comment) throw new Error('Comment not found');
    comment.remove();
    return this.save();
  },

  addAnswer: function (author, text) {
    this.answers.push({ author, text });
    return this.save();
  },

  removeAnswer: function (id) {
    const answer = this.answers.id(id);
    if (!answer) throw new Error('Answer not found');
    answer.remove();
    return this.save();
  }
};

questionSchema.pre(/^find/, function () {
  this.populate('author')
    .populate('comments.author', '-role')
    .populate('answers.author', '-role')
    .populate('answers.comments.author', '-role');
});

questionSchema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

questionSchema.post('save', function (doc, next) {
  if (this.wasNew) this.vote(this.author._id, 1);
  doc
    .populate('author')
    .populate('answers.author', '-role')
    .populate('comments.author', '-role')
    .populate('answers.comments.author', '-role')
    .execPopulate()
    .then(() => next());
});

module.exports = mongoose.model('Question', questionSchema);
