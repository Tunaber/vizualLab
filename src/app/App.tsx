import { useState, useEffect, useCallback } from 'react';
import { CitySearch } from './components/CitySearch';
import { WeatherList } from './components/WeatherList';
import { AirPollutionCard } from './components/AirPollutionCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { mockWeatherService } from './data/mockWeather';
import type { GeoLocation, WeatherData, AirPollutionData } from './types/weather';
import './App.css';

const USE_MOCKS = false;
const REFRESH_INTERVAL = 3 * 60 * 60 * 1000;

function App() {
  const [location, setLocation] = useState<GeoLocation>({
    name: 'Москва',
    lat: 55.7558,
    lon: 37.6173,
    country: 'RU',
  });
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [airPollution, setAirPollution] = useState<AirPollutionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async () => {
    console.log('fetchWeatherData called for:', location.name);
    try {
      setError(null);
      const weatherData = USE_MOCKS
        ? await mockWeatherService.getForecast(location.lat, location.lon, location.name)
        : await import('./services/weatherService').then(m => m.weatherService.getForecast(location.lat, location.lon));
      const airData = USE_MOCKS
        ? await mockWeatherService.getAirPollution(location.lat, location.lon)
        : await import('./services/weatherService').then(m => m.weatherService.getAirPollution(location.lat, location.lon));
      
      console.log('Weather data received:', weatherData);
      setWeather(weatherData);
      setAirPollution(airData);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError(err instanceof Error ? err.message : 'Не удалось загрузить данные о погоде');
    } finally {
      console.log('Setting isLoading to false');
      setIsLoading(false);
    }
  }, [location]);

  const handleSearch = useCallback(async (query: string) => {
    console.log('Search query:', query, 'USE_MOCKS:', USE_MOCKS);
    if (USE_MOCKS) {
      return mockWeatherService.searchCity(query);
    }
    const { weatherService } = await import('./services/weatherService');
    return weatherService.searchCity(query);
  }, []);

  const handleCitySelect = (newLocation: GeoLocation) => {
    console.log('City selected:', newLocation);
    setLocation(newLocation);
    setIsLoading(true);
  };

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchWeatherData();
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchWeatherData]);

  const getBackgroundGradient = () => {
    if (!weather || weather.list.length === 0) {
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    
    const firstItem = weather.list[0]!;
    if (!firstItem.weather[0]) {
      return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    const condition = firstItem.weather[0].main;
    const hour = new Date(firstItem.dt_txt).getHours();
    const isNight = hour < 6 || hour > 20;

    const gradients: Record<string, string[]> = {
      Clear: isNight 
        ? ['linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)']
        : ['linear-gradient(135deg, #56CCF2 0%, #2F80ED 50%, #56CCF2 100%)'],
      Clouds: ['linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)'],
      Rain: ['linear-gradient(135deg, #373B44 0%, #4286f4 100%)'],
      Drizzle: ['linear-gradient(135deg, #485563 0%, #29323c 100%)'],
      Thunderstorm: ['linear-gradient(135deg, #232526 0%, #414345 100%)'],
      Snow: ['linear-gradient(135deg, #e6dada 0%, #274046 100%)'],
      Mist: ['linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)'],
      Fog: ['linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)'],
      Haze: ['linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)'],
    };

    const selectedGradients = gradients[condition] ?? gradients['Clear']!;
    const index = Math.floor(Math.random() * selectedGradients.length);
    return selectedGradients[index]!;
  };

  const getNextUpdateTime = () => {
    const now = new Date();
    const nextUpdate = new Date(now.getTime() + REFRESH_INTERVAL);
    return nextUpdate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="app" style={{ background: getBackgroundGradient() }}>
      <header className="app__header">
        <div className="app__title">
          <h1>Прогноз погоды</h1>
          <p>{weather?.city.name}, {weather?.city.country}</p>
        </div>
        <CitySearch
          onCitySelect={handleCitySelect}
          onSearch={handleSearch}
          currentCity={location.name}
        />
      </header>

      <main className="app__main">
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} onRetry={fetchWeatherData} />}
        
        {!isLoading && !error && weather && weather.list.length > 0 && (
          <div className="app__content">
            <section className="app__current">
              <div className="current-weather">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.list[0]!.weather[0]?.icon}@4x.png`}
                  alt={weather.list[0]!.weather[0]?.description}
                  className="current-weather__icon"
                />
                <div className="current-weather__info">
                  <span className="current-weather__temp">
                    {Math.round(weather.list[0]!.main.temp)}°C
                  </span>
                  <span className="current-weather__feels">
                    Ощущается как {Math.round(weather.list[0]!.main.feels_like)}°C
                  </span>
                </div>
              </div>
              <div className="current-weather__details">
                <div className="detail-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                  <span>{weather.list[0]!.main.humidity}%</span>
                </div>
                <div className="detail-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                  </svg>
                  <span>{weather.list[0]!.wind.speed} m/s</span>
                </div>
                <div className="detail-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  </svg>
                  <span>{Math.round(weather.list[0]!.pop * 100)}%</span>
                </div>
              </div>
            </section>

            <section className="app__forecast">
              <h2>Прогноз на 5 дней</h2>
              <WeatherList forecasts={weather.list.slice(0, 8)} />
            </section>

            {airPollution && airPollution.list.length > 0 && airPollution.list[0] && (
              <section className="app__air-pollution">
                <h2>Качество воздуха</h2>
                <AirPollutionCard data={airPollution.list[0]!} />
              </section>
            )}
          </div>
        )}
      </main>

      <footer className="app__footer">
        <p>Следующее обновление в {getNextUpdateTime()} • Автообновление каждые 3 часа</p>
      </footer>
    </div>
  );
}

export default App;
