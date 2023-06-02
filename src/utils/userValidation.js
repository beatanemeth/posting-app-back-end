const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const bcryptSalt = 10
const jwtSecret = process.env.JWT_SECRET

const emailRegEx =
    /^(([^<>()[\]\.,:\s@\"]+(\.[^<>()[\]\.,:\s@\"]+)*)|(\".+\!"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const passwordRegEx =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$/


const validateEmail = (email) => {
    const validEmail = String(email)
        .toLowerCase()
        .match(emailRegEx)

    if (!validEmail) {
        throw new Error("Not a valid email format!")
    }
    console.log("Email is valid.")
}


const validatePassword = (password) => {
    const validPassword = String(password)
        .match(passwordRegEx)

    if (!validPassword) {
        throw new Error("Password must be min. 4 characters, must contain at least one upper case and one lower case letter, and one number!")
    }
    console.log("Password matches the requirements!")
}


const validateField = (...userInput) => {
    for (const input of userInput) {
        if (!input) {
            throw new Error("All fields are required!")
        }
    }
}


const doesUserExist = (registerUser) => {
    if (registerUser) {
        throw new Error("User already exists!")
    }
}


const validateUser = (loginUser) => {
    if (!loginUser) {
        throw new Error("Invalid credentials or not registered user!")
    }
}


doesPasswordMatch = (passwordMatch) => {
    if (!passwordMatch) {
        throw new Error("Password does not match!")
    }
}


const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcryptSalt)
}


const comparePassword = (rawPassword, hashedPassword) => {
    return bcrypt.compareSync(rawPassword, hashedPassword)
}


const generateJWT = (userData) => {
    return jwt.sign(userData, jwtSecret)
}


const validateJWT = (token) => {
    return jwt.verify(token, jwtSecret)
}


module.exports = {
    validateEmail,
    validatePassword,
    validateField,
    doesUserExist,
    validateUser,
    doesPasswordMatch,
    hashPassword,
    comparePassword,
    generateJWT,
    validateJWT
}