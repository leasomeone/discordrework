const { Events, ActivityType, EmbedBuilder } = require('discord.js');
const log = require('../functions/logLib.js')
const mysql =require('../functions/mysqlLib.js');


// const default_activity = ActivityType.Playing;
// const default_message = 'with her food';
const default_activity = ActivityType.Playing;
const default_message = 'your reality';

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        log.initLogger();
		//mysql.connect(); to add later
        log.info(`Started, and logged in as ${client.user.tag}`);
        client.user.setActivity(default_message, { type: default_activity });
    }
}
