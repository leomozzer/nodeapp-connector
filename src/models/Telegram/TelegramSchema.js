const { Mongoose } = require('../Mongo');
const TelegramBotSchema = new Mongoose.Schema(
    {
        'name': String,
        'token': String
    },
    {
        'collection': 'TelegramBots', timestamps: true
    }
)
module.exports = {
    TelegramBotSchema: TelegramBotSchema
}