module.exports = { serverInfo  };
const { EmbedBuilder } = require('discord.js');
const config = require('../config.js');
const util = require('minecraft-server-util');
const embed = require('../functions/embedLib.js');

const options = {
	timeout: 3000,
	enableSRV: false,
};

async function serverInfo() {
	result = '';
	try {
		result = await util.status(config.serverIp, 25565, options);
	}
	catch (e) {
		result = 'offline';
		return embed.errorDesc('Server is offline', e);
	}
	if (result !== 'offline') {
		if (result.players.online != 0) {
			try {
                text = '';
				for (let i = 0; i < result.players.sample.length; i++) {
					if (result.players.sample[i].name == 'undefined') {
						text += '*Anonymous player*\n';
					}
					else {
                        text += `${result.players.sample[i].name}\n`
					}
				}
				serverembed = new EmbedBuilder()
					.setColor(0xFFFF00)
					.setTitle('Minecraft server info')
					.addFields(
						{ name: '📰MOTD', value: result.motd.clean },
						{ name: '⏰Latency', value: result.roundTripLatency + 'ms' },
						{ name: '📊Player count :', value: result.players.online + '/' + result.players.max },
						{ name: '🧑‍💼Players :', value: text },
					);

				return serverembed;
			}
			catch (e) {
				return embed.errorDesc('Server is offline!', e.toString());
			}
		}
		else {
			serverembed = new EmbedBuilder()
				.setColor(0xFFFF00)
				.setTitle('Minecraft server info')
				.addFields(
					{ name: '📰MOTD', value: result.motd.clean },
					{ name: '⏰Latency', value: result.roundTripLatency + 'ms' },
					{ name: '📊Player count :', value: result.players.online + '/' + result.players.max },
				);
			return serverembed;
		}
	}
}
