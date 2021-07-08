const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    date: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    text: {
        type: String,
        required: false
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        required: false
    },
    comments: {
        type: Array,
        required: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }    
});

module.exports = mongoose.model('Post', postSchema)
