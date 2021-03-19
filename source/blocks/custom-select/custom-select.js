export default class CustomSelect {
  constructor(parent) {
    const container = parent;
    const select = container.children[0];
    const optionsItem = container.children[0].options;
    const dropdown = document.createElement('ul');

    const btn = document.createElement('span');
    btn.classList.add('custom-select__btn');
    btn.textContent = optionsItem[0].text;
    dropdown.classList.add('custom-select__list');

    for (let i = 0; i < optionsItem.length; i += 1) {
      const dropitem = document.createElement('li');
      dropitem.classList.add('custom-select__item');
      dropitem.textContent = optionsItem[i].textContent;
      if (optionsItem[i].hasAttribute('selected')) {
        btn.textContent = dropitem.textContent;
        select.selectedIndex = i;
      }

      dropitem.onclick = () => {
        btn.textContent = dropitem.textContent;
        dropdown.classList.remove('custom-select__list--opened');
        container.classList.remove('custom-select--opened');
        select.selectedIndex = i;
        select.dispatchEvent(new window.Event('change'));
      };
      dropdown.append(dropitem);
    }
    dropdown.childNodes[0].style.display = 'none';
    container.append(btn);
    container.append(dropdown);

    btn.onclick = () => {
      dropdown.classList.toggle('custom-select__list--opened');
      container.classList.toggle('custom-select--opened');
    };

    document.addEventListener('click', (e) => {
      const { target } = e;
      if (!container.contains(target)) {
        dropdown.classList.remove('custom-select__list--opened');
        container.classList.remove('custom-select--opened');
      }
    });
  }
}
