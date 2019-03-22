


const io = require('socket.io')();
const port = 4001;

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});

io.listen(port);
console.log('listening on port ', port);



// const io = require('socket.io')();
// const logger = require('./logger');
// const fs = require('fs');

// const cronLiving = require('./cron/cronLiving');
// cronLiving.start()
// logger.info('cronLiving cron started');

// fs.readFile('sensor.log', 'utf8', function (err, sensor) {
//   console.log(sensor);
// });

// io.on('connection', (client) => {
//   client.on('subscribeToTimer', (interval) => {
//     console.log('client is subscribing to timer with interval ', interval);
//     setInterval(() => {
//       client.emit('timer', new Date());
//     }, interval);
//   });
// });

// const port = 4001;
// io.listen(port);
// console.log('listening on port ', port);


// const express = require ("express");
// const app = express();
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);

// // This enables CORs and ensures that our frontend,
// // running on a different server can connect to our backend
// io.set("origins", "*:*");
// // whenever we receive a `connection` event
// // our async function is then called
// io.on("connection", async (socket) => {
//   // we should see this printed out whenever we have
//   // a successful connection
//   console.log("Client Successfully Connected");

//   // we then send out a new message to the
//   // `chat` channel with "Hello World"
//   // Our clientside should be able to see
//   // this and print it out in the console
//   io.emit("chat", "hello world");
// });

// server.listen(5000, () => {
//   console.log("Backend Server is running on http://localhost:4001");
// });