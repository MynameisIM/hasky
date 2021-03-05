export default class DetailTabs {
  constructor(parent) {
    const tabs = [].slice.call(parent.querySelectorAll('.detail__tab'));
    const contents = [].slice.call(parent.querySelectorAll('.detail__tabs-content'));
    const contentsContainer = parent.querySelector('.detail__tabs-content-box');

    if (tabs.length > 0 && contents.length > 0 && contentsContainer) {
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

      const insertAfter = (newNode, referenceNode) => {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
      };

      const moveElems = () => {
        if (window.innerWidth <= 767) {
          tabs.forEach((tab, index) => {
            insertAfter(contents[index], tab);
          });
        } else {
          contents.forEach((el) => {
            contentsContainer.appendChild(el);
          });
        }
      };

      moveElems();

      window.addEventListener('resize', moveElems);
    }
  }
}
