/* eslint-disable no-undef */
/* eslint-disable no-case-declarations */
/* eslint-disable no-duplicate-case */
module.exports = { buttonCollector, buttonModsRow, buttonMiscRow, selectGender, selectCollector, selectVore, selectType };
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const embed = require('../functions/embedLib.js');
const log = require('../functions/logLib.js');

function buttonModsRow() {
	const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('1105026482474061824')
				.setLabel('VCraft updates')
				.setEmoji('📁')
				.setStyle(ButtonStyle.Primary),
		)
		.addComponents(
			new ButtonBuilder()
				.setCustomId('1106517668137271388')
				.setLabel('VCraft progress')
				.setEmoji('📣')
				.setStyle(ButtonStyle.Secondary),
		)
	return row;
}

function buttonMiscRow() {
	const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('1106517812094173245')
				.setLabel('Minecraft server')
				.setEmoji('🏹')
				.setStyle(ButtonStyle.Primary),
		)
	return row;
}

function selectGender() {
	const row = new ActionRowBuilder()
		.addComponents(
			new StringSelectMenuBuilder()
				.setCustomId('prounons')
				.setPlaceholder('Nothing selected')
				.setMinValues(0)
				.setMaxValues(5)
				.addOptions(
					{
						label: 'She/Her',
						value: '1106517899214073887',
					},
					{
						label: 'He/Him',
						value: '1106517984463298571',
					},
					{
						label: 'They/Them',
						value: '1106518045133897758',
					},
					{
						label: 'Any pronouns',
						value: '1106518096795140099',
					},
				),
		);
	return row;
}

function selectType() {
	const row = new ActionRowBuilder()
		.addComponents(
			new StringSelectMenuBuilder()
				.setCustomId('type')
				.setPlaceholder('Nothing selected')
				.setMinValues(0)
				.setMaxValues(5)
				.addOptions(
					{
						label: 'Prey',
						value: '830193422748090429',
					},
					{
						label: 'Pred',
						value: '830193401764905010',
					},
					{
						label: 'Switch',
						value: '830193441237106712',
					},
					{
						label: 'Switch Prey leaning',
						value: '1106518260914069535',
					},
					{
						label: 'Switch Pred leaning',
						value: '1106518175199281153',
					},
				),
		);
	return row;
}

function selectVore() {
	const row = new ActionRowBuilder()
		.addComponents(
			new StringSelectMenuBuilder()
				.setCustomId('kinks')
				.setPlaceholder('Nothing selected')
				.setMinValues(0)
				.setMaxValues(5)
				.addOptions(
					{
						label: 'Observer',
						value: '830193461839659089',
					},
					{
						label: 'Weight gain',
						value: '913556577296977961',
					},
					{
						label: 'Stuffing',
						value: '913556376826040330',
					},
					{
						label: 'Pregnancy',
						value: '913556369012060190',
					},
					{
						label: 'Inflation',
						value: '913556735413862461',
					},
				),
		);
	return row;
}

function selectCollector(interaction) {
	log.info(interaction.customId + ' select menu with value: ' + interaction.values[0] + ' was pressed by: ' + interaction.user.username);
	switch (interaction.customId) {
	case 'prounons':
		toDelete = ['1106517899214073887', '1106517984463298571', '1106518045133897758', '1106518096795140099']
		if (interaction.values == '') {
			for (let i = 0; i < toDelete.length; i++) {
				softDeleteRole(interaction, toDelete[i]);
			}
			interaction.reply({ embeds: [embed.title('Succesfully removed you the roles')], ephemeral: true });
			return;
		}
		roleid = interaction.values[0]
		for (let i = 0; i < toDelete.length; i++) {
			softDeleteRole(interaction, toDelete[i]);
		}
		roleToGibe = interaction.guild.roles.cache.get(roleid);
		interaction.member.roles.add(roleToGibe);
		interaction.reply({ embeds: [embed.description('Succesfully gave you the role:', '<@&' + roleToGibe.id + '>')], ephemeral: true });
	break;


	case 'type':
		toDelete = ['830193422748090429', '830193401764905010', '830193441237106712', '1106518260914069535', '1106518175199281153']
		if (interaction.values == '') {
			for (let i = 0; i < toDelete.length; i++) {
				softDeleteRole(interaction, toDelete[i]);
			}
			interaction.reply({ embeds: [embed.title('Succesfully removed you the roles')], ephemeral: true });
			return;
		}
		roleid = interaction.values[0]
		for (let i = 0; i < toDelete.length; i++) {
			softDeleteRole(interaction, toDelete[i]);
		}
		roleToGibe = interaction.guild.roles.cache.get(roleid);
		interaction.member.roles.add(roleToGibe);
		interaction.reply({ embeds: [embed.description('Succesfully gave you the role:', '<@&' + roleToGibe.id + '>')], ephemeral: true });
	break;

	case 'kinks':
		// eslint-disable-next-line no-case-declarations
		toDelete = ['830193461839659089', '913556577296977961', '913556376826040330', '913556369012060190', '913556735413862461'];
		if (interaction.values == '') {
			for (let i = 0; i < toDelete.length; i++) {
				softDeleteRole(interaction, toDelete[i]);
			}
			interaction.reply({ embeds: [embed.title('Succesfully removed you the roles')], ephemeral: true });
			return;
		}
		const selected = interaction.values;
		for (let i = 0; i < toDelete.length; i++) {
			softDeleteRole(interaction, toDelete[i]);
		}
		specialroles = '';
		for (let i = 0; i < selected.length; i++) {
			gibeRoleSpecial(interaction, selected[i]);
		}
		interaction.reply({ embeds: [embed.description('Succesfully gave you the roles:', specialroles)], ephemeral: true });
	}
}


function buttonCollector(interaction) {
	log.info(interaction.customId + ' button was pressed by: ' + interaction.user.username);
	giveRemoveRole(interaction, interaction.customId.toString())
}

function giveRemoveRole(interaction, roleid) {
	const roleToGibe = interaction.guild.roles.cache.get(roleid);
	if (interaction.member.roles.cache.find(role => role.id === roleid)) {
		interaction.member.roles.remove(roleToGibe);
		interaction.reply({ embeds: [embed.description('Succesfully removed you the role:', '<@&' + roleToGibe.id + '>')], ephemeral: true });
	}
	else {
		interaction.member.roles.add(roleToGibe);
		interaction.reply({ embeds: [embed.description('Succesfully gave you the role:', '<@&' + roleToGibe.id + '>')], ephemeral: true });
	}
}


function gibeRoleSpecial(interaction, roleid) {
	const roleToGibe = interaction.guild.roles.cache.get(roleid);
	interaction.member.roles.add(roleToGibe);
	specialroles = specialroles + '<@&' + roleToGibe.id + '>\n';
}

function softDeleteRole(interaction, roleid) {
	interaction.member.roles.remove(roleid);
}