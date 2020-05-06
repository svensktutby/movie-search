import api from '../services/api-service';

class DataStore {
  constructor(apiService) {
    this.apiService = apiService;
    this.movies = null;
  }

  async init(target) {
    const response = await Promise.all([
      this.apiService.getMovies(target),
    ]);

    const [movies] = response;
    this.movies = movies;

    return response;
  }
}

const dataStore = new DataStore(api);

export default dataStore;
