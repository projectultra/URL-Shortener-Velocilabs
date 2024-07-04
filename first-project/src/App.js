// src/App.js

import React from 'react';
import Shortener from './Shortener';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>URL Shortener</h1>
        <Shortener />
      </header>
    </div>
  );
}

export default App;
