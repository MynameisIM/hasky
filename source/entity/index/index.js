import FirstScreen from '@/blocks/first-screen/first-screen';
import Header from '@/blocks/header/header';

require('./index.scss');

Array.from(document.querySelectorAll('.first-screen'))
  .forEach(block => block && new FirstScreen(block));

Array.from(document.querySelectorAll('.header'))
  .forEach(block => block && new Header(block));
