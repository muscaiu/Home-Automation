import io from 'socket.io-client';
// const socket = io.connect('http://localhost:4001');
var socket = io('http://localhost:4001', {transports: ['websocket']});

function subscribeToTimer(interval, cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}
export { subscribeToTimer }