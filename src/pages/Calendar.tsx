import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

/**
 * Calendar page component with month navigation and age calculation
 * Features: Month/year controls, calendar grid, and detailed age calculations
 */
const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [birthDate, setBirthDate] = useState('');
  const [ageCalculation, setAgeCalculation] = useState<{
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    weeks: number;
    months: number;
    years: number;
  } | null>(null);

  /**
   * Gets the first day of the month
   */
  const getFirstDayOfMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  /**
   * Gets the last day of the month
   */
  const getLastDayOfMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  /**
   * Gets the days in the current month for calendar display
   */
  const getDaysInMonth = (): (number | null)[] => {
    const firstDay = getFirstDayOfMonth(currentDate);
    const lastDay = getLastDayOfMonth(currentDate);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: (number | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  /**
   * Navigates to the previous month
   */
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  /**
   * Navigates to the next month
   */
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  /**
   * Calculates age from birth date
   */
  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const now = new Date();

    if (birth > now) {
      alert('Birth date cannot be in the future');
      return;
    }

    const diffMs = now.getTime() - birth.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);

    // Calculate months and years more accurately
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (now.getDate() < birth.getDate()) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
    }

    const totalMonths = years * 12 + months;

    setAgeCalculation({
      seconds: diffSeconds,
      minutes: diffMinutes,
      hours: diffHours,
      days: diffDays,
      weeks: diffWeeks,
      months: totalMonths,
      years: years,
    });
  };

  /**
   * Formats large numbers with commas
   */
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Calendar Section */}
      <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <CalendarIcon className="w-8 h-8 text-amber-600" />
          <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
          onClick={previousMonth}
          className="p-2 hover:bg-pink-100 hover:text-pink-600 text-pink-600 rounded-lg transition-colors"
          >
          <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-sm sm:text-lg md:text-xl font-semibold text-gray-900 flex-1 text-center px-2">
          <div className="truncate">
            <span className="hidden sm:inline">{monthNames[currentDate.getMonth()]}</span>
            <span className="sm:hidden">{monthNames[currentDate.getMonth()].substring(0, 3)}</span>
            {' '}{currentDate.getFullYear()}
          </div>
          </div>
          <button
          onClick={nextMonth}
          className="p-2 hover:bg-pink-100 hover:text-pink-600 text-pink-600 rounded-lg transition-colors"
          >
          <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        </div>
      </div>

      <div className="p-6">
        {/* Calendar Grid */}
        <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-1 mb-4 min-w-[280px]">
        {/* Day headers */}
        {dayNames.map((day) => (
          <div key={day} className="p-2 sm:p-3 text-center text-xs sm:text-sm font-medium text-gray-500 min-w-[40px]">
          <span className="hidden sm:inline">{day}</span>
          <span className="sm:hidden">{day.substring(0, 1)}</span>
          </div>
        ))}

        {/* Calendar days */}
        {getDaysInMonth().map((day, index) => {
          const isToday =
          day === new Date().getDate() &&
          currentDate.getMonth() === new Date().getMonth() &&
          currentDate.getFullYear() === new Date().getFullYear();

          return (
          <div
            key={index}
            className={`p-2 sm:p-3 text-center text-xs sm:text-sm min-h-[36px] sm:min-h-[44px] min-w-[40px] flex items-center justify-center
            ${
              day
              ? 'text-gray-900 cursor-pointer rounded-lg transition-colors'
              : 'text-gray-300'
            }
            ${
              isToday
              ? 'bg-amber-600 text-white rounded-lg font-semibold'
              : ''
            }
            ${
              day
              ? isToday
                ? 'hover:bg-pink-600 hover:text-white active:bg-pink-700'
                : 'hover:bg-pink-100 hover:text-pink-600 active:bg-pink-200'
              : ''
            }
            `}
            tabIndex={day ? 0 : -1}
            role={day ? 'button' : undefined}
            aria-label={day ? `Day ${day}` : undefined}
          >
            {day}
          </div>
          );
        })}
        </div>
        </div>
      </div>
      </div>

      {/* Age Calculator Section */}
      <div className="bg-white rounded-xl shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
        <Clock className="w-8 h-8 text-amber-600" />
        <h2 className="text-2xl font-bold text-gray-900">Age Calculator</h2>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-md mx-auto mb-8">
        <div className="mb-4">
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
          Date of Birth (DD/MM/YYYY)
          </label>
          <input
          type="date"
          id="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={calculateAge}
          className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
        >
          Calculate Age
        </button>
        </div>

        {/* Age Results */}
        {ageCalculation && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Age Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
            <span className="text-gray-600">Years:</span>
            <span className="font-semibold text-base">{formatNumber(ageCalculation.years)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
            <span className="text-gray-600">Months:</span>
            <span className="font-semibold text-base">{formatNumber(ageCalculation.months)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
            <span className="text-gray-600">Weeks:</span>
            <span className="font-semibold text-base">{formatNumber(ageCalculation.weeks)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
            <span className="text-gray-600">Days:</span>
            <span className="font-semibold text-base">{formatNumber(ageCalculation.days)}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
            <span className="text-gray-600">Hours:</span>
            <span className="font-semibold text-base">{formatNumber(ageCalculation.hours)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
            <span className="text-gray-600">Minutes:</span>
            <span className="font-semibold text-base">{formatNumber(ageCalculation.minutes)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
            <span className="text-gray-600">Seconds:</span>
            <span className="font-semibold text-base">{formatNumber(ageCalculation.seconds)}</span>
            </div>
          </div>
          </div>
          <div className="mt-4 p-3 bg-amber-100 rounded-lg">
          <p className="text-xs sm:text-sm text-amber-800">
            <strong>Amazing!</strong> You have lived for {formatNumber(ageCalculation.days)} days, 
            which is {formatNumber(ageCalculation.hours)} hours, or {formatNumber(ageCalculation.minutes)} minutes!
          </p>
          </div>
        </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Calendar;