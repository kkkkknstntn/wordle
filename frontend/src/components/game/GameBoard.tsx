import React, { useEffect, useState } from 'react';
import { Player } from '../../types/player';
import DefaultButton from '../defaultButton/DefaultButton';
import PanelRow from './PanelRow';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { selectCurrentGameState, tryAgain } from '../../features/gameSlice';
import { NewAttempt } from '../../types/game';
import { useSelector } from 'react-redux';


function GameBoard({ currentPlayer, setCurrentPlayer}: {
    currentPlayer: Player | null;
    setCurrentPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  }): React.ReactElement {
  const [word, setWord] = useState('');
  const [currentAttempt, setCurrentAttempt] = useState(0)
  const [isEblan, setIsEblan] = useState(false)
  const dispatch = useAppDispatch()

  const { game_id, current_try, game_status, letter_statuses } = useSelector(selectCurrentGameState)
  const [copyLetter_statuses, setCopyLetter_statuses] = useState(letter_statuses)

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
    
    //setCopyLetter_statuses([])
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
      //setIsEblan(false)

      //setCurrentAttempt(current_try)
      //setWord('')

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
  
  const englishLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  return (
    <div className='gameWrapper'>
      <div className='viewBoard'>
        {currentAttempt}
        {/* <PanelRow word={word} isLocked={currentAttempt != 0} letter_statuses={letter_statuses}/>
        <PanelRow word={word} isLocked={currentAttempt != 1} letter_statuses={letter_statuses}/>
        <PanelRow word={word} isLocked={currentAttempt != 2} letter_statuses={letter_statuses}/>
        <PanelRow word={word} isLocked={currentAttempt != 3} letter_statuses={letter_statuses}/>
        <PanelRow word={word} isLocked={currentAttempt != 4} letter_statuses={letter_statuses}/>
        <PanelRow word={word} isLocked={currentAttempt != 5} letter_statuses={letter_statuses}/> */}
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
      <div className='gameKeyboardWrapper'>
        <div className='gameKeyboard'>
          {Array.from(englishLetters).map(letter => 
            <DefaultButton 
              text={letter} 
              action={() => handleLetterClick(letter)} 
              extraClass='gameButton'
            />
          )}
          <DefaultButton 
              text={'Backspace'} 
              action={() => handleLetterClick('Backspace')} 
              extraClass='gameButton backspaceButton'
            />
        </div>
      </div>
    </div>
  );
}

export default GameBoard;
