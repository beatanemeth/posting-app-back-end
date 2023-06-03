const postValidation = require("../utils/postValidation")

// This file contains unit tests.

test("Check post id, and if it is invalid, throw an error.", () => {
    const validPostId = () => {
        postValidation.validatePostId("testID")
    }

    expect(validPostId).toThrow()
})

test("Check post, and if it does not exist, throw an error.", () => {
    const postExist = () => {
        postValidation.isPostExist(false)
    }

    expect(postExist).toThrow()
})

test("Check that logged in user is the author of the edited post, and if not, throw an error.", () => {
    const testPostDoc = {
        title: "Test Title",
        content: "Test Content",
        author: "id-53"
    }

    const testTokenUser = {
        email: "test@mail.com",
        id: "id-54"
    }

    const postAuthor = () => {
        postValidation.validatePostAuthor(testPostDoc, testTokenUser)
    }

    expect(postAuthor).toThrow()
})
