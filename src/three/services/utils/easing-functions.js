// Links:
//  https://joshondesign.com/2013/03/01/improvedEasingEquations
//  https://gist.github.com/gre/1650294

const easeInOutCubic = time =>
  time < 0.5
    ? 4 * Math.pow(time, 3)
    : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1;

const easeInOutQuint = time =>
  // time <.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time;
  time < 0.5 ? 16 * Math.pow(time, 5) : 17 * --time * Math.pow(time, 4);

export { easeInOutCubic, easeInOutQuint };
