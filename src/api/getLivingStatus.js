const axios = require('axios');

async function getLivingStatus() {
  try {
    let res = await axios({
      url: 'http://192.168.1.12/ay',
      method: 'get',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const parseStatus = res.data.split('px\'>')
    const status = parseStatus[1].split('</div')[0]
    const parseTemperatureHumidity = res.data.split('{m}')
    const temperature = parseTemperatureHumidity[1].split('&')[0]
    const humidity = parseTemperatureHumidity[2].split('%')[0]
    return ({
      status,
      temperature,
      humidity
    })
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = getLivingStatus;
