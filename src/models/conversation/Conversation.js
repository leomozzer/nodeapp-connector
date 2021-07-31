const { ConversationSchema } = require('./ConversationSchema');
const { Mongoose } = require('../../models/Mongo');

//Start Models
const ConversationModel = Mongoose.model('conversation', ConversationSchema, 'conversation');

module.exports = {
    async CreateConversation(provider, data) {
        try {
            const NewConversation = provider === "Telegram" ? Conversation(
                {
                    'name': data['chat']['first_name'],
                    'messages': [{
                        'message': data['text'],
                        'date': Date.now()
                    }],
                    'user_id': data['chat']['id'],
                    'date': Date.now(),
                    'lastMessageTime': Date.now(),
                    'provider': provider,
                    'active': true
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
            switch (provider) {
                case "Telegram":
                    await ConversationModel.findOneAndUpdate({ 'user_id': data['chat']['id'] }, {
                        'messages': [{
                            'origin': 'user',
                            'message': data['text'],
                            'date': Date.now(),
                        }, {
                            'origin': 'bot',
                            'message': 'bot message',
                            'date': Date.now(),
                        }, ...message],
                        'lastMessageTime': Date.now(),
                        'active': true
                    });
                    break;
                default:
                    console.log("Provider missing")
                    break;
            }
        }
        catch (error) {
            console.log(error)
            return 'error'
        }
    },
    async ListConversation() {
        const ConversationList = await ConversationModel.find({}).lean().exec();
        return ConversationList;
    },
    async ListActiveConversation() {
        const ActiveConversationList = await ConversationModel.find({ 'active': true }).exec();
        return ActiveConversationList;
    },
    async ArchiveConversation(id) {
        const Conversation = await ConversationModel.findByIdAndUpdate(id, { 'active': false })
        return Conversation;
    }
}

