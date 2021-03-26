/**
 * Returns a random number between min and max
 * @param {number} min (inclusive)
 * @param {number} max (inclusive)
 * @return {number} integer number
 */

export default function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}
