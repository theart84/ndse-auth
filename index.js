const mongoose = require('mongoose');
require('dotenv').config()
const app = require('./app');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;


async function start(socketIO) {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.x5rxy.mongodb.net/${process.env.DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )
    ;
    const server = app.listen(port, () => {
      console.log(`Server has been started on ${port} port.`);
    });
    const io = socketIO(server)

    // Emits
    io.on('connection', (socket) => {
      const {id} = socket;
      console.log(`Socket connected: ${id}`);
      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
      });
      const {roomName} = socket.handshake.query;
      socket.join(roomName);
      socket.on('message-to-room', (msg) => {
        socket.to(roomName).emit('message-to-room', msg);
        socket.emit('message-to-room', msg);
      });
    });
  } catch (err) {
    console.log(err);
  }
}

start(socketIO);
