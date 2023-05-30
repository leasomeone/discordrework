const { Events } = require('discord.js');
const secret = require('../functions/secretMessages.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.webhookId) return;
        if (message.member.user.bot) return;

        //	secret messages
		secret.secrets(message);
    }
}