export interface GeoLocation {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface WeatherData {
  list: WeatherItem[];
  city: City;
}

export interface WeatherItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: WeatherCondition[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  pop: number;
  dt_txt: string;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface City {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface AirPollutionData {
  list: AirPollutionItem[];
}

export interface AirPollutionItem {
  dt: number;
  main: {
    aqi: number;
  };
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
}

export type AQILevel = 1 | 2 | 3 | 4 | 5;

export const AQI_LABELS: Record<AQILevel, { label: string; description: string }> = {
  1: { label: 'Хорошее', description: 'Качество воздуха удовлетворительное' },
  2: { label: 'Приемлемое', description: 'Качество воздуха приемлемое' },
  3: { label: 'Умеренное', description: 'Чувствительные группы могут испытывать воздействие' },
  4: { label: 'Плохое', description: 'Все могут испытывать воздействие' },
  5: { label: 'Очень плохое', description: 'Предупреждение о здоровье для всех' },
};
