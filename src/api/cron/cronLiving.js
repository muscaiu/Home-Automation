const CronJob = require('cron').CronJob;

const { livingTempRef } = require('../firebaseRefs')
const getLivingStatus = require('../getLivingStatus')

//Hourly Temp Humidity and Status
const cronLiving = new CronJob(`0 0 * * * *`, function () {
  getLivingStatus()
    .then(data => {
      livingTempRef.add({ ...data, createdAt: new Date() });
    })
});

module.exports = cronLiving;
