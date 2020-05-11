import './plugins';
import '../styles/main.scss';
import dataStore from './store/data-store';
import {
  swiper,
  appendSlide,
  removeAllSlides,
  lazyLoadSlides,
} from './plugins/swiper';
import Card from './components/card';
import form from './components/form';
import Keyboard from './components/keyboard';

window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  preloader.classList.add('preloader--hidden');
});

document.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
  form.init('sunshine');
  let queryValue = form.inputValue;
  let pageValue = 1;

  async function renderSlides(query, page) {
    await dataStore.init(query, page);
    const { movies } = dataStore;
    const moviesNodeList = movies.map((item) => new Card(item).template);
    appendSlide(moviesNodeList);
    lazyLoadSlides();
  }

  function formSubmitHandler() {
    if (queryValue) {
      removeAllSlides();
      renderSlides(queryValue);
    }
  }

  (() => {
    const keyboard = document.querySelector('.keyboard');
    if (keyboard) {
      keyboard.addEventListener('click', (evt) => {
        evt.preventDefault();
        const { target } = evt;
        if (target.closest('.keyboard__key.keyboard__key--enter')) {
          formSubmitHandler();
        }
        if (target.closest('.keyboard__key')) {
          queryValue = form.inputValue;
        }
      });
    }

    form.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      formSubmitHandler();
    });
    form.submitBtn.click();
    form.clear.click();

    swiper.on('reachEnd', () => {
      renderSlides(queryValue, ++pageValue);
    });
  })();
});
