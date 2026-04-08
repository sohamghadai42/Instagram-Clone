const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imageurl: {
        type: String,
        required: [true, "image is required to create a post"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "user is required to create a post"],
    }

})

const postmodel = mongoose.model('post', postSchema);

module.exports = postmodel;