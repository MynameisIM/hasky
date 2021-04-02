import Axios from 'axios/index';

export default class GoodsDropdown {
  constructor(parent) {
    const header = parent.querySelector('.goods-dropdown__header');
    const dropdown = parent.querySelector('.goods-dropdown__dropdown');

    if (header && dropdown) {
      header.addEventListener('click', () => {
        if (dropdown.firstElementChild) {
          parent.classList.toggle('goods-dropdown--open');
        }
      });

      this.initRemoveCard(dropdown);
    }
  }

  static basketItemTemplate(obj) {
    return `<div class="goods-dropdown__item">
              <a class="goods-dropdown__item-link" href="${obj.url || '#'}">
                  <div class="goods-dropdown__item-image">
                      <img src="${obj.picture || ''}" alt="alt">
                  </div>
                  <div class="goods-dropdown__item-name">${obj.name || ''}</div>
              </a>
              <div class="goods-dropdown__item-count">x<span>${obj.quantity || 0}</span></div>
              <div class="goods-dropdown__item-price">${obj.summ || 0}₽</div>
              <button class="goods-dropdown__item-remove" type="button" data-id="${obj.id || obj.product_id || ''}"></button>
            </div>`;
  }

  updateCart(list, container) {
    if (list && container) {
      container.innerHTML = '';
      const basketData = list.basket;
      const { count } = list.basket_count;

      if (basketData && basketData.length > 0) {
        basketData.forEach((goods) => {
          container.insertAdjacentHTML('beforeend', this.constructor.basketItemTemplate(goods));
        });
      }

      if (count === 0) {
        container.innerHTML = '';
      }
    }
  }

  initRemoveCard(container) {
    container.addEventListener('click', (ev) => {
      const { target } = ev;
      if (target.classList.contains('goods-dropdown__item-remove')) {
        const data = {
          id: target.dataset.id,
        };
        Axios.get('./ajax/basket.json', data).then((response) => {
          if (response && response.data && response.data.basket) {
            this.updateCart(response.data, container);
          }
        });
      }
    });
  }
}
