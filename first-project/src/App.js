// src/App.js

import React, { useEffect } from 'react';
import Shortener from './Shortener';
import './App.css';

function App() {
  // Add an event listener to listen for the Enter key press
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">URL Shortener</h1>
        <p className="App-description">Easily shorten your long URLs</p>
        <Shortener />
      </header>
      <footer className="App-footer">
        <p>Built by <a href='https://github.com/projectultra'>@ProjectULTRA</a></p>
      </footer>
    </div>
  );
}

export default App;
