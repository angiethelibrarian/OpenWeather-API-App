const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  private searchHistoryFilePath = "./searchHistory.json"

  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    try {
      return await fs.readFile(this.searchHistoryFilePath, "utf-8");
    } catch (error) {
      console.log(error);
      return (null);
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    try {
      await fs.writeFile(this.searchHistoryFilePath, JSON.stringify(cities), "utf-8");
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const data = await this.read();
    if (data) {
      const citiesArray = JSON.parse(data);
      return citiesArray.map((city: { name: any; id: any; }) => new City(city.name, city.id));
    }
    return [];
  }
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const cities = await this.getCities();
    const newCity = new City(cityName, uuidv4());
    cities.push(newCity);
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const cities = await this.getCities();
    const updatedCities = cities.filter(city => city.id !== id);
    await this.write(updatedCities);
  }

export default new HistoryService();
