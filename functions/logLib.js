const winston = require('winston');
const time = require('./timeLib.js')

module.exports = { info, error, initLogger };

function initLogger() {
    logger = winston.createLogger({
        format: winston.format.simple(),
        transports: [
            new winston.transports.File({ filename: 'logs/logs.log' })
        ],
    });
}

  
async function info(text) {
    logger.info('[' + time.formattedTime() + '] ' + text)
    console.info('[' + time.formattedTime() + '] ' + text)
}

async function error(text) {
    logger.error('[' + time.formattedTime() + '] ' + text)
    console.error('[' + time.formattedTime() + '] ' + text)
}