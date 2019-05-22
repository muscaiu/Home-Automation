import io from 'socket.io-client';
// const socket = io.connect('http://localhost:4001', {transports: ['websocket']});
var socket = io('http://cassusa.go.ro:4001', { transports: ['websocket'] });

function subscribeToTemperature(interval, cb) {
  socket.emit('subscribeToTemperature', interval);
  socket.on('temperatureBedroom', data => cb({ temperatureBedroom: data }));
  socket.on('temperatureKitchen', data => cb({ temperatureKitchen: data }));
  socket.on('temperatureVlad', data => cb({ temperatureVlad: data }));
}
function subscribeToHumidity(interval, cb) {
  socket.emit('subscribeToHumidity', interval);
  socket.on('humidityBedroom', data => cb({ humidityBedroom: data }));
  socket.on('humidityKitchen', data => cb({ humidityKitchen: data }));
  socket.on('humidityVlad', data => cb({ humidityVlad: data }));
}
function subscribeToLiving(interval, cb) {
  socket.emit('subscribeToLiving', interval);
  socket.on('livingData', data => cb(data));
}

function toggleLiving() {
  socket.emit('toggleLiving');
}

export {
  subscribeToTemperature,
  subscribeToHumidity,
  subscribeToLiving,
  toggleLiving
}
