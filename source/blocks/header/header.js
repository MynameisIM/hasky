import Axios from 'axios';
import { throttle } from '../../base/script/debounce';

export default class Header {
  constructor(parent) {
    this.parent = parent;
    const hamburger = parent.querySelector('.header__hamburger');
    const menu = parent.querySelector('.header-menu');
    const list = [].slice.call(parent.querySelectorAll('.header-menu__link-item'));
    const page = document.querySelector('.page');
    const dropdowns = [].slice.call(parent.querySelectorAll('[data-e-parent]'));
    const searchForm = parent.querySelector('.header__search-box');
    const search = parent.querySelector('.header__search');
    const searchBox = parent.querySelector('.header__search-list');
    const dropLinks = [].slice.call(parent.querySelectorAll('.header-menu__link-item-dropdown'));
    const citySearch = parent.querySelector('.header__geo-search');
    const cityForm = parent.querySelector('.header__geo-search-box');
    const geoLinksBox = parent.querySelector('.header__geo-links');
    const hiddenSearch = parent.querySelector('.header__geo-search-hidden');
    const citySpan = parent.querySelector('.header__geo span span');
    this.basketContainer = parent.querySelector('.header__cart-dropdown-list');
    this.basketCount = parent.querySelector('[data-header-basket]');
    this.favoriteCount = parent.querySelector('[data-header-like]');
    this.compareCount = parent.querySelector('[data-header-compare]');
    const geo = {
      btn: parent.querySelector('.header__geo'),
      drop: parent.querySelector('.header__geo-dropdown'),
      close: parent.querySelector('.header__geo-dropdown-close'),
      search: parent.querySelector('.header__geo-search'),
      searchClear: parent.querySelector('.header__geo-search-clear'),
    };

    setTimeout(() => {
      menu.classList.remove('opacity');
    }, 500);

    if (hamburger && menu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        menu.classList.toggle('open');
        page.classList.toggle('menu');
        document.body.classList.toggle('overflow');
      });
    }

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('page')) {
        hamburger.classList.remove('open');
        menu.classList.remove('open');
        page.classList.remove('menu');
        document.body.classList.remove('overflow');
      }
    });

    if (citySearch) {
      const template = obj => `<div class="header__geo-link" data-id="${obj.id}" data-city>${obj.title}</div>`;
      citySearch.addEventListener('input', () => {
        const data = {
          value: citySearch.value,
        };
        if (citySearch.value) {
          Axios.post(cityForm.action, data).then((response) => {
            if (response && response.data) {
              geoLinksBox.innerHTML = '';

              if (response.data.cities && response.data.cities.length > 0) {
                response.data.cities.forEach((city) => {
                  const t = template(city);
                  geoLinksBox.insertAdjacentHTML('afterbegin', t);
                });
              }
            }
          });
        } else if (window.PAGE_DATA && window.PAGE_DATA.cities) {
          geoLinksBox.innerHTML = '';
          window.PAGE_DATA.cities.forEach((city) => {
            const t = template(city);
            geoLinksBox.insertAdjacentHTML('afterbegin', t);
          });
        }
      });
    }

    if (geoLinksBox && hiddenSearch) {
      geoLinksBox.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-city')) {
          const data = {
            id: e.target.dataset.id,
            title: e.target.textContent,
          };
          Axios.post(hiddenSearch.action, data);
          if (citySpan) {
            citySpan.innerHTML = e.target.textContent;
            geo.drop.classList.remove('open');
          }
        }
      });
    }

    if (list.length > 0) {
      list.forEach((item) => {
        const title = item.querySelector('.header-menu__link-item-wrapper');
        const dropdown = item.querySelector('.header-menu__link-item-dropdown');

        if (title && dropdown) {
          title.addEventListener('click', () => {
            dropLinks.forEach(dl => dl.removeAttribute('style'));
            if (item.classList.contains('active')) {
              item.classList.remove('active');
            } else {
              list.forEach(l => l.classList.remove('active'));
              item.classList.add('active');
              dropdown.style.height = `${dropdown.scrollHeight}px`;
            }
          });
        }
      });
    }

    if (dropdowns.length > 0) {
      dropdowns.forEach((el) => {
        const dd = el.parentElement.querySelector('[data-e-dropdown]');
        const box = el.parentElement.querySelector('.header__cart-dropdown-list');

        if (dd) {
          el.addEventListener('click', () => {
            if (el.classList.contains('header__cart-button')) {
              if (box && box.childElementCount > 0) {
                dd.classList.toggle('open');
              }
            } else {
              dd.classList.toggle('open');
            }
          });
        }
      });
    }

    if (geo.btn && geo.drop && geo.close) {
      geo.btn.addEventListener('click', () => {
        geo.drop.classList.add('open');
      });

      geo.close.addEventListener('click', () => {
        geo.drop.classList.remove('open');
      });

      if (geo.search && geo.searchClear) {
        geo.searchClear.addEventListener('click', () => {
          geo.search.value = '';
        });
      }
    }

    if (searchForm && search) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
          value: search.value,
        };
        Axios.post(searchForm.action, data).then((response) => {
          if (response && response.data) {
            searchBox.innerHTML = '';
            searchBox.insertAdjacentHTML('afterbegin', response.data);
          }
        });
      });

      const sendFunc = (url, sb) => {
        if (search.value) {
          Axios.post(url, { value: search.value }).then((response) => {
            if (response && response.data) {
              sb.innerHTML = '';
              sb.insertAdjacentHTML('afterbegin', response.data);
            }
          });
        } else {
          sb.innerHTML = '';
        }
      };

      const a = throttle(sendFunc.bind(this, searchForm.action, searchBox), 1000);

      search.addEventListener('input', () => {
        a();
      });
    }

    const setClass = () => {
      if (window.innerWidth <= 1023) {
        if (window.pageYOffset < 96) {
          page.classList.remove('page--fixed');
        } else {
          page.classList.add('page--fixed');
        }
      } else if (window.innerWidth >= 1024) {
        if (window.pageYOffset < 47) {
          page.classList.remove('page--fixed');
        } else {
          page.classList.add('page--fixed');
        }
      }
    };

    window.addEventListener('scroll', setClass);
    window.addEventListener('resize', setClass);

    if (this.basketContainer) {
      window.addEventListener('getBaskedData', (e) => {
        this.updateCart(e);
      });
      this.initRemoveCard();
    }
  }

  updateCart(e) {
    if (e.detail) {
      this.basketContainer.innerHTML = '';
      const basketData = e.detail.basket;
      const { count } = e.detail;
      const { action } = e.detail;

      if (basketData && basketData.length > 0) {
        basketData.forEach((goods) => {
          this.basketContainer.insertAdjacentHTML('beforeend', this.constructor.basketItemTemplate(goods));
        });
      }

      if (count && this.basketCount && action && action === 'data-basket') {
        this.basketCount.innerHTML = count;
      }

      if (count && this.favoriteCount && action && action === 'data-likes') {
        this.favoriteCount.innerHTML = count;
      }

      if (count && this.compareCount && action && action === 'data-compare') {
        this.compareCount.innerHTML = count;
      }

      if (count === 0 && this.basketCount) {
        this.basketCount.innerHTML = count;
        const container = this.parent.querySelector('.header__cart .header__cart-dropdown');
        if (container) {
          container.classList.remove('open');
        }
      }
    }
  }

  static basketItemTemplate(obj) {
    return `<div class="header__cart-dropdown-item">
              <a class="header__cart-dropdown-item-link" href="${obj.url || '#'}">
                  <div class="header__cart-dropdown-item-image">
                      <img src="${obj.picture || ''}" alt="alt">
                  </div>
                  <div class="header__cart-dropdown-item-name">${obj.name || ''}</div>
              </a>
              <div class="header__cart-dropdown-item-count">x<span>${obj.quantity || 0}</span></div>
              <div class="header__cart-dropdown-item-price">${obj.summ || 0}₽</div>
              <button class="header__cart-dropdown-item-remove" type="button" data-id="${obj.id || obj.product_id || ''}"></button>
            </div>`;
  }

  initRemoveCard() {
    this.basketContainer.addEventListener('click', (ev) => {
      const { target } = ev;
      if (target.classList.contains('header__cart-dropdown-item-remove')) {
        const data = {
          id: target.dataset.id,
        };
        Axios.post('/ajax/removeBasket.php', data).then((response) => {
          if (response && response.data && response.data.basket) {
            window.dispatchEvent(new window.CustomEvent('getBaskedData', { detail: { basket: response.data.basket, count: response.data.basket_count } }));
          }
        });
      }
    });
  }
}
