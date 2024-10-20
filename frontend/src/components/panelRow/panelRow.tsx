import React, { useState, useEffect } from 'react';
import Panel from '../panel/panel';

interface PanelRowProps {
  word: string,
  isLocked: boolean
}

const PanelRow: React.FC<PanelRowProps> = ({ word, isLocked }) => {
  const [panels, setPanels] = useState<string[]>(['', '', '', '', '']);

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

  return (
    <div className="panel-row">
      {panels.map((char, index) => (
        <Panel key={index} letter={char} filled={char != ' '} />
      ))}
    </div>
  );
};

export default PanelRow;