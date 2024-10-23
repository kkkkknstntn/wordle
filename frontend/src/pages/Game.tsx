import React, { useState } from 'react'
import { Player } from '../types/player';
import GameBoard from '../components/game/GameBoard';

const GamePage = () => {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  return (
    <div className="app">
      <div className="bgImage"/>
      <div className="darken"/>
      
      <h1>Wordle Game</h1>
      <GameBoard 
        currentPlayer={currentPlayer} 
        setCurrentPlayer={setCurrentPlayer}
      />
    </div>
  );
}

export default GamePage
