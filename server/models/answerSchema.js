const mongoose = require('mongoose');

const voteSchema = require('./voteSchema');
const commentSchema = require('./commentSchema');
// 加入评论功能
//   author: {  //用户
  //     ref : 'user',
  //     type : mongoose.Schema.Types.ObjectId,    //取用户_id
  // },
const answerSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId, // 取用户_id
    ref: 'user',
    required: true
  },
  created: { type: Date, default: Date.now },
  text: { type: String, required: true },
  score: { type: Number, default: 0 },
  votes: [voteSchema],
  comments: [commentSchema]
});

answerSchema.set('toJSON', { getters: true });

answerSchema.methods = {
  vote: function (user, vote) {
    const oldvote = this.votes.find((v) => v.user._id.equals(user));
    console.log('oldvote: ', oldvote); // oldvote:  { user: 61a77976e8d39c135af499f1, vote: 1 }
    console.log('vote: ', vote);
    if (oldvote) {
      // update from the very beginning
      this.score -= oldvote.vote;
      if (vote == 0) {
        // remove vote if zero 
        this.votes.pull(oldvote);
      } 
      else {
        // 把vote添加到原来的score上面
        this.score += vote;
        oldvote.vote = vote;
      }
    } else if (vote !== 0) {
      // new vote
      this.score += vote;
      this.votes.push({ user, vote });
    }
    return this;
  },

  addComment: function (author, body) {
    this.comments.push({ author, body });
    return this;
  },

  removeComment: function (id) {
    const comment = this.comments.id(id);
    if (!comment) throw new Error('Comment not found');
    comment.remove();
    return this;
  }
};

module.exports = answerSchema;
