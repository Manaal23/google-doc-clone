const { Schema, model } = require("mongoose")

const User = new Schema({
    firstname: String, 
    lastname: String,
    email: String,
    image: String,
    googleId: String
    // password: String
})

module.exports = model("User", User)
