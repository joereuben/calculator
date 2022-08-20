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
          if((text.charAt(i) === "-") && (lastCharChecked === "-")){
            //if current character is minus, and last character was minus, add it to number
            val += lastCharChecked
            continue;
          }

          lastCharChecked = text.charAt(i)
          if((i === 0 && symbols.test(lastCharChecked)) || (/[\d\.]/.test(lastCharChecked))){
              // if the first character is an operand, consider it a num 
              // OR if character is a digit or decimal append to val
              val += lastCharChecked
          }
          else if(symbols.test(lastCharChecked)){// if character is an operand
              numbers.push(parseFloat(val)) // add number(val) to array and reset
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
          }
          operandIndex++
          
        }
        // console.log("numbers: " + numbers)
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
        //if the last character is an operand (except minus), don't add it to string
        return
      }
      if(/[\-]/.test(displayText.charAt(displayText.length - 1)) && 
        /[\-]/.test(displayText.charAt(displayText.length - 2))){
        //if the last character is a minus operand, and the next to last is also a minus operand,
        // don't add it to string
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
      <div id="display">
        <div id="fulltext">{text}</div>
        <div id="newtext">{newText}</div>
      </div>
      <Keyboard updateText={updateText}/>
    </div>
  )
}
