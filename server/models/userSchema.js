const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// https://github.com/amand33p/stack-underflow/blob/master/server/models/user.js

// mongoose中任何任何事物都是从Schema开始的。每一个Schema对应MongoDB中的一个集合（collection）。
// Schema中定义了集合中文档（document）的样式。

const userModel = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    maxlength: 20, 
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    required: true, 
    default: 'user' 
  },
  profilePhoto: {
    type: String,
    default: function () {
      return `https://secure.gravatar.com/avatar/`;
    }
  },
  created: { 
    type: Date, 
    default: Date.now 
  }
});

userModel.set('toJSON', { getters: true });
// 和toObject类似，选择了这个选项为true之后，但是只有当实例调用了toJSON方法后，才会起作用。 
// 有的部分没有格式化，用tojson的方法，把这个全部转换成JSON格式。
module.exports = mongoose.model('user', userModel);
