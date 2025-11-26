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

  const inputOperation = (nextOperation: string) => {
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
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const Button = ({ onClick, className, children }: {
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-semibold rounded-lg transition-colors hover:opacity-80 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <div className="mb-4">
          <div className="bg-gray-900 text-white text-right text-3xl font-mono p-4 rounded-lg min-h-[60px] flex items-center justify-end">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <Button
            onClick={clear}
            className="col-span-2 bg-red-500 text-white"
          >
            Clear
          </Button>
          <Button
            onClick={() => inputOperation('÷')}
            className="bg-orange-500 text-white"
          >
            ÷
          </Button>
          <Button
            onClick={() => inputOperation('×')}
            className="bg-orange-500 text-white"
          >
            ×
          </Button>

          <Button
            onClick={() => inputNumber('7')}
            className="bg-gray-200 text-gray-800"
          >
            7
          </Button>
          <Button
            onClick={() => inputNumber('8')}
            className="bg-gray-200 text-gray-800"
          >
            8
          </Button>
          <Button
            onClick={() => inputNumber('9')}
            className="bg-gray-200 text-gray-800"
          >
            9
          </Button>
          <Button
            onClick={() => inputOperation('-')}
            className="bg-orange-500 text-white"
          >
            -
          </Button>

          <Button
            onClick={() => inputNumber('4')}
            className="bg-gray-200 text-gray-800"
          >
            4
          </Button>
          <Button
            onClick={() => inputNumber('5')}
            className="bg-gray-200 text-gray-800"
          >
            5
          </Button>
          <Button
            onClick={() => inputNumber('6')}
            className="bg-gray-200 text-gray-800"
          >
            6
          </Button>
          <Button
            onClick={() => inputOperation('+')}
            className="bg-orange-500 text-white"
          >
            +
          </Button>

          <Button
            onClick={() => inputNumber('1')}
            className="bg-gray-200 text-gray-800"
          >
            1
          </Button>
          <Button
            onClick={() => inputNumber('2')}
            className="bg-gray-200 text-gray-800"
          >
            2
          </Button>
          <Button
            onClick={() => inputNumber('3')}
            className="bg-gray-200 text-gray-800"
          >
            3
          </Button>
          <Button
            onClick={performCalculation}
            className="row-span-2 bg-blue-500 text-white"
          >
            =
          </Button>

          <Button
            onClick={() => inputNumber('0')}
            className="col-span-2 bg-gray-200 text-gray-800"
          >
            0
          </Button>
          <Button
            onClick={() => inputNumber('.')}
            className="bg-gray-200 text-gray-800"
          >
            .
          </Button>
        </div>
      </div>
    </div>
  );
}

