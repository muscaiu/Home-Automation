const logger = require('./logger');
var fs = require('fs');

const cronLiving = require('./cron/cronLiving');
cronLiving.start()
logger.info('cronLiving cron started');
 
fs.readFile('sensor.log', 'utf8', function(err, sensor) {
    console.log(sensor);
});