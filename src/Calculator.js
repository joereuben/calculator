import React, {useState, useEffect} from 'react'
import Keyboard from './Keyboard'

export default function Calculator() {

    const [text, setText] = useState("")
    const [newText, setNewText] = useState("")
    const symbols = /[\+\-\/\*]/ //operands to perform regex search against

    useEffect(() => {
        // console.log(text)
        // setText(prevText =>{
        //     return prevText + newText
        // })
        // console.log(/[\+-\/]/.test(text))
        // console.log(/[\d\.]/.test(text.charAt(1)))
        // console.log("newtext changed")
    
    }, [newText]);

    function calculate() {
        let numbers = []
        let operands = []
        let val = ""

        for (let i = 0; i < text.length; i++) {
            if((i === 0 && symbols.test(text.charAt(i))) || (/[\d\.]/.test(text.charAt(i)))){
                // if the first character is an operand, consider it a num 
                // OR if character is a digit or decimal append to val
                val += text.charAt(i)
            }
            else if(symbols.test(text.charAt(i))){// if character is an operand
                numbers.push(parseFloat(val)) // add number(val) to array and reset
                val = "" //reset val
                operands.push(text.charAt(i)) // add operand to array
            }
            
        }
    
    }

    function updateText(keystring, value) {

      switch(keystring){
        case "AC":
          acClick()
          break
        case "/":
          symbolClick("/")
          break
        case "x":
          symbolClick("*")
          break
        case "-":
          symbolClick("-")
          break
        case "+":
          symbolClick("+")
          break
        case ".":
          defaultAction(value)
          break
        case "=":
          calculate()
          break
        default:
          defaultAction(value)
          break
      }
      
    }

    function acClick(){
      setNewText("0")
      setText("")
    }
  
    function symbolClick(symbol) {
      
      // console.log("symbolclick")
      setNewText(symbol)
      setText(prevText =>{
        return prevText + symbol
      })
    }
  
    function defaultAction(value) {
      // console.log("defaultaction")
      if(value === 0 && text.length === 0){// dont allow repeating zeros at start
        return
      }
      if(value === "." && /\./.test(newText)){// if clicked button is decimal and decimal already in display
        return
      }
      if(newText === "0" ){// if current text is only '0'
        setNewText(value)
        setText(value)
        return

      }
      if(symbols.test(newText)){
        console.log(symbols.test(newText));
        setNewText(value)
        setText(prevText =>{
          return prevText +""+ value
        })
        return
      }

      setNewText(prevText =>{
        return prevText +""+ value
      })

      setText(prevText =>{
        return prevText +""+ value
      })
    }

  return (
    <div id='calculator'>
      <div id="display">
        <div id="fulltext">{text}</div>
        <div id="newtext">{newText}</div>
      </div>
      <Keyboard updateText={updateText}/>
    </div>
  )
}
