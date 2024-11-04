import React, { useEffect, useRef, useState } from 'react';
import { Player } from '../../types/player';
import DefaultButton from '../defaultButton/DefaultButton';
import PanelRow from './PanelRow';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { selectCurrentGameState, tryAgain } from '../../features/gameSlice';
import { NewAttempt } from '../../types/game';
import { useSelector } from 'react-redux';
import GameKeyboard from './Keyboard';
import GameStatusModel from './GameStatusModel';


function GameBoard() {
  const [word, setWord] = useState('');
  const [currentAttempt, setCurrentAttempt] = useState(0)
  const [isEblan, setIsEblan] = useState(false)
  const dispatch = useAppDispatch()

  const { game_id, guessed_word, current_try, game_status, letter_statuses } = useSelector(selectCurrentGameState)
  const [copyLetter_statuses, setCopyLetter_statuses] = useState(letter_statuses)
  const isFirstRender = useRef(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ('key' in event && typeof event.key === 'string' && /^[a-zA-Z]+$/.test(event.key)) {
        if (event.key.length == 1 || event.key == 'Backspace')
          handleLetterClick(event.key)
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Очистка обработчика при размонтировании компонента
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [word]);

  useEffect(() => {
    setCopyLetter_statuses(letter_statuses)
    setCurrentAttempt(current_try)

  }, [current_try])

  // Функция обработки нажатия буквы
  const handleLetterClick = (letter: string): void => {
    // Добавляем нажатую букву к текущему слову
    if (letter == 'Backspace') {
      if (word.length > 0)
        setWord(prevWord => prevWord.substring(0, prevWord.length - 1))
    }
    else if(word.length < 5)
      setWord(prevWord => prevWord + letter);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(word.length !== 5)
      setIsEblan(true);
    else {
      console.log(game_id)
      console.log(current_try + " " + game_status + " " + letter_statuses)
      console.log(word)
      await dispatch(tryAgain({
        game_id: game_id,
        guessed_word: word
      }))
      setIsEblan(false)
      setWord('')
    }
  }
  return (
    <div className='gameWrapper'>
      {game_status == "WIN" || game_status == "LOSE" ? <GameStatusModel/> : <></>}

      <div className='viewBoard'>
        {currentAttempt}
        {Array.from({ length: 6 }, (_, index) => (
          <PanelRow 
            key={index} 
            word={word} 
            isLocked={index !== currentAttempt} 
            letter_statuses={index + 1 === currentAttempt ? [...copyLetter_statuses] : undefined}
          />
        ))}
      </div>
      <DefaultButton 
        text={'Ввести'} 
        action={handleSubmit} 
        extraClass='gameButton submitButton'
        isDisabled={currentAttempt >= 6}
      />

      {isEblan ? <> введи 5 букв еблан</> : <></>}
      <GameKeyboard 
        onLetterClick={handleLetterClick} 
        onBackspaceClick={() => handleLetterClick('Backspace')} 
        letter_statuses={letter_statuses} 
        word={guessed_word}
        isFirstRender={isFirstRender.current}
      />
    </div>
  );
}

export default GameBoard;
