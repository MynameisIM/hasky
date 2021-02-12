import Header from '@/blocks/header/header';
import Popup from '@/blocks/popup/popup';
import Form from '@/blocks/form/form';
import Request from '@/blocks/request/request';
import CustomSelect from '@/blocks/custom-select/custom-select';
import CoreInput from '@/blocks/input/input';

require('./order.scss');

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

[].slice.call(document.querySelectorAll('.custom-select')).forEach((item) => {
  if (item) {
    new CustomSelect(item);
  }
});

new CoreInput();

/* eslint-disable */

new Request();
