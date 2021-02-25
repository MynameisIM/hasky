export default class Catalog {
  constructor(parent) {
    const categoryBtn = parent.querySelector('.catalog__category-button');
    const category = parent.querySelector('.catalog-category');
    const page = document.body.querySelector('.page');
    const views = [].slice.call(parent.querySelectorAll('.catalog__view-item'));
    const filterBtn = parent.querySelector('.catalog__aside-button');
    const filter = parent.querySelector('.catalog-filter');

    if (category && categoryBtn && page) {
      categoryBtn.addEventListener('click', () => {
        category.classList.add('catalog-category--show');
        page.classList.add('catalog-page');
      });
    }

    if (filterBtn && filter && page) {
      filterBtn.addEventListener('click', () => {
        filter.classList.add('catalog-filter--show');
        page.classList.add('catalog-page');
      });
    }

    if (views.length > 0) {
      views.forEach((btn) => {
        btn.addEventListener('click', () => {
          if (!btn.classList.contains('active')) {
            const act = views.find(el => el.classList.contains('active'));
            if (act) {
              act.classList.remove('active');
              btn.classList.add('active');
            }
          }
        });
      });
    }
  }
}
