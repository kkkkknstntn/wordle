import React, { useEffect, useState } from 'react'
import { Player, TopType } from '../../types/player';
import userService from '../../service/userService';
import { IUser } from '../../types/user';

const TopPlayersByWinrate = ( topType : TopType ) => {
  const [topPlayersByWr, setTopPlayersByWr] = useState<IUser[]>([]);
  const [topPlayersByWins, setTopPlayersByWins] = useState<IUser[]>([]);
  const [ifAuth, setIfAuth] = useState(false)

  useEffect(() => {
    const getTopByWins = async () => {
      await userService.getTopByWins(1, 20).then(res => { setTopPlayersByWins(res); setIfAuth(true) }).catch(err => setIfAuth(false) )
      await userService.getTopByWinLossRatio(1, 20).then(res => { setTopPlayersByWr(res); setIfAuth(true) }).catch(err => setIfAuth(false))
    }
    getTopByWins()
  }, [])

  return (
    <div className="topPlayersContainer">
      <div className="topPlayersText">
        ТОП 20 ЕБЛАНОВ ПО {topType.type === "winrate" ? 'ВИНРЕЙТУ' : 'ЧИСЛУ ПОБЕД'} 
      </div>
      <ul className="topPlayers">
        {topType.type === "winrate" ?
        ifAuth ? 
          topPlayersByWr.map(player => (
            <li key={player.id} className="topPlayersItem">
              {player.first_name + ": " + (100 * player.wins / (player.wins + player.loses)).toFixed(0) + "%"}
            </li>
          ))
          :
          <div className="topPlayersItem">Авторизуйтесь, чтобы просматривать топ</div>
        
        :
        
        ifAuth ? 
          topPlayersByWins.map(player => (
            <li key={player.id} className="topPlayersItem">
              {player.first_name + ": " + player.wins + " побед"}
            </li>
          ))
          :
          <div className="topPlayersItem">Авторизуйтесь, чтобы просматривать топ</div>
        }
      </ul>
    </div>
  );
}

export default TopPlayersByWinrate
