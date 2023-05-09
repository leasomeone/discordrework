const { Events } = require('discord.js');
const log = require('../functions/logLib.js')
const embed = require('../functions/embedLib.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			log.error(`No command matching ${interaction.commandName} was found.`);
            await interaction.reply({ embeds: [embed.error(`No command matching ${interaction.commandName} was found.`)]});
			return;
		}

		try {
			await command.execute(interaction);
            log.info(`Command "${interaction.commandName}" executed by ${interaction.member.user.username} in #${interaction.channel.name}`);
		} catch (error) {
			log.error(`Error executing ${interaction.commandName}`);
			log.error(error);
            try {
                if (error == null) {
                    await interaction.reply({ embeds: [embed.error('There was an error while executing this command!')]});
                } else {
                    await interaction.reply({ embeds: [embed.errorDesc('There was an error while executing this command!', error.toString())]});
                }
            } catch {
                if (error == null) {
                    await interaction.channel.send({ embeds: [embed.error('There was an error while executing this command!')]});
                } else {
                    await interaction.channel.send({ embeds: [embed.errorDesc('There was an error while executing this command!', error.toString())]});
                }
            }
		}
	},
};
