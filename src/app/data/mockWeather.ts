import type { WeatherData, AirPollutionData, GeoLocation } from '../types/weather';

export const mockLocations: GeoLocation[] = [
  { name: 'Москва', lat: 55.7558, lon: 37.6173, country: 'RU' },
  { name: 'Санкт-Петербург', lat: 59.9343, lon: 30.3351, country: 'RU' },
  { name: 'Новосибирск', lat: 55.0084, lon: 82.9357, country: 'RU' },
  { name: 'Екатеринбург', lat: 56.8389, lon: 60.6057, country: 'RU' },
  { name: 'Казань', lat: 55.8304, lon: 49.0661, country: 'RU' },
  { name: 'Нижний Новгород', lat: 56.2965, lon: 43.9361, country: 'RU' },
  { name: 'Челябинск', lat: 55.1644, lon: 61.4368, country: 'RU' },
  { name: 'Самара', lat: 53.1958, lon: 50.1019, country: 'RU' },
  { name: 'Ростов-на-Дону', lat: 47.2357, lon: 39.7015, country: 'RU' },
  { name: 'Уфа', lat: 54.8206, lon: 56.0542, country: 'RU' },
  { name: 'Волгоград', lat: 48.7071, lon: 44.5176, country: 'RU' },
  { name: 'Красноярск', lat: 56.0184, lon: 92.8672, country: 'RU' },
  { name: 'Воронеж', lat: 51.6606, lon: 39.2003, country: 'RU' },
  { name: 'Пермь', lat: 58.0105, lon: 56.2502, country: 'RU' },
  { name: 'Краснодар', lat: 45.0355, lon: 38.9753, country: 'RU' },
];

export const mockWeatherData: WeatherData = {
  city: {
    id: 524901,
    name: 'Москва',
    coord: { lat: 55.7558, lon: 37.6173 },
    country: 'RU',
    population: 12506468,
    timezone: 10800,
    sunrise: 1702531200,
    sunset: 1702560000,
  },
  list: [
    {
      dt: Date.now() / 1000,
      main: { temp: 5, feels_like: 2, temp_min: 3, temp_max: 7, pressure: 1025, humidity: 65 },
      weather: [{ id: 800, main: 'Clear', description: 'ясно', icon: '01d' }],
      clouds: { all: 0 },
      wind: { speed: 3.5, deg: 180 },
      visibility: 10000,
      pop: 0,
      dt_txt: new Date().toISOString(),
    },
    {
      dt: Date.now() / 1000 + 10800,
      main: { temp: 3, feels_like: 0, temp_min: 1, temp_max: 5, pressure: 1023, humidity: 70 },
      weather: [{ id: 803, main: 'Clouds', description: 'облачно с прояснениями', icon: '04d' }],
      clouds: { all: 75 },
      wind: { speed: 4.2, deg: 200 },
      visibility: 10000,
      pop: 0.1,
      dt_txt: new Date(Date.now() + 10800000).toISOString(),
    },
    {
      dt: Date.now() / 1000 + 21600,
      main: { temp: 6, feels_like: 3, temp_min: 4, temp_max: 8, pressure: 1020, humidity: 55 },
      weather: [{ id: 801, main: 'Clouds', description: 'небольшая облачность', icon: '02d' }],
      clouds: { all: 25 },
      wind: { speed: 2.8, deg: 160 },
      visibility: 10000,
      pop: 0,
      dt_txt: new Date(Date.now() + 21600000).toISOString(),
    },
    {
      dt: Date.now() / 1000 + 32400,
      main: { temp: 8, feels_like: 5, temp_min: 6, temp_max: 10, pressure: 1018, humidity: 50 },
      weather: [{ id: 500, main: 'Rain', description: 'небольшой дождь', icon: '10d' }],
      clouds: { all: 60 },
      wind: { speed: 5.1, deg: 220 },
      visibility: 8000,
      pop: 0.6,
      dt_txt: new Date(Date.now() + 32400000).toISOString(),
    },
    {
      dt: Date.now() / 1000 + 43200,
      main: { temp: 7, feels_like: 4, temp_min: 5, temp_max: 9, pressure: 1015, humidity: 75 },
      weather: [{ id: 502, main: 'Rain', description: 'сильный дождь', icon: '10d' }],
      clouds: { all: 90 },
      wind: { speed: 6.5, deg: 240, gust: 10.2 },
      visibility: 5000,
      pop: 0.9,
      dt_txt: new Date(Date.now() + 43200000).toISOString(),
    },
    {
      dt: Date.now() / 1000 + 54000,
      main: { temp: 4, feels_like: 1, temp_min: 2, temp_max: 6, pressure: 1012, humidity: 80 },
      weather: [{ id: 600, main: 'Snow', description: 'небольшой снег', icon: '13d' }],
      clouds: { all: 85 },
      wind: { speed: 4.0, deg: 270 },
      visibility: 6000,
      pop: 0.7,
      dt_txt: new Date(Date.now() + 54000000).toISOString(),
    },
    {
      dt: Date.now() / 1000 + 64800,
      main: { temp: 2, feels_like: -2, temp_min: 0, temp_max: 4, pressure: 1010, humidity: 85 },
      weather: [{ id: 601, main: 'Snow', description: 'снег', icon: '13d' }],
      clouds: { all: 95 },
      wind: { speed: 5.5, deg: 280, gust: 8.5 },
      visibility: 3000,
      pop: 0.95,
      dt_txt: new Date(Date.now() + 64800000).toISOString(),
    },
    {
      dt: Date.now() / 1000 + 75600,
      main: { temp: -1, feels_like: -5, temp_min: -3, temp_max: 1, pressure: 1008, humidity: 90 },
      weather: [{ id: 741, main: 'Fog', description: 'туман', icon: '50d' }],
      clouds: { all: 100 },
      wind: { speed: 2.0, deg: 150 },
      visibility: 500,
      pop: 0.3,
      dt_txt: new Date(Date.now() + 75600000).toISOString(),
    },
  ],
};

