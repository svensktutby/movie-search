/**
 * @param {String} url
 * @return {Object}
 */

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

export default async function loadJson(url) {
  const response = await fetch(url);
  if (response.status === 200) {
    return response.json();
  }

  throw new HttpError(response);
}
