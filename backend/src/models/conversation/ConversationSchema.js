const { Mongoose } = require('../Mongo');
const conversationSchema = new Mongoose.Schema(
    {
        'name': String,
        'messages': Array,
        'user_id': String,
        'date': {
            'type': String,
            'default': Date.now
        },
        'lastMessageTime': {
            'type': String,
            'default': Date.now
        },
        'provider': String,
        'active': {
            'type': Boolean,
            'default': true
        }
    },
    {
        'collection': 'conversation', timestamps: true
    }
)
module.exports = {
    ConversationSchema: conversationSchema
}