# UtilityHub - Complete Utility Website

A comprehensive utility website built with React 18, TypeScript, Vite, and Tailwind CSS. This production-ready application features four main utilities: Weather, Counter, Calculator, and Calendar.

## 🚀 Features

### Weather App
- Real-time weather data from OpenWeatherMap API
- City search with form validation
- Weather icons and detailed information
- Error handling for API failures
- Loading states and user feedback

### Counter App
- Simple increment/decrement functionality
- Disabled state when count reaches zero
- Smooth animations and transitions
- Reset functionality
- Visual feedback for different count ranges

### Calculator App
- **Basic Mode**: Standard arithmetic operations (+, -, ×, ÷)
- **Advanced Mode**: Unit converters and specialty calculators
  - Length conversion (cm⇄m⇄km⇄in⇄ft)
  - Weight conversion (kg⇄lb⇄g⇄oz)
  - Temperature conversion (°C⇄°F⇄K)
  - BMI calculator with health categories
  - BMR calculator using Mifflin-St Jeor equation
- **History Tab**: Persistent calculation history with localStorage
- Real-time form validation with notification system
- Responsive design for all screen sizes

### Calendar App
- Interactive month-view calendar
- Month and year navigation controls
- Current date highlighting
- **Age Calculator**: Calculate precise age from birth date
  - Years, months, weeks, days
  - Hours, minutes, seconds
  - Large number formatting with commas
  - Detailed breakdown with visual cards

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API requests

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd utility-website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

**Important**: Replace `your_api_key_here` with your actual API key from OpenWeatherMap.

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🔧 API Configuration

### OpenWeatherMap API Setup

1. **Create Account**: Visit [OpenWeatherMap](https://openweathermap.org/api) and create a free account
2. **Get API Key**: Generate an API key from your dashboard (it may take a few minutes to activate)
3. **Configure Environment**: Open the `.env` file and replace `your_api_key_here` with your actual API key
4. **Restart Server**: Restart the development server (`npm run dev`) for changes to take effect


## 🧪 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Run tests (when implemented)
npm run test
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile devices** (320px and up) - Compact layouts, touch-friendly buttons
- **Tablets** (768px and up)
- **Desktop** (1024px and up) - Full-featured layouts

### Mobile-Specific Features
- Horizontal scrolling for calculator tabs and calendar navigation
- Compact spacing and font sizes
- Touch-optimized button sizes
- Responsive grid layouts that stack on smaller screens

## 🎨 Design Features

- **Modern UI** with clean aesthetics and smooth animations
- **Consistent color scheme** with blue primary, emerald secondary, and amber accent colors
- **Accessible design** with proper ARIA labels and keyboard navigation
- **Loading states** and error handling throughout the application
- **Hover effects** and micro-interactions for better user experience

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Layout.tsx              # Main layout with header, nav, and footer
│   └── calculator/
│       ├── BasicCalculator.tsx      # Basic arithmetic calculator
│       ├── AdvancedCalculator.tsx   # Unit converters and specialty calculators
│       └── CalculatorHistory.tsx    # Calculation history with localStorage
├── hooks/
│   └── useLocalStorage.ts      # Custom hook for localStorage management
├── pages/
│   ├── Home.tsx               # Landing page with feature overview
│   ├── Weather.tsx            # Weather application
│   ├── Counter.tsx            # Counter application
│   ├── Calculator.tsx         # Calculator with tabs
│   └── Calendar.tsx           # Calendar with age calculator
├── App.tsx                    # Main app component with routing
├── main.tsx                   # App entry point
└── index.css                  # Global styles
```

## 🔒 Data Persistence

- **Calculator History**: Automatically saved to localStorage
- **Form Data**: Temporarily stored in component state
- **API Responses**: Cached during the session

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📈 Performance Optimizations

- **Code splitting** with React.lazy() for route-based splitting
- **Memoization** with React.memo() for expensive components
- **Efficient re-renders** with proper dependency arrays
- **Optimized bundles** with Vite's build optimization

## 🚀 Deployment

The application is ready for deployment on any static hosting service:

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

### Recommended Hosting Providers
- **Vercel** - Automatic deployments from Git
- **Netlify** - Easy drag-and-drop deployment
- **GitHub Pages** - Free hosting for open source projects

## 🧰 Additional Features

### Custom Hooks
- `useLocalStorage` - Manages localStorage with React state synchronization

### Mobile Responsiveness
- Responsive navigation with hamburger menu
- Adaptive layouts for all screen sizes
- Touch-friendly interface elements
- Horizontal scrolling for overflow content

### Error Handling
- Comprehensive error boundaries
- API error handling with user-friendly messages
- Form validation with real-time feedback

### Accessibility
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management for better UX

## 📚 Learning Resources

This project demonstrates:
- Modern React patterns with hooks
- TypeScript integration in React applications
- Responsive design with Tailwind CSS
- API integration and error handling
- Local storage management
- Component composition and reusability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Future Enhancements

- [ ] Unit tests with Jest and React Testing Library
- [ ] Progressive Web App (PWA) features
- [ ] Dark mode support
- [ ] Additional unit converters (area, volume, speed, currency)
- [ ] More specialty calculators (loan, mortgage, tip calculator)
- [ ] Data export functionality
- [ ] User preferences and settings
- [ ] Offline mode support
- [ ] Push notifications for weather alerts

---

Built with ❤️ using React, TypeScript, and modern web technologies.