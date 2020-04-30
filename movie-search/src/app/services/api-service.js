import apiConfig from '../config';

class Api {
  constructor(config) {
    this.url = config.url;
  }
}

const apiService = new Api(apiConfig);

export default apiService;
