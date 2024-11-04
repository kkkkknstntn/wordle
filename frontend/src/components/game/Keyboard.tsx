import React from 'react';

interface GameKeyboardProps {
  onLetterClick: (letter: string) => void;
  onBackspaceClick: () => void;
  letter_statuses?: string[];
  word?: string;
  isFirstRender: boolean
}

const GameKeyboard: React.FC<GameKeyboardProps> = ({ onLetterClick, onBackspaceClick, letter_statuses, word, isFirstRender }) => {
  const englishLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  console.log("рендер равно " + isFirstRender)

  return (
    <div className='gameKeyboardWrapper'>
      <div className='gameKeyboard'>
        {Array.from(englishLetters).map((letter) => {
        const statusIndex = word?.toUpperCase()?.indexOf(letter);
        // Проверяем, что statusIndex является числом и существует letter_statuses
        if (statusIndex !== undefined && typeof statusIndex === 'number' && letter_statuses) {
            const statusClass = `${letter_statuses[statusIndex]}`;
            return (
              <button
                key={letter}
                onClick={() => onLetterClick(letter)}
                className={`gameButton ${statusClass}`}
              >
                {letter}
              </button>
            );
          } else {
            // Если условия не выполняются, возвращаем кнопку без класса
            return (
              <button
                key={letter}
                onClick={() => onLetterClick(letter)}
                className="gameButton"
              >
                {letter}
              </button>
            );
          }
        })}
        <button
          onClick={onBackspaceClick}
          className="gameButton backspaceButton"
        >
          Backspace
        </button>
      </div>
    </div>
  );
};

export default GameKeyboard;