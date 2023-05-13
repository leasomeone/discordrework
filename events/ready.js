const { Events, ActivityType, EmbedBuilder } = require('discord.js');
const log = require('../functions/logLib.js')
const util = require('minecraft-server-util');
const mcServer = require('../functions/mcServerLib.js');
const time = require('../functions/timeLib.js');
const config = require('../config.js');


// const default_activity = ActivityType.Playing;
// const default_message = 'with her food';
const default_activity = ActivityType.Watching;
const default_message = 'no players online';

const options = {
	timeout: 3000,
	enableSRV: false,
};


module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        log.initLogger();
        log.info(`Started, and logged in as ${client.user.tag}`);

        client.user.setActivity(default_message, { type: default_activity });
		// eslint-disable-next-line no-undef
		result = '';
		setInterval(async () => {

			// status
			try {
				result = await util.status(config.serverIp, 25565, options);
			}
			catch {
				result = 'offline';
			}
			if (result == 'offline') {
				client.user.setActivity('an offline server', { type: ActivityType.Watching });
				return;
			}
            if (result !== 'offline' && result.players.online == '1') { client.user.setActivity('with ' + result.players.online + ' player', { type: ActivityType.Playing }); }
			else if (result !== 'offline' && result.players.online != 0 && result.players.online !== 0) {client.user.setActivity('with ' + result.players.online + ' players', { type: ActivityType.Playing }); }
			else { client.user.setActivity(default_message, { type: default_activity }); }
			return;
		}, 10000);

        setInterval(async () => {
			// server info
			try {
				const serverEmbed = await mcServer.serverInfo();

				dateEmbed = new EmbedBuilder()
					.setColor('#00FF00')
					.setTitle('Succesfully updated at <t:' + Math.floor(Date.now() / 1000) + ':T>');

				await client.channels.cache.get(config.statusChannelId).messages.fetch(config.statusMessageId).then(msg => msg.edit({content: '',  embeds: [
					serverEmbed, dateEmbed,
				], content: '' }));
			}
			catch (e) {
				dateEmbed = new EmbedBuilder()
					.setColor(0xFF0000)
					.setTitle('Update at <t:' + Math.floor(Date.now() / 1000) + ':T> failed');

				await client.channels.cache.get(config.statusChannelId).messages.fetch(config.statusMessageId).then(msg => msg.edit({content: '', embeds: [
					dateEmbed,
				] }));
				console.log('[' + time.formattedTime() + '] Error with server info....');
				console.error(e);
				return;
			}
		}, 10000);
    }
}