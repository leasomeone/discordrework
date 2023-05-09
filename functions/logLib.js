const winston = require('winston');
const time = require('./timeLib.js')
const config = require('../configs/config.json')

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
    logger.info('[' + time.formattedTime() + '] ' + text)
    console.info('[' + time.formattedTime() + '] ' + text)
    return;
}

async function error(text) {
    logger.error('[' + time.formattedTime() + '] ' + text)
    console.error('[' + time.formattedTime() + '] ' + text)
    return;
}