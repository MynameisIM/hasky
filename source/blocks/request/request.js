import Axios from 'axios';

export default class Request {
  constructor() {
    const likeParent = [].slice.call(document.querySelectorAll('[data-likes]'));
    const compareParent = [].slice.call(document.querySelectorAll('[data-compare]'));
    const basketParent = [].slice.call(document.querySelectorAll('[data-basket]'));
    const headers = {
      like: document.querySelector('header [data-header-like]') || false,
      compare: document.querySelector('header [data-header-compare]') || false,
      basket: document.querySelector('header [data-header-basket]') || false,
    };

    const addEvent = (parent, btn, url, result) => {
      parent.forEach((el) => {
        const items = [].slice.call(el.querySelectorAll('[data-good]'));
        const ajax = el.getAttribute(`${url}`);

        if (items.length > 0) {
          items.forEach((card) => {
            const likeBtn = card.querySelector(`[${btn}]`);

            if (likeBtn) {
              likeBtn.addEventListener('click', () => {
                const data = {
                  id: card.dataset.id,
                };
                Axios.post(ajax, data).then((response) => {
                  if (response && response.data && response.data.basket) {
                    window.dispatchEvent(new window.CustomEvent('getBaskedData', { detail: { basket: response.data.basket, count: response.data.basket_count } }));
                  }
                  // eslint-disable-next-line
                  if (!result.hasAttribute('data-header-basket')) {
                    const count = parseInt(result.textContent, 10);
                    result.textContent = count + 1;
                  }
                });
              });
            }
          });
        }
      });
    };

    addEvent(likeParent, 'data-button-like', 'data-likes', headers.like);
    addEvent(compareParent, 'data-button-compare', 'data-compare', headers.compare);
    addEvent(basketParent, 'data-button-basket', 'data-basket', headers.basket);
  }
}
