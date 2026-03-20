const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: [true, "post is required for creating a like"]
    },
    user: {
        type: String,
        required: [true, "username is required for creating a like"]
    }
},{timestamps: true})

likeSchema.index({post: 1, user: 1}, {unique: true})

// Export the compiled model so controller code can call .create(), .findOne(), etc.
module.exports = mongoose.model('like', likeSchema);