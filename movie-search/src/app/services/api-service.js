import config from '../config/api-config';
import { loadJson } from '../utils';

class Api {
  constructor({ origin, apikey }) {
    this.origin = origin;
    this.apikey = apikey;
  }

  async getMoviesByQuery(query) {
    const url = encodeURI(`${this.origin}?${this.apikey}&s=${query.trim()}`);

    try {
      return await loadJson(url);
    } catch (err) {
      if (err.response.status === 401) {
        console.log('Error 401 - UNAUTHORIZED\n'
          + 'The requested resource requires user authentication');
      } else {
        // unknown error
        throw err;
      }
      return Promise.reject(err);
    }
  }

  async getMovieById(imdbID) {
    const url = encodeURI(`${this.origin}?${this.apikey}&i=${imdbID}`);

    try {
      return await loadJson(url);
    } catch (err) {
      if (err.response.status === 401) {
        console.log('Error 401 - UNAUTHORIZED\n'
          + 'The requested resource requires user authentication');
      } else {
        // unknown error
        throw err;
      }
      return Promise.reject(err);
    }
  }
}

const api = new Api(config);

export default api;
