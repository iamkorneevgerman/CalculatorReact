import React, { useState } from "react";
import Display from "./Display";
import Button from "./Button";
import { infixToRPN, calculateRPN } from "./utils";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput("");
    setError(null);
  };

  const handleCalculate = () => {
    try {
      const rpnInput = infixToRPN(input);
      const result = calculateRPN(rpnInput);
      setInput(result.toString());
      setError(null);
    } catch (error) {
      setError(error.message);
      setInput("");
    }
  };

  return (
    <div className="App">
      <h1>Calculator</h1>
      <div className="calculator">
        <Display input={error || input} />
        <div className="buttons">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <Button key={num} value={num.toString()} onClick={handleClick} />
          ))}
          {["+", "-", "*", "/"].map((operator) => (
            <Button key={operator} value={operator} onClick={handleClick} />
          ))}
          <Button value={"("} onClick={handleClick} />
          <Button value={")"} onClick={handleClick} />
          <Button value={"C"} onClick={handleClear} />
          <Button value={"="} onClick={handleCalculate} />
        </div>
      </div>
    </div>
  );
}

export default App;