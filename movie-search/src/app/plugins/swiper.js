import 'swiper/css/swiper.css';
import Swiper from 'swiper';

export const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 30,
  mousewheel: true,
  keyboard: true,
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
});

export function appendSlide(slides) {
  return swiper.appendSlide(slides);
}

export function addSlide(index, slides) {
  return swiper.addSlide(index, slides);
}

export function removeAllSlides() {
  return swiper.removeAllSlides();
}
