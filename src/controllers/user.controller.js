const followmodel = require('../models/follow.model');
const usermodel = require('../models/user.models');

async function followUserController(req, res){
    
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username

    if(followeeUsername == followerUsername){
        return res.status(400).json({
            message: "You can't follow yourself"
        })
    }

    const isAlreadyFollowing = await followmodel.findOne({
        followee: followeeUsername,
        follower: followerUsername
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message: "You are already following this user",
            follow: isAlreadyFollowing
        })
    }

    const isFolloweeExists = await usermodel.findOne({
        username: followeeUsername
    })
    if(!isFolloweeExists){
        return res.status(404).json({
            message: "User not found"
        })
    }

    const followeeRecord = await followmodel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `you're now following ${followeeUsername} `,
        follow: followeeRecord
    })

}

async function unfollowUserController(req, res){
    const followeeUsername = req.params.username
    const followerUsername = req.user.username

    const isFollowing = await followmodel.findOne({
        followee: followeeUsername,
        follower: followerUsername
    })

    if(!isFollowing){
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followmodel.findByIdAndDelete(isFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}

module.exports = {
    followUserController,
    unfollowUserController
};