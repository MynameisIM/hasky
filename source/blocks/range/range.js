import JSR from 'mm-jsr';

export default class Range {
  constructor(parent) {
    const inputs = Array.from(parent.querySelectorAll('input'));
    const from = parent.parentElement.querySelector('[data-from]');
    const to = parent.parentElement.querySelector('[data-to]');

    if (inputs.length > 0) {
      const jsr = new JSR([inputs[0], inputs[1]], {
        sliders: 2,
        step: 1,
        values: [Number(inputs[0].getAttribute('value') || 10), Number(inputs[1].getAttribute('value') || 50000)],
        min: Number(inputs[0].getAttribute('min')) || 1,
        max: Number(inputs[1].getAttribute('max')) || 50000,
        modules: {
          labels: false,
        },
        grid: false,
      });

      jsr.addEventListener('update', (input, value) => {
        if (input.classList.contains('range__input--from')) {
          from.value = value;
        } else {
          to.value = value;
        }
        window.dispatchEvent(new window.CustomEvent('updateCatalogFilter'));
      });

      if (from && to) {
        from.addEventListener('input', () => {
          if (+from.value < 1) {
            from.value = 1;
          }
          if (+from.value > +from.dataset.max) {
            from.value = from.dataset.max;
          }
          from.value = from.value.replace(/\D/g, '');
          jsr.setValue(0, +from.value);
          window.dispatchEvent(new window.CustomEvent('updateCatalogFilter'));
        });

        to.addEventListener('input', () => {
          if (+to.value < 1) {
            to.value = 1;
          }
          if (+to.value > +to.dataset.max) {
            to.value = to.dataset.max;
          }
          to.value = to.value.replace(/\D/g, '');
          jsr.setValue(1, +to.value);
          window.dispatchEvent(new window.CustomEvent('updateCatalogFilter'));
        });
      }
    }
  }
}
