import Axios from 'axios';
import FirstScreen from '@/blocks/first-screen/first-screen';
import Header from '@/blocks/header/header';
import Popup from '@/blocks/popup/popup';
import Form from '@/blocks/form/form';
import Request from '@/blocks/request/request';
import Counter from '@/blocks/counter/counter';
import PopupFast from '../../blocks/popup/fast/popup-fast';
import PopupImage from '../../blocks/popup/image/popup-image';

require('./index.scss');

Array.from(document.querySelectorAll('.first-screen'))
  .forEach(block => block && new FirstScreen(block));

Array.from(document.querySelectorAll('.header'))
  .forEach(block => block && new Header(block));

Array.from(document.querySelectorAll('.popup'))
  .forEach(block => block && new Popup(block));

Array.from(document.querySelectorAll('.form'))
  .forEach(block => block && new Form(block));

Array.from(document.querySelectorAll('[data-popup]'))
  .forEach((el) => {
    if (el) {
      el.addEventListener('click', () => {
        Popup.open(el.dataset.popup);
      });
    }
  });

Array.from(document.querySelectorAll('.counter'))
  .forEach(block => block && new Counter(block));

Array.from(document.querySelectorAll('.popup-fast'))
  .forEach(block => block && new PopupFast(block));

Array.from(document.querySelectorAll('.popup-image'))
  .forEach(block => block && new PopupImage(block));

/* eslint-disable */
function getParentWithClass(target, classname) {
  while(target.parentElement && target !== document.body) {
    if (target.hasAttribute(classname)) {
      return target;
    }
    target = target.parentElement;
  }
}

function declOfNum(number, words) {
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
}
const curren = document.querySelector('.core-timer').getAttribute('data-end').split(',').map(n => +n);
function setTimer() {
  let timeLeft = getTimeLeft(curren[0], curren[1], curren[2], curren[3], curren[4], curren[5], 0);
  if (timeLeft) {
    days.innerHTML = timeLeft[0] < 10 ? `0${timeLeft[0]}`: timeLeft[0];
    daysT.innerHTML = declOfNum(timeLeft[0], ['день', 'дня', 'дней']);
    hrs.innerHTML = timeLeft[1] < 10 ? `0${timeLeft[1]}`: timeLeft[1];
    hrsT.innerHTML = declOfNum(timeLeft[1], ['час', 'часа', 'часов']);
    mins.innerHTML = timeLeft[2] < 10 ? `0${timeLeft[2]}`: timeLeft[2];
    minsT.innerHTML = declOfNum(timeLeft[2], ['минута', 'минуты', 'минут']);
    seconds.innerHTML = timeLeft[3] < 10 ? `<span>0</span><span>${timeLeft[3]}</span>`: `<span>${String(timeLeft[3]).split('')[0]}</span><span>${String(timeLeft[3]).split('')[1]}</span>`;
    secondsT.innerHTML = declOfNum(timeLeft[3], ['секунда', 'секнды', 'секунд']);
  } else {
    clearInterval(setId);
  }
}

const getTimeLeft = (year, month, day, hour, minute, second, milisecond) => {

  const currentDate = new Date();

  const expectedDate = new Date(year, month - 1, day, hour, minute, second, milisecond);

  const timeLeft = expectedDate.getTime() - currentDate.getTime();

  if (timeLeft > 0) {

    let s = timeLeft / 1000;
    let mins = s / 60;
    let hrs = mins / 60;
    let days = hrs / 24;

    let secondsLeft = Math.floor(s % 60);
    let minsLeft = Math.floor(mins % 60);
    let hrsLeft = Math.floor(hrs % 24);
    let daysLeft = Math.floor(days);

    return [ daysLeft, hrsLeft, minsLeft, secondsLeft];

  } else {
    block.classList.add('hide');
    return;
  }
};

const seconds = document.querySelector('.core-timer [data-t-seconds]');
const secondsT = document.querySelector('.core-timer [data-t-seconds-text]');
const days = document.querySelector('.core-timer [data-t-days]');
const daysT = document.querySelector('.core-timer [data-t-days-text]');
const hrs = document.querySelector('.core-timer [data-t-hours]');
const hrsT = document.querySelector('.core-timer [data-t-hours-text]');
const mins = document.querySelector('.core-timer [data-t-minutes]');
const minsT = document.querySelector('.core-timer [data-t-minutes-text]');
const block = document.getElementById('product-of-the-day');

