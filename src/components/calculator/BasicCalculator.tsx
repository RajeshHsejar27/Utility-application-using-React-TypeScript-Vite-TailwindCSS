import React, { useState } from 'react';
import { CalculationEntry } from '../../pages/Calculator';

interface BasicCalculatorProps {
  onCalculation: (entry: Omit<CalculationEntry, 'id' | 'timestamp'>) => void;
  showNotification: (message: string) => void;
}

/**
 * Basic calculator component with standard arithmetic operations
 * Features: Number input, operation buttons, and result display
 */
const BasicCalculator: React.FC<BasicCalculatorProps> = ({ onCalculation, showNotification }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  /**
   * Handles number input
   */
  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  /**
   * Handles decimal point input
   */
  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  /**
   * Clears the calculator
   */
  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  /**
   * Performs arithmetic operations
   */
  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
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

  /**
   * Handles operation button clicks
   */
  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const result = calculate(currentValue, inputValue, operation);

      if (isNaN(result) || !isFinite(result)) {
        showNotification('Invalid operation result');
        return;
      }

      setDisplay(String(result));
      setPreviousValue(result);
      
      // Add to history
      onCalculation({
        type: 'basic',
        operation: `${currentValue} ${operation} ${inputValue}`,
        result: String(result),
      });
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  /**
   * Handles equals button
   */
  const equals = () => {
    if (operation && previousValue !== null) {
      performOperation('=');
      setOperation(null);
      setPreviousValue(null);
      setWaitingForOperand(true);
    }
  };

  const buttons = [
    { label: 'C', onClick: clear, className: 'bg-gray-500 text-white' },
    { label: '±', onClick: () => setDisplay(String(-parseFloat(display))), className: 'bg-gray-500 text-white' },
    { label: '%', onClick: () => setDisplay(String(parseFloat(display) / 100)), className: 'bg-gray-500 text-white' },
    { label: '÷', onClick: () => performOperation('÷'), className: 'bg-orange-500 text-white' },
    
    { label: '7', onClick: () => inputNumber('7'), className: 'bg-gray-200 text-gray-900' },
    { label: '8', onClick: () => inputNumber('8'), className: 'bg-gray-200 text-gray-900' },
    { label: '9', onClick: () => inputNumber('9'), className: 'bg-gray-200 text-gray-900' },
    { label: '×', onClick: () => performOperation('×'), className: 'bg-orange-500 text-white' },
    
    { label: '4', onClick: () => inputNumber('4'), className: 'bg-gray-200 text-gray-900' },
    { label: '5', onClick: () => inputNumber('5'), className: 'bg-gray-200 text-gray-900' },
    { label: '6', onClick: () => inputNumber('6'), className: 'bg-gray-200 text-gray-900' },
    { label: '-', onClick: () => performOperation('-'), className: 'bg-orange-500 text-white' },
    
    { label: '1', onClick: () => inputNumber('1'), className: 'bg-gray-200 text-gray-900' },
    { label: '2', onClick: () => inputNumber('2'), className: 'bg-gray-200 text-gray-900' },
    { label: '3', onClick: () => inputNumber('3'), className: 'bg-gray-200 text-gray-900' },
    { label: '+', onClick: () => performOperation('+'), className: 'bg-orange-500 text-white' },
    
    { label: '0', onClick: () => inputNumber('0'), className: 'bg-gray-200 text-gray-900 col-span-2' },
    { label: '.', onClick: inputDecimal, className: 'bg-gray-200 text-gray-900' },
    { label: '=', onClick: equals, className: 'bg-orange-500 text-white' },
  ];

  return (
    <div className="max-w-xs mx-auto">
      {/* Display */}
      <div className="bg-black text-white text-right text-3xl font-light p-4 mb-4 rounded-lg">
        {display}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            className={`${button.className} p-4 rounded-lg font-semibold text-lg hover:opacity-80 transition-opacity ${
              button.label === '0' ? 'col-span-2' : ''
            }`}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BasicCalculator;