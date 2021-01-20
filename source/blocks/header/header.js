export default class Header {
  constructor(parent) {
    const hamburger = parent.querySelector('.header__hamburger');
    const menu = parent.querySelector('.header-menu');
    const list = [].slice.call(parent.querySelectorAll('.header-menu__link-item'));
    const page = document.querySelector('.page');
    const dropdowns = [].slice.call(parent.querySelectorAll('[data-e-parent]'));
    const geo = {
      btn: parent.querySelector('.header__geo'),
      drop: parent.querySelector('.header__geo-dropdown'),
      close: parent.querySelector('.header__geo-dropdown-close'),
      search: parent.querySelector('.header__geo-search'),
      searchClear: parent.querySelector('.header__geo-search-clear'),
    };

    if (hamburger && menu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        menu.classList.toggle('open');
        page.classList.toggle('menu');
        document.body.classList.toggle('overflow');
      });
    }

    if (list.length > 0) {
      list.forEach((item) => {
        const title = item.querySelector('.header-menu__link-item-wrapper');
        const dropdown = item.querySelector('.header-menu__link-item-dropdown');

        if (title && dropdown) {
          title.addEventListener('click', () => {
            if (item.classList.contains('active')) {
              item.classList.remove('active');
            } else {
              list.forEach(l => l.classList.remove('active'));
              item.classList.add('active');
            }
          });
        }
      });
    }

    if (dropdowns.length > 0) {
      dropdowns.forEach((el) => {
        const dd = el.parentElement.querySelector('[data-e-dropdown]');

        if (dd) {
          el.addEventListener('click', () => {
            dd.classList.toggle('open');
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
  }
}
