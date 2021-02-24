import Header from '@/blocks/header/header';
import Popup from '@/blocks/popup/popup';
import Form from '@/blocks/form/form';
import Request from '@/blocks/request/request';
import CatalogCategory from '@/blocks/catalog/category/catalog-category';
import CatalogFilter from '@/blocks/catalog/filter/catalog-filter';
import Catalog from '@/blocks/catalog/catalog';

require('./catalog.scss');

Array.from(document.querySelectorAll('.header'))
  .forEach(block => block && new Header(block));

Array.from(document.querySelectorAll('.popup'))
  .forEach(block => block && new Popup(block));

Array.from(document.querySelectorAll('.form'))
  .forEach(block => block && new Form(block));

Array.from(document.querySelectorAll('.catalog-category'))
  .forEach(block => block && new CatalogCategory(block));

Array.from(document.querySelectorAll('.catalog-filter'))
  .forEach(block => block && new CatalogFilter(block));

Array.from(document.querySelectorAll('.catalog'))
  .forEach(block => block && new Catalog(block));

Array.from(document.querySelectorAll('[data-popup]'))
  .forEach((el) => {
    if (el) {
      el.addEventListener('click', () => {
        Popup.open(el.dataset.popup);
      });
    }
  });

/* eslint-disable */
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
