import Choices from 'choices.js';

export default class CoreSelect {
  static init(parent = document) {
    [].slice.call(parent.querySelectorAll('.core-select__select')).forEach((item) => {
      new CoreSelect(item);
    });
  }

  constructor(el) {
    this.selectContainer = el;
    this.selectChoices = new Choices(this.selectContainer, {
      shouldSort: false,
      removeItems: true,
      removeItemButton: true,
      noChoicesText: 'Все корпусы выбраны',
    });
    window.selects = this.selectChoices;
  }
}
