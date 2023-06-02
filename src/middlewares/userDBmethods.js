const User = require("../models/userModel")


const userFindOne = async (email) => {
    return await User.findOne({ email })
}


const userFindById = async (tokenUser) => {
    return await User.findById({ _id: tokenUser.id })
}


const userCreate = async (name, email, hashedPassword) => {
    return await User.create({
        name,
        email,
        password: hashedPassword
    })
}


module.exports = {
    userFindOne,
    userFindById,
    userCreate
}