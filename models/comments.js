const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Comment = new Schema({
  author: {
    type: String,
    required: true
  }, 
  relatedPost: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  createdDate: {
    type: Date,
    required: true
  },
  lastModification: Date,
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
