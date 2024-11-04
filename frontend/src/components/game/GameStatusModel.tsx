import React, { useEffect, useState } from 'react'
import DefaultButton from '../defaultButton/DefaultButton'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useSelector } from 'react-redux'
import { createGameWithAuth, resetState, selectCurrentGameState } from '../../features/gameSlice'
import gameService from '../../service/gameService'
import { useNavigate } from 'react-router-dom'

const GameStatusModel = () => {
  const dispatch = useAppDispatch()
  const { game_id, game_status } = useSelector(selectCurrentGameState)

  const [word, setWord] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getGame = async () => {
        try {
            const res = await gameService.getGameById(game_id);
            setWord(res.word);
        } catch (err) {
            console.warn(err);
        }
    };
    getGame();
  }, []); // Добавляем game_id в зависимости

  const handlePlayWithAuth = async () => {
    dispatch(resetState())
    await dispatch(createGameWithAuth())
    navigate("/game")
  }

  return (
    <div className='resultPanel'>
        <div className='shadowForm'></div>
        <div className='resultTable'>
            <div className='resultTableWrapper'>
                <div className='resultState'>
                    Вы {game_status == "WIN" ? " выиграли." : " проиграли."} <br/>
                    Загаданное слово - {word}
                </div>
                <div className='resultTableButtons'>
                    <DefaultButton text={'Сыграть ещё раз'} action={() => {handlePlayWithAuth()}}/>
                    <DefaultButton text={'На главную'} action={() => { navigate("/user") }}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GameStatusModel
