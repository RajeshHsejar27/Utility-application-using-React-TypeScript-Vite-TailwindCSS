import React, { useState } from 'react';
import { CalculationEntry } from '../../pages/Calculator';

interface BasicCalculatorProps {
  onCalculation: (entry: Omit<CalculationEntry, 'id' | 'timestamp'>) => void;
  showNotification: (message: string) => void;
}

const BasicCalculator: React.FC<BasicCalculatorProps> = ({
  onCalculation,
  showNotification,
}) => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waiting, setWaiting] = useState(false);
  const [expression, setExpression] = useState<string>('');

  // Append digit or start new operand
  const inputNumber = (num: string) => {
    if (waiting) {
      setDisplay(num);
      setWaiting(false);
    } else {
      setDisplay(d => (d === '0' ? num : d + num));
    }
    // Extend current operand in expression if there's an operation
    setExpression(expr =>
      operation && !waiting
        ? expr + num
        : waiting
        ? // new operand after operator
          `${expr}${num}`
        : num // fresh start
    );
  };

  const inputDecimal = () => {
    if (waiting) {
      setDisplay('0.');
      setWaiting(false);
      setExpression(expr => expr + '0.');
    } else if (!display.includes('.')) {
      setDisplay(d => d + '.');
      setExpression(expr => expr + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaiting(false);
    setExpression('');
  };

  const deleteLast = () => {
    setDisplay(d => (d.length > 1 ? d.slice(0, -1) : '0'));
    setExpression(expr => expr.slice(0, -1));
  };

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return a / b;
      default:
        return b;
    }
  };

  // Handle + - × ÷
  const handleOperation = (nextOp: string) => {
    const current = parseFloat(display);

    if (prevValue === null) {
      // first operator
      setPrevValue(current);
      setExpression(`${current} ${nextOp} `);
    } else if (operation) {
      // chain calculation
      const result = calculate(prevValue, current, operation);
      if (isNaN(result) || !isFinite(result)) {
        showNotification('Invalid result');
        return;
      }
      onCalculation({
        type: 'basic',
        operation: `${prevValue} ${operation} ${current}`,
        result: String(result),
      });
      setDisplay(String(result));
      setPrevValue(result);
      setExpression(`${result} ${nextOp} `);
    }

    setOperation(nextOp);
    setWaiting(true);
  };

  // Handle equals
  const handleEquals = () => {
    if (operation && prevValue !== null) {
      const current = parseFloat(display);
      const result = calculate(prevValue, current, operation);
      if (isNaN(result) || !isFinite(result)) {
        showNotification('Invalid result');
        return;
      }
      const expr = `${prevValue} ${operation} ${current} = ${result}`;
      setExpression(expr);
      onCalculation({
        type: 'basic',
        operation: `${prevValue} ${operation} ${current}`,
        result: String(result),
      });
      setDisplay(String(result));
      setPrevValue(null);
      setOperation(null);
      setWaiting(true);
    }
  };

  // Define buttons in grid order
  const buttons = [
    { label: 'C', onClick: clearAll, className: 'bg-gray-500 text-white' },
    { label: '±', onClick: () => {/* implement ± if needed */}, className: 'bg-gray-500 text-white' },
    { label: '%', onClick: () => {/* implement % if needed */}, className: 'bg-gray-500 text-white' },
    { label: '÷', onClick: () => handleOperation('÷'), className: 'bg-orange-500 text-white' },

    { label: '7', onClick: () => inputNumber('7'), className: 'bg-gray-200 text-gray-900' },
    { label: '8', onClick: () => inputNumber('8'), className: 'bg-gray-200 text-gray-900' },
    { label: '9', onClick: () => inputNumber('9'), className: 'bg-gray-200 text-gray-900' },
    { label: '×', onClick: () => handleOperation('×'), className: 'bg-orange-500 text-white' },

    { label: '4', onClick: () => inputNumber('4'), className: 'bg-gray-200 text-gray-900' },
    { label: '5', onClick: () => inputNumber('5'), className: 'bg-gray-200 text-gray-900' },
    { label: '6', onClick: () => inputNumber('6'), className: 'bg-gray-200 text-gray-900' },
    { label: '-', onClick: () => handleOperation('-'), className: 'bg-orange-500 text-white' },

    { label: '1', onClick: () => inputNumber('1'), className: 'bg-gray-200 text-gray-900' },
    { label: '2', onClick: () => inputNumber('2'), className: 'bg-gray-200 text-gray-900' },
    { label: '3', onClick: () => inputNumber('3'), className: 'bg-gray-200 text-gray-900' },
    { label: '+', onClick: () => handleOperation('+'), className: 'bg-orange-500 text-white' },

    { label: '0', onClick: () => inputNumber('0'), className: 'bg-gray-200 text-gray-900' },
    { label: '.', onClick: inputDecimal, className: 'bg-gray-200 text-gray-900' },
    { label: 'DEL', onClick: deleteLast, className: 'bg-gray-500 text-white' },
    { label: '=', onClick: handleEquals, className: 'bg-orange-500 text-white' },
  ];

  return (
    <div className="max-w-xs mx-auto">
      {/* Expression */}
      <div className="text-right text-gray-600 text-sm mb-1 h-5">
        {expression}
      </div>

      {/* Main display */}
      <div className="bg-black text-white text-right text-3xl font-light p-4 mb-4 rounded-lg">
        {display}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.onClick}
            className={`${btn.className} p-4 rounded-lg font-semibold text-lg hover:opacity-80 transition-opacity`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BasicCalculator;
