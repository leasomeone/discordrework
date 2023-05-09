const { Events, EmbedBuilder } = require('discord.js');
const embed = require('../functions/embedLib.js');
const log = require('../functions/logLib.js')

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.webhookId) return;
        if (message.member.user.bot) return;

        //	secret messages
		if (message.content == 'jointest') {
			if (message.author.id == '970394382912094218') {
				message.client.emit('guildMemberAdd', message.author);
				log.info('jointest ' + message.author.tag);
				message.reply({ embeds: [embed.title('Here ya go')] });
			}
			else {
				message.reply({ embeds: [embed.title('Ayo new phone who dis ?')] });
			}
		}



    }
}