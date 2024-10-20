import React, { useState } from 'react'
import { Player } from '../../types/player';
import { GameState } from '../../types/gameState';
import GameBoard from '../../components/gameBoard/gameBoard';

const GamePage = () => {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [gameHistory, setGameHistory] = useState<GameState[]>([]);

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
