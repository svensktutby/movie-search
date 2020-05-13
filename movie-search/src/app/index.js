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
  const queryValues = [];
  let queryValue = '';
  let currentPage = 1;
  let queryData = null;
  let queryQuantity = null;
  let pagesQuantity = null;

  function showMessage(str) {
    messageOutput.textContent = str;

    if (str) {
      messageOutput.classList.add('message-box__output--shake');
      setTimeout(() => {
        messageOutput.classList.remove('message-box__output--shake');
      }, 700);
    }
  }

  function renderSlides(items) {
    const nodeList = items.map((item) => new Card(item).template);
    appendSlide(nodeList);
    lazyLoadSlides();
  }

  async function getData(query, page) {
    await dataStore.init(query, page);
    const { movies, quantity } = dataStore;
    queryData = movies;
    queryQuantity = quantity;
    pagesQuantity = Math.ceil(quantity / 10);
  }

  async function addSlides(query, page) {
    await getData(query, page);
    renderSlides(queryData);
  }

  function formSubmitHandler() {
    form.submitBtn.blur();

    if (form.inputValue) {
      queryValue = form.inputValue;
      queryValues.push(queryValue);

      (async () => {
        try {
          await getData(queryValue, currentPage);
          currentPage = 1;
          showMessage(`${queryQuantity} results for "${queryValue}"`);
          clearSlides();
          renderSlides(queryData);
        } catch (err) {
          if (err.response && err.response.status === 401) {
            const message = 'Error 401 - UNAUTHORIZED: '
              + 'The requested resource requires user authentication';

            showMessage(message);
          } else if (err.message === 'No data') {
            showMessage(`No results for "${queryValue}"`);
            queryValues.pop();
            queryValue = queryValues[queryValues.length - 1];
          } else {
            showMessage(err.message);
            throw err; // unknown error
          }
        }
      })();
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
        showMessage(`There are no more results for "${queryValue}"`);
      }

      if (currentPage < pagesQuantity) {
        addSlides(queryValue, ++currentPage);
      }
    });
  })();
});
