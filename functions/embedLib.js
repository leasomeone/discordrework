module.exports = { description, title, error };
const { EmbedBuilder } = require('discord.js');

function description(title, description) {
	const Embed = new EmbedBuilder()
		.setColor(0xFFFF00)
		.setTitle(title)
		.setDescription(description);
	return Embed;
}

function title(title) {
	const Embed = new EmbedBuilder()
		.setColor(0xFFFF00)
		.setTitle(title);
	return Embed;
}


function error(title) {
	const Embed = new EmbedBuilder()
		.setColor(0xFF0000)
		.setTitle(title);
	return Embed;
}
