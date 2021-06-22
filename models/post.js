const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    date: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    content: [
        {
            text: {
                type: String,
                required: false
            },
            image: {
                type: Buffer,
                required: false
            },
            // required: true
        }
    ],
    comments: {
        type: Array,
        required: false
    }    
});

module.exports = mongoose.model('Post', postSchema)
