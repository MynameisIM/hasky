export default class PopupResponse {
  constructor(parent) {
    const close = parent.querySelector('.popup-response__close');
    const button = parent.querySelector('.popup-response__link');
    const textBox = parent.querySelector('.popup-response__text-box');

    if (close) {
      close.addEventListener('click', () => {
        parent.classList.remove('open');
        document.body.classList.remove('overflow');
      });
    }

    window.addEventListener('popupEscape', () => {
      parent.classList.remove('open');
      document.body.classList.remove('overflow');
    });

    window.addEventListener('updateInfoPopup', (e) => {
      if (e && e.detail) {
        if (button && e.detail.buttonLink) {
          button.setAttribute('href', e.detail.buttonLink);
        }
        if (button && e.detail.buttonText) {
          button.innerHTML = e.detail.buttonText;
        }
        if (textBox && (e.detail.text1 || e.detail.text2)) {
          textBox.innerHTML = `<div class="popup-response__text-block">${e.detail.text1 || ''}</div><div class="popup-response__text-block">${e.detail.text2 || ''}</div>`;
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup-response')) {
        parent.classList.remove('open');
      }
    }, false);
  }
}
