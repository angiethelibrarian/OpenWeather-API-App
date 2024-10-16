import dotenv from 'dotenv';
dotenv.config();


interface Coordinates {
  lat: number;
  lon: number;
}

interface WeatherResponse {
  main: {
    temp: number; 
  };
  weather: Array<{
    description: string; 
  }>;
  list: WeatherResponse[]; // To hold multiple weather responses
}

class Weather {
  constructor(public temp: number, public description: string) {}
}


class WeatherService {
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor(baseURL: string, apiKey: string, cityName: string) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.cityName = cityName;
  }

  
  private async fetchLocationData(query: string): Promise<Coordinates[]> {
    const response = await fetch(`${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`);
    return await response.json();
  }


  private destructureLocationData(locationData: Coordinates[]): Coordinates {
    return { lat: locationData[0].lat, lon: locationData[0].lon }; // Ensure you access the first item
  }

 
  private buildGeocodeQuery(): string {
    return `geo/1.0/direct?q=${this.cityName}&appid=${this.apiKey}`;
  }


  private buildWeatherQuery(coordinates: Coordinates): string {
    return `data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }

 
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData);
  }

 
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    return await response.json();
  }

 
  private parseCurrentWeather(response: WeatherResponse): Weather {
    return new Weather(response.main.temp, response.weather[0].description);
  }

 
  private buildForecastArray(currentWeather: Weather, weatherData: WeatherResponse[]): Weather[] {
    return [currentWeather, ...weatherData.slice(1, 6).map(data => this.parseCurrentWeather(data))];
  }

 
  async getWeatherForCity(city: string): Promise<Weather[]> {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    return this.buildForecastArray(this.parseCurrentWeather(weatherData.list[0]), weatherData.list);
  }
}


export default new WeatherService(process.env.BASE_URL || '', process.env.API_KEY || '', '');
