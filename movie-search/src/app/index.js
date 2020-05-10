import './plugins';
import '../styles/main.scss';
import dataStore from './store/data-store';
import { appendSlide } from './plugins/swiper';
import Card from './components/card';

document.addEventListener('DOMContentLoaded', () => {
  // init app
  (async () => {
    await dataStore.init('forest');
    const { movies } = dataStore;
    const moviesNodeList = movies.map((item) => new Card(item).template);
    appendSlide(moviesNodeList);
  })();
});
