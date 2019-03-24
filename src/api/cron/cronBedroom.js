const CronJob = require('cron').CronJob;

const { bedroomTempRef } = require('../firebaseRefs')
const getBedroomData = require('../getBedroomData')

//Hourly Temp Humidity and Status
const cronBedRoom = new CronJob(`0 0 * * * *`, function () {
  getBedroomData()
    .then(data => {
      bedroomTempRef.add({ ...data, createdAt: new Date() });
    })
});

module.exports = cronBedRoom;
