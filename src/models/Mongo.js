require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.uqvpy.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

module.exports = {
    Mongoose: mongoose,
}