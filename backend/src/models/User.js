const { Mongoose } = require('./Mongo');
const userSchema = new Mongoose.Schema(
    {
        'username': String,
        'email': String,
    },
    {
        'collection': 'users', timestamps: true
    }
)

module.exports = {
    UserSchema: userSchema
}