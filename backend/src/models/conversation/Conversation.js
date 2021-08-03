const { ConversationSchema } = require('./ConversationSchema');
const { Mongoose } = require('../../models/Mongo');

//Start Models
const ConversationModel = Mongoose.model('conversation', ConversationSchema, 'conversation');

module.exports = {
    async CreateConversation(provider, data, botResponse = undefined) {
        try {
            let NewConversation = undefined;
            switch (provider) {
                case "Telegram":
                    NewConversation = ConversationModel(
                        {
                            'name': data['chat']['first_name'],
                            'messages': [{
                                'origin': 'user',
                                'message': data['text'],
                                'date': Date.now()
                            }, botResponse !== undefined ? botResponse : {
                                'origin': 'bot',
                                'message': 'bot message',
                                'date': Date.now()
                            }],
                            'user_id': data['chat']['id'],
                            'provider': provider
                        }
                    )
                    break;
                default:
                    break;
            }
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
    async UpdateConversation(provider, data, message, botResponse = undefined) {
        try {
            switch (provider) {
                case "Telegram":
                    await ConversationModel.findOneAndUpdate({ 'user_id': data['chat']['id'] }, {
                        'messages': [...message, {
                            'origin': 'user',
                            'message': data['text'],
                            'date': Date.now()
                        }, botResponse !== undefined ? botResponse : {
                            'origin': 'bot',
                            'message': 'bot message',
                            'date': Date.now()
                        }],
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
    },
    async DeleteConversationById(id) {
        const Conversation = await ConversationModel.findByIdAndDelete(id)
        return Conversation;
    }
}

