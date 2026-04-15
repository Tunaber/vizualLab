import type { WeatherData, AirPollutionData, GeoLocation } from '../types/weather';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherService = {
  async getForecast(lat: number, lon: number): Promise<WeatherData> {
    console.log('Fetching forecast for:', lat, lon);
    const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=${API_KEY}`;
    console.log('Forecast URL:', url);
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Forecast API error:', response.status, errorText);
      throw new Error(`Не удалось получить данные о погоде: ${response.status}`);
    }
    const data = await response.json();
    console.log('Forecast data received:', data);
    return data;
  },

  async searchCity(query: string): Promise<GeoLocation[]> {
    console.log('Searching city:', query);
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=10&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Geocoding API error:', response.status, errorText);
      throw new Error(`Ошибка поиска города: ${response.status}`);
    }
    return response.json();
  },

  async getAirPollution(lat: number, lon: number): Promise<AirPollutionData> {
    console.log('Fetching air pollution for:', lat, lon);
    const url = `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Air pollution API error:', response.status, errorText);
      throw new Error(`Не удалось получить данные о загрязнении: ${response.status}`);
    }
    return response.json();
  },

  getIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
};
