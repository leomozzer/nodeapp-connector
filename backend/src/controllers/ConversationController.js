const { ListConversation } = require("../models/conversation/Conversation")

module.exports = {
    async ListAllConversations(req, res) {
        try {
            const Conversations = await ListConversation();
            return res.send(Conversations)
        }
        catch (error) {
            return res.json({
                'error': error
            })
        }
    }
}