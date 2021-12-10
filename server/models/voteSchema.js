const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: true 
    },
    vote: { 
      type: Number, 
      required: true 
    } 
    // each answer need to have a vote. including update and downvote
  },
);

module.exports = voteSchema ; 