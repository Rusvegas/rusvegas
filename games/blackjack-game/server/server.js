const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 4000;

// Game state
let players = [];
let deck = [];

const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = [
  'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Jack', 'Queen', 'King', 'Ace'
];
const values = {
  'Two': 2, 'Three': 3, 'Four': 4, 'Five': 5, 'Six': 6, 'Seven': 7,
  'Eight': 8, 'Nine': 9, 'Ten': 10, 'Jack': 10, 'Queen': 10, 'King': 10, 'Ace': 11
};

const createDeck = () => {
  let newDeck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      newDeck.push({ suit, rank, value: values[rank] });
    }
  }
  return newDeck;
};

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
};

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('joinGame', (playerName) => {
    if (players.length < 2) {
      players.push({ id: socket.id, name: playerName, hand: [], score: 0 });
      if (players.length === 2) {
        deck = createDeck();
        shuffleDeck(deck);
        io.emit('startGame', { players, deck });
      }
    }
  });

  socket.on('hit', () => {
    const player = players.find(p => p.id === socket.id);
    if (player) {
      const card = deck.pop();
      player.hand.push(card);
      player.score += card.value;
      io.emit('updateGame', { players, deck });
    }
  });

  socket.on('stand', () => {
    const player = players.find(p => p.id === socket.id);
    if (player) {
      player.standing = true;
      if (players.every(p => p.standing)) {
        // Determine the winner
        const winner = players.reduce((prev, curr) => (prev.score > curr.score && prev.score <= 21) ? prev : curr);
        io.emit('gameOver', { winner });
      } else {
        io.emit('updateGame', { players, deck });
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    players = players.filter(p => p.id !== socket.id);
    io.emit('updateGame', { players, deck });
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

