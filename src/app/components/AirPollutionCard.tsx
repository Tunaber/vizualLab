import type { AirPollutionItem, AQILevel } from '../types/weather';
import './AirPollutionCard.css';

interface AirPollutionCardProps {
  data: AirPollutionItem;
}

export function AirPollutionCard({ data }: AirPollutionCardProps) {
  const aqiLevel = data.main.aqi as AQILevel;
  
  const getAQIInfo = (aqi: number) => {
    const levels = [
      { label: 'Хорошее', color: '#4CAF50', description: 'Качество воздуха удовлетворительное' },
      { label: 'Приемлемое', color: '#8BC34A', description: 'Приемлемое качество воздуха' },
      { label: 'Умеренное', color: '#FFC107', description: 'Чувствительные группы могут испытывать effects' },
      { label: 'Плохое', color: '#FF9800', description: 'Все могут испытывать негативное воздействие' },
      { label: 'Очень плохое', color: '#F44336', description: 'Предупреждение о здоровье для всех' },
    ];
    return levels[aqi - 1] ?? levels[0]!;
  };

  const aqiInfo = getAQIInfo(aqiLevel);

  const getPollutantLevel = (value: number, thresholds: number[]) => {
    for (let i = 0; i < thresholds.length; i++) {
      const threshold = thresholds[i];
      if (threshold !== undefined && value <= threshold) return i;
    }
    return thresholds.length;
  };

  const formatPollutant = (value: number, unit: string) => {
    return `${value.toFixed(1)} ${unit}`;
  };

  return (
    <div className="air-pollution-card">
      <div className="air-pollution-card__header">
        <svg className="air-pollution-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
        <h3>Качество воздуха</h3>
      </div>

      <div className="air-pollution-card__aqi" style={{ backgroundColor: aqiInfo.color }}>
        <span className="air-pollution-card__aqi-value">{aqiLevel}</span>
        <span className="air-pollution-card__aqi-label">{aqiInfo.label}</span>
      </div>

      <p className="air-pollution-card__description">{aqiInfo.description}</p>

      <div className="air-pollution-card__pollutants">
        <div className="air-pollution-card__pollutant">
          <span className="air-pollution-card__pollutant-name">PM2.5</span>
          <div className="air-pollution-card__pollutant-bar">
            <div 
              className="air-pollution-card__pollutant-fill"
              style={{ 
                width: `${Math.min(data.components.pm2_5 / 50 * 100, 100)}%`,
                backgroundColor: aqiInfo.color 
              }}
            />
          </div>
          <span className="air-pollution-card__pollutant-value">{formatPollutant(data.components.pm2_5, 'μg/m³')}</span>
        </div>

        <div className="air-pollution-card__pollutant">
          <span className="air-pollution-card__pollutant-name">PM10</span>
          <div className="air-pollution-card__pollutant-bar">
            <div 
              className="air-pollution-card__pollutant-fill"
              style={{ 
                width: `${Math.min(data.components.pm10 / 100 * 100, 100)}%`,
                backgroundColor: aqiInfo.color 
              }}
            />
          </div>
          <span className="air-pollution-card__pollutant-value">{formatPollutant(data.components.pm10, 'μg/m³')}</span>
        </div>

        <div className="air-pollution-card__pollutant">
          <span className="air-pollution-card__pollutant-name">O₃</span>
          <div className="air-pollution-card__pollutant-bar">
            <div 
              className="air-pollution-card__pollutant-fill"
              style={{ 
                width: `${Math.min(data.components.o3 / 180 * 100, 100)}%`,
                backgroundColor: aqiInfo.color 
              }}
            />
          </div>
          <span className="air-pollution-card__pollutant-value">{formatPollutant(data.components.o3, 'μg/m³')}</span>
        </div>

        <div className="air-pollution-card__pollutant">
          <span className="air-pollution-card__pollutant-name">NO₂</span>
          <div className="air-pollution-card__pollutant-bar">
            <div 
              className="air-pollution-card__pollutant-fill"
              style={{ 
                width: `${Math.min(data.components.no2 / 100 * 100, 100)}%`,
                backgroundColor: aqiInfo.color 
              }}
            />
          </div>
          <span className="air-pollution-card__pollutant-value">{formatPollutant(data.components.no2, 'μg/m³')}</span>
        </div>
      </div>
    </div>
  );
}
