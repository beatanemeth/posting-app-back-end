require("dotenv").config()

const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const { errorHandler } = require("./middlewares/errorHandler")


// to invoke express function — returning an object — and save that into a constant app
const app = express()


// to allow cross origin resource sharing
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true, // because we are sending credentials from our react app
    })
)

// parses incoming requests with JSON payloads
app.use(express.json())

// to parse cookie attached to the client request object
app.use(cookieParser())

// routes
app.use("/api/user", require("./routes/userRoute"))
app.use("/api/post", require("./routes/postRoute"))


app.use(errorHandler)


module.exports = app
