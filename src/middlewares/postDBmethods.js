const Post = require("../models/postModel")


const postCreate = async (title, content, tokenUser) => {
    return await Post.create({
        title,
        content,
        author: tokenUser.id
    })
}


const postFindById = async (id) => {
    return await Post.findById(id)
}


const postReplaceOne = async (postDoc, title, content, tokenUser) => {
    return await postDoc.replaceOne({
        title,
        content,
        author: tokenUser.id
    })
}


const postDeleteOne = async (id) => {
    return await Post.deleteOne({ _id: id })
}


const postPopulateAuthor = async (id) => {
    return await Post.findById(id).populate("author", ["name"])
}


const postFindAll = async () => {
    return await Post.find()
        .populate("author", ["name"])
        .sort({ createdAt: -1 })
}


module.exports = {
    postCreate,
    postFindById,
    postReplaceOne,
    postDeleteOne,
    postFindAll,
    postPopulateAuthor
}