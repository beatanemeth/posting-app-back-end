const app = require("./app")
const { connectDB } = require("./config/prod.db")
const PORT = 8000


// connect to MongoDB
connectDB()


const startServer = (PORT) => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`)
        })

    } catch (error) {
        console.error(error)
        process.exit()
    }
}

startServer(PORT)
