/* eslint-disable no-param-reassign */
import getRandomInt from './get-random-int';

/**
 * Shuffles array in place
 * @param {Array} arr Array containing items
 * @param {boolean} isLength Flag to reduce array length
 * @return {Array}
 */

export default function shuffleArray(arr, isLength) {
  const length = !isLength ? arr.length : getRandomInt(0, arr.length);
  for (let i = length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * length);
    const chosen = arr[i];
    arr[i] = arr[random];
    arr[random] = chosen;
  }
  return arr.slice(0, length);
}
