import React, { useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { CalculationEntry } from '../../pages/Calculator';

interface CalculatorHistoryProps {
  history: CalculationEntry[];
  setHistory: React.Dispatch<React.SetStateAction<CalculationEntry[]>>;
}

/**
 * Calculator history component that displays past calculations
 * Features: Local storage persistence, clear history, and calculation replay
 */
const CalculatorHistory: React.FC<CalculatorHistoryProps> = ({ history, setHistory }) => {
  
  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory).map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp),
        }));
        setHistory(parsedHistory);
      } catch (error) {
        console.error('Error loading calculator history:', error);
      }
    }
  }, [setHistory]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
  }, [history]);

  /**
   * Clears all calculation history
   */
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('calculatorHistory');
  };

  /**
   * Removes a specific calculation from history
   */
  const removeCalculation = (id: string) => {
    setHistory(prev => prev.filter(entry => entry.id !== id));
  };

  /**
   * Formats the timestamp for display
   */
  const formatTimestamp = (timestamp: Date): string => {
    return timestamp.toLocaleString();
  };

  /**
   * Gets the type icon for different calculation types
   */
  const getTypeIcon = (type: string): string => {
    switch (type) {
      case 'basic': return '🔢';
      case 'conversion': return '🔄';
      case 'bmi': return '⚖️';
      case 'bmr': return '🔥';
      default: return '📊';
    }
  };

  /**
   * Gets the type label for different calculation types
   */
  const getTypeLabel = (type: string): string => {
    switch (type) {
      case 'basic': return 'Basic';
      case 'conversion': return 'Conversion';
      case 'bmi': return 'BMI';
      case 'bmr': return 'BMR';
      default: return 'Unknown';
    }
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No calculations yet</h3>
        <p className="text-gray-600">
          Your calculation history will appear here as you use the calculator and converters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Calculation History</h3>
        <button
          onClick={clearHistory}
          className="flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="space-y-3">
        {history.map((entry) => (
          <div
            key={entry.id}
            className="bg-gray-50 rounded-lg p-4 border hover:bg-gray-100 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getTypeIcon(entry.type)}</span>
                <span className="text-sm font-medium text-gray-600">
                  {getTypeLabel(entry.type)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">
                  {formatTimestamp(entry.timestamp)}
                </span>
                <button
                  onClick={() => removeCalculation(entry.id)}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-sm text-gray-700">
                <span className="font-medium">Operation:</span> {entry.operation}
              </div>
              <div className="text-sm text-gray-900">
                <span className="font-medium">Result:</span> {entry.result}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Your calculation history is automatically saved in your browser's local storage.
          It will persist between sessions, but clearing your browser data will remove it.
        </p>
      </div>
    </div>
  );
};

export default CalculatorHistory;