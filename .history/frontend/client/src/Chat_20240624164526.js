import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Chat() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', { username, room: 'default-room' });
    socket.on('previousMessages', (previousMessages) => {
      setMessages(previousMessages);
    });
  }, []);

  const sendMessage = () => {
    if (username.trim() && message.trim()) {
      socket.emit('sendMessage', { username, message });
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="message">Message</label>
          <input
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
          />
        </div>
        <button className="send-button" onClick={sendMessage}>Send</button>
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <strong>{msg.username}: </strong>{msg.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chat;
