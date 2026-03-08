const express = require('express');
const authrouter = express.Router();
const authController = require("../controllers/auth.controller");

authrouter.post('/register', authController.registerController);

authrouter.post('/login', authController.loginController);

module.exports = authrouter;