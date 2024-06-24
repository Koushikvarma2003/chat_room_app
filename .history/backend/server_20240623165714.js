const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const Message=require('./models/Message');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/chat-app', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Socket.io configuration
io.on('connection', (socket) => {
  socket.on('joinRoom',({username,room})=>{
    socket.join(room);
    Message.find({room}).sort({timestamp:-1}).limit(10).exec((err,messages)=>{
      if(err) console.error(err);
      socket.emit('previousMessages',messages.reverse());
    })
  });
  socket.on('sendMessage',({username,message,room})=>{
    const newMessage=new Message({username,message,room});
    newMessage.save().then(() => {
      io.to(room).emit('message',{username,message,timestamp:new Date()});
    }).catch(err=>console.error(err));
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
