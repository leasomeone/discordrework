const { Events, ActivityType } = require('discord.js');
const log = require('../functions/logLib.js')
const util = require('minecraft-server-util');
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
    }
}