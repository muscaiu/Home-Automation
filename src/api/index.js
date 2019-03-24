const io = require('socket.io')();

const logger = require('./logger');
const cronLiving = require('./cron/cronLiving');
const cronBedroom = require('./cron/cronBedroom');
const getLivingStatus = require('./getLivingStatus')
const getBedroomData = require('./getBedroomData');

//Hourly Temp Humidity and Status
cronLiving.start();
cronBedroom.start();

io.set("origins", "*:*");

io.on('connection', (client) => {
  //Living
  client.on('subscribeToLiving', (interval) => {
    getLivingStatus().then(data => client.emit('livingData', data));
    setInterval(() => {
      getLivingStatus().then(data => client.emit('livingData', data));
    }, interval);
  });

  //BedRoom
  client.on('subscribeToSensor', (interval) => {
    getBedroomData().then(data => client.emit('sensor', data));
    setInterval(() => {
      getBedroomData().then(data => client.emit('sensor', data));
    }, interval);
  });
});

const port = 4001;
io.listen(port);
logger.info(`socket.io on port, ${port}`);
