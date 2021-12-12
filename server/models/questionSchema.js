const mongoose = require('mongoose');

const voteSchema = require('./voteSchema');
const answerSchema = require('./answerSchema');

const questionSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title: { 
    type: String, 
    required: true 
  },
  text: { type: String, required: true },
  tags: [{ type: String, required: true }],
  score: { type: Number, default: 0 },
  votes: [voteSchema],
  answers: [answerSchema],
  created: { type: Date, default: Date.now }
});

questionSchema.set('toJSON', { getters: true });
// 和toObject类似，选择了这个选项为true之后，但是只有当实例调用了toJSON方法后，才会起作用。 
// 有的部分没有格式化，用tojson的方法，把这个全部转换成JSON格式。
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
    // .populate('comments.author', '-role')
    .populate('answers.author', '-role')
    // .populate('answers.comments.author', '-role');
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
    // .populate('comments.author', '-role')
    // .populate('answers.comments.author', '-role')
    .execPopulate()
    .then(() => next());
});

module.exports = mongoose.model('Question', questionSchema);
