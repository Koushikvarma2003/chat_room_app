import logo from './logo.svg';
import './App.css';
import React from 'react';
import chat from './Chat'

function App() {
  return (
    <div className="app-container">
      <header className="header">
        Chat Application
      </header>
      <Chat />
      <footer className="footer">
        &copy; 2024 PaisaKhooz.com
      </footer>
    </div>
  );
}

export default App;
