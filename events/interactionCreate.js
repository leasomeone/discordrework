const { Events, EmbedBuilder } = require('discord.js');
const log = require('../functions/logLib.js')
const role = require('../functions/rolesLib.js');
const embed = require('../functions/embedLib.js');
const config = require('../config.js');


module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isButton()) {
			role.buttonCollector(interaction);
			return;
		}

		if (interaction.isStringSelectMenu()) {
			role.selectCollector(interaction);
			return;
		}

		if (!interaction.isChatInputCommand()) return;

		const logEmbed = new EmbedBuilder()
			.setColor('#00FF00')
			.setTitle('Executed command')
			.setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() })
			.setDescription(interaction.commandName)
			.addFields({ name: 'channel', value: '#' + interaction.channel.name, inline: true })
			.setTimestamp();
		interaction.client.channels.cache.get(config.logChannelId).send({ embeds: [logEmbed] });


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
