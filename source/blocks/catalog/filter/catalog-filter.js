import Axios from 'axios';
import Range from '../../range/range';
import { throttle } from '../../../base/script/debounce';

export default class CatalogFilter {
  constructor(parent) {
    const ranges = [].slice.call(parent.querySelectorAll('.range'));
    const close = parent.querySelector('.catalog-filter__close');
    const page = document.body.querySelector('.page');
    const form = parent.querySelector('form');
    const elems = [].slice.call(form).filter(el => el.tagName !== 'BUTTON').filter(el => !el.hasAttribute('data-not-required'));
    const defaultData = {};
    elems.forEach((el) => {
      defaultData[el.name] = el.value;
    });

    const submit = () => {
      const data = {};
      elems.forEach((el) => {
        if (el.name) {
          if (el.type === 'text') {
            if (!data[el.name]) {
              data[el.name] = el.value;
            }
          } else if (el.type === 'radio') {
            if (el.checked) {
              if (!data[el.name]) {
                data[el.name] = el.value;
              }
            }
          } else {
            // eslint-disable-next-line
            if (!data[el.name]) {
              data[el.name] = el.value;
            }
          }
        }
      });

      Axios.post(form.getAttribute('action'), data).then((response) => {
        if (response.data) {
          window.history.pushState('', '', `?${this.constructor.objToSrt(data)}`);
        }
      });
    };
    const a = throttle(submit, 1000);
    if (elems.length > 0) {
      elems.forEach((el) => {
        el.addEventListener('change', () => {
          a();
        });
      });
    }

    window.addEventListener('updateCatalogFilter', () => {
      a();
    });

    if (ranges.length > 0) {
      ranges.forEach((range) => {
        new Range(range);
      });
    }

    if (close) {
      close.addEventListener('click', () => {
        parent.classList.remove('catalog-filter--show');
        page.classList.remove('catalog-page');
      });
    }
  }

  static objToSrt(obj) {
    const arr = [];
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] !== 'object') {
        if (obj[key] !== 0) {
          arr.push(`${key}=${obj[key]}`);
        }
      } else {
        arr.push(`${key}=${JSON.stringify(obj[key]).replace(/[[\]"]/g, '')}`);
      }
    });
    return arr.join('&');
  }
}
