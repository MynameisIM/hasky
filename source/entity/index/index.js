import FirstScreen from '@/blocks/first-screen/first-screen';

require('./index.scss');

Array.from(document.querySelectorAll('.first-screen'))
  .forEach(block => block && new FirstScreen(block));
