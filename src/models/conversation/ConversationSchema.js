const { Mongoose } = require('../Mongo');
const conversationSchema = new Mongoose.Schema(
    {
        'name': String,
        'messages': Array,
        'user_id': String,
        'date': String,
        'provider': String
    },
    {
        'collection': 'conversation', timestamps: true
    }
)
module.exports = {
    ConversationSchema: conversationSchema
}