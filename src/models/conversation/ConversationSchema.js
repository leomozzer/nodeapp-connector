const { Mongoose } = require('../Mongo');
const conversationSchema = new Mongoose.Schema(
    {
        'name': String,
        'messages': Array,
        'user_id': String,
        'date': String,
        'lastMessageTime': String,
        'provider': String,
        'active': Boolean
    },
    {
        'collection': 'conversation', timestamps: true
    }
)
module.exports = {
    ConversationSchema: conversationSchema
}