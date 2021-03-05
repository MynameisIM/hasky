import Swiper from 'swiper/swiper-bundle.esm.browser.min';

export default class DetailSlider {
  constructor(parent) {
    const container = parent.querySelector('.detail__main-slider-container');
    const options = {
      slidesPerView: 1,
    };

    new Swiper(container, options);
  }
}
