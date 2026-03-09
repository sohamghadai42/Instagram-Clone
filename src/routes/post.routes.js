const express = require('express');
const postrouter = express.Router();
const postControllers = require('../controllers/post.controller')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage()});

postrouter.post('/', upload.single('image'), postControllers.createPostController)

module.exports = postrouter;