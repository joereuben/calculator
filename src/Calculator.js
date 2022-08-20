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
        let val = "", lastCharChecked = ""

        /**
         * First separate numbers from operands, loop through entire text string, identify digits(with decimal)
         * and save to array. Same check for operands
         */

        for (let i = 0; i < text.length; i++) {
          if((text.charAt(i) === "-") && (symbols.test(lastCharChecked)) && (text.length > i+1)){
            //if current character is minus, and last character was symbol, add it to number AND
            //theres more characters to follow (otherwise it just adds a symbol alone to the numbers array)
            val += text.charAt(i)
            continue;
          }

          lastCharChecked = text.charAt(i)
          if((i === 0 && symbols.test(lastCharChecked)) || (/[\d\.]/.test(lastCharChecked))){
            // if the first character is an operand, consider it a num 
            // OR if character is a digit or decimal append to val
            val += lastCharChecked
          }
          else if(symbols.test(lastCharChecked)){// if character is an operand
            if(val !== "")// if val is not empty add to number
              numbers.push(parseFloat(val))
            val = "" //reset val
            operands.push(lastCharChecked) // add operand to array
          }
            
        }
        if(val !== "")// last number
          numbers.push(parseFloat(val))

        if(numbers.length < 2)// if the numbers are less than 2, no operation can be performed
          return

          /**
           * To perform computation, assign first number in array to solution, then in loop, take next
           * number in array, take next operand in in operands array. Switch over operand type and perform
           * calculation, assigning result to solution. NOTE: Increment operand after every loop
           */
          
        let operandIndex = 0;
        let solution = parseFloat(numbers[0]);
        for (let i = 1; i < numbers.length; i++) {
          let value = parseFloat(numbers[i]);
          let operand = operands[operandIndex]

          switch(operand){
            case "+":
              solution = solution + value
              break;
            case "-":
              solution = solution - value
              break;
            case "/":
              solution = solution / value
              break;
            case "*":
              solution = solution * value
              break;
            default:
              break;
          }
          operandIndex++
          
        }
        // console.log("numbers: " + numbers)
        // console.log("val: " + val)
        // console.log("operands: " + operands)
        // console.log("solution: " + solution)
        setNewText(solution)
    }

    function updateText(keystring, value) {

      switch(keystring){
        case "AC":
          clearClick()
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

    function clearClick(){
      setNewText("0")
      setText("")
    }
  
    function symbolClick(symbol) {
      
      const displayText = text.toString()
      if(/[\+\/\*]/.test(displayText.charAt(displayText.length - 1))){
        //if the last character is an operand (except minus), replace it with new symbol
        if(symbol !== "-"){ // if new symbol is not a minus, replace last character with new
          const newT = displayText.slice(0, displayText.length - 1);
          setNewText(symbol)
          setText(newT+symbol)
          return
        }
        // console.log(displayText.slice(0, displayText.length - 1))
        // return
      }
      if(/[\-]/.test(displayText.charAt(displayText.length - 1)) && 
        (symbols.test(displayText.charAt(displayText.length - 2)) || displayText.length < 2) || 
        (/[\-]/.test(displayText.charAt(displayText.length - 1)) && /[^\-]/.test(symbol))){
        //if the last character is a minus operand, and the next to last is a symbol or there is less than
        // two characters, don't add it to string OR
        //last char is minus and new symbol is not not minus
        return
      }
      
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
        // console.log(symbols.test(newText));
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
      <div id="displayArea">
        <div id="fulltext">{text}</div>
        <div id="display">{newText}</div>
      </div>
      <Keyboard updateText={updateText}/>
    </div>
  )
}
