import React, { useEffect, useState } from 'react'
import { Player, TopType } from '../../types/player';

const TopPlayersByWinrate = ( topType : TopType ) => {
  const [topPlayersByWr, setTopPlayersByWr] = useState<Player[]>([]);

  useEffect(() => {
    fetch("./data/top_players.json")
      .then(response => response.json())
      .then(data => setTopPlayersByWr(data))
      .catch(error => console.error('Error fetching data ёбаный рот:', error));
  }, []);

  return (
    <div className="topPlayersContainer">
      <div className="topPlayersText">
        ТОП 20 ЕБЛАНОВ ПО {topType.type === "winrate" ? 'ВИНРЕЙТУ' : 'ЧИСЛУ ПОБЕД'} 
      </div>
      <ul className="topPlayers">
        {topType.type === "winrate" ?

        topPlayersByWr.map(player => (
          <li key={player.id} className="topPlayersItem">
            {player.name + ": " + player.winRate + "%"}
          </li>
        ))
        
        :

        topPlayersByWr.map(player => (
          <li key={player.id} className="topPlayersItem">
            {player.name + ": " + player.wins + " побед"}
          </li>
        ))
        }
      </ul>
    </div>
  );
}

export default TopPlayersByWinrate
