export default class Popup {
  constructor(parent) {
    const close = parent.querySelector('.popup__close');

    document.addEventListener('click', (ev) => {
      if (ev.target === close || ev.target.classList.contains('popup__layout')
        || ev.target.classList.contains('popup-fast__layout')
        || ev.target.classList.contains('popup-buy__layout')) {
        parent.classList.remove('open');
        document.body.classList.remove('overflow');
      }
    });

    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        parent.classList.remove('open');
        document.body.classList.remove('overflow');
        window.dispatchEvent(new window.CustomEvent('popupEscape'));
      }
    });
  }

  static open(id) {
    const current = document.getElementById(id);
    if (current) {
      current.classList.add('open');
      document.body.classList.add('overflow');
    }
  }

  static close() {
    const opens = [].slice.call(document.querySelectorAll('.popup.open'));
    if (opens.length > 0) {
      opens.forEach(open => open.classList.remove('open'));
      document.body.classList.remove('overflow');
    }
  }
}
