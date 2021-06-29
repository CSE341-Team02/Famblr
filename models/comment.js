const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Comment = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }, 
  relatedPost: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  lastModification: {
    type: Date,
    required: true,
    default: Date.now
  },
  content: {
    type: String,
    required: true
  },
  reactions: {
    totalLikes: {
      type: Number,
      default: 0
    },
    totalFunny: {
      type: Number,
      default: 0
    },
    totalEmotional: {
      type: Number,
      default: 0
    }
  }
});


module.exports = mongoose.model('Comment', Comment);
