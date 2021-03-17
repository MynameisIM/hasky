export default class PopupResponse {
  constructor(parent) {
    const close = parent.querySelector('.popup-response__close');

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
  }
}
