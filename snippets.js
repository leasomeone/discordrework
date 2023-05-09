const config = require('./configs/config.json');
const testingConfig = require('./configs/config-testing.json')

config = require('./configs/config.json');
if (config.testing) { config = require('../configs/config-testing.json'); }

const time = require('../functions/timeLib.js');
const embed = require('../functions/embedLib.js');
const log = require('../functions/logLib.js')

const { logger } = require('../functions/logLib.js')
