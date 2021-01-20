export default class Header {
  constructor(parent) {
    const hamburger = parent.querySelector('.header__hamburger');
    const menu = parent.querySelector('.header-menu');
    const list = [].slice.call(parent.querySelectorAll('.header-menu__link-item'));
    const page = document.querySelector('.page');
    const dropdowns = [].slice.call(parent.querySelectorAll('[data-e-parent]'));

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
  }
}
