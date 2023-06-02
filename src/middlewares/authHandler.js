const userServices = require("../middlewares/userServices")


const authHandler = async (req, res, next) => {
    const { token } = req.cookies

    try {
        if (!token) {
            throw new Error("You must authenticate!")
        }

        const decodedUser = await userServices.userAuth(token)
        req.user = decodedUser
        next()

    } catch (error) {
        console.error(error)
        next(error)
    }
}


module.exports = authHandler
