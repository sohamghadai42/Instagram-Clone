const usermodel = require("../models/user.models");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerController (req, res){
    const {username, email, password, bio, profilePicture} = req.body;

    const isuserexisted = await usermodel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(isuserexisted){
        return res.status(409).json({
            message: (isuserexisted.email === email ? "user already existed" : "username is alrelady taken")
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await usermodel.create({
        username,
        email,
        profilePicture,
        bio,
        password: hash
    })
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {expiresIn: '1d'})

    res.cookie('token', token)

    res.status(201).json({
        message: "user registered successfully",
        user: {
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio
        }
    })
}

async function loginController (req, res){
    const {email, username, password} = req.body;

    const user = await usermodel.findOne({
        $or: [
            {
                email: email
            },
            {
                username: username
            }
        ]
    }).select('+password')

    if(!user){
        return res.status(404).json({
            message: "user not found"
        })
    }

    const ispasswordcorrect = await bcrypt.compare(password, user.password);

    if(!ispasswordcorrect){
        return res.status(401).json({
            message: "invalid password"
        })
    }
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {expiresIn: '1d'})

    res.cookie('token', token);
    res.status(200).json({
        message: "user loggedin successfully",
        user: {
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio
        }
    })
}

async function getmeController(req, res){
    const userId = req.user.id
    const user = await usermodel.findById(userId)

    res.status(200).json({
        username: user.username,
        bio: user.bio,
        profilePicture: user.profilePicture,
        email: user.email
    })
}

module.exports = {
    registerController,
    loginController,
    getmeController
}