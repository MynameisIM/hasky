import Swiper from 'swiper/swiper-bundle.esm.browser.min';

export default class FirstScreen {
  constructor(parent) {
    const container = parent.querySelector('.first-screen__main-container');
    const thumbSlider = parent.querySelector('.first-screen__thumbs-container');
    const slides = [].slice.call(parent.querySelectorAll('.first-screen__main-slide'));
    const thumbOptions = {
      slidesPerView: 1,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      loop: true,
      navigation: {
        nextEl: parent.querySelector('.first-screen__thumbs-button--next'),
        prevEl: parent.querySelector('.first-screen__thumbs-button--prev'),
      },
    };
    const thumbSw = new Swiper(thumbSlider, thumbOptions);
    const options = {
      navigation: {
        nextEl: parent.querySelector('.first-screen__main-button--next'),
        prevEl: parent.querySelector('.first-screen__main-button--prev'),
      },
      loop: true,
      thumbs: {
        swiper: thumbSw,
      },
    };
    new Swiper(container, options);
    const setFontSize = (c, tb) => {
      let dFont = parseInt(getComputedStyle(tb)['font-size'], 10);
      if (tb.offsetWidth >= c.offsetWidth) {
        tb.removeAttribute('style');
        dFont = 16;
      }
      while (tb.offsetWidth < (c.offsetWidth - 30)) {
        tb.style.fontSize = `${dFont}px`;
        dFont += 1;
      }
    };

    if (slides.length > 0) {
      slides.forEach((slide) => {
        const text = slide.querySelector('.first-screen__main-slide-title');
        setFontSize(slide, text);

        window.addEventListener('resize', setFontSize.bind(this, slide, text));
      });
    }
  }
}
