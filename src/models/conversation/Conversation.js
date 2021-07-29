const { ConversationSchema } = require('./ConversationSchema');
const { Mongoose } = require('../../models/Mongo');

module.exports = {
    async CreateConversation(provider, data) {
        try {
            const Conversation = Mongoose.model('conversation', ConversationSchema, 'conversation');
            const NewConversation = provider === "Telegram" ? Conversation(
                {
                    'name': data['chat']['first_name'],
                    'messages': [{
                        'message': data['text'],
                        'date': Date.now()
                    }],
                    'user_id': data['chat']['id'],
                    'date': Date.now()
                }) : Conversation(
                    {
                        'name': 'String',
                        'messages': 'Array',
                        'user_id': 'String',
                        'date': 'String'
                    })
            return NewConversation.save();
        }
        catch (error) {
            console.log(error)
            return 'error';
        }
    },
    async GetConversation(provider, data) {
        try {
            const ConversationModel = Mongoose.model('conversation', ConversationSchema, 'conversation');
            const Conversation = provider === "Telegram" ? await ConversationModel.findOne({ 'user_id': data['chat']['id'] }) : await ConversationModel.findOne({ 'user_id': 'sample' })
            console.log(Conversation)
            return Conversation;
        }
        catch (error) {
            console.log(error)
            return 'error'
        }
    },
    async UpdateConversation(provider, data, message) {
        try {
            const ConversationModel = Mongoose.model('conversation', ConversationSchema, 'conversation');
            const Conversation = provider === "Telegram" ? await ConversationModel.findOneAndUpdate({ 'user_id': data['chat']['id'] }, {
                'messages': [{
                    'message': data['text'],
                    'date': Date.now()
                }, ...message]
            }) : await ConversationModel.findOneAndUpdate({ 'user_id': 'sample' }, {
                'messages': [{
                    'message': data['text'],
                    'date': Date.now()
                }, ...message]
            })
            return Conversation;
        }
        catch (error) {
            console.log(error)
            return 'error'
        }
    }
}

