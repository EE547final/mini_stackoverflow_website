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
// 和toObject类似，选择了这个选项为true之后，但是只有当实例调用了toJSON方法后，才会起作用。 
// 有的部分没有格式化，用tojson的方法，把这个全部转换成JSON格式。
module.exports = commentSchema;
