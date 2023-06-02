const errorHandler = (error, req, res, next) => {
    const statusCode = error.status ? error.status : 500
    const errorMessage = error.message || "Something went wrong."

    res.status(statusCode)
    res.json(errorMessage)

    console.error(`ErrorHandler message: ${error.message}`)
}


module.exports = {
    errorHandler,
}
