import './plugins';
import '../styles/main.scss';
import dataStore from './store/data-store';
import { appendSlide } from './plugins/swiper';
import Card from './components/card';
import form from './components/form';
import Keyboard from './components/keyboard';

document.addEventListener('DOMContentLoaded', () => {
  form.init();
  // console.log(form);
  Keyboard.init();

  (async () => {
    await dataStore.init('forest');
    const { movies } = dataStore;
    const moviesNodeList = movies.map((item) => new Card(item).template);
    appendSlide(moviesNodeList);
  })();
});
