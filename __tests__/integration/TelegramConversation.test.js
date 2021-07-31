const { CreateConversation, UpdateConversation, GetConversation, ArchiveConversation } = require('../../src/models/conversation/Conversation')

const provider = "Telegram";

let TelegramSampleMessage = {
    message_id: 72,
    from:
    {
        id: 1,
        is_bot: false,
        first_name: 'Test',
        last_name: 'User',
        language_code: 'pt-br'
    },
    chat:
    {
        id: 1,
        first_name: 'Test',
        last_name: 'User',
        type: 'private'
    },
    date: Date.now(),
    text: 'Jest Test running...'
}

describe('Conversation', () => {
    let conversation_id = ""
    it('New Conversation', async () => {
        const NewConversation = await CreateConversation(provider, TelegramSampleMessage)
        conversation_id = NewConversation['_id'];
        expect(NewConversation['active']).toBe(true);
    })
    it('Update Conversation', async () => {
        const Conversation = await GetConversation(provider, TelegramSampleMessage)
        TelegramSampleMessage['date'] = Date.now();
        TelegramSampleMessage['text'] = "Updating conversation"
        const UpdateTestConversation = await UpdateConversation(provider, TelegramSampleMessage, Conversation['messages'])
    })
    it('Archive Conversation', async () => {
        const ArchiveTestConversation = await ArchiveConversation(conversation_id)
        console.log(ArchiveTestConversation)
    })
})