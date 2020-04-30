import apiService from '../services';

class Movies {
  constructor(api) {
    this.api = api;
    this.movies = null;
  }
}

const movies = new Movies(apiService);

export default movies;
