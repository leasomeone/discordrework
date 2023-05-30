const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const embed = require('../functions/embedLib.js');
const mysql = require('../functions/mysqlLib.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Warn a user')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addSubcommand(subcommand =>
			subcommand
				.setName('view')
				.setDescription('Shows warns of a user')
				.addUserOption(option => option.setName('user').setDescription('The user').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Write a warn on a user')
				.addUserOption(option => option.setName('user').setDescription('The user').setRequired(true))
				.addStringOption(option => option.setName('warn').setDescription('The user').setRequired(true))),
	execute(interaction) {
		switch (interaction.options.getSubcommand()) {
			case 'view':
				mysql.viewWarn(interaction);
				break;

			case 'add':
				mentionned = interaction.options.getUser('user');
				mysql.addWarn(mentionned.id.toString(), interaction.options.getString('warn'))
				interaction.reply({ embeds: [embed.description(`${mentionned.username} warned with reason:`, interaction.options.getString('warn'))]})
		}
		
	},
};  
