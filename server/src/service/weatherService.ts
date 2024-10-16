import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates { 
  lat: number, 
  lon: number }

// TODO: Define a class for the Weather object
class Weather { 
  constructor(
    public temp: number, 
    public description: string) {} }

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
    private baseURL: string;
    private apiKey: string;
    private cityName: string;
  
    constructor(baseURL: string, apiKey: string, cityName: string) {
      this.baseURL = baseURL;
      this.apiKey = apiKey;
      this.cityName = cityName;
    }
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) { 
    return await fetch(`${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`).then(res => res.json()); 
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates { 
    return { lat: locationData.lat, lon: locationData.lon }; 
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string { 
    return `geo/1.0/direct?q=${this.cityName}&appid=${this.apiKey}`
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() { 
    return this.destructureLocationData(await this.fetchLocationData(this.cityName)); 
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) { 
    return await fetch(this.buildWeatherQuery(coordinates)).then(res => res.json()); 
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) { 
    return new Weather(response.main.temp, response.weather[0].description); 
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) { 
    return [currentWeather, ...weatherData.slice(1, 6).map(data => this.parseCurrentWeather(data))]; 
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) { 
    this.cityName = city; 
    const coordinates = await this.fetchAndDestructureLocationData(); 
    const weatherData = await this.fetchWeatherData(coordinates); 
    return this.buildForecastArray(this.parseCurrentWeather(weatherData.list[0]), weatherData.list); 
  }


export default new WeatherService();
