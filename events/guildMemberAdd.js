const { Events, EmbedBuilder } = require('discord.js');
config = require('../configs/config.json');
if (config.testing) { config = require('../configs/config-testing.json'); }
const time = require('../functions/timeLib.js');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		const embed = new EmbedBuilder()
			.setColor('#00FF00')
			.setTitle('Someone joined')
			.setThumbnail(member.avatarURL())
			.setDescription('<@' + member.id + '> ' + member.tag)
			.addFields({ name: 'Account Age', value: time.timeSince(member.createdAt), inline: false },
				// {name : 'Server user count', value: member.client.guild.cache.get("1041000467242692660").memberCount, inline: false}
			)
		member.client.channels.cache.get(config.logChannelId).send({ embeds: [embed] });
	},
};

