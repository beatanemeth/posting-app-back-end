const Post = require("../models/postModel")
const User = require("../models/userModel")
const postDBmethods = require("../middlewares/postDBmethods")


// This file contains unit tests.

const testUser = new User({
    _id: 1,
    name: "Tom",
    email: "tom@mail.com",
    password: "Ab12"
})

const testTokenUser = {
    id: testUser._id,
    email: testUser.email
}

const testPosts = [
    {
        id: 1,
        title: "Tom's Adventures - Part One",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        author: testUser._id
    },
    {
        id: 2,
        title: "Tom's Adventures - Part Two",
        content: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
        author: testUser._id
    },
    {
        id: 3,
        title: "Tom's Adventures - Part Three",
        content: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
        author: testUser._id
    }
]


describe("When given a post title and post content", () => {
    test("should insert new post into DB.", async () => {
        const mockCreatePost = Post.create = jest.fn().mockReturnValue(testPosts[0])

        const createPost = await postDBmethods.postCreate(testPosts[0].title, testPosts[0].content, testTokenUser)

        expect(mockCreatePost).toHaveBeenCalledTimes(1)
        expect(mockCreatePost).toHaveReturnedWith(testPosts[0])
        expect(createPost).toBe(testPosts[0])
    })
})


describe("When given a post id", () => {
    test("should find that post in the DB.", async () => {
        const mockFindPostById = Post.findById = jest.fn().mockReturnValue(testPosts[1])

        const findPostById = await postDBmethods.postFindById(testPosts[1].id)

        expect(mockFindPostById).toHaveBeenCalledTimes(1)
        expect(mockFindPostById).toHaveReturnedWith(testPosts[1])
        expect(findPostById).toBe(testPosts[1])
    })
})


describe.skip("When given an updated post title and post content", () => {
    test("should overwrite that post in the DB.", async () => {
        const postUpdated = {
            acknowledged: true,
            modifiedCount: 1,
            upsertedId: null,
            upsertedCount: 0,
            matchedCount: 1
        }

        const titleUpdate = "Update Adventures"
        const contentUpdate = "This is a story of..."

        const mockUpdatePost = postDoc.replaceOne = jest.fn().mockReturnValue(postUpdated)

        const updatePost = await postDBmethods.postReplaceOne(testPosts[2], titleUpdate, contentUpdate, testTokenUser)

        expect(mockUpdatePost).toHaveBeenCalledTimes(1)
        expect(mockUpdatePost).toHaveReturnedWith(postUpdated)
        expect(updatePost).toBe(postUpdated)
    })
})


describe("When given a post id", () => {
    test("should delete that post from the DB.", async () => {
        const mockDeletePost = Post.deleteOne = jest.fn().mockReturnValue("ok")

        const deletePost = await postDBmethods.postDeleteOne(testPosts[2].id)

        expect(mockDeletePost).toHaveBeenCalledTimes(1)
        expect(mockDeletePost).toHaveReturnedWith("ok")
        expect(deletePost).toBe("ok")
    })
})


describe.skip("When given a post id", () => {
    test("should find that post in the DB.", async () => {
        const mockFindPostById = Post.findById = jest.fn().mockReturnValue(testPosts[1])

        const getOnePost = await postDBmethods.postPopulateAuthor(testPosts[1].id)

        expect(mockFindPostById).toHaveBeenCalledTimes(1)
        expect(mockFindPostById).toHaveReturnedWith(testPosts[1])
        expect(getOnePost).toBe(testPosts[1])
    })
})


describe.skip("When requested posts", () => {
    test("should return every post from the DB.", async () => {
        const mockFindPosts = Post.find = jest.fn().mockReturnValue(testPosts)

        const getAllPosts = await postDBmethods.postFindAll()

        expect(mockFindPosts).toHaveBeenCalledTimes(1)
        expect(mockFindPosts).toHaveReturnedWith(testPosts)
        expect(getAllPosts).toBe(testPosts)
    })
})
