import FirstScreen from '@/blocks/first-screen/first-screen';
import Header from '@/blocks/header/header';
import Popup from '@/blocks/popup/popup';
import Form from '@/blocks/form/form';
import Request from '@/blocks/request/request';

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

/* eslint-disable */
const curren = document.querySelector('.core-timer').getAttribute('data-end').split(',').map(n => +n);
function setTimer() {
  let timeLeft = getTimeLeft(curren[0], curren[1], curren[2], curren[3], curren[4], curren[5], 0);
  days.innerHTML = timeLeft[0];
  hrs.innerHTML = timeLeft[1];
  mins.innerHTML = timeLeft[2];
  seconds.innerHTML = timeLeft[3];
}

const getTimeLeft = (year, month, day, hour, minute, second, milisecond) => {

  const currentDate = new Date();

  const expectedDate = new Date(year, month, day, hour, minute, second, milisecond);

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
    return ['X', 'X', 'X', 'X'];
  }
}

const seconds = document.querySelector('.core-timer [data-t-seconds]');
const days = document.querySelector('.core-timer [data-t-days]');
const hrs = document.querySelector('.core-timer [data-t-hours]');
const mins = document.querySelector('.core-timer [data-t-minutes]');

window.onload = setTimer();
setInterval(setTimer, 1000);
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
