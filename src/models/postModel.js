const mongoose = require("mongoose")

// to create post schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a Title."],
        maxlength: 120,
    },
    content: {
        type: String,
        required: [true, "Please enter some Content."],
        maxlength: 12500,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, {
    timestamps: true,
})

// to create post model
const Post = mongoose.model("Post", postSchema)

module.exports = Post