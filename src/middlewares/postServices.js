const postValidation = require("../utils/postValidation")
const postDBmethods = require("./postDBmethods")


const postCreate = async (title, content, tokenUser) => {
    const newPost = await postDBmethods.postCreate(title, content, tokenUser)
    return newPost
}


const postUpdate = async (id, title, content, tokenUser) => {
    const postDoc = await postDBmethods.postFindById(id)
    postValidation.validatePost(postDoc)
    postValidation.validatePostAuthor(postDoc, tokenUser)
    const updatedDoc = await postDBmethods.postReplaceOne(postDoc, title, content, tokenUser)
    return updatedDoc
}


const postDelete = async (id, tokenUser) => {
    postValidation.validatePostId(id)
    const postDoc = await postDBmethods.postFindById(id)
    postValidation.validatePostAuthor(postDoc, tokenUser)
    postDBmethods.postDeleteOne(id)
}


const postGetOne = async (id) => {
    postValidation.validatePostId(id)
    const postDoc = await postDBmethods.postPopulateAuthor(id)
    return postDoc
}


const postGetAll = async () => {
    const posts = await postDBmethods.postFindAll()
    return posts
}


module.exports = {
    postCreate,
    postUpdate,
    postDelete,
    postGetOne,
    postGetAll
}