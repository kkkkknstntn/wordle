import React from 'react'
import TopPlayers from '../components/home/TopPlayers';
import MainPanel from '../components/home/MainPanel';
import UserPanel from '../components/user/UserPanel';

const UserPage = () => {
  return (
    <div className="App">
      <div className="bgImage"/>
      <div className="darken"/>

      <div className="mainContainer">
        <TopPlayers type="winrate"/>
        <UserPanel/>
        <TopPlayers type="wins"/>
      </div>

    </div>
  );
}

export default UserPage
