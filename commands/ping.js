const { SlashCommandBuilder } = require('discord.js');
const embed = require('../functions/embedLib.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Test command'),
	async execute(interaction) {
		// an error just below
		console.log(lol)
		await interaction.reply({ embeds: [embed.title('Pong!')] });
	},
};  
