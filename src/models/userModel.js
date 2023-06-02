const mongoose = require("mongoose")

// to create user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please add a Name."],
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Please add an Email."],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid Email."
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Please add a Password."],
        minlength: [4, "Password must have at least four(4) characters."],
    }
})

// to create user model
const User = mongoose.model("User", userSchema)

module.exports = User
