import io from 'socket.io-client';
const socket = io.connect('http://localhost:4001', {transports: ['websocket']});
// var socket = io('http://cassusa.go.ro:4001', { transports: ['websocket'] });

function subscribeToSensor(interval, cb) {
  socket.emit('subscribeToSensor', interval);
  socket.on('sensor', data => cb(data));
}

function subscribeToLiving(interval, cb) {
  socket.emit('subscribeToLiving', interval);
  socket.on('livingData', data => cb(data));
}

function toggleLiving() {
  socket.emit('toggleLiving');
}

export {
  subscribeToSensor,
  subscribeToLiving,
  toggleLiving
}
