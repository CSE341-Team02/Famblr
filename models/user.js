const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: Schema.Types.ObjectId,
        ref: 'Image',
        required: false
    },
    createdAt: { type: Date, required: true, default: Date.now },
    resetToken: String,
    resetTokenExpiration: Date
});

module.exports = mongoose.model('User', userSchema);