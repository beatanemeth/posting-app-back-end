const User = require("../models/userModel")
const userDBmethods = require("../middlewares/userDBmethods")


// This file contains unit tests.

const testUser = {
    id: 1,
    name: "Bob",
    email: "bob@mail.com",
    password: "Ab12"
}


describe("When given a name and email and password", () => {
    test("should insert new user into DB.", async () => {
        const mockCreateUser = User.create = jest.fn().mockReturnValue(testUser)

        const newUser = await userDBmethods.userCreate(testUser.name, testUser.email, testUser.password)

        expect(mockCreateUser).toHaveBeenCalledTimes(1)
        expect(mockCreateUser).toHaveReturnedWith(testUser)
        expect(newUser).toBe(testUser)
    })
})


describe("When given an email address", () => {
    test("should find a user in the DB.", async () => {
        const mockFindUser = User.findOne = jest.fn().mockReturnValue(testUser)

        const foundUser = await userDBmethods.userFindOne(testUser.email)

        expect(mockFindUser).toHaveBeenCalledTimes(1)
        expect(mockFindUser).toHaveReturnedWith(testUser)
        expect(foundUser).toBe(testUser)
    })
})


describe("When given a user id", () => {
    test("should find a user in the DB.", async () => {
        const mockFindUserById = User.findById = jest.fn().mockReturnValue(testUser)

        const foundUserById = await userDBmethods.userFindById(testUser.id)

        expect(mockFindUserById).toHaveBeenCalledTimes(1)
        expect(mockFindUserById).toHaveReturnedWith(testUser)
        expect(foundUserById).toBe(testUser)
    })
})
