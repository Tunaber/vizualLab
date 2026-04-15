import { describe, it, expect, vi } from 'vitest';
import { mockWeatherService, mockLocations, mockWeatherData, mockAirPollution } from '../data/mockWeather';
import type { WeatherItem, AirPollutionItem } from '../types/weather';

const mockWeatherItem: WeatherItem = {
  dt: 1702500000,
  main: {
    temp: 5,
    feels_like: 2,
    temp_min: 3,
    temp_max: 7,
    pressure: 1025,
    humidity: 65,
  },
  weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
  clouds: { all: 0 },
  wind: { speed: 3.5, deg: 180 },
  visibility: 10000,
  pop: 0.1,
  dt_txt: '2024-12-14 12:00:00',
};

const mockAirPollutionItem: AirPollutionItem = {
  dt: 1702500000,
  main: { aqi: 2 },
  components: {
    co: 250.45,
    no: 0.02,
    no2: 15.3,
    o3: 45.0,
    so2: 5.2,
    pm2_5: 8.5,
    pm10: 15.2,
    nh3: 0.8,
  },
};

describe('Mock Weather Service', () => {
  describe('getForecast', () => {
    it('returns mock weather data', async () => {
      const data = await mockWeatherService.getForecast();
      
      expect(data).toEqual(mockWeatherData);
      expect(data.list).toHaveLength(8);
      expect(data.city.name).toBe('Moscow');
    });
  });

  describe('searchCity', () => {
    it('returns filtered locations based on query', async () => {
      const results = await mockWeatherService.searchCity('Moscow');
      
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Moscow');
    });

    it('returns multiple matches for partial query', async () => {
      const results = await mockWeatherService.searchCity('o');
      
      expect(results.length).toBeGreaterThan(1);
    });

    it('returns empty array for non-matching query', async () => {
      const results = await mockWeatherService.searchCity('xyz123');
      
      expect(results).toHaveLength(0);
    });
  });

  describe('getAirPollution', () => {
    it('returns mock air pollution data', async () => {
      const data = await mockWeatherService.getAirPollution();
      
      expect(data).toEqual(mockAirPollution);
      expect(data.list[0].main.aqi).toBe(2);
    });
  });

  describe('getIconUrl', () => {
    it('returns correct icon URL', () => {
      const url = mockWeatherService.getIconUrl('01d');
      
      expect(url).toBe('https://openweathermap.org/img/wn/01d@2x.png');
    });
  });
});

describe('Mock Data', () => {
  it('mockLocations contains expected cities', () => {
    const cityNames = mockLocations.map(loc => loc.name);
    
    expect(cityNames).toContain('Moscow');
    expect(cityNames).toContain('London');
    expect(cityNames).toContain('Tokyo');
  });

  it('mockWeatherData has valid structure', () => {
    expect(mockWeatherData.city).toBeDefined();
    expect(mockWeatherData.city.coord.lat).toBe(55.7558);
    expect(mockWeatherData.city.coord.lon).toBe(37.6173);
  });

  it('mockAirPollution has valid structure', () => {
    expect(mockAirPollution.list[0].main.aqi).toBeGreaterThanOrEqual(1);
    expect(mockAirPollution.list[0].main.aqi).toBeLessThanOrEqual(5);
    expect(mockAirPollution.list[0].components.pm2_5).toBeGreaterThan(0);
  });
});

describe('Weather Data Types', () => {
  it('WeatherItem has correct temperature', () => {
    expect(mockWeatherItem.main.temp).toBe(5);
    expect(mockWeatherItem.main.feels_like).toBe(2);
  });

  it('WeatherItem has correct weather condition', () => {
    expect(mockWeatherItem.weather[0].main).toBe('Clear');
    expect(mockWeatherItem.weather[0].description).toBe('clear sky');
    expect(mockWeatherItem.weather[0].icon).toBe('01d');
  });

  it('AirPollutionItem has correct AQI level', () => {
    expect(mockAirPollutionItem.main.aqi).toBe(2);
    expect(mockAirPollutionItem.components.pm2_5).toBe(8.5);
  });

  it('Wind speed is reasonable', () => {
    expect(mockWeatherItem.wind.speed).toBeGreaterThan(0);
    expect(mockWeatherItem.wind.speed).toBeLessThan(50);
  });

  it('Humidity is in valid range', () => {
    expect(mockWeatherItem.main.humidity).toBeGreaterThanOrEqual(0);
    expect(mockWeatherItem.main.humidity).toBeLessThanOrEqual(100);
  });
});

describe('AQI Levels', () => {
  it('AQI 1 means good air quality', () => {
    const goodAir: AirPollutionItem = {
      ...mockAirPollutionItem,
      main: { aqi: 1 },
    };
    expect(goodAir.main.aqi).toBe(1);
  });

  it('AQI 5 means very poor air quality', () => {
    const poorAir: AirPollutionItem = {
      ...mockAirPollutionItem,
      main: { aqi: 5 },
    };
    expect(poorAir.main.aqi).toBe(5);
  });
});
