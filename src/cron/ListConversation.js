//Modules
const cron = require('node-cron');

//Models
const { ListActiveConversation, ArchiveConversation } = require('../models/conversation/Conversation');

module.exports = {
    CronListConversations() {
        cron.schedule('* * * * *', async () => {
            console.log('Getting conversation list');
            const ConversationList = await ListActiveConversation();
            if (ConversationList !== null) {
                ConversationList.forEach(async conversation => {
                    //Difference betwen the last message and the current time
                    const DiffTimeMinutes = Number((Date.now() - conversation['lastMessageTime']) / 60000);
                    console.log(`DiffTimeMinutes: ${DiffTimeMinutes}`)
                    if (DiffTimeMinutes > 5 && conversation['active'] === true) {
                        await ArchiveConversation(conversation['_id'])
                    }
                })
            }
        })
    }
}