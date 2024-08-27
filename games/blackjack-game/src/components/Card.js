import React from 'react';
import styled from 'styled-components'; // If using styled-components

const CardContainer = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  width: 60px;
  height: 80px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  background-color: white; 
`;

const SuitTop = styled.div`
  align-self: flex-start;
  margin-left: 3px;
`;

const SuitBottom = styled.div`
  align-self: flex-end;
  margin-right: 3px;
  transform: rotate(180deg); 
`;

const Rank = styled.div`
  font-size: 20px;
`;

const Card = ({ rank, suit }) => {
  const suitSymbols = {
    'Hearts': '♥', 
    'Diamonds': '♦',
    'Clubs': '♣',
    'Spades': '♠'
  };

  return (
    <CardContainer>
      <SuitTop>{suitSymbols[suit]}</SuitTop>
      <Rank>{rank}</Rank>
      <SuitBottom>{suitSymbols[suit]}</SuitBottom>
    </CardContainer>
  );
};

export default Card;

