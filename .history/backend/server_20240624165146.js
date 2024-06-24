const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://localhost:27017/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const chatSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const ChatMessage = mongoose.model('ChatMessage', chatSchema);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', async ({ username, room }) => {
    socket.join(room);

    const previousMessages = await ChatMessage.find().sort({ timestamp: -1 }).limit(10).exec();
    socket.emit('previousMessages', previousMessages.reverse());
  });

  socket.on('sendMessage', async ({ username, message }) => {
    const chatMessage = new ChatMessage({ username, message });
    await chatMessage.save();

    io.to('default-room').emit('receiveMessage', { username, message, timestamp: chatMessage.timestamp });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server listening on port 5000');
});
