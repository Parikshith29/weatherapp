import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'http://api.weatherstack.com';

export interface CurrentWeatherData {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temperature: number;
    weather_descriptions: string[];
    weather_icons: string[];
    feelslike: number;
    humidity: number;
    wind_speed: number;
    wind_dir: string;
    pressure: number;
    cloudcover: number;
    visibility: number;
    uv_index: number;
  };
}

// Determine base URL based on environment
const isProduction = import.meta.env.PROD;
const BASE_URL = isProduction ? '/api/weather' : 'http://api.weatherstack.com';

export interface HistoricalWeatherData {
  location: {
    name: string;
    country: string;
  };
  historical: {
    [date: string]: {
      avgtemp: number;
      mintemp: number;
      maxtemp: number;
      weather_descriptions: string[];
      humidity: number;
      wind_speed: number;
    };
  };
}

export interface MarineWeatherData {
  location: {
    name: string;
    country: string;
  };
  marine: {
    wave_height: number;
    water_temperature: number;
    wind_speed: number;
    weather_descriptions: string[];
  };
}

// Helper to get URL and params based on environment
const getRequestConfig = (endpoint: string, params: Record<string, any>) => {
  if (isProduction) {
    // Production: Use proxy
    // URL: /api/weather
    // Params: endpoint, query, etc. (API Key is handled server-side if set in Vercel)
    const { access_key, ...restParams } = params; // Remove access_key if relying on server env
    return {
      url: BASE_URL,
      params: {
        ...restParams,
        endpoint
      }
    };
  } else {
    // Development: Use direct API
    // URL: http://api.weatherstack.com/<endpoint>
    return {
      url: `${BASE_URL.replace('/api/weather', 'http://api.weatherstack.com')}/${endpoint}`,
      params
    };
  }
};

/**
 * Fetch current weather data for a location
 */
export async function getCurrentWeather(query: string): Promise<CurrentWeatherData> {
  try {
    const config = getRequestConfig('current', {
      access_key: API_KEY, // Passed in dev, ignored/removed in prod helper if we want
      query,
    });

    const response = await axios.get(config.url, { params: config.params });

    if (response.data.error) {
      throw new Error(response.data.error.info || 'Failed to fetch weather data');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.info || 'Network error occurred');
    }
    throw error;
  }
}

/**
 * Fetch historical weather data for a location and date
 */
export async function getHistoricalWeather(
  query: string,
  date: string
): Promise<HistoricalWeatherData> {
  try {
    const config = getRequestConfig('historical', {
      access_key: API_KEY,
      query,
      historical_date: date,
    });

    const response = await axios.get(config.url, { params: config.params });

    if (response.data.error) {
      throw new Error(response.data.error.info || 'Failed to fetch historical data');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.info || 'Network error occurred');
    }
    throw error;
  }
}

/**
 * Fetch marine weather data for a coastal location
 */
export async function getMarineWeather(query: string): Promise<MarineWeatherData> {
  try {
    const config = getRequestConfig('marine', {
      access_key: API_KEY,
      query,
    });

    const response = await axios.get(config.url, { params: config.params });

    if (response.data.error) {
      throw new Error(response.data.error.info || 'Failed to fetch marine data');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.info || 'Network error occurred');
    }
    throw error;
  }
}

/**
 * Search for locations (autocomplete)
 * Note: WeatherStack free tier doesn't have a dedicated autocomplete endpoint
 * This is a simplified implementation using current weather endpoint
 */
export async function searchLocations(query: string): Promise<string[]> {
  // For demo purposes, return common cities based on query
  // In production, you'd use a proper geocoding API
  const commonCities: { [key: string]: string[] } = {
    usa: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
    uk: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow'],
    canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa'],
    australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
    india: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
    france: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
    germany: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
    japan: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya'],
    china: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu'],
  };

  const lowerQuery = query.toLowerCase();

  // Check if query matches a country
  for (const [country, cities] of Object.entries(commonCities)) {
    if (country.includes(lowerQuery) || lowerQuery.includes(country)) {
      return cities;
    }
  }

  // Otherwise return all cities that match the query
  const allCities = Object.values(commonCities).flat();
  return allCities.filter(city =>
    city.toLowerCase().includes(lowerQuery)
  ).slice(0, 5);
}
