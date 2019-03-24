const fs = require('fs');
const io = require('socket.io')();

const logger = require('./logger');
const cronLiving = require('./cron/cronLiving');

cronLiving.start()

io.set("origins", "*:*");

function getSensorData() {
  const sensorFile = fs.readFileSync('sensor.log').toString().split("\n");
  const temp = sensorFile[1].split(': ')[1]
  const hum = sensorFile[2].split(': ')[1]
  const bat = sensorFile[3].split(': ')[1]
  return {
    temp,
    hum,
    bat
  }
}

io.on('connection', (client) => {
  client.on('subscribeToSensor', (interval) => {
    logger.info(`client is subscribing to sensor with interval ${interval}`);
    client.emit('sensor', getSensorData());
    setInterval(() => {
      client.emit('sensor', getSensorData());
    }, interval);
  });
});

// our async function is then called
// io.on("connection", async (socket) => {
//   console.log("Client Successfully Connected");
//   io.emit("chat", "hello world");
// });

const port = 4001;
io.listen(port);
console.log('socket.io on port ', port);
