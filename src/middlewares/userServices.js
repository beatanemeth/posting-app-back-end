const userValidation = require("../utils/userValidation")
const userDBmethods = require("./userDBmethods")


const userRegister = async (name, email, password) => {

    userValidation.validateField(name, email, password)

    userValidation.validateEmail(email)

    userValidation.validatePassword(password)

    // check user e-mail
    const registerUser = await userDBmethods.userFindOne(email)

    userValidation.doesUserExist(registerUser)

    // store hashed password
    const hashedPassword = userValidation.hashPassword(password)

    const newUser = await userDBmethods.userCreate(name, email, hashedPassword)

    return newUser
}


const userLogin = async (email, password) => {

    userValidation.validateField(email, password)

    userValidation.validateEmail(email)

    userValidation.validatePassword(password)

    // check user e-mail
    const loginUser = await userDBmethods.userFindOne(email)

    userValidation.validateUser(loginUser)

    // verify password
    const passwordMatch = userValidation.comparePassword(password, loginUser.password)

    userValidation.doesPasswordMatch(passwordMatch)

    // if logged in create jwt
    const tokenData = {
        id: loginUser.id,
        email
    }

    const token = userValidation.generateJWT(tokenData)
    return [token, tokenData]
}


const userAuth = (token) => {
    const decodedJWT = userValidation.validateJWT(token)
    const decodedUser = userDBmethods.userFindById(decodedJWT)
    return decodedUser
}


module.exports = {
    userRegister,
    userLogin,
    userAuth
}