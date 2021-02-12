export default class CoreInput {
  constructor() {
    const inputs = [].slice.call(document.querySelectorAll('.core-input'));
    if (inputs.length > 0) {
      inputs.forEach((block) => {
        const el = block.querySelector('input');
        if (el) {
          if (el.value !== '') {
            block.classList.add('focus');
          }

          el.addEventListener('focus', () => {
            block.classList.add('focus');
          });

          el.addEventListener('blur', () => {
            if (el.value === '') {
              block.classList.remove('focus');
            }
          });
        }
      });
    }
  }
}
