import React, { useState } from 'react';
import { Hash, Plus, Minus, RotateCcw } from 'lucide-react';

/**
 * Counter page component with increment, decrement, and reset functionality
 * Features: State management, button disable logic, and smooth animations
 */
const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  /**
   * Increments the counter by 1
   */
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  /**
   * Decrements the counter by 1, disabled when count is 0
   */
  const decrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  };

  /**
   * Resets the counter to 0
   */
  const reset = () => {
    setCount(0);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8 border">
        <div className="flex items-center space-x-3 mb-8">
          <Hash className="w-8 h-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-gray-900">Counter App</h1>
        </div>

        <div className="text-center">
          {/* Counter Display */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-8 mb-8">
            <div className="text-6xl font-bold text-emerald-600 mb-4 transition-all duration-300">
              {count}
            </div>
            <div className="text-lg text-gray-600">
              Current Count
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={decrement}
              disabled={count === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                count === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-red-500 text-white hover:bg-red-600 hover:scale-105 active:scale-95'
              }`}
            >
              <Minus className="w-5 h-5" />
              <span>Decrement</span>
            </button>

            <button
              onClick={increment}
              className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span>Increment</span>
            </button>

            <button
              onClick={reset}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Status Message */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              {count === 0 && 'Counter is at zero. Decrement is disabled.'}
              {count > 0 && count < 10 && 'Keep going! You can increment more.'}
              {count >= 10 && count < 50 && 'Great job! You\'re really counting up!'}
              {count >= 50 && 'Wow! That\'s a lot of counting!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;