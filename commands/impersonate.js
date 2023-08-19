/* eslint-disable no-undef */
const { SlashCommandBuilder } = require('discord.js');
const webhook =require('../functions/webHookLib.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('impersonate')
		.setDescription('Impersonate the selected user')
		.addUserOption(option =>
			option.setName('user')
				.setRequired(true)
				.setDescription('User'))
		.addStringOption(option =>
			option.setName('text')
				.setRequired(true)
				.setDescription('Text for your message')),
	async execute(interaction) {
		webhook.sendAs(interaction, interaction.options.getUser('user'), interaction.options.getString('text'));
		interaction.reply({content: 'Done!', ephemeral: true});
	},
};
