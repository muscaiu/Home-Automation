const fs = require('fs');

async function getBedroomData() {
  try {
    const sensorFile = await fs.readFileSync('sensor.log').toString().split("\n");
    const temperature = sensorFile[1].split(': ')[1]
    const humidity = sensorFile[2].split(': ')[1]
    const battery = sensorFile[3].split(': ')[1]
    return {
      temperature,
      humidity,
      battery
    }
  }
  catch (err) {
    logger.err(err);
  }
}

module.exports = getBedroomData;
