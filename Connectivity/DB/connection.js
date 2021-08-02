const mongoose = require("mongoose")
const URI = "mongodb+srv://gb:gb@1793@cluster0.kgfqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectDB = async() => {
    await mongoose.connect(URI,{
        useNewUrlParser: true,
         useUnifiedTopology: true
        })
    console.log('DB connected!...')
};

module.exports = connectDB;