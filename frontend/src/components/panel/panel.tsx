import React from 'react';

interface PanelProps {
  letter: string;
  filled: boolean;
}

const Panel: React.FC<PanelProps> = ({ letter, filled }) => {
  return (
    <div className={`panel ${filled ? 'filled' : ''}`}>
      {letter}
    </div>
  );
};

export default Panel;