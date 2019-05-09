import io from 'socket.io-client';
// const socket = io.connect('http://localhost:4001', {transports: ['websocket']});
var socket = io('http://cassusa.go.ro:4001', { transports: ['websocket'] });

function subscribeToTemperature(interval, cb) {
  socket.emit('subscribeToTemperature', interval);
  socket.on('temperature', data => cb(data));
}
function subscribeToHumidity(interval, cb) {
  socket.emit('subscribeToHumidity', interval);
  socket.on('humidity', data => cb(data));
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
