import React from 'react'

export default function Keypad({id, keystring, idstring, value, classItem,  updateText}) {

 

  return (
    <button className={`keypad ${classItem}`} onClick={()=> updateText(keystring, value)} id={idstring}>
      {keystring}
    </button>
  )
}
