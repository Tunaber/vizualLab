import { useState } from 'react';
import type { WeatherItem } from '../types/weather';
import './WeatherList.css';

interface WeatherListProps {
  forecasts: WeatherItem[];
}

interface DayGroup {
  date: string;
  dayName: string;
  items: WeatherItem[];
}

export function WeatherList({ forecasts }: WeatherListProps) {
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const groupedByDay = forecasts.reduce<DayGroup[]>((acc, item) => {
    const date = new Date(item.dt_txt);
    const dateKey = date.toISOString().split('T')[0] ?? '';
    const dayName = date.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
    
    const existing = acc.find(g => g.date === dateKey);
    if (existing) {
      existing.items.push(item);
    } else {
      acc.push({ date: dateKey, dayName, items: [item] });
    }
    return acc;
  }, []);

  const getMainWeather = (items: WeatherItem[]) => {
    const temps = items.map(i => i.main.temp);
    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);
    const mainItem = items[Math.floor(items.length / 2)];
    return { avgTemp, maxTemp, minTemp, mainItem };
  };

  const toggleDay = (date: string) => {
    setExpandedDay(expandedDay === date ? null : date);
  };

  return (
    <div className="weather-list">
      {groupedByDay.map((day) => {
        const { avgTemp, maxTemp, minTemp, mainItem } = getMainWeather(day.items);
        const isExpanded = expandedDay === day.date;
        const icon = mainItem?.weather[0]?.icon || '01d';
        const description = mainItem?.weather[0]?.description || '';

        return (
          <div key={day.date} className={`weather-day-card ${isExpanded ? 'weather-day-card--expanded' : ''}`}>
            <div className="weather-day-card__header" onClick={() => toggleDay(day.date)}>
              <div className="weather-day-card__info">
                <span className="weather-day-card__date">{day.dayName}</span>
                <span className="weather-day-card__description">{description}</span>
              </div>
              <img 
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
                className="weather-day-card__icon"
              />
              <div className="weather-day-card__temps">
                <span className="weather-day-card__temp-max">{Math.round(maxTemp)}°</span>
                <span className="weather-day-card__temp-min">{Math.round(minTemp)}°</span>
              </div>
              <span className="weather-day-card__avg">{Math.round(avgTemp)}°</span>
              <svg className={`weather-day-card__arrow ${isExpanded ? 'weather-day-card__arrow--up' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
            
            {isExpanded && (
              <div className="weather-day-card__hours">
                {day.items.map((item, idx) => (
                  <div key={idx} className="weather-hour-card">
                    <span className="weather-hour-card__time">
                      {new Date(item.dt_txt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <img 
                      src={`https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`}
                      alt={item.weather[0]?.description}
                      className="weather-hour-card__icon"
                    />
                    <span className="weather-hour-card__temp">{Math.round(item.main.temp)}°</span>
                    <span className="weather-hour-card__feels">Ощ. {Math.round(item.main.feels_like)}°</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
