import api from '../services/api-service';

class DataStore {
  constructor(apiService) {
    this.apiService = apiService;
    this.movies = null;
  }

  async init(query, page) {
    const response = await Promise.all([
      this.apiService.getMoviesByQuery(query, page),
    ]);

    const [movies] = response;
    this.movies = await this.addRating(movies.Search);

    return response;
  }

  async addRating(movies) {
    const promises = movies.map(async (movie) => {
      await this.apiService.getMovieById(movie.imdbID)
        // eslint-disable-next-line no-param-reassign,no-return-assign
        .then((response) => movie.Rating = response.imdbRating);
    });
    await Promise.all(promises);

    return movies;
  }
}

const dataStore = new DataStore(api);

export default dataStore;
