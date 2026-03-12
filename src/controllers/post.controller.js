const postmodel = require('../models/post.model');
const ImageKit = require('@imagekit/nodejs');
const {toFile} = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATEKEY,
})

async function createPostController (req, res){
    console.log(req.body, req.file);

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    let decoded = null
    try{
     decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message: 'user not authorized'
        })
    }

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test"
    })

    const post = await postmodel.create({
        caption: req.body.caption,
        imageurl: file.url,
        user: decoded.id
    })
    res.status(201).json({
        message: 'post created successfully',
        post
    })
}

async function getpostController(req, res){
    const token = req.cookies.token;

    let decoded;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message: "Token invalid"
        })
    }
    const userId = decoded.id;

    const post = await postmodel.find({
        user: userId
    })
    res.status(200).json({
        message: "Post fetched successfully",
        post
    })
}

async function detailsPostController(req, res){
    const token = req.cookies.token;
    
    if(!token){
        return res.status(401).json({
            message: "Unauthorized token"
        })
    }

    let decoded;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch{
        return res.status(401).json({
            message: "Token invalid"
        })
    }

    const userId = decoded.id;
    const postId = req.params.postId;

    const post = await postmodel.findById(postId)
    if(!post){
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isValidUser = post.user.toString() === userId;

    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden Content"
        })
    }

    return res.status(200).json({
        message: "Post fetched successfully.",
        post
    })
}

module.exports = {
    createPostController,
    getpostController,
    detailsPostController
}