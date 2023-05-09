const winston = require('winston');
const timeLib = require('./timeLib.js')
const config = require('../configs/config.json')
const logsTimeDisplay = '[' + timeLib.formattedTime() + '] ';

module.exports = { info, error, initLogger };

function initLogger() {
    if (config.testing) { file = 'logs/testing-logs.log' } else { file = 'logs/logs.log'};

    logger = winston.createLogger({
        format: winston.format.simple(),
        transports: [
            new winston.transports.File({ filename: file })
        ],
    });
    return;
}

  
async function info(text) {
    logger.info(logsTimeDisplay + text)
    console.info(logsTimeDisplay + text)
    return;
}

async function error(text) {
    logger.error(logsTimeDisplay + text)
    console.error(logsTimeDisplay + text)
    return;
}