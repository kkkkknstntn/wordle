import React, { useState } from 'react'
import { Player } from '../types/player';
import GameBoard from '../components/game/GameBoard';

const GamePage = () => {
  return (
    <div className="app">
      <div className="bgImage"/>
      <div className="darken"/>
      
      <h1>Wordle Game</h1>
      <GameBoard/>
    </div>
  );
}

export default GamePage
