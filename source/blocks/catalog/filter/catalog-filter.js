import Range from '../../range/range';

export default class CatalogFilter {
  constructor(parent) {
    const ranges = [].slice.call(parent.querySelectorAll('.range'));
    const close = parent.querySelector('.catalog-filter__close');
    const page = document.body.querySelector('.page');

    if (ranges.length > 0) {
      ranges.forEach((range) => {
        new Range(range);
      });
    }

    if (close) {
      close.addEventListener('click', () => {
        parent.classList.remove('catalog-filter--show');
        page.classList.remove('catalog-page');
      });
    }
  }
}
