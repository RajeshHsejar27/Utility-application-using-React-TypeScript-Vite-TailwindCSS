import React, { useState } from 'react';
import { CalculationEntry } from '../../pages/Calculator';

interface AdvancedCalculatorProps {
  onCalculation: (entry: Omit<CalculationEntry, 'id' | 'timestamp'>) => void;
  showNotification: (message: string) => void;
}

/**
 * Advanced calculator component with unit converters and specialty calculators
 * Features: Length, weight, temperature conversions, BMI, BMR, and finance calculators
 */
const AdvancedCalculator: React.FC<AdvancedCalculatorProps> = ({ onCalculation, showNotification }) => {
  const [activeConverter, setActiveConverter] = useState('length');
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});

  /**
   * Updates input values
   */
  const updateInput = (key: string, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  /**
   * Length converter functions
   */
  // const convertLength = (value: number, from: string, to: string): number => {
  //   const meters = {
  //     cm: value / 100,
  //     m: value,
  //     km: value * 1000,
  //     in: value * 0.0254,
  //     ft: value * 0.3048,
  //   }[from] || 0;

  //   return {
  //     cm: meters * 100,
  //     m: meters,
  //     km: meters / 1000,
  //     in: meters / 0.0254,
  //     ft: meters / 0.3048,
  //   }[to] || 0;
  // };

  /**
   * Weight converter functions
   */
  // const convertWeight = (value: number, from: string, to: string): number => {
  //   const grams = {
  //     g: value,
  //     kg: value * 1000,
  //     lb: value * 453.592,
  //     oz: value * 28.3495,
  //   }[from] || 0;

  //   return {
  //     g: grams,
  //     kg: grams / 1000,
  //     lb: grams / 453.592,
  //     oz: grams / 28.3495,
  //   }[to] || 0;
  // };

  /**
   * Temperature converter functions
   */
  // const convertTemperature = (value: number, from: string, to: string): number => {
  //   let celsius = value;
    
  //   if (from === 'f') celsius = (value - 32) * 5/9;
  //   if (from === 'k') celsius = value - 273.15;

  //   if (to === 'c') return celsius;
  //   if (to === 'f') return (celsius * 9/5) + 32;
  //   if (to === 'k') return celsius + 273.15;
    
  //   return celsius;
  // };

  /**
   * BMI Calculator
   */
  const calculateBMI = () => {
    const weight = parseFloat(inputs.bmiWeight || '0');
    const height = parseFloat(inputs.bmiHeight || '0');
    
    if (weight <= 0 || height <= 0) {
      showNotification('Please enter valid weight and height values');
      return;
    }

    const bmi = weight / (height * height);
    let category = '';
    
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    const result = `BMI: ${bmi.toFixed(1)} (${category})`;
    
    onCalculation({
      type: 'bmi',
      operation: `Weight: ${weight}kg, Height: ${height}m`,
      result,
    });
    
    showNotification(`BMI calculated: ${result}`);
  };

  /**
   * BMR Calculator (Basal Metabolic Rate)
   */
  const calculateBMR = () => {
    const weight = parseFloat(inputs.bmrWeight || '0');
    const height = parseFloat(inputs.bmrHeight || '0');
    const age = parseFloat(inputs.bmrAge || '0');
    const gender = inputs.bmrGender || 'male';
    
    if (weight <= 0 || height <= 0 || age <= 0) {
      showNotification('Please enter valid weight, height, and age values');
      return;
    }

    // Mifflin-St Jeor Equation
    let bmr = 10 * weight + 6.25 * (height * 100) - 5 * age;
    bmr += gender === 'male' ? 5 : -161;
    
    const result = `BMR: ${Math.round(bmr)} calories/day`;
    
    onCalculation({
      type: 'bmr',
      operation: `${gender}, ${weight}kg, ${height * 100}cm, ${age}y`,
      result,
    });
    
    showNotification(`BMR calculated: ${result}`);
  };

  const converters = [
    { id: 'length', label: 'Length' },
    { id: 'weight', label: 'Weight' },
    { id: 'temperature', label: 'Temperature' },
    { id: 'bmi', label: 'BMI' },
    { id: 'bmr', label: 'BMR' },
  ];

  return (
    <div className="space-y-6">
      {/* Converter Tabs */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
        {converters.map((converter) => (
          <button
            key={converter.id}
            onClick={() => setActiveConverter(converter.id)}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              activeConverter === converter.id
                ? 'bg-purple-100 text-purple-700 border border-purple-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {converter.label}
          </button>
        ))}
      </div>


      {/* Length Converter */}
      {activeConverter === 'length' && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          <div>
        <h3 className="text-lg font-semibold mb-4">Length Converter</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Centimeters</label>
            <input
          type="number"
          value={inputs.cm || ''}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) {
              updateInput('cm', e.target.value);
              updateInput('m', (val / 100).toString());
              updateInput('km', (val / 100000).toString());
              updateInput('in', (val / 2.54).toString());
              updateInput('ft', (val / 30.48).toString());
            } else {
              updateInput('cm', '');
              updateInput('m', '');
              updateInput('km', '');
              updateInput('in', '');
              updateInput('ft', '');
            }
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter centimeters"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meters</label>
            <input
          type="number"
          value={inputs.m || ''}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) {
              updateInput('m', e.target.value);
              updateInput('cm', (val * 100).toString());
              updateInput('km', (val / 1000).toString());
              updateInput('in', (val / 0.0254).toString());
              updateInput('ft', (val / 0.3048).toString());
            } else {
              updateInput('m', '');
              updateInput('cm', '');
              updateInput('km', '');
              updateInput('in', '');
              updateInput('ft', '');
            }
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter meters"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kilometers</label>
            <input
          type="number"
          value={inputs.km || ''}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) {
              updateInput('km', e.target.value);
              updateInput('m', (val * 1000).toString());
              updateInput('cm', (val * 100000).toString());
              updateInput('in', (val * 39370.1).toString());
              updateInput('ft', (val * 3280.84).toString());
            } else {
              updateInput('km', '');
              updateInput('m', '');
              updateInput('cm', '');
              updateInput('in', '');
              updateInput('ft', '');
            }
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter kilometers"
            />
          </div>
        </div>
          </div>
          <div>
        <h3 className="text-lg font-semibold mb-4">Imperial Units</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Inches</label>
            <input
          type="number"
          value={inputs.in || ''}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) {
              updateInput('in', e.target.value);
              const meters = val * 0.0254;
              updateInput('m', meters.toString());
              updateInput('cm', (meters * 100).toString());
              updateInput('km', (meters / 1000).toString());
              updateInput('ft', (val / 12).toString());
            } else {
              updateInput('in', '');
              updateInput('m', '');
              updateInput('cm', '');
              updateInput('km', '');
              updateInput('ft', '');
            }
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter inches"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Feet</label>
            <input
          type="number"
          value={inputs.ft || ''}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) {
              updateInput('ft', e.target.value);
              const meters = val * 0.3048;
              updateInput('m', meters.toString());
              updateInput('cm', (meters * 100).toString());
              updateInput('km', (meters / 1000).toString());
              updateInput('in', (val * 12).toString());
            } else {
              updateInput('ft', '');
              updateInput('m', '');
              updateInput('cm', '');
              updateInput('km', '');
              updateInput('in', '');
            }
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter feet"
            />
          </div>
        </div>
          </div>
        </div>
      )}




      {/* Weight Converter */}
      {activeConverter === 'weight' && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          <div>
        <h3 className="text-lg font-semibold mb-4">Metric Weight</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grams</label>
            <input
          type="number"
          value={inputs.g || ''}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) {
              updateInput('g', e.target.value);
              updateInput('kg', (val / 1000).toString());
              updateInput('lb', (val / 453.592).toString());
              updateInput('oz', (val / 28.3495).toString());
            } else {
              updateInput('g', '');
              updateInput('kg', '');
              updateInput('lb', '');
              updateInput('oz', '');
            }
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter grams"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kilograms</label>
            <input
          type="number"
          value={inputs.kg || ''}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) {
              updateInput('kg', e.target.value);
              updateInput('g', (val * 1000).toString());
              updateInput('lb', (val * 2.20462).toString());
              updateInput('oz', (val * 35.27396).toString());
            } else {
              updateInput('kg', '');
              updateInput('g', '');
              updateInput('lb', '');
              updateInput('oz', '');
            }
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter kilograms"
            />
          </div>
        </div>
          </div>
          <div>
        <h3 className="text-lg font-semibold mb-4">Imperial Weight</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pounds</label>
            <input
          type="number"
          value={inputs.lb || ''}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) {
              updateInput('lb', e.target.value);
              updateInput('kg', (val / 2.20462).toString());
              updateInput('g', (val * 453.592).toString());
              updateInput('oz', (val * 16).toString());
            } else {
              updateInput('lb', '');
              updateInput('kg', '');
              updateInput('g', '');
              updateInput('oz', '');
            }
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter pounds"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ounces</label>
            <input
          type="number"
          value={inputs.oz || ''}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) {
              updateInput('oz', e.target.value);
              updateInput('g', (val * 28.3495).toString());
              updateInput('kg', (val * 0.0283495).toString());
              updateInput('lb', (val / 16).toString());
            } else {
              updateInput('oz', '');
              updateInput('g', '');
              updateInput('kg', '');
              updateInput('lb', '');
            }
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter ounces"
            />
          </div>
        </div>
          </div>
        </div>
      )}

      {/* Temperature Converter */}
      {activeConverter === 'temperature' && (
        <div className="max-w-md mx-auto px-4">
          <h3 className="text-lg font-semibold mb-4">Temperature Converter</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Celsius (°C)</label>
              <input
                type="number"
                value={inputs.celsius || ''}
                onChange={(e) => {
                  updateInput('celsius', e.target.value);
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val)) {
                    updateInput('fahrenheit', ((val * 9/5) + 32).toString());
                    updateInput('kelvin', (val + 273.15).toString());
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter Celsius"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fahrenheit (°F)</label>
              <input
                type="number"
                value={inputs.fahrenheit || ''}
                onChange={(e) => {
                  updateInput('fahrenheit', e.target.value);
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val)) {
                    const celsius = (val - 32) * 5/9;
                    updateInput('celsius', celsius.toString());
                    updateInput('kelvin', (celsius + 273.15).toString());
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter Fahrenheit"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kelvin (K)</label>
              <input
                type="number"
                value={inputs.kelvin || ''}
                onChange={(e) => {
                  updateInput('kelvin', e.target.value);
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val)) {
                    const celsius = val - 273.15;
                    updateInput('celsius', celsius.toString());
                    updateInput('fahrenheit', ((celsius * 9/5) + 32).toString());
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter Kelvin"
              />
            </div>
          </div>
        </div>
      )}

      {/* BMI Calculator */}
      {activeConverter === 'bmi' && (
        <div className="max-w-md mx-auto px-4">
          <h3 className="text-lg font-semibold mb-4">BMI Calculator</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={inputs.bmiWeight || ''}
                onChange={(e) => updateInput('bmiWeight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter weight in kg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (m)</label>
              <input
                type="number"
                step="0.01"
                value={inputs.bmiHeight || ''}
                onChange={(e) => updateInput('bmiHeight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter height in meters"
              />
            </div>
            <button
              onClick={calculateBMI}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-purple-700 transition-colors"
            >
              Calculate BMI
            </button>
          </div>
        </div>
      )}

      {/* BMR Calculator */}
      {activeConverter === 'bmr' && (
        <div className="max-w-md mx-auto px-4">
          <h3 className="text-lg font-semibold mb-4">BMR Calculator</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                value={inputs.bmrWeight || ''}
                onChange={(e) => updateInput('bmrWeight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter weight in kg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (m)</label>
              <input
                type="number"
                step="0.01"
                value={inputs.bmrHeight || ''}
                onChange={(e) => updateInput('bmrHeight', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter height in meters"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                value={inputs.bmrAge || ''}
                onChange={(e) => updateInput('bmrAge', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                value={inputs.bmrGender || 'male'}
                onChange={(e) => updateInput('bmrGender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <button
              onClick={calculateBMR}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-purple-700 transition-colors"
            >
              Calculate BMR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedCalculator;