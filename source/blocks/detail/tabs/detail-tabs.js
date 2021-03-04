export default class DetailTabs {
  constructor(parent) {
    const tabs = [].slice.call(parent.querySelectorAll('.detail__tab'));
    const contents = [].slice.call(parent.querySelectorAll('.detail__tabs-content'));

    if (tabs.length > 0 && contents.length > 0) {
      tabs.forEach((tab, index) => {
        if (tab) {
          tab.addEventListener('click', () => {
            tabs.forEach(el => el.classList.remove('active'));
            contents.forEach(el => el.classList.remove('active'));

            tab.classList.add('active');
            if (contents[index]) {
              contents[index].classList.add('active');
            }
          });
        }
      });
    }
  }
}
