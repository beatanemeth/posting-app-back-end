const userValidation = require("../utils/userValidation")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// This file contains unit tests.

describe("Check email validity,", () => {
    test("and when email is invalid, throw an error.", () => {
        const validEmail = () => {
            userValidation.validateEmail("test email com")
        }

        expect(validEmail).toThrow(new Error("Not a valid email format!"))
    })
})


describe("Check password validity,", () => {

    const errorMessage = "Password must be min. 4 characters, must contain at least one upper case and one lower case letter, and one number!"
    const passwordCases = [
        ["22", errorMessage],
        ["22AB", errorMessage],
        ["22ab", errorMessage],
        ["AbAb", errorMessage],
    ]

    test.each(passwordCases)("and when password, e.g.: '%s', is invalid, throw an error.", (password, error) => {
        const validPassword = () => {
            userValidation.validatePassword(password)
        }

        expect(validPassword).toThrow(error)
    })
})


describe("Check that all registration/login form fields are filled out, ", () => {

    const errorMessage = "All fields are required!"
    const registrationFormCases = [
        { name: "testName", email: "testEmail", password: "", error: errorMessage },
        { name: "testName", email: "", password: "", error: errorMessage },
        { name: "", email: "", password: "", error: errorMessage },
    ]

    test.each(registrationFormCases)("and when any of the fields on registration/login form are empty - %o -, throw an error.", ({ name, email, password, error }) => {
        const emptyField = () => {
            userValidation.validateField(name, email, password)
        }

        expect(emptyField).toThrow(error)
    })
})


describe("Check user credentials during the registration,", () => {
    test("and if user already exists, throw an error. ", () => {
        const userExists = () => {
            userValidation.doesUserExist(true)
        }

        expect(userExists).toThrow()
    })
})


describe("Check user credentials during the login,", () => {
    test("and if user does not exist, throw an error.", () => {
        const userNotExist = () => {
            userValidation.validateUser(false)
        }

        expect(userNotExist).toThrow()
    })

    test("and if entered password does not match hashed password in the DB, throw an error.", () => {
        const passwordMatch = () => {
            userValidation.doesPasswordMatch(false)
        }

        expect(passwordMatch).toThrow()
    })
})


describe("Check that it returns", () => {
    test("with hashed password when raw password is provided.", () => {
        const rawPassword = "1234"
        const hashedPassword = "$2y$04$c6bTR4nlgigHTtLqUSsw2uqL/oFsKdOEXcggnWil08FsNkSFO6Nzu"

        const mockBcryptHashSync = bcrypt.hashSync = jest.fn().mockReturnValue(hashedPassword)

        const hashPassword = userValidation.hashPassword(rawPassword)

        expect(mockBcryptHashSync).toHaveBeenCalledTimes(1)
        expect(mockBcryptHashSync).toHaveReturnedWith(hashedPassword)
        expect(hashPassword).toBe(hashedPassword)
    })

    test("with true when raw and hashed passwords match.", () => {
        const rawPassword = "1234"
        const hashedPassword = "$2y$04$c6bTR4nlgigHTtLqUSsw2uqL/oFsKdOEXcggnWil08FsNkSFO6Nzu"

        const mockBcryptCompareSync = bcrypt.compareSync = jest.fn(() => true)

        const comparePassword = userValidation.comparePassword(rawPassword, hashedPassword)

        expect(mockBcryptCompareSync).toHaveBeenCalledTimes(1)
        expect(mockBcryptCompareSync).toBeTruthy()
        expect(comparePassword).toBeTruthy()
    })
})


describe("Check that it returns", () => {
    test("with a token when user data is provided.", () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
        const tokenData = {
            id: "test-id-1",
            email: "test@mail.com"
        }

        const mockSignJWT = jwt.sign = jest.fn().mockReturnValue(token)

        const generateToken = userValidation.generateJWT(tokenData)

        expect(mockSignJWT).toHaveBeenCalled()
        expect(mockSignJWT).toHaveReturnedWith(token)
        expect(generateToken).toBe(token)
    })

    test("with decoded token data when token is provided.", () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
        const tokenData = {
            id: "test-id-1",
            email: "test@mail.com"
        }

        const mockVerifyJWT = jwt.verify = jest.fn().mockReturnValue(tokenData)

        const verifyToken = userValidation.validateJWT(token)

        expect(mockVerifyJWT).toHaveBeenCalled()
        expect(mockVerifyJWT).toHaveReturnedWith(tokenData)
        expect(verifyToken).toBe(tokenData)
    })
})
