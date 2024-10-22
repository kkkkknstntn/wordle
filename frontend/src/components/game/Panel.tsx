import React from 'react';

interface PanelProps {
  letter: string;
  filled: boolean;
  state: string;
}

const Panel: React.FC<PanelProps> = ({ letter, filled, state }) => {
  return (
    <div className={`panel ${filled ? 'filled' : ''} ${state}`}>
      {letter}
    </div>
  );
};

export default Panel;