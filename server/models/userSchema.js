const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const userModel = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user' },
  profilePhoto: {
    type: String,
    default: function () {
      return `https://secure.gravatar.com/avatar/`;
    }
  },
  created: { type: Date, default: Date.now }
});



userModel.set('toJSON', { getters: true });


module.exports = mongoose.model('users', userModel);
