import React, { useState } from 'react';
import { Calculator as CalculatorIcon, History, Settings } from 'lucide-react';
import BasicCalculator from '../components/calculator/BasicCalculator';
import AdvancedCalculator from '../components/calculator/AdvancedCalculator';
import CalculatorHistory from '../components/calculator/CalculatorHistory';

export type CalculationEntry = {
  id: string;
  type: 'basic' | 'conversion' | 'bmi' | 'bmr';
  operation: string;
  result: string;
  timestamp: Date;
};

/**
 * Calculator page component with basic, advanced, and history tabs
 * Features: Tab navigation, calculation history, and notification system
 */
const Calculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | 'history'>('basic');
  const [notification, setNotification] = useState('');
  const [history, setHistory] = useState<CalculationEntry[]>([]);

  /**
   * Adds a new calculation entry to history
   */
  const addToHistory = (entry: Omit<CalculationEntry, 'id' | 'timestamp'>) => {
    const newEntry: CalculationEntry = {
      ...entry,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setHistory(prev => [newEntry, ...prev]);
  };

  /**
   * Shows a notification message
   */
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 5000);
  };

  const tabs = [
    { id: 'basic', label: 'Basic', icon: CalculatorIcon },
    { id: 'advanced', label: 'Advanced', icon: Settings },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3 mb-4">
            <CalculatorIcon className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Calculator</h1>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-purple-100 text-purple-700 border border-purple-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className="p-4 bg-gray-50 border-b">
            <p className="text-sm text-gray-700">{notification}</p>
          </div>
        )}

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {activeTab === 'basic' && (
            <BasicCalculator 
              onCalculation={addToHistory}
              showNotification={showNotification}
            />
          )}
          {activeTab === 'advanced' && (
            <AdvancedCalculator 
              onCalculation={addToHistory}
              showNotification={showNotification}
            />
          )}
          {activeTab === 'history' && (
            <CalculatorHistory 
              history={history}
              setHistory={setHistory}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;