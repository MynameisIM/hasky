import Swiper from 'swiper/swiper-bundle.esm.browser.min';

export default class FirstScreen {
  constructor(parent) {
    const container = parent.querySelector('.first-screen__main-container');
    const thumbSlider = parent.querySelector('.first-screen__thumbs-container');
    const slides = [].slice.call(parent.querySelectorAll('.first-screen__main-slide'));
    const toLeft = parent.querySelector('.first-screen__main-container-left');
    const toRight = parent.querySelector('.first-screen__main-container-right');
    const thumbOptions = {
      slidesPerView: 1,
      loopedSlides: 2,
      loop: true,
      navigation: {
        nextEl: parent.querySelector('.first-screen__thumbs-button--next'),
        prevEl: parent.querySelector('.first-screen__thumbs-button--prev'),
      },
    };
    const setFontSize = (c, tb) => {
      if (tb && tb.textContent.length > 2) {
        tb.classList.add('init');
        let dFont = parseInt(getComputedStyle(tb)['font-size'], 10);
        if (tb.offsetWidth >= c.offsetWidth) {
          tb.removeAttribute('style');
          dFont = 16;
        }
        while (tb.offsetWidth < (c.offsetWidth - 35)) {
          if (window.innerWidth < 768) {
            tb.style.fontSize = `${dFont}px`;
          } else {
            tb.style.fontSize = `${dFont - 15}px`;
          }
          dFont += 1;
        }
      }
    };
    const sw = new Swiper(thumbSlider, thumbOptions);
    const options = {
      navigation: {
        nextEl: parent.querySelector('.first-screen__main-button--next'),
        prevEl: parent.querySelector('.first-screen__main-button--prev'),
      },
      loop: true,
      on: {
        slideChange() {
          this.slides.forEach((slide) => {
            const wrapper = slide.querySelector('.first-screen__main-slide-wrapper');
            if (wrapper) {
              const tb = slide.querySelector('.first-screen__main-slide-title:not(.init)');
              if (tb) {
                setFontSize(wrapper, tb);
              }
            }
          });
        },
      },
    };
    new Swiper(container, options);

    if (toLeft && toRight) {
      toLeft.addEventListener('click', () => {
        sw.slidePrev();
      });
      toRight.addEventListener('click', () => {
        sw.slideNext();
      });
    }

    if (slides.length > 0) {
      slides.forEach((slide) => {
        const wrapper = slide.querySelector('.first-screen__main-slide-wrapper');
        if (wrapper) {
          const text = wrapper.querySelector('.first-screen__main-slide-title');
          if (!text.classList.contains('init')) {
            setFontSize(wrapper, text);
          }

          window.addEventListener('resize', setFontSize.bind(this, wrapper, text));
        }
      });
    }
  }
}
