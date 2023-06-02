const postServices = require("../middlewares/postServices")


// @desc Create new post
// @route POST /api/post
// @access Private
const createPost = (async (req, res, next) => {
    const tokenUser = req.user
    const { title, content } = req.body

    try {
        const newPost = await postServices.postCreate(title, content, tokenUser)
        res.json(newPost)

    } catch (error) {
        console.error(error)
        next(error)
    }
})


// @desc Update specific post
// @route PUT /api/post/:id
// @access Private
const updatePost = (async (req, res, next) => {
    const tokenUser = req.user
    const { id, title, content } = req.body

    try {
        const postDoc = await postServices.postUpdate(id, title, content, tokenUser)
        res.json(postDoc)

    } catch (error) {
        console.error(error)
        next(error)
    }
})


// @desc Delete specific post
// @route DELETE /api/post/:id
// @access Private
const deletePost = (async (req, res, next) => {
    const tokenUser = req.user
    const { id } = req.params

    try {
        await postServices.postDelete(id, tokenUser)
        res.status(200).json(id)

    } catch (error) {
        console.error(error)
        next(error)
    }
})


// @desc Get specific post
// @route GET /api/post/:id
// @access Public
const getOnePost = (async (req, res, next) => {
    const { id } = req.params

    try {
        const postDoc = await postServices.postGetOne(id)
        res.json(postDoc)

    } catch (error) {
        console.error(error)
        next(error)
    }
})


// @desc Get all posts
// @route GET /api/post
// @access Public
const getAllPosts = (async (req, res, next) => {
    try {
        const posts = await postServices.postGetAll()
        res.json(posts)

    } catch (error) {
        console.error(error)
        next(error)
    }
})


module.exports = {
    createPost,
    updatePost,
    deletePost,
    getAllPosts,
    getOnePost
}
