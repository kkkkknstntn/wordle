import React from 'react'
import TopPlayers from '../components/home/TopPlayers';
import MainPanel from '../components/home/MainPanel';

const HomePage = () => {
  return (
    <div className="App">
      <div className="bgImage"/>
      <div className="darken"/>

      <div className="mainContainer">
        <TopPlayers type="winrate"/>
        <MainPanel/>
        <TopPlayers type="wins"/>
      </div>

    </div>
  );
}

export default HomePage
