const postmodel = require('../models/post.model');
const ImageKit = require('@imagekit/nodejs');
const {toFile} = require('@imagekit/nodejs')
const likemodel = require('../models/like.model');

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATEKEY,
})

async function createPostController (req, res){
    console.log(req.body, req.file);

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test"
    })

    const post = await postmodel.create({
        caption: req.body.caption,
        imageurl: file.url,
        user: req.user.id
    })
    res.status(201).json({
        message: 'post created successfully',
        post
    })
}

async function getpostController(req, res){
    const userId = req.user.id;

    const post = await postmodel.find({
        user: userId
    })
    res.status(200).json({
        message: "Post fetched successfully",
        post
    })
}

async function detailsPostController(req, res){

    const userId = req.user.id;
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

async function likePostController (req, res){
    const username = req.user.username;
    const postId = req.params.postId;

    const isLiked = await postmodel.findById(postId)
    

    if(!isLiked){
        return res.status(200).json({
            message: "You have already liked this post"
        })
    }

    const like = await likemodel.create({
        post: postId,
        user: username
    })
    res.status(200).json({
        message: "Post liked successfully",
        like
    })
}

async function unlikePostController(req, res) {
    const username = req.user.username;
    const postId = req.params.postId;

    const isLiked = await likemodel.findOne({
        post: postId,
        user: username
    })

    if(!isLiked){
        return res.status(400).json({
            message: "Post didn't like",
        })
    }
    await likemodel.findOneAndDelete({id: isLiked._id})

    return res.status(200).json({
        message: "Post unliked successfully."
    })
}

async function getFeedController(req, res){
    const user = req.user

    const postDocs = await postmodel.find().populate('user').lean()

    const posts = await Promise.all(
        postDocs.map(async (post) => {
            const isLiked = await likemodel.findOne({
                user: user.username,
                post: post._id

            })
            post.isLiked = isLiked
            return post
        })
    )

    res.status(200).json({
        message: "Feed fetched successfully",
        posts
    })
}


module.exports = {
    createPostController,
    getpostController,
    detailsPostController,
    likePostController,
    getFeedController,
    unlikePostController
}