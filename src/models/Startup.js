const { StartTelegramBot } = require('./Telegram/Telegram');
const { CronListConversations } = require('../cron/ListConversation')

module.exports = {
    async StartUp() {
        await StartTelegramBot();
        CronListConversations();
    }
}