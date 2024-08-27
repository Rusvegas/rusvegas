import React, { useState } from 'react';
import socket from '../socket';

const JoinGame = () => {
  const [name, setName] = useState('');

  const handleJoin = () => {
    socket.emit('joinGame', name);
  };

  return (
    <div>
      <h1>Join Game</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleJoin}>Join</button>
    </div>
  );
};

export default JoinGame;

