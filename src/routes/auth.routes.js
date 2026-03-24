const express = require('express');
const authrouter = express.Router();
const authController = require("../controllers/auth.controller");
const identifyuser = require('../middlewares/auth.middleware')

authrouter.post('/register', authController.registerController);

authrouter.post('/login', authController.loginController);

authrouter.get('/get-me',identifyuser, authController.getmeController)

module.exports = authrouter;