import React, { useState } from 'react';
import { Cloud, Search, MapPin, Thermometer, Eye, Wind, Droplets } from 'lucide-react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  visibility: number;
}

/**
 * Weather page component that fetches and displays current weather data
 * Features: City search, weather display, error handling, and loading states
 */
const Weather: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Fetches weather data from OpenWeatherMap API
   * @param cityName - The city name to search for
   */
  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      setError('Please enter a city name');
      return;
    }

    // Validate city name (no numbers allowed)
    if (/\d/.test(cityName)) {
      setError('City name cannot contain numbers');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
      
      if (!API_KEY || API_KEY === 'your_api_key_here') {
        throw new Error('OpenWeatherMap API key not configured. Please add VITE_OPENWEATHER_API_KEY to your .env file.');
      }
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found');
        } else if (response.status === 401) {
          throw new Error('API key required. Please configure your OpenWeatherMap API key.');
        } else {
          throw new Error('Failed to fetch weather data');
        }
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  /**
   * Returns weather emoji based on weather condition
   * @param weatherMain - Main weather condition
   */
  const getWeatherEmoji = (weatherMain: string): string => {
    const emojiMap: { [key: string]: string } = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Drizzle: '🌦️',
      Thunderstorm: '⛈️',
      Snow: '❄️',
      Mist: '🌫️',
      Smoke: '🌫️',
      Haze: '🌫️',
      Dust: '🌫️',
      Fog: '🌫️',
      Sand: '🌫️',
      Ash: '🌫️',
      Squall: '💨',
      Tornado: '🌪️',
    };
    return emojiMap[weatherMain] || '🌤️';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8 border">
        <div className="flex items-center space-x-3 mb-8">
          <Cloud className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Weather App</h1>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex space-x-3">
            <div className="flex-1">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>{loading ? 'Searching...' : 'Search'}</span>
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* Weather Data */}
        {weatherData && (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-6">
              <MapPin className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">{weatherData.name}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Main Weather Info */}
              <div className="text-center">
                <div className="text-6xl mb-2">
                  {getWeatherEmoji(weatherData.weather[0].main)}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {Math.round(weatherData.main.temp)}°C
                </div>
                <div className="text-lg text-gray-600 capitalize">
                  {weatherData.weather[0].description}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Feels like {Math.round(weatherData.main.feels_like)}°C
                </div>
              </div>

              {/* Weather Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Thermometer className="w-5 h-5 text-red-500" />
                  <span className="text-gray-600">Temperature:</span>
                  <span className="font-semibold">{Math.round(weatherData.main.temp)}°C</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-600">Humidity:</span>
                  <span className="font-semibold">{weatherData.main.humidity}%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Wind className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600">Wind Speed:</span>
                  <span className="font-semibold">{weatherData.wind.speed} m/s</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Visibility:</span>
                  <span className="font-semibold">{(weatherData.visibility / 1000).toFixed(1)} km</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* API Key Notice */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> To use this weather app, you need to configure your OpenWeatherMap API key. 
            Get your free API key from{' '}
            <a 
              href="https://openweathermap.org/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              OpenWeatherMap
            </a>
            {' '}and add it to your environment variables.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Weather;