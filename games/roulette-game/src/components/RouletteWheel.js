import React, { useState, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './RouletteWheel.css';
import Board from './Board';

const RouletteWheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [bettingNumber, setBettingNumber] = useState(null);
  const [betAmount, setBetAmount] = useState(0);
  const [result, setResult] = useState(null);
  const ballRef = useRef(null);

  // Function to spin the wheel
  const spinWheel = () => {
    if (betAmount === 0 || bettingNumber === null) {
      alert('Please choose a number and enter a bet amount.');
      return;
    }

    setSpinning(true);
    const randomResult = Math.floor(Math.random() * 37); // Random number between 0 and 36

    // Calculate the angle to rotate to the selected number
    const angleToRotate = 360 / 37 * randomResult + 3600; // 10 full rotations plus adjustment for selected number

    // Animation for the wheel
    anime({
      targets: '.roulette-wheel',
      rotate: [0, angleToRotate], // 10 full rotations plus adjustment for selected number
      easing: 'easeOutSine',
      duration: 5000,
      complete: () => {
        setResult(randomResult);
        if (randomResult === bettingNumber) {
          alert(`Congratulations! You won ${betAmount * 36} chips.`);
        } else {
          alert('Sorry, you lost.');
        }
        setSpinning(false);
      },
    });

    // Animation for the ball
    anime({
      targets: ballRef.current,
      rotate: [0, -angleToRotate], // Opposite direction to simulate ball movement
      easing: 'easeOutSine',
      duration: 5000,
      loop: 1,
    });
  };

  // Handle selection of betting number
  const handleNumberSelection = (number) => {
    setBettingNumber(number);
  };

  // Handle change in bet amount
  const handleBetAmountChange = (event) => {
    const amount = parseInt(event.target.value, 10);
    setBetAmount(amount);
  };

  return (
    <div className="roulette-container">
      {/* Roulette wheel container */}
      <div className={`roulette-wheel ${spinning ? 'spinning' : ''}`}>
        <div className="layer-1"></div>
        <div className="layer-2">
          <div className="ball" ref={ballRef}></div>
        </div>
        <div className="layer-3"></div>
        <div className="layer-4"></div>
        <div className="layer-5"></div>
      </div>

      {/* Betting controls */}
      <div className="betting-controls">
        <input type="number" placeholder="Bet amount" value={betAmount} onChange={handleBetAmountChange} />
        {/* Board component for number selection */}
        <Board onSelect={handleNumberSelection} />
        
        {/* Button to spin the wheel */}
        <button onClick={spinWheel} disabled={spinning}>
          Spin the Wheel
        </button>
      </div>

      {/* Display result */}
      {result !== null && (
        <p>{result === bettingNumber ? 'Congratulations! You won!' : 'Sorry, you lost.'}</p>
      )}
    </div>
  );
};

export default RouletteWheel;

