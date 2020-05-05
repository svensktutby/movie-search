import './card.scss';
import template from './card.pug';
import { createNode } from '../../utils';

export default class Movie {
  constructor(options) {
    this.elem = createNode('div', 'card swiper-slide');
    this.elem.innerHTML = template(options);
    this.titleElem = this.elem.querySelector('.title');

    this.titleElem.onclick = () => this.elem.classList.toggle('open');

    this.titleElem.onmousedown = () => false;
  }
}
