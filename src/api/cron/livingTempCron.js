const CronJob = require('cron').CronJob;

const { livingTempRef } = require('../firebaseRefs')
const getLivingStatus = require('../getLivingStatus')

//Hourly Temp Humidity and Status
const livingTempCron = new CronJob(`0 * * * * *`, function () {
  getLivingStatus()
    .then(data => {
      console.log(data)
      livingTempRef.add({ ...data, createdAt: new Date() });
    })
});

module.exports = livingTempCron;
