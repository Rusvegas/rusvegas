import React, { useState, useEffect } from 'react';
import socket from '../socket';

const Game = () => {
  const [players, setPlayers] = useState([]);
  const [deck, setDeck] = useState([]);
  const [player, setPlayer] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    socket.on('startGame', ({ players, deck }) => {
      setPlayers(players);
      setDeck(deck);
      setPlayer(players.find(p => p.id === socket.id));
    });

    socket.on('updateGame', ({ players, deck }) => {
      setPlayers(players);
      setDeck(deck);
      setPlayer(players.find(p => p.id === socket.id));
    });

    socket.on('gameOver', ({ winner }) => {
      setGameOver(true);
      setWinner(winner);
    });

    return () => {
      socket.off('startGame');
      socket.off('updateGame');
      socket.off('gameOver');
    };
  }, []);

  const handleHit = () => {
    socket.emit('hit');
  };

  const handleStand = () => {
    socket.emit('stand');
  };

  if (gameOver) {
    return <div>Game Over! Winner: {winner.name}</div>;
  }

  return (
    <div>
      <h1>Blackjack</h1>
      {players.map(p => (
        <div key={p.id}>
          <h2>{p.name}</h2>
          <p>Score: {p.score}</p>
          <div>
            {p.hand.map((card, index) => (
              <span key={index}>{card.rank} of {card.suit}</span>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleHit}>Hit</button>
      <button onClick={handleStand}>Stand</button>
    </div>
  );
};

export default Game;

