export default class Catalog {
  constructor(parent) {
    const categoryBtn = parent.querySelector('.catalog__category-button');
    const category = parent.querySelector('.catalog-category');
    const page = document.body.querySelector('.page');

    if (category && categoryBtn && page) {
      categoryBtn.addEventListener('click', () => {
        category.classList.add('catalog-category--show');
        page.classList.add('catalog-page');
      });
    }
  }
}
