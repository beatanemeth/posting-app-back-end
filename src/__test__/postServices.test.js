const postServices = require("../middlewares/postServices")
const postDBmethods = require("../middlewares/postDBmethods")
const postValidation = require("../utils/postValidation")

// This file contains unit tests.

describe("Check that postUpdate function", () => {
    test("updates the post when all parameters match.", async () => {
        const testPostDoc = {
            id: 1,
            title: "Post Title",
            content: "Cheese Cake",
            author: "jim-id-1"
        }

        const testTokenUser = {
            id: "jim-id-1",
            email: "jim@mail.com"
        }

        const titleUpdate = "Book Title"
        const contentUpdate = "Chocolate Cake"

        const postCreated = {
            acknowledged: true,
            modifiedCount: 1,
            upsertedId: null,
            upsertedCount: 0,
            matchedCount: 1
        }

        postDBmethods.postFindById = jest.fn()
        postValidation.validatePost = jest.fn()
        postValidation.validatePostAuthor = jest.fn()
        const mockPostReplaceOne = postDBmethods.postReplaceOne = jest.fn().mockReturnValue(postCreated)

        const updatePost = await postServices.postUpdate(testPostDoc.id, titleUpdate, contentUpdate, testTokenUser)

        expect(mockPostReplaceOne).toHaveBeenCalledTimes(1)
        expect(updatePost).toBe(postCreated)
    })
})


describe("Check that postCreate function", () => {
    test("creates a new post when title and content are provided", async () => {
        const testPost = {
            title: "Test Title",
            content: "Some content",
            author: "test-user-id-1"
        }

        const mockPostCreate = postDBmethods.postCreate = jest.fn().mockReturnValue(testPost)

        const postCreate = await postServices.postCreate("title", "content", "author")

        expect(mockPostCreate).toHaveBeenCalledTimes(1)
        expect(mockPostCreate).toHaveReturnedWith(testPost)
        expect(postCreate).toBe(testPost)
    })
})


describe("Check that postGetAll function", () => {
    test("returs with post saved in the DB.", async () => {
        const allPosts = [
            { id: 1, title: "Post One", content: "Content One", author: "Author One" },
            { id: 2, title: "Post Two", content: "Content Two", author: "Author Two" },
            { id: 3, title: "Post Three", content: "Content Three", author: "Author Three" }
        ]

        const mockPostFindAll = postDBmethods.postFindAll = jest.fn().mockReturnValue(allPosts)

        const getAllPosts = await postServices.postGetAll()

        expect(mockPostFindAll).toHaveBeenCalledTimes(1)
        expect(mockPostFindAll).toHaveReturnedWith(allPosts)
        expect(getAllPosts).toBe(allPosts)
        expect(getAllPosts).toHaveLength(3)
    })
})


describe("Check that postGetOne function", () => {
    test("returs with a post saved in the DB.", async () => {
        const allPosts = [
            { id: 1, title: "Post One", content: "Content One", author: "Author One" },
            { id: 2, title: "Post Two", content: "Content Two", author: "Author Two" },
            { id: 3, title: "Post Three", content: "Content Three", author: "Author Three" }
        ]

        postValidation.validatePostId = jest.fn()
        const mockPostFindOne = postDBmethods.postPopulateAuthor = jest.fn().mockReturnValue(allPosts[1])

        const getOnePost = await postServices.postGetOne(allPosts[1].id)

        expect(mockPostFindOne).toHaveBeenCalledTimes(1)
        expect(mockPostFindOne).toHaveReturnedWith(allPosts[1])
        expect(getOnePost).toBe(allPosts[1])
        expect(Object.keys(getOnePost)).toHaveLength(4)
    })
})
