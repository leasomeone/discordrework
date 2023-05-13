const { Events, EmbedBuilder } = require('discord.js');
const config = require('../config.js');
const time = require('../functions/timeLib.js');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		member.client.channels.cache.get(config.welcomeChannelId).send(`Hello <@${member.id}>, welcome to Misty’s Lab! Check out <#830181778903269426>to get yourself equipped with some vanity roles, and <#830197400441716777> to read our rules.\nEnjoy your stay!`)
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

