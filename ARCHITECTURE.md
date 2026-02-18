# Architecture Overview

## Component Hierarchy

```
App.tsx (Main Container)
├── ThemeToggle
│   └── Theme state management
│
├── SearchBar
│   └── Search input with glassmorphic design
│
├── SuggestionDropdown
│   ├── Loading spinner
│   ├── Suggestion list
│   └── Keyboard navigation
│
├── CityTileGrid
│   └── City tiles (for country searches)
│
└── TabNavigation
    ├── Current Weather Tab
    │   ├── Loader (loading state)
    │   ├── ErrorState (error handling)
    │   └── WeatherCard
    │       ├── Location info
    │       ├── Weather icon
    │       ├── Animated temperature
    │       └── Weather metrics grid
    │
    ├── Historical Weather Tab
    │   └── HistoricalCard
    │       ├── Date picker
    │       ├── Loader
    │       ├── ErrorState
    │       └── Historical data display
    │
    └── Marine Weather Tab
        └── MarineCard
            ├── Search button
            ├── Loader
            ├── ErrorState
            └── Marine data display
```

## Data Flow

```
User Input
    ↓
SearchBar (debounced)
    ↓
useDebounce Hook (400ms)
    ↓
weatherService.searchLocations()
    ↓
SuggestionDropdown
    ↓
User Selection
    ↓
weatherService.getCurrentWeather()
    ↓
WeatherCard Display
```

## State Management

### App-Level State
```typescript
- searchQuery: string
- suggestions: string[]
- isSearching: boolean
- selectedCity: string
- weatherData: CurrentWeatherData | null
- isLoadingWeather: boolean
- error: string | null
- activeTab: 'current' | 'historical' | 'marine'
```

### Theme State (useTheme hook)
```typescript
- theme: 'light' | 'dark'
- toggleTheme: () => void
```

### Component-Level State
- **HistoricalCard**: selectedDate, data, loading, error
- **MarineCard**: data, loading, error, hasSearched

## Service Layer

### weatherService.ts
```typescript
Functions:
├── getCurrentWeather(query: string)
├── getHistoricalWeather(query: string, date: string)
├── getMarineWeather(query: string)
└── searchLocations(query: string)

Types:
├── CurrentWeatherData
├── HistoricalWeatherData
└── MarineWeatherData
```

## Custom Hooks

### useDebounce
```typescript
Purpose: Delay value updates
Input: value, delay (ms)
Output: debouncedValue
Use Case: Search input optimization
```

### useTheme
```typescript
Purpose: Manage light/dark theme
State: theme ('light' | 'dark')
Actions: toggleTheme()
Persistence: localStorage
Side Effects: DOM class manipulation
```

## Styling Architecture

### Tailwind Configuration
```javascript
- Custom animations (float, glow)
- Dark mode: 'class' strategy
- Extended theme with keyframes
```

### Custom CSS Classes
```css
.glass - Standard glassmorphic effect
.glass-light - Lighter variant
.glass-dark - Darker variant
.animate-float - Floating animation
```

### Responsive Breakpoints
```
sm: 640px   - Small devices
md: 768px   - Medium devices
lg: 1024px  - Large devices
xl: 1280px  - Extra large devices
```

## API Integration

### WeatherStack API
```
Base URL: http://api.weatherstack.com
Authentication: Query parameter (access_key)
Endpoints:
├── /current - Current weather
├── /historical - Historical data
└── /marine - Marine weather
```

### Error Handling
```typescript
Try-Catch blocks
    ↓
Axios error detection
    ↓
User-friendly messages
    ↓
ErrorState component
    ↓
Retry option
```

## File Structure

```
weather-app/
├── src/
│   ├── components/
│   │   ├── CityTileGrid.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── HistoricalCard.tsx
│   │   ├── Loader.tsx
│   │   ├── MarineCard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SuggestionDropdown.tsx
│   │   ├── TabNavigation.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── WeatherCard.tsx
│   │
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   └── useTheme.ts
│   │
│   ├── services/
│   │   └── weatherService.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── public/
│   └── vite.svg
│
├── Configuration Files
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── Documentation
    ├── README.md
    ├── QUICKSTART.md
    ├── FEATURES.md
    ├── DEPLOYMENT.md
    ├── CHECKLIST.md
    ├── ARCHITECTURE.md
    └── START_HERE.md
```

## Component Responsibilities

### Presentational Components
- **SearchBar**: Input UI
- **SuggestionDropdown**: Dropdown UI
- **CityTileGrid**: Tile grid UI
- **WeatherCard**: Weather display
- **TabNavigation**: Tab UI
- **ThemeToggle**: Toggle button
- **Loader**: Loading spinner
- **EmptyState**: Empty message
- **ErrorState**: Error message

### Container Components
- **App**: Main container, state management
- **HistoricalCard**: Historical data logic
- **MarineCard**: Marine data logic

## Design Patterns

### Composition
```
App composes multiple components
Each component is self-contained
Props flow down, events flow up
```

### Custom Hooks
```
Reusable logic extraction
State management encapsulation
Side effect handling
```

### Service Layer
```
API calls centralized
Type definitions included
Error handling standardized
```

## Performance Optimizations

### Debouncing
```
Search input: 400ms delay
Reduces API calls
Improves UX
```

### Code Splitting
```
Vite automatic splitting
Lazy loading ready
Optimized chunks
```

### Bundle Optimization
```
Tree shaking enabled
Minification active
Gzip compression ready
```

## Type Safety

### TypeScript Interfaces
```typescript
CurrentWeatherData
HistoricalWeatherData
MarineWeatherData
Component Props
Hook Returns
```

### Type Checking
```
Compile-time validation
IDE autocomplete
Runtime safety
```

## Build Process

```
Source Code (TypeScript + TSX)
    ↓
TypeScript Compilation
    ↓
Vite Bundling
    ↓
Tailwind CSS Processing
    ↓
PostCSS Transformation
    ↓
Minification
    ↓
Production Build (dist/)
```

## Deployment Flow

```
Development
    ↓
npm run build
    ↓
dist/ folder
    ↓
Deploy to:
├── Vercel
├── Netlify
├── GitHub Pages
└── Docker
```

## Testing Strategy (Future)

### Unit Tests
```
Components: Jest + React Testing Library
Hooks: @testing-library/react-hooks
Services: Jest + Axios Mock
```

### Integration Tests
```
User flows
API integration
State management
```

### E2E Tests
```
Cypress or Playwright
Full user journeys
Cross-browser testing
```

## Security Considerations

### API Key Protection
```
Environment variables
Not in version control
Backend proxy recommended (production)
```

### Input Validation
```
Search query sanitization
Date validation
Error boundary protection
```

## Scalability

### Future Enhancements
```
- Redux/Zustand for complex state
- React Query for API caching
- Lazy loading for routes
- Service Worker for PWA
- WebSocket for real-time updates
```

### Code Organization
```
- Feature-based folders
- Shared utilities
- Common types
- Reusable hooks
```

---

**Architecture designed for maintainability, scalability, and performance.**
