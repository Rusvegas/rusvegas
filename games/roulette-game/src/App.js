import React from 'react';
import './App.css';
import RouletteWheel from './components/RouletteWheel';

function App() {
  return (
    <div className="App">
      <div className="casino-name">
        <h1>RusVegas</h1>
        <p>Developed by FOX</p>
      </div>
      <RouletteWheel />
    </div>
  );
}

export default App;

