const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// TODO: Define a City class with name and id properties
class City {
  constructor(name, id) {
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
      
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const data = await this.read()
    return JSON.parse(data);
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    let newId = uuidv4();

  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {}
}

export default new HistoryService();
