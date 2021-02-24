export default class CatalogCategory {
  constructor(parent) {
    const items = [].slice.call(parent.querySelectorAll('.catalog-category__item'));
    const close = parent.querySelector('.catalog-category__close');
    const page = document.body.querySelector('.page');

    if (items.length > 0) {
      items.forEach((item) => {
        const title = item.querySelector('.catalog-category__item-title');
        if (title) {
          title.addEventListener('click', () => {
            item.classList.toggle('catalog-category__item--open');
          });
        }
      });
    }

    if (close && page) {
      close.addEventListener('click', () => {
        parent.classList.remove('catalog-category--show');
        page.classList.remove('catalog-page');
      });
    }
  }
}
