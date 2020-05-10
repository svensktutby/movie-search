import './plugins';
import '../styles/main.scss';
import dataStore from './store/data-store';
import {
  swiper,
  appendSlide,
  removeAllSlides,
} from './plugins/swiper';
import Card from './components/card';
import form from './components/form';
import Keyboard from './components/keyboard';

document.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
  form.init('sunshine');
  let queryValue = '';
  let pageValue = 1;

  async function renderSlides(query, page) {
    await dataStore.init(query, page);
    const { movies } = dataStore;
    const moviesNodeList = movies.map((item) => new Card(item).template);
    appendSlide(moviesNodeList);
  }

  function formSubmitHandler() {
    if (form.inputValue) {
      queryValue = form.inputValue;
      removeAllSlides();
      renderSlides(queryValue);
    }
  }

  (() => {
    form.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      formSubmitHandler();
    });
    form.submitBtn.click();
    form.clear.click();

    swiper.on('reachEnd', () => {
      renderSlides(queryValue, pageValue++);
    });
  })();
});
