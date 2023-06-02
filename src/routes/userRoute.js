const express = require("express")
const router = express.Router()
const { registerUser, loginUser, profileUser, logoutUser } = require("../controllers/userController")
const protect = require("../middlewares/authHandler")


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", protect, profileUser)
router.post("/logout", logoutUser)


module.exports = router
