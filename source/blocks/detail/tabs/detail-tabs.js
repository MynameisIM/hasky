export default class DetailTabs {
  constructor(parent) {
    this.tabs = [].slice.call(parent.querySelectorAll('.detail__tab'));
    this.contents = [].slice.call(parent.querySelectorAll('.detail__tabs-content'));
    const contentsContainer = parent.querySelector('.detail__tabs-content-box');
    const rateLink = document.querySelector('.detail-rate .detail-rate__link');

    if (this.tabs.length > 0 && this.contents.length > 0 && contentsContainer) {
      this.tabs.forEach((tab, index) => {
        if (tab) {
          tab.addEventListener('click', () => {
            this.openTab(tab, index);
          });
        }
      });

      const insertAfter = (newNode, referenceNode) => {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
      };

      const moveElems = () => {
        if (window.innerWidth <= 767) {
          this.tabs.forEach((tab, index) => {
            insertAfter(this.contents[index], tab);
          });
        } else {
          this.contents.forEach((el) => {
            contentsContainer.appendChild(el);
          });
        }
      };

      moveElems();

      window.addEventListener('resize', moveElems);
    }

    if (/#\w+/.test(window.location.href)) {
      this.openTabWithHash();
    }

    if (rateLink) {
      rateLink.addEventListener('click', () => {
        setTimeout(() => {
          this.openTabWithHash();
        }, 100);
      });
    }
  }

  openTab(tab, index) {
    this.tabs.forEach(el => el.classList.remove('active'));
    this.contents.forEach(el => el.classList.remove('active'));

    tab.classList.add('active');
    if (this.contents[index]) {
      this.contents[index].classList.add('active');
    }
  }

  openTabWithHash() {
    const hash = window.location.href.split('#').pop();
    if (hash && hash.length > 0) {
      const currentTab = this.tabs.find(el => el.querySelector(`a[href="#${hash}"]`));
      const currentIndex = this.tabs.findIndex(el => el.querySelector(`a[href="#${hash}"]`));

      if (currentTab && currentIndex !== -1) {
        this.openTab(currentTab, currentIndex);
      }
    }
  }
}
