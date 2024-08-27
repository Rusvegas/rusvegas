import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Deck } from './components/gameLogic';

const socket = io('http://localhost:3000');

function App() {
    const [deck, setDeck] = useState(new Deck());

    useEffect(() => {
        deck.shuffle();
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        return () => {
            socket.off('connect');
        };
    }, [deck]);

    const dealCard = () => {
        const card = deck.deal();
        console.log(card.toString());
    };

    return (
        <div className="App">
            <h1>Blackjack Game</h1>
            <button onClick={dealCard}>Deal Card</button>
        </div>
    );
}

export default App;

