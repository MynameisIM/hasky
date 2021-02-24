import Range from '../../range/range';

export default class CatalogFilter {
  constructor(parent) {
    const ranges = [].slice.call(parent.querySelectorAll('.range'));
    if (ranges.length > 0) {
      ranges.forEach((range) => {
        new Range(range);
      });
    }
  }
}
