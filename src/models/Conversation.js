const { Mongoose } = require('./Mongo');
const conversationSchema = new mongoose.Schema(
    {
        'data': String
    },
    {
        'collection': 'conversation', timestamps: true
    }
)
module.exports = {
    ConversationSchema: conversationSchema
}