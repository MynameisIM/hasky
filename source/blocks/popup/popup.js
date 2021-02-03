export default class Popup {
  constructor(parent) {
    const close = parent.querySelector('.popup__close');

    document.addEventListener('click', (ev) => {
      if (ev.target === close || ev.target.classList.contains('popup__layout')) {
        parent.classList.remove('open');
        document.body.classList.remove('overflow');
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
