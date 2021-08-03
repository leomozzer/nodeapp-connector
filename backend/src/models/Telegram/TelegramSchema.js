const { Mongoose } = require('../Mongo');
const TelegramBotSchema = new Mongoose.Schema(
    {
        'name': String,
        'token': String,
        'config': {
            'type': Object,
            'default': {
                'config': {
                    'polling': true
                }
            }
        }
    },
    {
        'collection': 'TelegramBots', timestamps: true
    }
)
module.exports = {
    TelegramBotSchema: TelegramBotSchema
}