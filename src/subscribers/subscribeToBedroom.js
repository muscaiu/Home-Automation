import io from 'socket.io-client';
// const socket = io.connect('http://localhost:4001', {transports: ['websocket']});
var socket = io('http:muscaiu.go.ro:4001', { transports: ['websocket'] });

function subscribeToBathroom(interval, cb) {
  socket.emit('subscribeToBathroom', interval);
  socket.on('bathroomData', data => cb(data));
}

function subscribeToLiving(interval, cb) {
  socket.emit('subscribeToLiving', interval);
  socket.on('livingData', data => cb(data));
}

function toggleLiving() {
  socket.emit('toggleLiving');
}

export {
  subscribeToBathroom,
  subscribeToLiving,
  toggleLiving
}
