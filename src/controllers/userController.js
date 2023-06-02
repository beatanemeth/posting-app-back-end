const userServices = require("../middlewares/userServices")


// @desc Sign up new user
// @route POST /api/user/register
// @access Public
const registerUser = (async (req, res, next) => {
    const { name, email, password } = req.body

    try {
        const newUser = await userServices.userRegister(name, email, password)
        res.status(200)
        res.json(newUser)
        console.log(`Just registered New User: ${newUser}`)

    } catch (error) {
        console.error(error)
        next(error)
    }
})


// @desc Authenticate a user
// @route POST /api/user/login
// @access Public
const loginUser = (async (req, res, next) => {
    const { email, password } = req.body

    try {
        const [token, tokenData] = await userServices.userLogin(email, password)
        res.cookie("token", token).json(tokenData)
        console.log(`Created Token: ${token} \nToken Data sent to the frontend: ${JSON.stringify(tokenData)}`)

    } catch (error) {
        console.error(error)
        next(error)
    }
})


// @desc Get user data
// @route GET /api/user/profile
// @access Private
const profileUser = (async (req, res) => {
    const tokenUser = req.user

    res.status(200)
    res.json(tokenUser)
})


// @desc Logout a user
// @route POST /api/user/logout
// @access Private
const logoutUser = ((req, res) => {
    res.cookie("token", "").json("ok")
})


module.exports = {
    registerUser,
    loginUser,
    profileUser,
    logoutUser
}
