'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-black rounded-lg p-6 shadow-2xl">
        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <div className="text-white text-right text-3xl font-mono min-h-[50px] flex items-center justify-end">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={clear}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            C
          </button>
          <div className="col-span-2"></div>
          <button
            onClick={() => performOperation('÷')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            ÷
          </button>

          <button
            onClick={() => inputNumber('7')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            9
          </button>
          <button
            onClick={() => performOperation('×')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            ×
          </button>

          <button
            onClick={() => inputNumber('4')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            6
          </button>
          <button
            onClick={() => performOperation('-')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            -
          </button>

          <button
            onClick={() => inputNumber('1')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            3
          </button>
          <button
            onClick={() => performOperation('+')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            +
          </button>

          <button
            onClick={() => inputNumber('0')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors col-span-2"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            .
          </button>
          <button
            onClick={handleEquals}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-colors"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
