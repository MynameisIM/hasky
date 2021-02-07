/*
* Обёртка, которая передаёт вызов f не более одного раза в ms миллисекунд.
* Другими словами, когда мы вызываем debounce, это гарантирует,
* что все остальные вызовы будут игнорироваться в течение ms.
*/

// eslint-disable-next-line
export const throttle = (func, ms) => {
  // eslint-disable-next-line
  let isThrottled = false,
    savedArgs,
    savedThis;
  function wrapper() {
    if (isThrottled) {
      // eslint-disable-next-line
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    // eslint-disable-next-line
    func.apply(this, arguments);
    isThrottled = true;
    setTimeout(() => {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        // eslint-disable-next-line
        savedArgs = savedThis = null;
      }
    }, ms);
  }
  return wrapper;
};
