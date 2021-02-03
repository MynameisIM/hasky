import Swiper from 'swiper/swiper-bundle.esm.browser.min';

export default class PopupFast {
  constructor(parent) {
    const container = parent.querySelector('.popup-fast__main-slider');
    const options = {
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: parent.querySelector('.popup-fast__main-button--next'),
        prevEl: parent.querySelector('.popup-fast__main-button--prev'),
      },
    };

    new Swiper(container, options);
  }
}
