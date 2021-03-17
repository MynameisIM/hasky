import Header from '@/blocks/header/header';
import Popup from '@/blocks/popup/popup';
import Form from '@/blocks/form/form';
import Axios from 'axios/index';
import PopupResponse from '@/blocks/popup/response/popup-response';

require('./common.scss');

[].slice.call(document.querySelectorAll('.header'))
  .forEach(block => block && new Header(block));

[].slice.call(document.querySelectorAll('.popup'))
  .forEach(block => block && new Popup(block));

[].slice.call(document.querySelectorAll('.popup-response'))
  .forEach(block => block && new PopupResponse(block));

[].slice.call(document.querySelectorAll('.form'))
  .forEach(block => block && new Form(block));

[].slice.call(document.querySelectorAll('[data-popup]'))
  .forEach((el) => {
    if (el) {
      el.addEventListener('click', () => {
        Popup.open(el.dataset.popup);
      });
    }
  });

if (!window.PAGE_DATA) {
  window.PAGE_DATA = {};
  window.PAGE_DATA.cities = [
    {
      id: 1,
      title: 'Ульяновск',
    },
    {
      id: 2,
      title: 'Москва',
    },
    {
      id: 3,
      title: 'Екатеринбург',
    },
    {
      id: 4,
      title: 'Нижний Новгород',
    },
    {
      id: 5,
      title: 'Ростов-на-Дону',
    },
    {
      id: 6,
      title: 'Самара',
    },
    {
      id: 7,
      title: 'Санкт-Петербург',
    },
    {
      id: 8,
      title: 'Уфа',
    },
    {
      id: 9,
      title: 'Челябинск',
    },
  ];
}

/* eslint-disable */
function getParentWithClass(target, classname) {
  while(target.parentElement && target !== document.body) {
    if (target.hasAttribute(classname)) {
      return target;
    }
    target = target.parentElement;
  }
}
/* eslint-enable */

[].slice.call(document.querySelectorAll('[data-view]')).forEach((el) => {
  if (el) {
    el.addEventListener('click', () => {
      if (getParentWithClass(el, 'data-id')) {
        Axios.get(el.dataset.view, {
          params: {
            id: getParentWithClass(el, 'data-id').dataset.id,
          },
        }).then((responce) => {
          if (responce && responce.data) {
            const popup = document.getElementById(el.dataset.ptype);
            if (popup) {
              const priceContainer = popup.querySelector('.popup-fast__price-container');
              const price = popup.querySelector('[data-popup-price]');
              const priceOld = popup.querySelector('[data-popup-price-old]');
              const priceBox = popup.querySelector('[data-popup-price-box]');
              const name = popup.querySelector('[data-popup-name]');
              const descr = popup.querySelector('[data-popup-descr]');
              const img = popup.querySelector('[data-popup-image]');
              const avGoods = popup.querySelector('.popup-fast__availability');
              const inputs = [].slice.call(popup.querySelectorAll('[data-group-name], [data-group-email]'));
              const inputCounter = popup.querySelector('.counter .counter__input');
              const hiddenInputId = popup.querySelector('input[type=hidden]');
              if (inputCounter) {
                inputCounter.value = 1;
              }
              if (priceContainer) {
                if (responce.data.price_old === '') {
                  priceContainer.classList.add('popup-fast__price-container--no-sale');
                } else {
                  priceContainer.classList.remove('popup-fast__price-container--no-sale');
                }
              }
              if (inputs.length > 0) {
                inputs.forEach(inpt => inpt.classList.remove('error'));
              }
              if (price && responce.data.price) {
                price.innerHTML = responce.data.price;
              }
              if (priceOld && responce.data.price_old) {
                priceOld.innerHTML = responce.data.price_old;
              }
              if (name && responce.data.name) {
                name.innerHTML = responce.data.name;
              }
              if (descr && responce.data.description) {
                descr.innerHTML = responce.data.description;
              }
              if (img && responce.data.picture) {
                img.src = responce.data.picture;
              }
              if (priceBox &&
                responce.data.characteristics &&
                responce.data.characteristics.length > 0) {
                priceBox.innerHTML = '';
                responce.data.characteristics.forEach((obj) => {
                  priceBox.insertAdjacentHTML('beforeend', `<div class="popup-fast__price-line"><span>${obj.name || ''}</span><span>${obj.value || ''}</span></div>`);
                });
              }
              if (responce.data.pictures_slider && window.popupSw) {
                if (responce.data.pictures_slider.length > 0) {
                  setTimeout(() => {
                    window.popupSw.removeAllSlides();
                    responce.data.pictures_slider.forEach((src) => {
                      window.popupSw.appendSlide(`<div class="popup-fast__main-slide swiper-slide"><img src="${src}" alt="alt"></div>`);
                    });
                    window.popupSw.slideTo(0);
                  }, 0);
                }
              }
              if (responce.data.pictures_full && window.popupImage) {
                if (responce.data.pictures_full.length > 0) {
                  setTimeout(() => {
                    window.popupImage.removeAllSlides();
                    responce.data.pictures_full.forEach((src) => {
                      window.popupImage.appendSlide(`<div class="popup-image__slide swiper-slide"><img src="${src}" alt="alt"></div>`);
                    });
                    window.popupImage.slideTo(0);
                  }, 0);
                }
              }

              if (avGoods && responce.data.availability && responce.data.measure) {
                avGoods.innerHTML = `${responce.data.availability} ${responce.data.measure}`;
              }

              if (hiddenInputId) {
                hiddenInputId.value = getParentWithClass(el, 'data-id').dataset.id;
              }
              Popup.close();
              Popup.open(el.dataset.ptype);
            }
          }
        });
      }
    });
  }
});

const customForms = [].slice.call(document.querySelectorAll('.form-custom'));

const validateCustom = (form) => {
  const elems = [].slice.call(form.querySelectorAll('[data-group-name], [data-group-email]'));
  const errors = [];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    elems.forEach(el => el.classList.remove('error'));
    errors.length = 0;

    elems.forEach((item) => {
      if (item.value.length === 0) {
        item.classList.add('error');
        errors.push(item);
      }
    });

    if (errors.length === 0
      || !errors.find(input => input.type === 'email')
      || !errors.find(input => input.type === 'text')) {
      const data = new window.FormData(form);
      Axios.post(form.getAttribute('data-url') || form.action, data).then(() => {
        Popup.close();
      });
    }
  });
};

if (customForms.length > 0) {
  customForms.forEach((form) => {
    validateCustom(form);
  });
}
