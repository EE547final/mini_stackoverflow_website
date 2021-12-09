const mongoose = require('mongoose');
// 加入评论功能
//   author: {  //用户
  //     ref : 'user',
  //     type : mongoose.Schema.Types.ObjectId,    //取用户_id
  // },
const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId, // 取用户_id
    ref: 'user',
    required: true
  },
    
  body: { type: String, required: true },
  created: { type: Date, default: Date.now }
});

commentSchema.set('toJSON', { getters: true }); // toJson 时能够转换。

module.exports = commentSchema;
