import io from 'socket.io-client';
// const socket = io.connect('http://localhost:4001', {transports: ['websocket']});
var socket = io('http://192.168.1.10:4001', {transports: ['websocket']});

function subscribeToLiving(interval, cb) {
  socket.emit('subscribeToLiving', interval);
  // socket.on('sensor', sensorData => cb(sensorData));
}
export { subscribeToLiving }
