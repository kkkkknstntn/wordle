import React, { useEffect, useState } from 'react';

interface GameKeyboardProps {
  onLetterClick: (letter: string) => void;
  onBackspaceClick: () => void;
  onEnterClick: () => void;
  letter_statuses?: string[];
  word?: string;
  isFirstRender: boolean
}

const GameKeyboard: React.FC<GameKeyboardProps> = ({ onLetterClick, onBackspaceClick, onEnterClick, letter_statuses, word, isFirstRender }) => {
   const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
  ];
  console.log("рендер равно " + isFirstRender)

  const [words, setWords] = useState<string[]>([])
  const [letterStatuses, setLetterStatuses] = useState<string[][]>([])
  useEffect(() => {
    if (!word) return;
    setWords([...words, word])
    if (!letter_statuses) return;
    setLetterStatuses([...letterStatuses, letter_statuses])
  }, [word])

  const handleEnter = async () => {
    console.log(words);
    console.log(letterStatuses);
    onEnterClick();
  };
  useEffect(() => {
    setLetterStatuses([])
    setWords([])
  }, [])

  return (
    <div className='gameKeyboardWrapper'>
      <div className='gameKeyboard'>
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboardRow">
            {row.map((letter) => {
              if (letter === "Backspace") {
                return (
                  <button
                    key={letter}
                    onClick={onBackspaceClick}
                    className="gameButton backspaceButton"
                  >
                    Backspace
                  </button>
                );
              } else if (letter === "Enter") {
                return (
                  <button
                    key={letter}
                    onClick={handleEnter}
                    className="gameButton enterButton"
                    
                  >
                   Enter
                  </button>
                );
              } else {
                let statusIndex = undefined
                let statusClassNumber = 0
                let statusClass = ''
                for (let i = words.length - 1; i >= 0; --i) {
                  for (let j = 0; j < words[i].length; ++j) {
                    if (letter === words[i][j])
                      statusIndex = j
                    else
                      statusIndex = undefined
                    if (statusIndex !== undefined) {
                      if (letterStatuses[i][statusIndex] === 'NOT_PRESENT')
                        statusClassNumber = Math.max(statusClassNumber, 1)
                      else if (letterStatuses[i][statusIndex] === 'MISPLACED')
                        statusClassNumber = Math.max(statusClassNumber, 2)
                      else if (letterStatuses[i][statusIndex] === 'CORRECT')
                        statusClassNumber = Math.max(statusClassNumber, 3)
                    }
                  }
                }
                if (statusClassNumber === 1)
                  statusClass = 'NOT_PRESENT'
                else if (statusClassNumber === 2)
                  statusClass = 'MISPLACED'
                else if (statusClassNumber === 3)
                  statusClass = 'CORRECT'
                return (
                  <button
                    key={letter}
                    onClick={() => onLetterClick(letter)}
                    className={`gameButton ${statusClass}`}
                  >
                    {letter}
                  </button>
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameKeyboard;