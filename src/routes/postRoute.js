const express = require("express")
const router = express.Router()
const { createPost, updatePost, deletePost, getAllPosts, getOnePost } = require("../controllers/postController")
const protect = require("../middlewares/authHandler")


router.post("/", protect, createPost)
router.put("/:id", protect, updatePost)
router.delete("/:id", protect, deletePost)
router.get("/", getAllPosts)
router.get("/:id", getOnePost)


module.exports = router