import Axios from 'axios';

export default class Request {
  constructor() {
    const likeParent = [].slice.call(document.querySelectorAll('[data-likes]'));
    const compareParent = [].slice.call(document.querySelectorAll('[data-compare]'));
    const basketParent = [].slice.call(document.querySelectorAll('[data-basket]'));

    const addEvent = (parent, btn, url) => {
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
                if (likeBtn.hasAttribute('data-add-count')) {
                  const count = el.querySelector('.counter .counter__input');
                  if (count) {
                    data.count = count.value;
                  }
                }
                Axios.post(ajax, data).then((response) => {
                  if (response && response.data) {
                    window.dispatchEvent(new window.CustomEvent('getBaskedData', {
                      detail: {
                        basket: response.data.basket || null,
                        count: response.data.basket_count || null,
                        action: url,
                      },
                    }));

                    if (likeBtn.hasAttribute('data-redirect')) {
                      window.location.href = likeBtn.getAttribute('data-redirect');
                    }
                  }
                });
              });
            }
          });
        }
      });
    };

    addEvent(likeParent, 'data-button-like', 'data-likes');
    addEvent(compareParent, 'data-button-compare', 'data-compare');
    addEvent(basketParent, 'data-button-basket', 'data-basket');
  }
}
