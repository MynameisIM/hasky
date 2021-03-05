export default class DetailRate {
  constructor(parent) {
    const svg = parent.querySelector('svg');
    const counter = parent.querySelector('.detail-rate__count');
    const svgStrokeDasharray = 609;

    const getPercent = val => (100 / 5) * Number(val);

    const getStrokeDashoffset = percent =>
      (svgStrokeDasharray - Math.floor((svgStrokeDasharray / 100) * percent));

    if (svg && counter && counter.textContent.length > 0) {
      svg.style.strokeDashoffset = getStrokeDashoffset(getPercent(counter.innerHTML));
    }
  }
}
