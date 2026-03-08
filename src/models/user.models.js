const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: [true, 'username already existed']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique:[true, 'email already existed']
    },
    password: {
        type:String,
        required: [true, 'password is required']
    },
    bio: String,
    profilePicture: {
        type: String,
        default: 'https://ik.imagekit.io/85khdz3nyy/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg'
    },
})

const usermodel = mongoose.model('user', userSchema);

module.exports = usermodel;