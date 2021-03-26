import template from './card.pug';

export default class Card {
  constructor(options) {
    this.template = template(options);
  }
}
