import './plugins';
import '../styles/main.scss';
import dataStore from './store/data-store';
import {
  swiper,
  appendSlide,
  clearSlides,
  lazyLoadSlides,
} from './plugins/swiper';
import Card from './components/card';
import form from './components/form';
import Keyboard from './components/keyboard';

document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.querySelector('.preloader');
  const messageOutput = document.querySelector('.message-box__output');

  const initQuery = 'sunshine';
  let queryValue = '';
  let currentPage = 1;
  let pagesQuantity = null;

  function addSlides(items) {
    const nodeList = items.map((item) => new Card(item).template);
    appendSlide(nodeList);
    lazyLoadSlides();
  }

  async function renderSlides(query, page) {
    await dataStore.init(query, page);
    const { movies, quantity } = dataStore;
    pagesQuantity = Math.ceil(quantity / 10);
    addSlides(movies);
  }

  function showMessage(str) {
    messageOutput.textContent = str;

    if (str) {
      messageOutput.classList.add('message-box__output--shake');
      setTimeout(() => {
        messageOutput.classList.remove('message-box__output--shake');
      }, 700);
    }
  }

  function formSubmitHandler() {
    form.submitBtn.blur();

    if (form.inputValue) {
      currentPage = 1;
      queryValue = form.inputValue;
      showMessage('');
      clearSlides();
      renderSlides(queryValue);
    }
  }

  // Init app
  (() => {
    preloader.classList.add('preloader--hidden');
    form.init(initQuery);
    Keyboard.init();

    const keyboard = document.querySelector('.keyboard');
    if (keyboard) {
      keyboard.addEventListener('click', (evt) => {
        evt.preventDefault();
        const { target } = evt;
        if (target.closest('.keyboard__key.keyboard__key--enter')) {
          formSubmitHandler();
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
      if (currentPage === pagesQuantity) {
        showMessage('There are no more results for this query');
      }

      if (currentPage < pagesQuantity) {
        renderSlides(queryValue, ++currentPage);
      }
    });
  })();
});
