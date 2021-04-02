import Header from '@/blocks/header/header';
import Popup from '@/blocks/popup/popup';
import Form from '@/blocks/form/form';
import Request from '@/blocks/request/request';
import CustomSelect from '@/blocks/custom-select/custom-select';
import CoreInput from '@/blocks/input/input';
import GoodsDropdown from '@/blocks/goods/dropdown/goods-dropdown';

require('./order.scss');

[].slice.call(document.querySelectorAll('.header'))
  .forEach(block => block && new Header(block));

[].slice.call(document.querySelectorAll('.popup'))
  .forEach(block => block && new Popup(block));

[].slice.call(document.querySelectorAll('.form'))
  .forEach(block => block && new Form(block));

[].slice.call(document.querySelectorAll('[data-popup]'))
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

[].slice.call(document.querySelectorAll('.goods-dropdown')).forEach((item) => {
  if (item) {
    new GoodsDropdown(item);
  }
});

new CoreInput();

/* eslint-disable */

new Request();
