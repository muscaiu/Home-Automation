const logger = require('./logger');

const cronLiving = require('./cron/cronLiving');
cronLiving.start()
logger.info('cronLiving cron started');
