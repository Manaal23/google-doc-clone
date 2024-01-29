const express = require('express')
const AuthController = require('../controller/AuthController')
const auth = require('../middleware/auth')
const app = express.Router();

app.post('/login', AuthController.login)
app.get('/search',auth, AuthController.searchUser)
module.exports = app