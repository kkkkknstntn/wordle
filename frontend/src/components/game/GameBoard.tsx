import React, { useEffect, useRef, useState } from 'react';
import PanelRow from './PanelRow';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { selectCurrentGameState, tryAgain, tryAgainWithoutAuth } from '../../features/gameSlice';
import { useSelector } from 'react-redux';
import GameKeyboard from './Keyboard';
import GameStatusModel from './GameStatusModel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GameBoard() {
  const [word, setWord] = useState('');
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [isEblan, setIsEblan] = useState(false);
  const dispatch = useAppDispatch();

  const { game_id, guessed_word, current_try, game_status, letter_statuses, isCorrectWord, isGameWithoutAuth } = useSelector(selectCurrentGameState);
  const [copyLetter_statuses, setCopyLetter_statuses] = useState(letter_statuses);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Проверяем только нажатия букв (A-Z) и специальные клавиши
      if (/^[a-zA-Z]$/.test(event.key)) {
        handleLetterClick(event.key); // Обрабатываем ввод буквы
      } else if (event.key === 'Backspace') {
        handleLetterClick('Backspace'); // Обрабатываем Backspace
      } else if (event.key === 'Enter') {
        event.preventDefault(); // Предотвращаем стандартное поведение
        handleSubmit(); // Вызываем функцию отправки при нажатии Enter
      }
      // Игнорируем все остальные клавиши
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [word]);

  useEffect(() => {
    setCopyLetter_statuses(letter_statuses);
    setCurrentAttempt(current_try);
  }, [current_try]);

  useEffect(() => {
    if(!isCorrectWord){
      toast.error('Неверное слово');
      console.log('СЛОВО НЕВЕРНО')
    }
  },[isCorrectWord])

  const handleLetterClick = (letter: string): void => {
    if (letter === 'Backspace') {
      if (word.length > 0) {
        setWord(prevWord => prevWord.substring(0, prevWord.length - 1));
      }
    } else if (word.length < 5) {
      setWord(prevWord => prevWord + letter);
    }
  };

  const handleSubmit = async () => {
    if (word.length !== 5) {
      toast.error('Введите 5 букв'); // Вызываем ошибку
      setIsEblan(true);
      return;
    }
    

    console.log(game_id);
    console.log(current_try + " " + letter_statuses);
    console.log(word);

    if (isGameWithoutAuth) {
      await dispatch(tryAgainWithoutAuth({
        game_id: game_id,
        guessed_word: word
      }));
    } else {
      await dispatch(tryAgain({
        game_id: game_id,
        guessed_word: word
      }));
    }
   
    setIsEblan(false);
    setWord('');
  };

  return (
    <div className='gameWrapper'>
      {game_status === "WIN" || game_status === "LOSE" ? <GameStatusModel /> : null}

      <div className='viewBoard'>
        {Array.from({ length: 6 }, (_, index) => (
          <PanelRow 
            key={index} 
            word={word} 
            isLocked={index !== currentAttempt} 
            letter_statuses={index + 1 === currentAttempt ? [...copyLetter_statuses] : undefined}
          />
        ))}
      </div>
        {/* {<GameErrorModel isCorrectWord={isCorrectWord} isEblan={isEblan} setIsEblan={setIsEblan}/>} */}
      <GameKeyboard 
        onLetterClick={handleLetterClick} 
        onBackspaceClick={() => handleLetterClick('Backspace')} 
        onEnterClick={handleSubmit}
        letter_statuses={letter_statuses} 
        word={guessed_word}
        isFirstRender={isFirstRender.current}
      />
      <ToastContainer 
        position="top-center"
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={1500}
        closeOnClick
        toastStyle={{color: "white", backgroundColor:"salmon", fontWeight:"bold", fontSize:"20px" }}
        pauseOnFocusLoss={false}
      />
    </div>
  );
}

export default GameBoard;