import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Hash, Calculator, Calendar, ArrowRight } from 'lucide-react';

/**
 * Home page component that displays the main landing page
 * Features overview of all available utilities with navigation links
 */
const Home: React.FC = () => {
  const features = [
    {
      title: 'Weather App',
      description: 'Get real-time weather information for any city worldwide',
      icon: Cloud,
      link: '/weather',
      color: 'bg-blue-500',
    },
    {
      title: 'Counter',
      description: 'Simple yet elegant counter with increment and decrement functionality',
      icon: Hash,
      link: '/counter',
      color: 'bg-emerald-500',
    },
    {
      title: 'Calculator',
      description: 'Advanced calculator with arithmetic, unit converters, BMI/BMR calculators, and history',
      icon: Calculator,
      link: '/calculator',
      color: 'bg-purple-500',
    },
    {
      title: 'Calendar',
      description: 'Interactive calendar with month navigation and age calculation tools',
      icon: Calendar,
      link: '/calendar',
      color: 'bg-amber-500',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-6">
          Welcome to <span className="text-green-600">UtilityHub</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A cool simple destination for essential web utilities.
        </p>
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/weather"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Cloud className="w-5 h-5" />
            <span>Try Weather App</span>
          </Link>
          <Link
            to="/calculator"
            className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>Open Calculator</span>
          </Link>
        </div> */}
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.title}
              to={feature.link}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border hover:border-blue-200 group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`${feature.color} p-3 rounded-lg text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                <span>Check out!</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Tech Stack */}
      <div className="bg-white rounded-xl shadow-sm p-8 border">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Made with Modern Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4">
            <div className="text-2xl font-bold text-blue-600 mb-2">React 18</div>
            <div className="text-sm text-gray-600">Modern UI Library</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-blue-600 mb-2">TypeScript</div>
            <div className="text-sm text-gray-600">Type Safety</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-blue-600 mb-2">Vite</div>
            <div className="text-sm text-gray-600">Fast Build Tool</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-blue-600 mb-2">Tailwind</div>
            <div className="text-sm text-gray-600">Utility-First CSS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;