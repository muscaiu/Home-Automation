import io from 'socket.io-client';
// const socket = io.connect('http://localhost:4001');
var socket = io('http://localhost:4001', {transports: ['websocket']});

function subscribeToSensor(interval, cb) {
  socket.emit('subscribeToSensor', interval);
  socket.on('sensor', sensorData => cb(sensorData));
}
export { subscribeToSensor }
