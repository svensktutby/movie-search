import config from '../config/api-config';
import { loadJson } from '../utils';

class Api {
  constructor({ origin, apikey }) {
    this.origin = origin;
    this.apikey = apikey;
  }

  async getMoviesByQuery(query, page = 1) {
    const url = encodeURI(`${this.origin}?${this.apikey}&page=${page}&s=${query.trim()}`);

    try {
      return await loadJson(url);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async getMovieById(imdbID) {
    const url = encodeURI(`${this.origin}?${this.apikey}&i=${imdbID}`);

    try {
      return await loadJson(url);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const api = new Api(config);

export default api;
