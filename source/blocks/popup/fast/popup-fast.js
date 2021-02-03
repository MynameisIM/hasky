import Swiper from 'swiper/swiper-bundle.esm.browser.min';
import Popup from '@/blocks/popup/popup';

export default class PopupFast {
  constructor(parent) {
    const getSrc = (item) => {
      const image = item.querySelector('img');
      return image.getAttribute('src');
    };
    const oneclick = parent.querySelector('.popup-fast__button');
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

    new Swiper(container, options);

    if (oneclick) {
      oneclick.addEventListener('click', () => {
        Popup.close();
        Popup.open('popup-buy');
      });
    }
  }
}
