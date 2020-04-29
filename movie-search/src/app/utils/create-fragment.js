/**
 * @param {String} str
 * @return {DocumentFragment}
 */

export default function createFragment(str) {
  const template = document.createElement('template');
  template.innerHTML = str;
  return template.content;
}
