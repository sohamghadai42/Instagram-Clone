const express = require('express');
const postrouter = express.Router();
const postControllers = require('../controllers/post.controller')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage()});
const identifyUser = require('../middlewares/auth.middleware')

postrouter.post('/', upload.single('image'),identifyUser, postControllers.createPostController)
postrouter.get('/',identifyUser, postControllers.getpostController)
postrouter.get('/details/:postId',identifyUser , postControllers.detailsPostController)
postrouter.post('/like/:postId',identifyUser, postControllers.likePostController)
postrouter.get('/feed', identifyUser, postControllers.getFeedController)

module.exports = postrouter;