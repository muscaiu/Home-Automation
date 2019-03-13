const logger = require('./logger');

const livingTempCron = require('./cron/livingTempCron');
livingTempCron.start()
logger.info('livingTempCron cron started');
