import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Chat() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom',{username,room:'default-room'});
    socket.on('previousMessages', (previousMessages) => {
      setMessages(previousMessages);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', { username, message });
    setMessage('');
  };

  return (
    <div>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}: </strong>{msg.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
