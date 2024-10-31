import React, { useState, useEffect } from 'react';
import Panel from './Panel';

interface PanelRowProps {
  word: string,
  isLocked: boolean,
  letter_statuses?: string[]
}

const PanelRow: React.FC<PanelRowProps> = ({ word, isLocked, letter_statuses }) => {
  const [panels, setPanels] = useState<string[]>(['', '', '', '', '']);
  const [rowLetterStatuses, setRowLetterStatuses] = useState(letter_statuses || []);

  useEffect(() => {
    if (isLocked) return;
    if (word.length !== 5) {
      //console.warn('Word length must be exactly 5 characters');
      const newWord = word.padEnd(5, ' ');
      const newPanels = Array.from(newWord).map(char => char.toString());
      setPanels(newPanels);
    } else {
      const newPanels = Array.from(word).map(char => char.toString());
      setPanels(newPanels);
    }  
  }, [word]);

   // Создаем уникальную копию letter_statuses для каждого PanelRow
   useEffect(() => {
    if (!letter_statuses) return;
    
    const rowCopy = [...letter_statuses];
    setRowLetterStatuses(rowCopy);
  }, [letter_statuses]);

  return (
    <div className="panel-row">
      {panels.map((char, index) => (
        <Panel key={index} letter={char} filled={char != ' '} state={rowLetterStatuses?.[index] || ""} />
      ))}
    </div>
  );
};

export default PanelRow;