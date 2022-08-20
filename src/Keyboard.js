import React from "react";
import Keypad from "./Keypad";
import keypadData from "./keypad-data";

export default function Keyboard({ updateText }) {
  return (
    <div id="keyboard">
      {keypadData.map((keypad) => {
        let column = "";
        if (keypad.keystring === "AC" || keypad.keystring === "0") {
          column = "column-1-2";
        }
        if (keypad.keystring === "=") {
          column = "row-4-5";
        }
        return (
          <Keypad
            key={keypad.id}
            {...keypad}
            classItem={column}
            updateText={updateText}
          />
        );
      })}
    </div>
  );
}
