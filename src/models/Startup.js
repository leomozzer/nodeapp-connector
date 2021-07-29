const { StartTelegramBot } = require('./Telegram/Telegram');

module.exports = {
    async StartUp() {
        await StartTelegramBot();
    }
}