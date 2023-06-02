const mongoose = require("mongoose")

const uri = "mongodb://localhost:27017/postingappTestDB"
const options = { useNewUrlParser: true }


const connectTestDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        const conn = await mongoose.connect(uri, options)

        console.log(`MongoDB is connected at http://localhost:${conn.connection.port}`)

    } catch (error) {
        console.error(error)
        process.exit()
    }
}


module.exports = {
    connectTestDB,
}
