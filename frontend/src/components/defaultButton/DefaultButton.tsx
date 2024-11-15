import React from 'react'

interface ButtonProps {
    text: string,
    extraClass? : string,
    action? : ((e: React.FormEvent) => void) | (() => void),
    isDisabled? : boolean;
}

const DefaultButton = ({ text, extraClass, action, isDisabled } : ButtonProps) => {
  return (
    <button type="submit" className={`defaultBtn ${extraClass || ''}`} onClick={action} disabled={isDisabled}> {text} </button>
  )
}

export default DefaultButton
