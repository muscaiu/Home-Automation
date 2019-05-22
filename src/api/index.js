const io = require('socket.io')();
const logger = require('./logger');
const cronLiving = require('./cron/cronLiving');
const cronBedroom = require('./cron/cronBedroom');
const getLivingStatus = require('./getLivingStatus')
// const getBedroomData = require('./getBedroomData');
const { messaging } = require('./firebaseRefs');

const { Scanner } = require("homebridge-mi-hygrothermograph/lib/scanner");
const scanner = new Scanner();

//Hourly Temp Humidity and Status
cronLiving.start();
cronBedroom.start();

io.set("origins", "*:*");

const bedroomId = '4c65a8daa726'
const kitchenId = '4c65a8dd7c37'
const vladId = '4c65a8dae1b7'

io.on('connection', (client) => {
  //BedRoom
  client.on('subscribeToTemperature', () => {
    scanner.on("temperatureChange", function (temperature, peripheral) {
      if (peripheral.id === bedroomId) {
        client.emit('temperatureBedroom', temperature)
      } else if (peripheral.id === kitchenId) {
        client.emit('temperatureKitchen', temperature)
      } else if (peripheral.id === vladId) {
        client.emit('temperatureVlad', temperature)
      }
    });
  });
  client.on('subscribeToHumidity', () => {
    scanner.on("humidityChange", function (humidity, peripheral) {
      if (peripheral.id === bedroomId) {
        client.emit('humidityBedroom', humidity)
      } else if (peripheral.id === kitchenId) {
        client.emit('humidityKitchen', humidity)
      } else if (peripheral.id === vladId) {
        client.emit('humidityVlad', humidity)
      }
    });
  });

  //Living
  client.on('subscribeToLiving', (interval) => {
    getLivingStatus()
      .then(data => {
        client.emit('livingData', data)
      });
    setInterval(() => {
      getLivingStatus()
        .then(data => {
          client.emit('livingData', data)
        });
    }, interval);
  });
  //toggle
  client.on('toggle', () => {
    axios.get('http://192.168.1.12/cm?cmnd=Power%20TOGGLE')
  });
});

// const registrationToken = 'e_3cLAb3BAI:APA91bFFTTMEKbVj4gSK-Ax1o52PopWf1xRO6dZGYUddD_NDWcehbsBQpO3RdV-63G2HvoGvnRju68JuVfT5fSHGKledrLZ29UB91f7hf97FyYOu1XkOg737QBnd93J9OemvsiO7IpDY'
// var payload = {
//   notification: {
//     title: "This is a Notification",
//     body: "This is the body of the notification message."
//   }
// };
// var options = {
//   priority: "high",
//   timeToLive: 60 * 60 * 24
// };

// messaging.sendToDevice(registrationToken, payload, options)
//   .then(function (response) {
//     console.log("Successfully sent message:", response);
//   })
//   .catch(function (error) {
//     console.log("Error sending message:", error);
//   });

const port = 4001;
io.listen(port);
logger.info(`socket.io on port, ${port}`);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// router.get('/toggleLiving', function (req, res) {
//   axios.get('http://192.168.1.12/cm?cmnd=Power%20TOGGLE')
//   // getStatusPompa()
//   //   .then(data => res.json(data))
// });

// app.use('/api', router);

// app.listen(port, function () {
//   logger.info(`*** API running on port ${port} ***`);
// });
