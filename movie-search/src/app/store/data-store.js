import api from '../services/api-service';

class DataStore {
  constructor(apiService) {
    this.apiService = apiService;
    this.movies = null;
    this.quantity = null;
  }

  async init(query, page) {
    const response = await Promise.all([
      this.apiService.getMoviesByQuery(query, page),
    ]);

    const [movies] = response;
    this.quantity = movies.totalResults;
    this.movies = await this.getMoviesWithRating(movies.Search);

    return response;
  }

  async getMoviesWithRating(movies) {
    if (movies) {
      const promises = movies.map(async (movie) => {
        const response = await this.apiService.getMovieById(movie.imdbID);
        // eslint-disable-next-line no-param-reassign
        movie.Rating = response.imdbRating;
      });
      await Promise.all(promises);

      return movies;
    }

    return Promise.reject(new Error('No data'));
  }
}

const dataStore = new DataStore(api);

export default dataStore;
