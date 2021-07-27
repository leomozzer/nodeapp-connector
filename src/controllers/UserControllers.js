
//Models
const { UserSchema } = require('../models/User');
const { Mongoose } = require('../models/Mongo');
module.exports = {
    async CreateUser(req, res) {
        const { username, email } = req.body
        try {
            const User = Mongoose.model('users', UserSchema, 'users');
            const NewUser = new User({ username, email });
            await NewUser.save();
            return res.json({
                response: 'User created'
            })
        }
        catch (error) {
            console.log(error)
            return res.json({
                'error': error
            })
        }
    },
    async ReadUser(req, res) {
        const { id } = req.params
        try {
            console.log(id)
            const User = Mongoose.model('users', UserSchema, 'users');
            const GetUser = await User.findById(id).exec()
            return res.json({
                'response': GetUser
            })
        }
        catch (error) {
            return res.json({
                'error': error
            })
        }
    },
    async UpdateUser(req, res) {
        const { id } = req.body
        try {
            console.log(id)
            const User = Mongoose.model('users', UserSchema, 'users');
            const UpdateUser = await User.findByIdAndUpdate(id, { 'username': Date.now() }).exec()
            return res.json({
                'response': UpdateUser
            })
        }
        catch (error) {
            return res.json({
                'error': error
            })
        }
    },
    async DeleteUser(req, res) {
        const { id } = req.body
        try {
            console.log(id)
            const User = Mongoose.model('users', UserSchema, 'users');
            const UpdateUser = await User.findByIdAndDelete(id).exec();
            return res.json({
                'response': UpdateUser
            })
        }
        catch (error) {
            return res.json({
                'error': error
            })
        }
    },
    async ListUsers(req, res) {
        try {
            const Users = Mongoose.model('users', UserSchema, 'users')
            const UserList = await Users.find({}).lean().exec();
            return res.json({
                'response': UserList
            })
        }
        catch (error) {
            return res.json({
                'error': error
            })
        }
    },
}