window.onload = setTimer();
const setId = setInterval(setTimer, 1000);
/* eslint-enable */

new Request();

if (!window.PAGE_DATA) {
  window.PAGE_DATA = {};
  window.PAGE_DATA.cities = [
    {
      id: 1,
      title: 'Ульяновск',
    },
    {
      id: 2,
      title: 'Москва',
    },
    {
      id: 3,
      title: 'Екатеринбург',
    },
    {
      id: 4,
      title: 'Нижний Новгород',
    },
    {
      id: 5,
      title: 'Ростов-на-Дону',
    },
    {
      id: 6,
      title: 'Самара',
    },
    {
      id: 7,
      title: 'Санкт-Петербург',
    },
    {
      id: 8,
      title: 'Уфа',
    },
    {
      id: 9,
      title: 'Челябинск',
    },
  ];
}

[].slice.call(document.querySelectorAll('[data-view]')).forEach((el) => {
  if (el) {
    el.addEventListener('click', () => {
      if (getParentWithClass(el, 'data-id')) {
        Axios.get(el.dataset.view, {
          params: {
            id: getParentWithClass(el, 'data-id').dataset.id,
          },
        }).then((responce) => {
          if (responce && responce.data) {
            const popup = document.getElementById(el.dataset.ptype);
            if (popup) {
              const priceContainer = popup.querySelector('.popup-fast__price-container');
              const price = popup.querySelector('[data-popup-price]');
              const priceOld = popup.querySelector('[data-popup-price-old]');
              const priceBox = popup.querySelector('[data-popup-price-box]');
              const name = popup.querySelector('[data-popup-name]');
              const descr = popup.querySelector('[data-popup-descr]');
              const img = popup.querySelector('[data-popup-image]');
              const inputCounter = popup.querySelector('.counter .counter__input');
              if (inputCounter) {
                inputCounter.value = 1;
              }
              if (priceContainer) {
                if (responce.data.price_old === '') {
                  priceContainer.classList.add('popup-fast__price-container--no-sale');
                } else {
                  priceContainer.classList.remove('popup-fast__price-container--no-sale');
                }
              }

              if (price && responce.data.price) {
                price.innerHTML = responce.data.price;
              }
              if (priceOld && responce.data.price_old) {
                priceOld.innerHTML = responce.data.price_old;
              }
              if (name && responce.data.name) {
                name.innerHTML = responce.data.name;
              }
              if (descr && responce.data.description) {
                descr.innerHTML = responce.data.description;
              }
              if (img && responce.data.picture) {
                img.src = responce.data.picture;
              }
              if (priceBox &&
                responce.data.characteristics &&
                responce.data.characteristics.length > 0) {
                priceBox.innerHTML = '';
                responce.data.characteristics.forEach((obj) => {
                  priceBox.insertAdjacentHTML('beforeend', `<div class="popup-fast__price-line"><span>${obj.name || ''}</span><span>${obj.value || ''}</span></div>`);
                });
              }
              if (responce.data.pictures_slider && window.popupSw) {
                if (responce.data.pictures_slider.length > 0) {
                  setTimeout(() => {
                    window.popupSw.removeAllSlides();
                    responce.data.pictures_slider.forEach((src) => {
                      window.popupSw.appendSlide(`<div class="popup-fast__main-slide swiper-slide"><img src="${src}" alt="alt"></div>`);
                    });
                    window.popupSw.slideTo(0);
                  }, 0);
                }
              }
              if (responce.data.pictures_full && window.popupImage) {
                if (responce.data.pictures_full.length > 0) {
                  setTimeout(() => {
                    window.popupImage.removeAllSlides();
                    responce.data.pictures_full.forEach((src) => {
                      window.popupImage.appendSlide(`<div class="popup-image__slide swiper-slide"><img src="${src}" alt="alt"></div>`);
                    });
                    window.popupImage.slideTo(0);
                  }, 0);
                }
              }
              Popup.close();
              Popup.open(el.dataset.ptype);
            }
          }
        });
      }
    });
  }
});
