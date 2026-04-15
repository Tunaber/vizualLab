import type { WeatherItem } from '../types/weather';
import './WeatherCard.css';

interface WeatherCardProps {
  weather: WeatherItem;
  showDetails?: boolean;
}

export function WeatherCard({ weather, showDetails = false }: WeatherCardProps) {
  const weatherCondition = weather.weather[0];
  const date = new Date(weather.dt_txt);
  const dayName = date.toLocaleDateString('ru-RU', { weekday: 'short' });
  const dateStr = date.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' });
  const timeStr = date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  const getWeatherClass = (condition: string) => {
    const map: Record<string, string> = {
      Clear: 'weather-card--clear',
      Clouds: 'weather-card--clouds',
      Rain: 'weather-card--rain',
      Drizzle: 'weather-card--rain',
      Thunderstorm: 'weather-card--storm',
      Snow: 'weather-card--snow',
      Mist: 'weather-card--mist',
      Fog: 'weather-card--mist',
      Haze: 'weather-card--mist',
    };
    return map[condition] || 'weather-card--clear';
  };

  if (!weatherCondition) {
    return null;
  }

  return (
    <div className={`weather-card ${getWeatherClass(weatherCondition.main)}`}>
      <div className="weather-card__time">
        <span className="weather-card__day">{dayName}</span>
        <span className="weather-card__date">{dateStr}</span>
      </div>
      
      <div className="weather-card__icon">
        <img 
          src={`https://openweathermap.org/img/wn/${weatherCondition.icon}@2x.png`}
          alt={weatherCondition.description}
        />
      </div>

      <div className="weather-card__temp">
        <span className="weather-card__temp-value">{Math.round(weather.main.temp)}°</span>
        <span className="weather-card__temp-feels">Ощущается как {Math.round(weather.main.feels_like)}°</span>
      </div>

      <div className="weather-card__condition">
        {weatherCondition.description}
      </div>

      {showDetails && (
        <div className="weather-card__details">
          <div className="weather-card__detail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M2 12h20" />
            </svg>
            <span>{weather.main.humidity}%</span>
          </div>
          <div className="weather-card__detail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
            </svg>
            <span>{weather.wind.speed} m/s</span>
          </div>
          <div className="weather-card__detail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
            <span>{Math.round(weather.pop * 100)}%</span>
          </div>
        </div>
      )}

      <div className="weather-card__time-actual">{timeStr}</div>
    </div>
  );
}
