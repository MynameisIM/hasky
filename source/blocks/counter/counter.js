export default class Counter {
  constructor(parent) {
    const incr = parent.querySelector('[data-incr]');
    const decr = parent.querySelector('[data-decr]');
    const input = parent.querySelector('[data-input]');

    if (incr && decr && input) {
      const action = (inp, isIncr) => {
        if (isIncr) {
          input.value = Number(input.value) + 1;
        } else if (!isIncr && +input.value !== 1) {
          input.value = Number(input.value) - 1;
        }
      };

      [incr, decr].forEach((button) => {
        button.addEventListener('click', () => {
          if (button.hasAttribute('data-incr')) {
            action(input, true);
          } else if (button.hasAttribute('data-decr')) {
            action(input, false);
          }
        });
      });

      input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '');
      });
    }
  }
}
