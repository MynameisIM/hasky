import FirstScreen from '@/blocks/first-screen/first-screen';
import Header from '@/blocks/header/header';
import Popup from '@/blocks/popup/popup';
import Form from '@/blocks/form/form';

require('./index.scss');

Array.from(document.querySelectorAll('.first-screen'))
  .forEach(block => block && new FirstScreen(block));

Array.from(document.querySelectorAll('.header'))
  .forEach(block => block && new Header(block));

Array.from(document.querySelectorAll('.popup'))
  .forEach(block => block && new Popup(block));

Array.from(document.querySelectorAll('.form'))
  .forEach(block => block && new Form(block));

Array.from(document.querySelectorAll('[data-popup]')).forEach((el) => {
  if (el) {
    el.addEventListener('click', () => {
      Popup.open(el.dataset.popup);
    });
  }
});
