import './plugins';
import '../styles/main.scss';
import dataStore from './store/data-store';
import { appendSlide } from './plugins/swiper';
import Card from './components/card';

document.addEventListener('DOMContentLoaded', () => {
  // init app
  (async () => {
    await dataStore.init('sunny');
    const moviesData = dataStore.movies.Search;
    const moviesNodeList = moviesData.map((item) => new Card(item).template);
    appendSlide(moviesNodeList);
  })();
});
