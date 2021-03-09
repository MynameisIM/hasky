import Swiper from 'swiper/swiper-bundle.esm.browser.min';

export default class PopupImage {
  constructor(parent) {
    const container = parent.querySelector('.popup-image__container');
    const close = parent.querySelector('.popup-image__close');
    const options = {
      navigation: {
        nextEl: parent.querySelector('.popup-image__btn--next'),
        prevEl: parent.querySelector('.popup-image__btn--prev'),
      },
    };
    window.popupImage = new Swiper(container, options);

    if (close) {
      close.addEventListener('click', () => {
        parent.classList.remove('open');
      });
    }
  }
}
