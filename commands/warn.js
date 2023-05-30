const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const embed = require('../functions/embedLib.js');
const mysql =require('../functions/mysqlLib.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Warn a user')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		mysql.connect();
		await interaction.reply({ embeds: [embed.title('Pong!')] });
	},
};  
