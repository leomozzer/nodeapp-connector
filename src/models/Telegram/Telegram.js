const TelegramBot = require('node-telegram-bot-api');
const { CreateConversation, GetConversation, UpdateConversation } = require('../conversation/Conversation');
const { Mongoose } = require('../Mongo');

const TelegramBotSchema = require('./TelegramSchema');

class TelegramBotClass {
    constructor(token) {
        this.bot = new TelegramBot(token, { 'polling': true });
        return this.bot;
    }
}

module.exports = {
    async StartTelegramBot() {
        try {
            const BotModel = Mongoose.model('TelegramBots', TelegramBotSchema, 'TelegramBots')
            const BotList = await BotModel.find({}).lean().exec()
            console.log(BotList)
            if (BotList === null) {
                console.log("No bot was found");
            }
            else {
                BotList.forEach(bot => {
                    console.log(bot)
                    const CurrentBot = new TelegramBot(bot['token'], { 'polling': true });
                    CurrentBot.on('message', async (msg) => {
                        console.log(msg)
                        const Conversation = await GetConversation("Telegram", msg);
                        if (Conversation === null) {
                            await CreateConversation("Telegram", msg);
                        }
                        else {
                            await UpdateConversation("Telegram", msg, Conversation['messages']);
                        }
                        CurrentBot.sendMessage(msg.chat.id, 'New message')
                    })
                })
            }
        }
        catch (error) {
            console.log(error)
        }
    }
}