export const mockAirPollution: AirPollutionData = {
  list: [
    {
      dt: Date.now() / 1000,
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
    },
  ],
};

const cityTemperatures: Record<string, { base: number; variation: number }> = {
  'Москва': { base: 8, variation: 4 },
  'Санкт-Петербург': { base: 6, variation: 3 },
  'Новосибирск': { base: 2, variation: 5 },
  'Екатеринбург': { base: 4, variation: 4 },
  'Казань': { base: 7, variation: 4 },
  'Нижний Новгород': { base: 7, variation: 4 },
  'Челябинск': { base: 3, variation: 5 },
  'Самара': { base: 8, variation: 4 },
  'Ростов-на-Дону': { base: 12, variation: 4 },
  'Уфа': { base: 5, variation: 5 },
  'Волгоград': { base: 9, variation: 4 },
  'Красноярск': { base: 1, variation: 5 },
  'Воронеж': { base: 8, variation: 4 },
  'Пермь': { base: 3, variation: 5 },
  'Краснодар': { base: 14, variation: 4 },
};

export const mockWeatherService = {
  async getForecast(lat: number, lon: number, cityName: string): Promise<WeatherData> {
    console.log('Mock: getForecast called for', cityName, lat, lon);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const city = mockLocations.find(l => l.name === cityName) || mockLocations[0]!;
    const tempData = cityTemperatures[cityName] || { base: 5, variation: 4 };
    
    const randomVariation = () => (Math.random() - 0.5) * tempData.variation;
    const hourOfDay = new Date().getHours();
    
    const items = Array.from({ length: 8 }, (_, i) => {
      const time = new Date(Date.now() + i * 10800000);
      const hour = time.getHours();
      const dayNightFactor = (hour >= 6 && hour <= 14) ? 2 : (hour >= 15 && hour <= 20) ? 0 : -2;
      const temp = tempData.base + randomVariation() + dayNightFactor;
      
      return {
        dt: Date.now() / 1000 + i * 10800,
        main: { 
          temp: temp, 
          feels_like: temp - 2 + randomVariation() * 0.5, 
          temp_min: temp - 2, 
          temp_max: temp + 2, 
          pressure: 1015 + Math.floor(Math.random() * 20), 
          humidity: 50 + Math.floor(Math.random() * 40) 
        },
        weather: [{ id: 800, main: 'Clear', description: 'ясно', icon: '01d' }],
        clouds: { all: Math.floor(Math.random() * 30) },
        wind: { speed: 2 + Math.random() * 4, deg: Math.floor(Math.random() * 360) },
        visibility: 10000,
        pop: Math.random() * 0.2,
        dt_txt: time.toISOString(),
      };
    });

    return {
      city: {
        id: city.lat * 1000,
        name: city.name,
        coord: { lat: city.lat, lon: city.lon },
        country: city.country,
        population: 1000000,
        timezone: 10800,
        sunrise: 1702531200,
        sunset: 1702560000,
      },
      list: items,
    };
  },

  async searchCity(query: string): Promise<GeoLocation[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const lowerQuery = query.toLowerCase();
    return mockLocations.filter(loc => {
      const nameMatch = loc.name.toLowerCase().includes(lowerQuery);
      const localNames = loc.local_names ? Object.values(loc.local_names).some(
        (localName: string) => localName.toLowerCase().includes(lowerQuery)
      ) : false;
      return nameMatch || localNames;
    });
  },

  async getAirPollution(lat: number, lon: number): Promise<AirPollutionData> {
    console.log('Mock: getAirPollution called');
    await new Promise(resolve => setTimeout(resolve, 400));
    console.log('Mock: returning air pollution data');
    return mockAirPollution;
  },

  getIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
};
