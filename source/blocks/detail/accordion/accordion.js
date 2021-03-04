export default class DetailAccordion {
  constructor(parent) {
    const items = [].slice.call(parent.querySelectorAll('.detail__accordion-item'));

    if (items.length > 0) {
      items.forEach((block) => {
        const title = block.querySelector('.detail__accordion-title');
        const dropdown = block.querySelector(' .detail__accordion-content');

        if (title && dropdown) {
          title.addEventListener('click', () => {
            block.classList.toggle('detail__accordion-item--open');
          });
        }
      });
    }
  }
}
