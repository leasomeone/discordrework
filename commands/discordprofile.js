/* eslint-disable no-undef */
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const timeLib = require('../functions/timeLib.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('discordprofile')
		.setDescription('Shows a user discord infos')
		.addUserOption(option =>
			option.setName('user')
				.setRequired(true)
				.setDescription('User to get the profile from')),
	async execute(interaction) {
		mentionned = interaction.options.getUser('user');
		const embed = new EmbedBuilder()
			.setColor(0xFFFF00)
			.setTitle(mentionned.tag)
			.setThumbnail(mentionned.avatarURL())
			.setDescription('<@' + mentionned.id + '>')
			.addFields(
				{ name: 'Account Age', value: timeLib.timeSince(mentionned.createdAt), inline: false },
			)
			.setTimestamp();
		await interaction.reply({ embeds: [embed] });
	},
};
