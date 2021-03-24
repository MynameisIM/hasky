import Swiper from 'swiper/swiper-bundle.esm.browser.min';

export default class DetailSlider {
  constructor(parent) {
    const getSrc = (item) => {
      const image = item.querySelector('img');
      return image.getAttribute('src');
    };

    const container = parent.querySelector('.detail__main-slider-container');
    const options = {
      slidesPerView: 1,
      pagination: {
        el: parent.querySelector('.detail__main-pagination'),
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3,
        renderBullet(index, className) {
          return `<span class="detail__main-dot ${className}" style="background-image: url(${getSrc(this.slides[index])})"></span>`;
        },
      },
    };

    new Swiper(container, options);
  }
}
