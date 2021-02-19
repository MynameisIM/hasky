import Swiper from 'swiper/swiper-bundle.esm.browser.min';

export default class PopupFast {
  constructor(parent) {
    const getSrc = (item) => {
      const image = item.querySelector('img');
      return image.getAttribute('src');
    };
    const container = parent.querySelector('.popup-fast__main-slider');
    const options = {
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: parent.querySelector('.popup-fast__main-button--next'),
        prevEl: parent.querySelector('.popup-fast__main-button--prev'),
      },
      pagination: {
        el: parent.querySelector('.popup-fast__main-pagination'),
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3,
        renderBullet(index, className) {
          return `<span class="popup-fast__main-dot ${className}" style="background-image: url(${getSrc(this.slides[index])})"></span>`;
        },
      },
    };

    window.popupSw = new Swiper(container, options);
  }
}
