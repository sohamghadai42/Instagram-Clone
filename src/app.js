const express = require('express');
const cookieparser = require('cookie-parser');
const authrouter = require('./routes/auth.routes');
const app = express();


app.use(express.json());
app.use(cookieparser());
app.use('/api/auth', authrouter);

module.exports = app;