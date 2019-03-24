const io = require('socket.io')();
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = express.Router();

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
  client.on('toggleLiving', () => {
    axios.get('http://192.168.1.12/cm?cmnd=Power%20TOGGLE')
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
// io.listen(port);
// logger.info(`socket.io on port, ${port}`);



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

router.get('/toggleLiving', function (req, res) {
  axios.get('http://192.168.1.12/cm?cmnd=Power%20TOGGLE')
  // getStatusPompa()
  //   .then(data => res.json(data))
});

app.listen(port, function () {
  logger.info(`*** API running on port ${port} ***`);
});

app.use('/api', router);
