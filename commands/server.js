const { SlashCommandBuilder } = require('discord.js');
const mcServer = require('../functions/mcServerLib.js');
const embed = require('../functions/embedLib.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Shows information about the minecraft server')
		.addSubcommand(subcommand =>
			subcommand
				.setName('anonymous')
				.setDescription('Shows information about the minecraft server without showing the answer in public'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('public')
				.setDescription('Shows information about the minecraft server showing the answer in public')),
	async execute(interaction) {
		if (interaction.options.getSubcommand() == 'anonymous') {
			anonymous = Boolean(true);
		}
		else {
			anonymous = Boolean(false);
		}
		const serverEmbed = await mcServer.serverInfo();
		interaction.reply({ embeds: [serverEmbed, embed.title('Tip: use <#977968265353642064> for live updates')], ephemeral: anonymous });
	},
};

