const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    date: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    content: {
        //Object? With string and/or picture?
    },
    comments: {
        //Type array, not required
    }    
});

module.exports = mongoose.model('Post', postSchema)
