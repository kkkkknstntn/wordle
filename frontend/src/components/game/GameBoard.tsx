import React, { useEffect, useState } from 'react';
import { GameState } from '../../types/gameState';
import { Player } from '../../types/player';
import DefaultButton from '../defaultButton/DefaultButton';
import PanelRow from './PanelRow';


function GameBoard({ currentPlayer, setCurrentPlayer}: {
    currentPlayer: Player | null;
    setCurrentPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  }): React.ReactElement {
  const [word, setWord] = useState('');
  const [currentAttempt, setCurrentAttempt] = useState(0)
  const [isEblan, setIsEblan] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // console.log("слово " + word)
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(word.length !== 5)
      setIsEblan(true);
    else {
      setIsEblan(false)
      setCurrentAttempt(prevAttempt => prevAttempt + 1)
      setWord('')
    }
  }
  
  const englishLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  return (
    <div className='gameWrapper'>
      <div className='viewBoard'>
        {currentAttempt}
        <PanelRow word={word} isLocked={currentAttempt != 0}/>
        <PanelRow word={word} isLocked={currentAttempt != 1}/>
        <PanelRow word={word} isLocked={currentAttempt != 2}/>
        <PanelRow word={word} isLocked={currentAttempt != 3}/>
        <PanelRow word={word} isLocked={currentAttempt != 4}/>
        <PanelRow word={word} isLocked={currentAttempt != 5}/>
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
