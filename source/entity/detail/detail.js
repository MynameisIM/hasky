import Request from '@/blocks/request/request';
import Counter from '@/blocks/counter/counter';
import PopupFast from '@/blocks/popup/fast/popup-fast';
import PopupImage from '@/blocks/popup/image/popup-image';
import DetailAccordion from '../../blocks/detail/accordion/accordion';
import DetailSlider from '../../blocks/detail/slider/detail-slider';
import DetailTabs from '../../blocks/detail/tabs/detail-tabs';
import DetailRate from '../../blocks/detail/rate/detail-rate';

require('./detail.scss');

[].slice.call(document.querySelectorAll('.counter'))
  .forEach(block => block && new Counter(block));

[].slice.call(document.querySelectorAll('.detail__accordion'))
  .forEach(block => block && new DetailAccordion(block));

[].slice.call(document.querySelectorAll('.detail__main-slider'))
  .forEach(block => block && new DetailSlider(block));

[].slice.call(document.querySelectorAll('.detail__tabs-box'))
  .forEach(block => block && new DetailTabs(block));

[].slice.call(document.querySelectorAll('.detail-rate'))
  .forEach(block => block && new DetailRate(block));

[].slice.call(document.querySelectorAll('.popup-fast'))
  .forEach(block => block && new PopupFast(block));

[].slice.call(document.querySelectorAll('.popup-image'))
  .forEach(block => block && new PopupImage(block));

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

const moveBlocks = () => {
  const main = document.querySelector('.detail .detail__main');
  const aside = document.querySelector('.detail .detail__aside');

  if (main && aside) {
    const priceBox = document.querySelector('.detail .detail__aside-info-box');

    if (priceBox) {
      const move = () => {
        if (window.innerWidth <= 767 && !main.contains(priceBox)) {
          main.appendChild(priceBox);
        } else if (window.innerWidth > 767 && !aside.contains(priceBox)) {
          aside.appendChild(priceBox);
        }
      };
      move();

      window.addEventListener('resize', move);
    }
  }
};

moveBlocks();

new Request();
