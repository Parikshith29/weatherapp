# Premium Weather Web Application

A modern, premium weather web application built with React, Vite, Tailwind CSS, and the WeatherStack API. Features a glassmorphic design with animated clouds (light mode) and twinkling stars (dark mode), intelligent search, unit conversion, and multiple weather data views.

## ✨ New Features

### 🎨 Enhanced Theme System
- **Light Mode**: Morning sky with animated floating clouds
- **Dark Mode**: Midnight sky with 100 twinkling stars
- **Better Readability**: High contrast text that adapts to theme
- **Smooth Transitions**: 700ms animated theme changes

### 📏 Unit Conversion
- **Temperature**: Toggle between Celsius (°C) and Fahrenheit (°F)
- **Wind Speed**: Toggle between km/h and mph
- **Real-time Conversion**: All weather data updates instantly

### 🌈 Improved Design
- **Cleaner Glass Cards**: Better contrast and readability
- **Theme-Aware Colors**: Text colors adapt perfectly to light/dark modes
- **Enhanced Shadows**: Depth and dimension for better visual hierarchy
- **Animated Backgrounds**: Clouds float in light mode, stars twinkle in dark mode

## Features

### 🎨 Premium Design
- **Glassmorphic UI**: High-end frosted glass aesthetic with backdrop blur effects
- **Dynamic Theming**: Light mode (Sky Morning) and Dark mode (Twilight/Midnight)
- **Smooth Animations**: Count-up temperature animations, floating cards, hover effects
- **Responsive Design**: Mobile-first approach, works perfectly on all devices

### 🔍 Smart Search
- **Autocomplete Suggestions**: Real-time search suggestions as you type
- **Country-Based Search**: Type a country name to see major cities as clickable tiles
- **Keyboard Navigation**: Navigate suggestions with arrow keys
- **Debounced Input**: Optimized API calls with 400ms debounce

### 🌦️ Weather Features
1. **Current Weather**
   - Real-time temperature with animated count-up
   - Weather description and icon
   - Feels like temperature
   - Humidity percentage
   - Wind speed
   - UV index
   - Local time

2. **Historical Weather**
   - Date picker for selecting past dates
   - Average, min, and max temperatures
   - Weather conditions
   - Humidity and wind data
   - Graceful handling of free-tier limitations

3. **Marine Weather**
   - Wave height
   - Water temperature
   - Wind speed
   - Weather conditions
   - Premium feature notice for free-tier users

## Tech Stack

- **React 19.2** - UI library
- **TypeScript** - Type safety
- **Vite 7.3** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **WeatherStack API** - Weather data provider

## Project Structure

```
weather-app/
├── src/
│   ├── components/
│   │   ├── CityTileGrid.tsx       # Grid of city tiles
│   │   ├── EmptyState.tsx         # Empty state component
│   │   ├── ErrorState.tsx         # Error state component
│   │   ├── HistoricalCard.tsx     # Historical weather display
│   │   ├── Loader.tsx             # Loading spinner
│   │   ├── MarineCard.tsx         # Marine weather display
│   │   ├── SearchBar.tsx          # Search input component
│   │   ├── SuggestionDropdown.tsx # Autocomplete dropdown
│   │   ├── TabNavigation.tsx      # Tab navigation system
│   │   ├── ThemeToggle.tsx        # Light/dark mode toggle
│   │   └── WeatherCard.tsx        # Current weather display
│   ├── hooks/
│   │   ├── useDebounce.ts         # Debounce hook
│   │   └── useTheme.ts            # Theme management hook
│   ├── services/
│   │   └── weatherService.ts      # API integration layer
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles with Tailwind
├── .env                           # Environment variables (API key)
├── .env.example                   # Example environment file
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
├── vite.config.ts                 # Vite configuration
└── package.json                   # Dependencies and scripts
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   The `.env` file is already configured with the API key:
   ```
   VITE_WEATHER_API_KEY=0cee584efc7c8389dcfa1cb21c1c8070
   ```
   
   If you need to use a different API key, update the `.env` file or create one from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your WeatherStack API key.

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### Searching for Weather

1. **City Search**: Type a city name (e.g., "London") and press Enter or click a suggestion
2. **Country Search**: Type a country name (e.g., "France") to see major cities as clickable tiles
3. **Autocomplete**: Use arrow keys to navigate suggestions, Enter to select

### Viewing Weather Data

- **Current Weather**: Default view showing real-time weather conditions
- **Historical Weather**: Select a past date to view historical data
- **Marine Weather**: Click "Get Marine Data" for coastal locations

### Theme Switching

Click the theme toggle button (🌙/☀️) in the top-right corner to switch between light and dark modes.

## API Information

This application uses the [WeatherStack API](https://weatherstack.com/):
- **Free Tier Limitations**:
  - Current weather: ✅ Supported
  - Historical weather: ⚠️ Requires paid plan
  - Marine weather: ⚠️ Requires paid plan
  - HTTPS: ⚠️ Requires paid plan (using HTTP)

The app gracefully handles these limitations with user-friendly messages.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Debounced search input (400ms)
- Lazy loading of weather data
- Optimized re-renders with React hooks
- Efficient CSS with Tailwind's JIT compiler

## Accessibility Features

- Keyboard navigation support
- ARIA labels on interactive elements
- Sufficient color contrast
- Focus indicators

## Known Limitations

1. **Free API Tier**: Historical and Marine weather features require a paid WeatherStack plan
2. **Autocomplete**: Uses a simplified city list instead of a full geocoding API
3. **HTTPS**: Free tier uses HTTP; upgrade for HTTPS support

## Future Enhancements

- Weather forecasts (5-day, 7-day)
- Weather alerts and notifications
- Favorite locations
- Weather maps
- Multi-language support
- PWA capabilities

## License

This project is for educational and demonstration purposes.

## Credits

- Weather data provided by [WeatherStack](https://weatherstack.com/)
- Icons and design inspired by modern weather applications
- Built with ❤️ using React and Tailwind CSS
