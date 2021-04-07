import Axios from 'axios';
import Popup from '@/blocks/popup/popup';

export default class Form {
  constructor(parent) {
    const elems = [].slice.call(parent.elements)
      .filter(el => el.tagName !== 'BUTTON')
      .filter(i => i.type !== 'hidden')
      .filter(elm => !elm.hasAttribute('data-not-required'));
    const errors = [];

    if (parent && elems.length > 0) {
      parent.addEventListener('submit', (e) => {
        e.preventDefault();
        elems.forEach(el => el.classList.remove('error'));
        errors.length = 0;

        elems.forEach((item) => {
          if (item.value.length === 0) {
            item.classList.add('error');
            errors.push(item);
          }
        });

        if (errors.length === 0) {
          const data = new window.FormData(parent);
          Axios.post(parent.getAttribute('data-url') || parent.action, data).then(() => {
            Popup.close();
          });
        }
      });
    }
  }
}
