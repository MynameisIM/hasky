import Swiper from 'swiper/swiper-bundle.esm.browser.min';

export default class FirstScreen {
  constructor(parent) {
    const container = parent.querySelector('.first-screen__main-container');
    const thumbSlider = parent.querySelector('.first-screen__thumbs-container');
    const thumbOptions = {
      slidesPerView: 1,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
    };
    const thumbSw = new Swiper(thumbSlider, thumbOptions);
    const options = {
      navigation: {
        nextEl: parent.querySelector('.first-screen__main-button--next'),
        prevEl: parent.querySelector('.first-screen__main-button--prev'),
      },
      thumbs: {
        swiper: thumbSw,
      },
    };
    new Swiper(container, options);
  }
}
