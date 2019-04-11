const fs = require('fs');

async function getBedroomData() {
  try {
    const sensorFile = fs.readFileSync('sensor.log').toString().split("\n");
    if (sensorFile.length > 1) {
      const lastWrite = sensorFile[0].split(' ')[1]
      const temperature = sensorFile[1].split(': ')[1]
      const humidity = sensorFile[2].split(': ')[1]
      const battery = sensorFile[3].split(': ')[1]
      return {
        lastWrite,
        temperature,
        humidity,
        battery
      }
    }
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = getBedroomData;
