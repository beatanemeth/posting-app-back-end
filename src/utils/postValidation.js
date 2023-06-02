const validatePostId = (id) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        // e.g. id is null, or too short in length
        throw new Error("Post not found!")
    }
}


const validatePost = (postDoc) => {
    if (!postDoc) {
        throw new Error("Post not found!")
    }
}


const validatePostAuthor = (postDoc, tokenUser) => {
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(tokenUser.id)
    if (!isAuthor) {
        throw new Error("You are not the author!")
    }
}


module.exports = {
    validatePostId,
    validatePost,
    validatePostAuthor
}
