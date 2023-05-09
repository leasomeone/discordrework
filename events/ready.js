const { Events } = require('discord.js');
const log = require('../functions/logLib.js')

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        log.initLogger();
        log.info(`Started, and logged in as ${client.user.tag}`);
    }
}