/**
 * Returns a random item from an array
 * @param {Array} arr An array containing items
 * @return {string|number|boolean|null|undefined|Object}
 */

export default function getRandomArrayItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
