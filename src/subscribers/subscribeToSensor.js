import io from 'socket.io-client';
// const socket = io.connect('http://localhost:4001', {transports: ['websocket']});
var socket = io('http://muscaiu.go.ro:4001', { transports: ['websocket'] });

function subscribeToTemperature(cb) {
  socket.on('temperatureBathroom', data => cb({ temperatureBathroom: data }));
  socket.on('temperatureKitchen', data => cb({ temperatureKitchen: data }));
  socket.on('temperatureVlad', data => cb({ temperatureVlad: data }));
  socket.on('temperatureLiving', data => cb({ temperatureLiving: data }));
}
function subscribeToHumidity(cb) {
  socket.on('humidityBathroom', data => cb({ humidityBathroom: data }));
  socket.on('humidityKitchen', data => cb({ humidityKitchen: data }));
  socket.on('humidityVlad', data => cb({ humidityVlad: data }));
  socket.on('humidityLiving', data => cb({ humidityLiving: data }));
}

function toggleLiving() {
  socket.emit('toggleLiving');
}

function getTemperatures(){
  socket.emit('getTemperatures');
}
function subscribeToTemperatures(cb){
  socket.on('temperatures', data => cb({ tremperatures: data }));
}
export {
  subscribeToTemperature,
  subscribeToHumidity,
  toggleLiving,
  getTemperatures,
  subscribeToTemperatures,
}
